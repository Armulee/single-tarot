import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
})

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
        console.error("Webhook signature verification failed:", err)
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session
                await handleCheckoutSessionCompleted(session)
                break
            }
            case "invoice.payment_succeeded": {
                const invoice = event.data.object as Stripe.Invoice
                await handleInvoicePaymentSucceeded(invoice)
                break
            }
            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription
                await handleSubscriptionUpdated(subscription)
                break
            }
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription
                await handleSubscriptionDeleted(subscription)
                break
            }
            default:
                console.log(`Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error("Error processing webhook:", error)
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        )
    }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.user_id
    const subscriptionId = session.subscription as string

    if (!userId || !subscriptionId) {
        console.error("Missing user_id or subscription_id in session metadata")
        return
    }

    // Get subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    // Save subscription to database
    await supabase.from("subscriptions").upsert({
        user_id: userId,
        subscription_id: subscriptionId,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
    })

    // Save payment history
    if (session.payment_intent) {
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string)
        
        await supabase.from("payment_history").insert({
            user_id: userId,
            payment_intent_id: paymentIntent.id,
            subscription_id: subscriptionId,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            description: "Premium subscription",
        })
    }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
    const subscriptionId = invoice.subscription as string
    const userId = invoice.metadata?.user_id

    if (!subscriptionId) return

    // Get user_id from subscription if not in invoice metadata
    let finalUserId = userId
    if (!finalUserId) {
        const { data: subscription } = await supabase
            .from("subscriptions")
            .select("user_id")
            .eq("subscription_id", subscriptionId)
            .single()
        
        if (subscription) {
            finalUserId = subscription.user_id
        }
    }

    if (!finalUserId) return

    // Save payment history
    await supabase.from("payment_history").insert({
        user_id: finalUserId,
        payment_intent_id: invoice.payment_intent as string,
        subscription_id: subscriptionId,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        status: "succeeded",
        description: "Premium subscription renewal",
    })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const userId = subscription.metadata?.user_id

    if (!userId) {
        // Get user_id from existing subscription record
        const { data: existingSub } = await supabase
            .from("subscriptions")
            .select("user_id")
            .eq("subscription_id", subscription.id)
            .single()
        
        if (!existingSub) return
        userId = existingSub.user_id
    }

    // Update subscription in database
    await supabase
        .from("subscriptions")
        .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
        })
        .eq("subscription_id", subscription.id)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    // Update subscription status to canceled
    await supabase
        .from("subscriptions")
        .update({
            status: "canceled",
        })
        .eq("subscription_id", subscription.id)
}
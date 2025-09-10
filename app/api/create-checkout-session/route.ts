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

export async function POST(request: NextRequest) {
    try {
        const { priceId, successUrl, cancelUrl } = await request.json()

        if (!priceId) {
            return NextResponse.json(
                { error: "Price ID is required" },
                { status: 400 }
            )
        }

        // Get the user from the request (you might need to implement auth middleware)
        const authHeader = request.headers.get("authorization")
        if (!authHeader) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            )
        }

        // Verify the user token and get user info
        const token = authHeader.replace("Bearer ", "")
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !user) {
            return NextResponse.json(
                { error: "Invalid authentication" },
                { status: 401 }
            )
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: user.email,
            metadata: {
                user_id: user.id,
            },
            subscription_data: {
                metadata: {
                    user_id: user.id,
                },
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error("Error creating checkout session:", error)
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        )
    }
}
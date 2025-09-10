"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Loader2, CreditCard, Crown } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { usePremium } from "@/hooks/use-premium"
import Link from "next/link"

interface PremiumCheckoutProps {
    onCheckout?: () => void
    className?: string
    variant?: "button" | "card"
    label?: string
    gradientClassName?: string
}

export function PremiumCheckout({
    onCheckout,
    className = "",
    variant = "button",
    label,
    gradientClassName,
}: PremiumCheckoutProps) {
    const { user } = useAuth()
    const { isPremium, loading } = usePremium(user)
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        if (!user) {
            // Redirect to sign in if not authenticated
            window.location.href = "/signin"
            return
        }

        if (isPremium) {
            // User is already premium, redirect to billing
            window.location.href = "/billing"
            return
        }

        setIsLoading(true)
        try {
            // Create Stripe checkout session
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, // Monthly subscription price ID
                    successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancelUrl: `${window.location.origin}/pricing`,
                }),
            })

            const { url, error } = await response.json()

            if (error) {
                console.error("Error creating checkout session:", error)
                alert("Failed to create checkout session. Please try again.")
                return
            }

            if (url) {
                // Redirect to Stripe checkout
                window.location.href = url
                onCheckout?.()
            }
        } catch (error) {
            console.error("Error during checkout:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    if (loading) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <Loader2 className='w-4 h-4 animate-spin mr-2' />
                <span>Loading...</span>
            </div>
        )
    }

    if (isPremium) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <Button
                    variant='outline'
                    size='sm'
                    disabled
                    className='bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-semibold border-0 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 cursor-not-allowed opacity-90'
                >
                    <Crown className='w-4 h-4 mr-2' />
                    Premium Active
                </Button>
                <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => (window.location.href = "/billing")}
                    className='text-white hover:bg-white/10 border border-white/20'
                >
                    Manage
                </Button>
            </div>
        )
    }

    const gradientClasses =
        gradientClassName ??
        "bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 hover:from-indigo-400 hover:via-sky-400 hover:to-cyan-300"

    if (variant === "card") {
        return (
            <Card
                className={`p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 ${className}`}
            >
                <div className='text-center space-y-4'>
                    <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center'>
                        <Crown className='w-8 h-8 text-white' />
                    </div>
                    <div>
                        <h3 className='font-serif font-bold text-2xl mb-2'>
                            Go Premium
                        </h3>
                        <p className='text-muted-foreground mb-4'>
                            Unlock unlimited readings and premium features
                        </p>
                    </div>
                    <div className='space-y-3'>
                        <div className='text-3xl font-bold'>
                            $2.99
                            <span className='text-lg text-muted-foreground'>
                                /month
                            </span>
                        </div>
                        <ul className='space-y-2 text-sm'>
                            {[
                                "Unlimited tarot readings",
                                "Advanced AI interpretations",
                                "Reading history & insights",
                                "Priority support",
                                "No advertisements",
                                "Exclusive cosmic themes",
                            ].map((feature, index) => (
                                <li
                                    key={index}
                                    className='flex items-center gap-2'
                                >
                                    <Check className='w-4 h-4 text-green-500 flex-shrink-0' />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {!user ? (
                        <div className='space-y-2'>
                            <p className='text-sm text-muted-foreground'>
                                Sign in to start your premium journey
                            </p>
                            <div className='flex gap-2'>
                                <Button asChild className='flex-1'>
                                    <Link href='/signin'>Sign In</Link>
                                </Button>
                                <Button
                                    variant='outline'
                                    asChild
                                    className='flex-1'
                                >
                                    <Link href='/signup'>Sign Up</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className={`w-full relative overflow-hidden ${gradientClasses} text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95`}
                            size='lg'
                        >
                            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300' />
                            <div className='relative flex items-center'>
                                {isLoading ? (
                                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                ) : (
                                    <CreditCard className='w-4 h-4 mr-2' />
                                )}
                                {isLoading
                                    ? "Processing..."
                                    : label ?? "Start Premium"}
                            </div>
                        </Button>
                    )}
                </div>
            </Card>
        )
    }

    return (
        <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className={`relative overflow-hidden ${gradientClasses} text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 ${className}`}
        >
            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300' />
            <div className='relative flex items-center'>
                {isLoading ? (
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                ) : (
                    <Crown className='w-4 h-4 mr-2' />
                )}
                {isLoading ? "Processing..." : label ?? "Go Premium"}
            </div>
        </Button>
    )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2, CreditCard, Crown } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { usePremium } from "@/hooks/use-premium"
import Link from "next/link"

interface PremiumCheckoutProps {
    onCheckout?: () => void
    className?: string
    variant?: "button" | "card"
}

export function PremiumCheckout({ 
    onCheckout, 
    className = "",
    variant = "button"
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
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Loading...</span>
            </div>
        )
    }

    if (isPremium) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                </Badge>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = "/billing"}
                >
                    Manage Billing
                </Button>
            </div>
        )
    }

    if (variant === "card") {
        return (
            <Card className={`p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 ${className}`}>
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-2xl mb-2">Go Premium</h3>
                        <p className="text-muted-foreground mb-4">
                            Unlock unlimited readings and premium features
                        </p>
                    </div>
                    <div className="space-y-3">
                        <div className="text-3xl font-bold">
                            $2.99<span className="text-lg text-muted-foreground">/month</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                            {[
                                "Unlimited tarot readings",
                                "Advanced AI interpretations",
                                "Reading history & insights",
                                "Priority support",
                                "No advertisements",
                                "Exclusive cosmic themes"
                            ].map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {!user ? (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Sign in to start your premium journey
                            </p>
                            <div className="flex gap-2">
                                <Button asChild className="flex-1">
                                    <Link href="/signin">Sign In</Link>
                                </Button>
                                <Button variant="outline" asChild className="flex-1">
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                            size="lg"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <CreditCard className="w-4 h-4 mr-2" />
                            )}
                            {isLoading ? "Processing..." : "Start Premium"}
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
            className={`bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white ${className}`}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
                <Crown className="w-4 h-4 mr-2" />
            )}
            {isLoading ? "Processing..." : "Go Premium"}
        </Button>
    )
}
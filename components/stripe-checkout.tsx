"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface StripeCheckoutProps {
  priceId: string
  planName: string
  amount: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function StripeCheckout({ priceId, planName, amount, onError }: StripeCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      // TODO: Replace with actual Stripe integration
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          planName,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        throw new Error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      onError?.(error instanceof Error ? error.message : "Checkout failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card/10 backdrop-blur-sm border-border/20">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-serif font-semibold text-xl">{planName}</h3>
          <p className="text-2xl font-bold text-primary">{amount}/month</p>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={isLoading}
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground card-glow"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Subscribe Now"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">Secure payment powered by Stripe. Cancel anytime.</p>
      </div>
    </Card>
  )
}

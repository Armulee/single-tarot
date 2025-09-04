"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Check, Star, Zap, Shield } from "lucide-react"

const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring the cosmic realm",
    features: [
      "3 tarot readings per day",
      "Basic AI interpretations",
      "Standard card deck",
      "Community support",
      "View advertisements",
    ],
    limitations: ["Limited daily readings", "Ads before each reading", "Basic interpretations only"],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
    icon: Star,
  },
  {
    name: "Cosmic Premium",
    price: "$2.99",
    period: "per month",
    description: "Unlock the full power of the universe",
    features: [
      "5,000 monthly readings",
      "Advanced AI interpretations",
      "Premium card decks",
      "No advertisements",
      "Priority support",
      "Reading history & insights",
      "Personalized guidance",
      "Exclusive cosmic themes",
    ],
    limitations: [],
    buttonText: "Start Premium Journey",
    buttonVariant: "default" as const,
    popular: true,
    icon: Zap,
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const handleSubscribe = async (planName: string) => {
    if (planName === "Free") {
      // Redirect to sign up
      window.location.href = "/signup"
      return
    }

    // TODO: Implement Stripe checkout
    console.log(`Subscribing to ${planName}`)

    // Simulate checkout process
    alert("Redirecting to secure checkout...")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 backdrop-blur-sm bg-card/10 border-b border-border/20">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-serif font-bold">✦</span>
          </div>
          <h1 className="font-serif font-bold text-xl text-foreground">Cosmic Tarot</h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/signin" className="text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10 bg-transparent">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-balance">
              Choose Your
              <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Cosmic Path
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Unlock deeper insights and remove limitations with our premium subscription
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? "bg-primary" : "bg-muted"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Annual</span>
            {isAnnual && (
              <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const IconComponent = plan.icon
            const adjustedPrice = plan.name === "Cosmic Premium" && isAnnual ? "$2.39" : plan.price

            return (
              <Card
                key={plan.name}
                className={`relative p-8 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "bg-card/20 border-primary/40 card-glow"
                    : "bg-card/10 border-border/20 hover:bg-card/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Header */}
                  <div className="text-center space-y-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-primary/20" : "bg-secondary/20"
                      }`}
                    >
                      <IconComponent className={`w-8 h-8 ${plan.popular ? "text-primary" : "text-secondary"}`} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-2xl">{plan.name}</h3>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="font-serif font-bold text-4xl">{adjustedPrice}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      {isAnnual && plan.name === "Cosmic Premium" && (
                        <p className="text-sm text-muted-foreground">
                          <span className="line-through">$2.99</span> - Save $7.20/year
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-border/20">
                        <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="text-xs text-muted-foreground flex items-center space-x-2">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full flex-shrink-0" />
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSubscribe(plan.name)}
                    variant={plan.buttonVariant}
                    size="lg"
                    className={`w-full py-6 text-lg ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground card-glow"
                        : "border-border/30 hover:bg-card/20 bg-transparent"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="font-serif font-bold text-3xl text-center mb-12">Frequently Asked Questions</h2>

          <div className="grid gap-6">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer:
                  "Yes, you can cancel your premium subscription at any time. You'll continue to have access to premium features until the end of your billing period.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment processor.",
              },
              {
                question: "Is my payment information secure?",
                answer:
                  "Absolutely. We use Stripe for payment processing, which is PCI DSS compliant and uses industry-standard encryption to protect your data.",
              },
              {
                question: "What happens if I exceed my monthly reading limit?",
                answer:
                  "Premium users get 5,000 monthly readings, which is more than enough for daily use. If you somehow exceed this limit, you can upgrade or wait for the next billing cycle.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 bg-card/10 backdrop-blur-sm border-border/20">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Powered by Stripe</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function TermsPage() {
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
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="font-serif font-bold text-4xl">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="p-8 bg-card/10 backdrop-blur-sm border-border/20">
            <div className="prose prose-invert max-w-none space-y-6">
              <section className="space-y-4">
                <h2 className="font-serif font-semibold text-2xl text-foreground">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Cosmic Tarot, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif font-semibold text-2xl text-foreground">2. Service Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cosmic Tarot provides AI-powered tarot card readings for entertainment and spiritual guidance
                  purposes. Our service combines traditional tarot symbolism with modern artificial intelligence to
                  generate personalized interpretations.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif font-semibold text-2xl text-foreground">3. User Responsibilities</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• You must be at least 13 years old to use this service</li>
                  <li>• You are responsible for maintaining the confidentiality of your account</li>
                  <li>• You agree not to use the service for any unlawful purposes</li>
                  <li>• You understand that tarot readings are for entertainment and guidance purposes only</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif font-semibold text-2xl text-foreground">4. Subscription Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Premium subscriptions are billed monthly at $2.99. You may cancel your subscription at any time.
                  Cancellation will take effect at the end of your current billing period. No refunds are provided for
                  partial months.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif font-semibold text-2xl text-foreground">5. Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tarot readings provided by Cosmic Tarot are for entertainment purposes only. They should not be used
                  as a substitute for professional advice regarding health, finance, legal matters, or other important
                  life decisions. We are not responsible for any decisions made based on our readings.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif font-semibold text-2xl text-foreground">6. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at{" "}
                  <Link href="/contact" className="text-primary hover:text-primary/80">
                    our contact page
                  </Link>
                  .
                </p>
              </section>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

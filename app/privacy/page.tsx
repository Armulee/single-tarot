import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PrivacyPage() {
    return (
        <div className='min-h-screen relative overflow-hidden'>
            {/* Navigation */}
            <nav className='relative z-10 flex items-center justify-between p-6 backdrop-blur-sm bg-card/10 border-b border-border/20'>
                <Link href='/' className='flex items-center space-x-2'>
                    <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center'>
                        <span className='text-primary font-serif font-bold'>
                            ✦
                        </span>
                    </div>
                    <h1 className='font-serif font-bold text-xl text-foreground'>
                        ดูดวง.ai
                    </h1>
                </Link>

                <div className='flex items-center space-x-4'>
                    <Link
                        href='/'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                        Back to Home
                    </Link>
                </div>
            </nav>

            <main className='relative z-10 max-w-4xl mx-auto px-6 py-16'>
                <div className='space-y-8'>
                    <div className='text-center space-y-4'>
                        <h1 className='font-serif font-bold text-4xl'>
                            Privacy Policy
                        </h1>
                        <p className='text-muted-foreground'>
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <Card className='p-8 bg-card/10 backdrop-blur-sm border-border/20'>
                        <div className='prose prose-invert max-w-none space-y-6'>
                            <section className='space-y-4'>
                                <h2 className='font-serif font-semibold text-2xl text-foreground'>
                                    Information We Collect
                                </h2>
                                <p className='text-muted-foreground leading-relaxed'>
                                    We collect information you provide directly
                                    to us, such as when you create an account,
                                    make a purchase, or contact us for support.
                                    This may include your name, email address,
                                    and payment information.
                                </p>
                            </section>

                            <section className='space-y-4'>
                                <h2 className='font-serif font-semibold text-2xl text-foreground'>
                                    How We Use Your Information
                                </h2>
                                <ul className='space-y-2 text-muted-foreground'>
                                    <li>
                                        • To provide and maintain our service
                                    </li>
                                    <li>
                                        • To process transactions and send
                                        related information
                                    </li>
                                    <li>
                                        • To send you technical notices and
                                        support messages
                                    </li>
                                    <li>
                                        • To improve our service and develop new
                                        features
                                    </li>
                                </ul>
                            </section>

                            <section className='space-y-4'>
                                <h2 className='font-serif font-semibold text-2xl text-foreground'>
                                    Information Sharing
                                </h2>
                                <p className='text-muted-foreground leading-relaxed'>
                                    We do not sell, trade, or otherwise transfer
                                    your personal information to third parties
                                    except as described in this policy. We may
                                    share your information with service
                                    providers who assist us in operating our
                                    service, such as payment processors.
                                </p>
                            </section>

                            <section className='space-y-4'>
                                <h2 className='font-serif font-semibold text-2xl text-foreground'>
                                    Data Security
                                </h2>
                                <p className='text-muted-foreground leading-relaxed'>
                                    We implement appropriate security measures
                                    to protect your personal information.
                                    However, no method of transmission over the
                                    internet is 100% secure, and we cannot
                                    guarantee absolute security.
                                </p>
                            </section>

                            <section className='space-y-4'>
                                <h2 className='font-serif font-semibold text-2xl text-foreground'>
                                    Your Rights
                                </h2>
                                <p className='text-muted-foreground leading-relaxed'>
                                    You have the right to access, update, or
                                    delete your personal information. You may
                                    also opt out of certain communications from
                                    us. To exercise these rights, please contact
                                    us through our support channels.
                                </p>
                            </section>

                            <section className='space-y-4'>
                                <h2 className='font-serif font-semibold text-2xl text-foreground'>
                                    Contact Us
                                </h2>
                                <p className='text-muted-foreground leading-relaxed'>
                                    If you have any questions about this Privacy
                                    Policy, please contact us at{" "}
                                    <Link
                                        href='/contact'
                                        className='text-primary hover:text-primary/80'
                                    >
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

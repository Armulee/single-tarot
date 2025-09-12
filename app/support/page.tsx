import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
    HelpCircle, 
    Mail, 
    MessageCircle, 
    Phone, 
    Clock, 
    Users,
    Zap,
    BookOpen
} from "lucide-react"

export default function SupportPage() {
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
                        AskingFate
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

            <main className='relative z-10 max-w-6xl mx-auto px-6 py-16'>
                <div className='space-y-12'>
                    {/* Header */}
                    <div className='text-center space-y-6'>
                        <div className='flex justify-center'>
                            <div className='w-16 h-16 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full flex items-center justify-center'>
                                <HelpCircle className='w-8 h-8 text-white' />
                            </div>
                        </div>
                        <h1 className='font-serif font-bold text-5xl bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-cyan bg-clip-text text-transparent'>
                            Customer Support
                        </h1>
                        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                            We&apos;re here to help you on your mystical journey. Find answers, get assistance, and connect with our support team.
                        </p>
                    </div>

                    {/* Quick Help Options */}
                    <div className='grid md:grid-cols-3 gap-6'>
                        <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20 hover:bg-card/20 transition-colors'>
                            <div className='text-center space-y-4'>
                                <div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto'>
                                    <MessageCircle className='w-6 h-6 text-primary' />
                                </div>
                                <h3 className='font-serif font-semibold text-xl'>Live Chat</h3>
                                <p className='text-muted-foreground text-sm'>
                                    Get instant help from our support team
                                </p>
                                <Button className='w-full bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90'>
                                    Start Chat
                                </Button>
                            </div>
                        </Card>

                        <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20 hover:bg-card/20 transition-colors'>
                            <div className='text-center space-y-4'>
                                <div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto'>
                                    <Mail className='w-6 h-6 text-primary' />
                                </div>
                                <h3 className='font-serif font-semibold text-xl'>Email Support</h3>
                                <p className='text-muted-foreground text-sm'>
                                    Send us a detailed message
                                </p>
                                <Button variant='outline' className='w-full'>
                                    Send Email
                                </Button>
                            </div>
                        </Card>

                        <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20 hover:bg-card/20 transition-colors'>
                            <div className='text-center space-y-4'>
                                <div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto'>
                                    <Phone className='w-6 h-6 text-primary' />
                                </div>
                                <h3 className='font-serif font-semibold text-xl'>Phone Support</h3>
                                <p className='text-muted-foreground text-sm'>
                                    Call us for urgent assistance
                                </p>
                                <Button variant='outline' className='w-full'>
                                    Call Now
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Support Hours */}
                    <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                        <div className='flex items-center space-x-4'>
                            <Clock className='w-6 h-6 text-primary' />
                            <div>
                                <h3 className='font-serif font-semibold text-lg'>Support Hours</h3>
                                <p className='text-muted-foreground'>
                                    Monday - Friday: 9:00 AM - 6:00 PM (UTC+7) | 
                                    Saturday - Sunday: 10:00 AM - 4:00 PM (UTC+7)
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* FAQ Section */}
                    <div className='space-y-8'>
                        <h2 className='font-serif font-bold text-3xl text-center'>Frequently Asked Questions</h2>
                        
                        <div className='grid md:grid-cols-2 gap-6'>
                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                                <h3 className='font-serif font-semibold text-lg mb-3'>How do I get started with tarot readings?</h3>
                                <p className='text-muted-foreground text-sm leading-relaxed'>
                                    Simply create an account, choose your reading type, ask your question, and let our AI guide you through the mystical experience. No prior tarot knowledge required!
                                </p>
                            </Card>

                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                                <h3 className='font-serif font-semibold text-lg mb-3'>What&apos;s included in the premium subscription?</h3>
                                <p className='text-muted-foreground text-sm leading-relaxed'>
                                    Premium includes 5,000 monthly readings, advanced AI interpretations, premium card decks, no advertisements, priority support, reading history, and exclusive cosmic themes.
                                </p>
                            </Card>

                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                                <h3 className='font-serif font-semibold text-lg mb-3'>How accurate are the AI readings?</h3>
                                <p className='text-muted-foreground text-sm leading-relaxed'>
                                    Our AI combines traditional tarot wisdom with modern technology to provide insightful interpretations. Remember, tarot readings are for guidance and entertainment purposes.
                                </p>
                            </Card>

                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                                <h3 className='font-serif font-semibold text-lg mb-3'>Can I cancel my subscription anytime?</h3>
                                <p className='text-muted-foreground text-sm leading-relaxed'>
                                    Yes! You can cancel your subscription at any time from your profile settings. Cancellation takes effect at the end of your current billing period.
                                </p>
                            </Card>

                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                                <h3 className='font-serif font-semibold text-lg mb-3'>Is my personal information secure?</h3>
                                <p className='text-muted-foreground text-sm leading-relaxed'>
                                    Absolutely. We use industry-standard encryption and security measures to protect your data. Your readings and personal information are never shared with third parties.
                                </p>
                            </Card>

                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                                <h3 className='font-serif font-semibold text-lg mb-3'>Do you offer refunds?</h3>
                                <p className='text-muted-foreground text-sm leading-relaxed'>
                                    We offer a 30-day money-back guarantee for new subscribers. If you&apos;re not satisfied, contact our support team within 30 days of your first payment.
                                </p>
                            </Card>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <Card className='p-8 bg-gradient-to-r from-cosmic-purple/10 to-cosmic-blue/10 backdrop-blur-sm border-border/20'>
                        <div className='text-center space-y-6'>
                            <h2 className='font-serif font-bold text-2xl'>Still Need Help?</h2>
                            <p className='text-muted-foreground max-w-2xl mx-auto'>
                                Our dedicated support team is here to assist you with any questions or concerns. 
                                We typically respond within 24 hours.
                            </p>
                            
                            <div className='grid md:grid-cols-3 gap-6 mt-8'>
                                <div className='space-y-2'>
                                    <Mail className='w-6 h-6 text-primary mx-auto' />
                                    <h3 className='font-semibold'>Email Us</h3>
                                    <p className='text-sm text-muted-foreground'>support@askingfate.com</p>
                                </div>
                                <div className='space-y-2'>
                                    <Phone className='w-6 h-6 text-primary mx-auto' />
                                    <h3 className='font-semibold'>Call Us</h3>
                                    <p className='text-sm text-muted-foreground'>+66 2-123-4567</p>
                                </div>
                                <div className='space-y-2'>
                                    <MessageCircle className='w-6 h-6 text-primary mx-auto' />
                                    <h3 className='font-semibold'>Live Chat</h3>
                                    <p className='text-sm text-muted-foreground'>Available 24/7</p>
                                </div>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
                                <Link href='/contact'>
                                    <Button className='bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90'>
                                        Contact Form
                                    </Button>
                                </Link>
                                <Button variant='outline'>
                                    Schedule Call
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Additional Resources */}
                    <div className='space-y-6'>
                        <h2 className='font-serif font-bold text-2xl text-center'>Additional Resources</h2>
                        
                        <div className='grid md:grid-cols-3 gap-6'>
                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20 hover:bg-card/20 transition-colors'>
                                <div className='text-center space-y-4'>
                                    <BookOpen className='w-8 h-8 text-primary mx-auto' />
                                    <h3 className='font-serif font-semibold text-lg'>User Guide</h3>
                                    <p className='text-muted-foreground text-sm'>
                                        Learn how to get the most out of your tarot readings
                                    </p>
                                    <Button variant='outline' size='sm'>
                                        Read Guide
                                    </Button>
                                </div>
                            </Card>

                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20 hover:bg-card/20 transition-colors'>
                                <div className='text-center space-y-4'>
                                    <Users className='w-8 h-8 text-primary mx-auto' />
                                    <h3 className='font-serif font-semibold text-lg'>Community</h3>
                                    <p className='text-muted-foreground text-sm'>
                                        Join our community of tarot enthusiasts
                                    </p>
                                    <Button variant='outline' size='sm'>
                                        Join Community
                                    </Button>
                                </div>
                            </Card>

                            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20 hover:bg-card/20 transition-colors'>
                                <div className='text-center space-y-4'>
                                    <Zap className='w-8 h-8 text-primary mx-auto' />
                                    <h3 className='font-serif font-semibold text-lg'>Status Page</h3>
                                    <p className='text-muted-foreground text-sm'>
                                        Check our service status and uptime
                                    </p>
                                    <Button variant='outline' size='sm'>
                                        Check Status
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
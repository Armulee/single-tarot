import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Sparkles } from "lucide-react"

export default function SuccessPage() {
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
            </nav>

            <main className='relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6'>
                <Card className='max-w-md w-full p-8 bg-card/10 backdrop-blur-sm border-border/20 card-glow text-center'>
                    <div className='space-y-6'>
                        {/* Success Icon */}
                        <div className='w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center'>
                            <CheckCircle className='w-10 h-10 text-green-400' />
                        </div>

                        {/* Success Message */}
                        <div className='space-y-3'>
                            <h1 className='font-serif font-bold text-2xl'>
                                Welcome to Premium!
                            </h1>
                            <p className='text-muted-foreground'>
                                Your subscription has been activated
                                successfully. You now have access to unlimited
                                readings and premium features.
                            </p>
                        </div>

                        {/* Premium Features */}
                        <div className='space-y-3 text-left'>
                            <h3 className='font-semibold text-center'>
                                What&apos;s unlocked:
                            </h3>
                            <ul className='space-y-2 text-sm'>
                                <li className='flex items-center space-x-2'>
                                    <Sparkles className='w-4 h-4 text-primary' />
                                    <span>5,000 monthly readings</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Sparkles className='w-4 h-4 text-primary' />
                                    <span>No advertisements</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Sparkles className='w-4 h-4 text-primary' />
                                    <span>Advanced AI interpretations</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Sparkles className='w-4 h-4 text-primary' />
                                    <span>Premium card decks</span>
                                </li>
                            </ul>
                        </div>

                        {/* CTA Buttons */}
                        <div className='space-y-3'>
                            <Button
                                asChild
                                size='lg'
                                className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
                            >
                                <Link href='/reading'>
                                    Start Your First Premium Reading
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant='outline'
                                className='w-full border-border/30 hover:bg-card/20 bg-transparent'
                            >
                                <Link href='/'>Return to Home</Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    )
}

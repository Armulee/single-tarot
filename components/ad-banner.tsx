"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Clock, Zap } from "lucide-react"

interface AdBannerProps {
    onAdViewed: () => void
    onUpgrade: () => void
}

export function AdBanner({ onAdViewed, onUpgrade }: AdBannerProps) {
    const [timeLeft, setTimeLeft] = useState(5)
    const [canClose, setCanClose] = useState(false)

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanClose(true)
        }
    }, [timeLeft])

    const handleClose = () => {
        if (canClose) {
            onAdViewed()
        }
    }

    return (
        <div className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <Card className='max-w-md w-full p-6 bg-card/20 backdrop-blur-sm border-border/30 card-glow'>
                <div className='space-y-4'>
                    {/* Ad Header */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center'>
                                <Zap className='w-4 h-4 text-primary' />
                            </div>
                            <span className='text-sm font-medium'>
                                Sponsored
                            </span>
                        </div>
                        {canClose ? (
                            <Button
                                onClick={handleClose}
                                variant='ghost'
                                size='sm'
                                className='h-8 w-8 p-0 hover:bg-card/20'
                            >
                                <X className='w-4 h-4' />
                            </Button>
                        ) : (
                            <div className='flex items-center space-x-1 text-sm text-muted-foreground'>
                                <Clock className='w-4 h-4' />
                                <span>{timeLeft}s</span>
                            </div>
                        )}
                    </div>

                    {/* Mock Advertisement */}
                    <div className='text-center space-y-4'>
                        <div className='w-full h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center'>
                            <div className='text-center space-y-2'>
                                <div className='w-12 h-12 mx-auto rounded-full bg-primary/30 flex items-center justify-center'>
                                    <Zap className='w-6 h-6 text-primary' />
                                </div>
                                <p className='text-sm font-medium'>
                                    Mystical Crystals
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    Enhance your spiritual journey
                                </p>
                            </div>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                            This ad helps keep ดูดวง.ai free for everyone
                        </p>
                    </div>

                    {/* Upgrade CTA */}
                    <div className='border-t border-border/20 pt-4'>
                        <div className='text-center space-y-3'>
                            <p className='text-sm text-muted-foreground'>
                                Tired of ads?
                            </p>
                            <Button
                                onClick={onUpgrade}
                                size='sm'
                                className='bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                            >
                                Upgrade to Premium - $2.99/month
                            </Button>
                        </div>
                    </div>

                    {/* Continue Button */}
                    {canClose && (
                        <Button
                            onClick={handleClose}
                            variant='outline'
                            className='w-full border-border/30 hover:bg-card/20 bg-transparent'
                        >
                            Continue to Reading
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    )
}

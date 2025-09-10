"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, Check, LogIn } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"
import { UserProfile } from "@/components/user-profile"
import { SidebarSheet } from "./sidebar-sheet"
import { PremiumCheckout } from "@/components/stripe/premium-checkout"

export function Navbar() {
    const [open, setOpen] = useState(false)
    const [premiumOpen, setPremiumOpen] = useState(false)
    const { user, loading } = useAuth()

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 bg-card/5 backdrop-blur-sm border-b border-border/20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Left: Mobile menu button / Desktop brand */}
                    <div className='flex items-center'>
                        {/* Mobile: menu button or user profile */}
                        {!loading && user ? (
                            <UserProfile
                                variant='sidebar-trigger'
                                onClose={() => setOpen(true)}
                                className='md:hidden'
                            />
                        ) : (
                            <Button
                                variant='ghost'
                                size='icon'
                                className='md:hidden text-white hover:bg-white/10'
                                onClick={() => setOpen(true)}
                                aria-label='Open menu'
                            >
                                <Menu className='h-6 w-6' />
                            </Button>
                        )}

                        {/* Desktop: brand */}
                        <Link
                            href='/'
                            className='hidden md:flex items-center space-x-2 group px-2 py-1 rounded-md hover:bg-white/5'
                        >
                            <div className='w-8 h-8 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                                <span className='text-white font-bold text-sm'>
                                    ✦
                                </span>
                            </div>
                            <span className='font-playfair text-xl font-bold text-white group-hover:text-cosmic-purple transition-colors'>
                                ดูดวง.ai
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <Link
                            href='/reading'
                            className='text-cosmic-light hover:text-white transition-colors'
                        >
                            Reading
                        </Link>
                        <Link
                            href='/about'
                            className='text-cosmic-light hover:text-white transition-colors'
                        >
                            About
                        </Link>
                        <Link
                            href='/pricing'
                            className='text-cosmic-light hover:text-white transition-colors'
                        >
                            Pricing
                        </Link>
                        {/* User Profile for Desktop */}
                        {!loading && user && <UserProfile variant='desktop' />}
                    </div>

                    {/* Auth / CTA */}
                    <div className='flex items-center space-x-4'>
                        {!loading && user ? (
                            <PremiumCheckout />
                        ) : (
                            <Link href='/signin'>
                                <Button
                                    variant='ghost'
                                    className='text-white hover:bg-white/10'
                                >
                                    <LogIn className='w-4 h-4 mr-2' />
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile sidebar */}
            <SidebarSheet open={open} onOpenChange={setOpen} />

            {/* Premium dialog */}
            <Dialog open={premiumOpen} onOpenChange={setPremiumOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>
                            Unlock Premium
                        </DialogTitle>
                    </DialogHeader>
                    <div className='space-y-4 mt-4'>
                        <Card className='p-4 bg-card/20 border-primary/30 card-glow'>
                            <div className='text-center mb-3'>
                                <div className='text-2xl font-serif font-bold'>
                                    $2.99
                                </div>
                                <div className='text-xs text-muted-foreground'>
                                    per month
                                </div>
                            </div>
                            <ul className='space-y-2'>
                                {[
                                    "5,000 monthly readings",
                                    "Advanced AI interpretations",
                                    "Premium card decks",
                                    "No advertisements",
                                    "Priority support",
                                    "Reading history & insights",
                                    "Personalized guidance",
                                    "Exclusive cosmic themes",
                                ].map((f, i) => (
                                    <li
                                        key={`pro-${i}`}
                                        className='flex items-start gap-2 text-sm'
                                    >
                                        <Check className='w-4 h-4 text-green-400 mt-0.5 flex-shrink-0' />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Checkout CTA */}
                        <Button
                            onClick={() => setPremiumOpen(false)}
                            className='w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white rounded-full px-5 py-3 text-base shadow-[0_10px_20px_-10px_rgba(56,189,248,0.55)] ring-1 ring-white/10 card-glow'
                        >
                            Go Premium
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </nav>
    )
}

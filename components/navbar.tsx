"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
    Menu,
    Check,
    Home,
    BookOpen,
    Info,
    CreditCard,
    LogIn,
} from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export function Navbar() {
    const [open, setOpen] = useState(false)
    const [premiumOpen, setPremiumOpen] = useState(false)
    const sidebarLinks = [
        { href: "/", label: "Home", Icon: Home },
        { href: "/reading", label: "Reading", Icon: BookOpen },
        { href: "/about", label: "About", Icon: Info },
        { href: "/pricing", label: "Pricing", Icon: CreditCard },
    ] as const
    return (
        <nav className='fixed top-0 left-0 right-0 z-50 bg-card/5 backdrop-blur-sm border-b border-border/20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Left: Mobile menu button / Desktop brand */}
                    <div className='flex items-center'>
                        {/* Mobile: menu button */}
                        <Button
                            variant='ghost'
                            size='icon'
                            className='md:hidden text-white hover:bg-white/10'
                            onClick={() => setOpen(true)}
                            aria-label='Open menu'
                        >
                            <Menu className='h-6 w-6' />
                        </Button>

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
                    </div>

                    {/* Auth / CTA */}
                    <div className='flex items-center space-x-4'>
                        <Button
                            onClick={() => setPremiumOpen(true)}
                            className='inline-flex bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white rounded-full px-5 py-2 shadow-[0_10px_20px_-10px_rgba(56,189,248,0.55)] ring-1 ring-white/10 card-glow'
                        >
                            Go Premium
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar (shadcn Sheet) */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side='left'
                    className='md:hidden bg-card/95 backdrop-blur-md border-border/30 w-72 max-w-[85vw]'
                >
                    <SheetHeader>
                        <SheetTitle>
                            <Link
                                href='/'
                                onClick={() => setOpen(false)}
                                className='flex items-center space-x-2 group'
                            >
                                <div className='w-7 h-7 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                                    <span className='text-white font-bold text-xs'>
                                        ✦
                                    </span>
                                </div>
                                <span className='font-playfair text-lg font-bold text-white group-hover:text-cosmic-purple transition-colors'>
                                    ดูดวง.ai
                                </span>
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                    <nav>
                        <ul className='flex flex-col space-y-1 p-1'>
                            {sidebarLinks.map(({ href, label, Icon }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className='flex items-center gap-2 px-3 py-2 rounded-md text-cosmic-light hover:text-white hover:bg-white/10 transition-colors'
                                        onClick={() => setOpen(false)}
                                    >
                                        <Icon className='w-4 h-4' />
                                        <span>{label}</span>
                                    </Link>
                                </li>
                            ))}
                            <li className='pt-2'>
                                <Link
                                    href='/signin'
                                    className='flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white/90 border border-white/10 hover:bg-white/15 transition'
                                    onClick={() => setOpen(false)}
                                >
                                    <LogIn className='w-4 h-4' />
                                    <span>Sign In</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>

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

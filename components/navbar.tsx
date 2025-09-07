"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTarot } from "@/contexts/tarot-context"

export function Navbar() {
    const { resetReading } = useTarot()

    const handleLogoClick = () => {
        resetReading()
    }

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 bg-card/5 backdrop-blur-sm border-b border-border/20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <Link
                        href='/'
                        onClick={handleLogoClick}
                        className='flex items-center space-x-2 group'
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

                    {/* Auth Buttons */}
                    <div className='flex items-center space-x-4'>
                        <Link href='/signin'>
                            <Button
                                variant='ghost'
                                className='text-cosmic-light hover:text-white hover:bg-cosmic-purple/20'
                            >
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

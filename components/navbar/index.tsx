"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu } from "lucide-react"
import { SidebarSheet } from "./sidebar-sheet"

export function Navbar() {
    const [open, setOpen] = useState(false)

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
                                Asking Fate
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
                            href='/support'
                            className='text-cosmic-light hover:text-white transition-colors'
                        >
                            Support
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className='flex items-center space-x-4'>
                        <Button
                            asChild
                            className='inline-flex bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white rounded-full px-5 py-2 shadow-[0_10px_20px_-10px_rgba(56,189,248,0.55)] ring-1 ring-white/10 card-glow'
                        >
                            <Link href='/reading'>
                                Start Reading
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar */}
            <SidebarSheet open={open} onOpenChange={setOpen} />
        </nav>
    )
}

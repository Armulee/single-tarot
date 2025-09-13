"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, ChevronDown, ChevronUp } from "lucide-react"
import { SidebarSheet } from "./sidebar-sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
    const [open, setOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

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

                    {/* CTA Dropdown */}
                    <div className='flex items-center space-x-4'>
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='ghost'
                                    className='inline-flex items-center space-x-2 text-white hover:bg-white/10 px-4 py-2 rounded-md transition-colors'
                                >
                                    <span>Tarot</span>
                                    {dropdownOpen ? (
                                        <ChevronUp className='h-4 w-4' />
                                    ) : (
                                        <ChevronDown className='h-4 w-4' />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align='end'
                                className='w-48 bg-card/95 backdrop-blur-md border-border/30'
                            >
                                <DropdownMenuItem asChild>
                                    <Link
                                        href='/reading'
                                        className='flex items-center px-3 py-2 text-sm cursor-pointer'
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Tarot
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href='/horoscope'
                                        className='flex items-center px-3 py-2 text-sm cursor-pointer'
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Horoscope
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href='/numerology'
                                        className='flex items-center px-3 py-2 text-sm cursor-pointer'
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Numerology
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href='/lucky-colors'
                                        className='flex items-center px-3 py-2 text-sm cursor-pointer'
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Lucky Colors
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar */}
            <SidebarSheet open={open} onOpenChange={setOpen} />
        </nav>
    )
}

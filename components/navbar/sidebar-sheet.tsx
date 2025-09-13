"use client"

import Link from "next/link"
import { Home, BookOpen, Info, HelpCircle } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

interface SidebarSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SidebarSheet({ open, onOpenChange }: SidebarSheetProps) {
    const sidebarLinks = [
        { href: "/", label: "Home", Icon: Home },
        { href: "/reading", label: "Reading", Icon: BookOpen },
        { href: "/about", label: "About", Icon: Info },
        { href: "/support", label: "Support", Icon: HelpCircle },
    ] as const

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side='left'
                className='md:hidden bg-card/95 backdrop-blur-md border-border/30 w-72 max-w-[85vw]'
            >
                <SheetHeader>
                    <SheetTitle>
                        <Link
                            href='/'
                            onClick={() => onOpenChange(false)}
                            className='flex items-center space-x-2 group'
                        >
                            <div className='w-7 h-7 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                                <span className='text-white font-bold text-xs'>
                                    ✦
                                </span>
                            </div>
                            <span className='font-playfair text-lg font-bold text-white group-hover:text-cosmic-purple transition-colors'>
                                Asking Fate
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
                                    onClick={() => onOpenChange(false)}
                                >
                                    <Icon className='w-4 h-4' />
                                    <span>{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}

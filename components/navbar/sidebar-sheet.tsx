"use client"

import Link from "next/link"
import { Home, BookOpen, Info, HelpCircle, FileText, Shield, Mail } from "lucide-react"
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

    const footerLinks = [
        { href: "/support", label: "Support", Icon: HelpCircle },
        { href: "/privacy-policy", label: "Privacy Policy", Icon: Shield },
        { href: "/terms-of-service", label: "Terms of Service", Icon: FileText },
        { href: "/contact", label: "Contact", Icon: Mail },
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
                                    onClick={() => onOpenChange(false)}
                                >
                                    <Icon className='w-4 h-4' />
                                    <span>{label}</span>
                                </Link>
                            </li>
                        ))}
                        
                        {/* Footer Links Section */}
                        <li className='pt-4 border-t border-white/10 mt-4'>
                            <div className='px-3 py-2'>
                                <h3 className='text-xs font-semibold text-white/60 uppercase tracking-wider mb-2'>
                                    Legal & Support
                                </h3>
                            </div>
                        </li>
                        {footerLinks.map(({ href, label, Icon }) => (
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

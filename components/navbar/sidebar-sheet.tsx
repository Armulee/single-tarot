"use client"

import Link from "next/link"
import { Home, BookOpen, Info, CreditCard, LogIn, HelpCircle } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"

interface SidebarSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SidebarSheet({ open, onOpenChange }: SidebarSheetProps) {
    const { user, loading } = useAuth()

    const sidebarLinks = [
        { href: "/", label: "Home", Icon: Home },
        { href: "/reading", label: "Reading", Icon: BookOpen },
        { href: "/about", label: "About", Icon: Info },
        { href: "/pricing", label: "Pricing", Icon: CreditCard },
        { href: "/support", label: "Support", Icon: HelpCircle },
    ] as const

    const getUserInitials = () => {
        if (!user) return "U"
        const name =
            user.user_metadata?.name || user.email?.split("@")[0] || "U"
        return name.charAt(0).toUpperCase()
    }

    const getUserName = () => {
        if (!user) return "User"
        return user.user_metadata?.name || user.email?.split("@")[0] || "User"
    }

    const getUserAvatar = () => {
        if (!user) return null
        return user.user_metadata?.avatar_url || user.user_metadata?.picture
    }

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
                        <li className='pt-2'>
                            {!loading && user ? (
                                <UserProfileDropdown
                                    onClose={() => onOpenChange(false)}
                                >
                                    <div className='flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer'>
                                        <Avatar className='w-10 h-10'>
                                            <AvatarImage
                                                src={getUserAvatar()}
                                                alt={getUserName()}
                                            />
                                            <AvatarFallback className='bg-primary/20 text-primary font-semibold'>
                                                {getUserInitials()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm font-medium text-white truncate'>
                                                {getUserName()}
                                            </p>
                                            <p className='text-xs text-white/70 truncate'>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </UserProfileDropdown>
                            ) : (
                                <Link
                                    href='/signin'
                                    className='flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white/90 border border-white/10 hover:bg-white/15 transition'
                                    onClick={() => onOpenChange(false)}
                                >
                                    <LogIn className='w-4 h-4' />
                                    <span>Sign In</span>
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}

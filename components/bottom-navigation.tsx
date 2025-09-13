"use client"

import Link from "next/link"
import { useState } from "react"
import { Home, BookOpen, Info, MoreHorizontal, HelpCircle, FileText, Shield, Mail } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname } from "next/navigation"
import { useTarot } from "@/contexts/tarot-context"

export function BottomNavigation() {
    const [moreOpen, setMoreOpen] = useState(false)
    const pathname = usePathname()
    const { question } = useTarot()

    const mainNavItems = [
        { href: "/", label: "Home", Icon: Home },
        { href: "/reading", label: "Reading", Icon: BookOpen },
        { href: "/about", label: "About", Icon: Info },
    ] as const

    const moreItems = [
        { href: "/support", label: "Support", Icon: HelpCircle },
        { href: "/privacy-policy", label: "Privacy Policy", Icon: Shield },
        { href: "/terms-of-service", label: "Terms of Service", Icon: FileText },
        { href: "/contact", label: "Contact", Icon: Mail },
    ] as const

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(href)
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/20 md:hidden">
            <div className="flex items-center justify-around px-2 py-1">
                {/* Main Navigation Items */}
                {mainNavItems.map(({ href, label, Icon }) => {
                    const isReadingDisabled = href === "/reading" && !question.trim()
                    
                    if (isReadingDisabled) {
                        return (
                            <div
                                key={href}
                                className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors text-muted-foreground/50 cursor-not-allowed"
                                title="Please ask a question first"
                            >
                                <Icon className="w-5 h-5 mb-1" />
                                <span className="text-xs font-medium">{label}</span>
                            </div>
                        )
                    }
                    
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                                isActive(href)
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Icon className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">{label}</span>
                        </Link>
                    )
                })}

                {/* More Button with Popover */}
                <Popover open={moreOpen} onOpenChange={setMoreOpen}>
                    <PopoverTrigger asChild>
                        <button
                            className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                                moreOpen
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <MoreHorizontal className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">More</span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent 
                        side="top" 
                        align="center"
                        className="w-56 p-2 bg-card/95 backdrop-blur-md border-border/30"
                    >
                        <div className="space-y-1">
                            <div className="px-3 py-2">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Legal & Support
                                </h3>
                            </div>
                            {moreItems.map(({ href, label, Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMoreOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-card/50 transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </nav>
    )
}
"use client"

import Link from "next/link"
import { useState } from "react"
import { Home, BookOpen, Info, MoreHorizontal, HelpCircle, FileText, Shield, Mail, ChevronUp, ChevronDown } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname } from "next/navigation"
import { useTarot } from "@/contexts/tarot-context"

export function BottomNavigation() {
    const [isExpanded, setIsExpanded] = useState(false)
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

    // Find the currently active item
    const activeItem = mainNavItems.find(item => isActive(item.href)) || mainNavItems[0]

    const handleToggle = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <nav className="fixed bottom-0 left-0 z-50 md:hidden">
            <div className="relative">
                {/* Container with smooth width transition */}
                <div className={`bg-card/5 backdrop-blur-sm border border-border/20 rounded-full transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? 'p-2' : 'p-3'
                }`}>
                    <div className={`flex items-center transition-all duration-500 ease-in-out ${
                        isExpanded ? 'gap-2' : 'gap-0'
                    }`}>
                        {/* Active icon - only visible when collapsed */}
                        {!isExpanded && (
                            <button
                                onClick={handleToggle}
                                className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:bg-card/10 hover:scale-110"
                                title={`${activeItem.label} - Click to expand navigation`}
                            >
                                <activeItem.Icon className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]" />
                            </button>
                        )}

                        {/* Navigation items - animated reveal */}
                        <div className={`flex items-center gap-2 transition-all duration-500 ease-in-out ${
                            isExpanded 
                                ? 'opacity-100 translate-x-0 max-w-screen' 
                                : 'opacity-0 -translate-x-4 max-w-0'
                        }`}>
                            {/* Main navigation items */}
                            {mainNavItems.map(({ href, label, Icon }, index) => {
                                const isReadingDisabled = href === "/reading" && !question.trim()
                                
                                if (isReadingDisabled) {
                                    return (
                                        <div
                                            key={href}
                                            className={`flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-300 text-muted-foreground/25 cursor-not-allowed ${
                                                isExpanded 
                                                    ? 'opacity-100 translate-y-0' 
                                                    : 'opacity-0 translate-y-2'
                                            }`}
                                            style={{
                                                transitionDelay: isExpanded ? `${index * 100}ms` : '0ms'
                                            }}
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
                                        onClick={() => setIsExpanded(false)}
                                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-300 hover:scale-105 ${
                                            isActive(href)
                                                ? "text-cyan-300 bg-card/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-card/10"
                                        } ${
                                            isExpanded 
                                                ? 'opacity-100 translate-y-0' 
                                                : 'opacity-0 translate-y-2'
                                        }`}
                                        style={{
                                            transitionDelay: isExpanded ? `${index * 100}ms` : '0ms'
                                        }}
                                    >
                                        <Icon className={`w-5 h-5 mb-1 transition-all duration-300 ${
                                            isActive(href)
                                                ? "drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]"
                                                : ""
                                        }`} />
                                        <span className="text-xs font-medium">{label}</span>
                                    </Link>
                                )
                            })}

                            {/* More button with popover */}
                            <Popover open={moreOpen} onOpenChange={setMoreOpen}>
                                <PopoverTrigger asChild>
                                    <button
                                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-300 hover:scale-105 ${
                                            moreOpen
                                                ? "text-primary bg-card/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-card/10"
                                        } ${
                                            isExpanded 
                                                ? 'opacity-100 translate-y-0' 
                                                : 'opacity-0 translate-y-2'
                                        }`}
                                        style={{
                                            transitionDelay: isExpanded ? `${mainNavItems.length * 100}ms` : '0ms'
                                        }}
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
                                        {moreItems.map(({ href, label, Icon }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={() => {
                                                    setMoreOpen(false)
                                                    setIsExpanded(false)
                                                }}
                                                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-card/50 transition-colors"
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span>{label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            {/* Collapse button */}
                            <button
                                onClick={handleToggle}
                                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-card/10 hover:scale-110 ml-2 ${
                                    isExpanded 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-2'
                                }`}
                                style={{
                                    transitionDelay: isExpanded ? `${(mainNavItems.length + 1) * 100}ms` : '0ms'
                                }}
                                title="Collapse navigation"
                            >
                                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                                    isExpanded ? 'rotate-90' : 'rotate-0'
                                }`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
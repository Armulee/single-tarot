"use client"

import Link from "next/link"
import { useState } from "react"
import { Home, BookOpen, Info, HelpCircle, ChevronUp, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTarot } from "@/contexts/tarot-context"

export function BottomNavigation() {
    const [isExpanded, setIsExpanded] = useState(false)
    const pathname = usePathname()
    const { question } = useTarot()

    const navItems = [
        { href: "/", label: "Home", Icon: Home },
        { href: "/reading", label: "Reading", Icon: BookOpen },
        { href: "/about", label: "About", Icon: Info },
        { href: "/support", label: "Support", Icon: HelpCircle },
    ] as const

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(href)
    }

    // Find the currently active item
    const activeItem = navItems.find(item => isActive(item.href)) || navItems[0]

    const handleToggle = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <nav className="fixed bottom-0 left-0 z-50 md:hidden">
            <div className="relative">
                {/* Collapsed state - shows only active icon */}
                {!isExpanded && (
                    <div className="bg-card/5 backdrop-blur-sm border border-border/20 rounded-l-full rounded-r-none p-2">
                        <button
                            onClick={handleToggle}
                            className="flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-300 hover:bg-card/10"
                            title={`${activeItem.label} - Click to expand navigation`}
                        >
                            <activeItem.Icon className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]" />
                        </button>
                    </div>
                )}

                {/* Expanded state - shows all 4 navigation items */}
                {isExpanded && (
                    <div className="bg-card/5 backdrop-blur-sm border border-border/20 rounded-l-full rounded-r-none p-2 space-y-1">
                        {/* Toggle button */}
                        <button
                            onClick={handleToggle}
                            className="flex items-center justify-center w-full py-2 px-3 rounded-full transition-all duration-300 hover:bg-card/10 mb-2"
                            title="Collapse navigation"
                        >
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>

                        {/* Navigation items */}
                        {navItems.map(({ href, label, Icon }) => {
                            const isReadingDisabled = href === "/reading" && !question.trim()
                            
                            if (isReadingDisabled) {
                                return (
                                    <div
                                        key={href}
                                        className="flex flex-col items-center justify-center py-2 px-3 rounded-full transition-colors text-muted-foreground/25 cursor-not-allowed"
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
                                    className={`flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-300 ${
                                        isActive(href)
                                            ? "text-cyan-300 bg-card/20"
                                            : "text-muted-foreground hover:text-foreground hover:bg-card/10"
                                    }`}
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
                    </div>
                )}
            </div>
        </nav>
    )
}
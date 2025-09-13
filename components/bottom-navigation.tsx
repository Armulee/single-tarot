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
                {/* Container with smooth width transition */}
                <div className={`bg-card/5 backdrop-blur-sm border border-border/20 rounded-full transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? 'p-2' : 'p-3'
                }`}>
                    <div className={`flex items-center transition-all duration-500 ease-in-out ${
                        isExpanded ? 'gap-2' : 'gap-0'
                    }`}>
                        {/* Active icon - always visible */}
                        <button
                            onClick={handleToggle}
                            className={`flex items-center justify-center rounded-full transition-all duration-300 hover:bg-card/10 hover:scale-110 ${
                                isExpanded ? 'w-8 h-8' : 'w-12 h-12'
                            }`}
                            title={`${activeItem.label} - Click to ${isExpanded ? 'collapse' : 'expand'} navigation`}
                        >
                            <activeItem.Icon className={`text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.6)] transition-all duration-300 ${
                                isExpanded ? 'w-4 h-4' : 'w-6 h-6'
                            }`} />
                        </button>

                        {/* Navigation items - animated reveal */}
                        <div className={`flex items-center gap-2 transition-all duration-500 ease-in-out ${
                            isExpanded 
                                ? 'opacity-100 translate-x-0 max-w-screen' 
                                : 'opacity-0 -translate-x-4 max-w-0'
                        }`}>
                            {navItems.map(({ href, label, Icon }, index) => {
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

                            {/* Collapse button - animated reveal */}
                            <button
                                onClick={handleToggle}
                                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-card/10 hover:scale-110 ml-2 ${
                                    isExpanded 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-2'
                                }`}
                                style={{
                                    transitionDelay: isExpanded ? `${navItems.length * 100}ms` : '0ms'
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
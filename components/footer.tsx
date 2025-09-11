"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Footer() {
    const router = useRouter()
    const handleBrandClick = () => router.push("/")
    return (
        <footer className='w-full border-t border-border/20 bg-card/5 backdrop-blur-sm'>
            <div className='max-w-6xl mx-auto px-6 pt-4 pb-12'>
                <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
                    <button
                        type='button'
                        onClick={handleBrandClick}
                        className='flex items-center space-x-2 group'
                    >
                        <div className='w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center'>
                            <span className='text-primary font-serif text-sm group-hover:scale-110 transition-transform'>
                                ✦
                            </span>
                        </div>
                        <span className='font-serif font-semibold group-hover:text-primary transition-colors'>
                            ดูดวง.ai
                        </span>
                    </button>
                    <div className='flex space-x-6 text-sm text-muted-foreground'>
                        <Link
                            href='/support'
                            className='hover:text-foreground transition-colors'
                        >
                            Support
                        </Link>
                        <Link
                            href='/privacy'
                            className='hover:text-foreground transition-colors'
                        >
                            Privacy
                        </Link>
                        <Link
                            href='/terms'
                            className='hover:text-foreground transition-colors'
                        >
                            Terms
                        </Link>
                        <Link
                            href='/contact'
                            className='hover:text-foreground transition-colors'
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

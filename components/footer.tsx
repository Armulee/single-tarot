import Link from "next/link"

export default function Footer() {
    return (
        <footer className='w-full border-t border-border/20 bg-card/5 backdrop-blur-sm'>
            <div className='max-w-6xl mx-auto px-6 py-8'>
                <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
                    <div className='flex items-center space-x-2'>
                        <div className='w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center'>
                            <span className='text-primary font-serif text-sm'>
                                ✦
                            </span>
                        </div>
                        <span className='font-serif font-semibold'>
                            ดูดวง.ai
                        </span>
                    </div>
                    <div className='flex space-x-6 text-sm text-muted-foreground'>
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

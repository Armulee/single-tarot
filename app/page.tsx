"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TypewriterText } from "@/components/typewriter-text"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTarot } from "@/contexts/tarot-context"
import { Send } from "lucide-react"

export default function HomePage() {
    const [question, setQuestion] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const router = useRouter()
    const { setQuestion: setContextQuestion, setCurrentStep } = useTarot()

    const handleStartReading = () => {
        if (question.trim()) {
            setContextQuestion(question)
            setCurrentStep("reading-type")
            router.push("/reading")
        }
    }

    // Auto-grow textarea like ChatGPT
    useEffect(() => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`

        // Update border radius based on content
        const hasMultipleLines = el.scrollHeight > 80
        if (hasMultipleLines) {
            el.classList.add("!rounded-2xl")
        } else {
            el.classList.remove("!rounded-2xl")
        }
    }, [question])

    return (
        <div className='min-[calc(100dvh-65px)] relative overflow-hidden'>
            {/* Hero Section */}
            <section className='relative z-10 flex flex-col items-center justify-center h-[calc(100vh-180px)] px-6 text-center'>
                <div className='max-w-4xl mx-auto space-y-8'>
                    {/* Main Heading */}
                    <div className='space-y-4'>
                        <h1 className='font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance h-20 sm:h-24 md:h-28 lg:h-32'>
                            <TypewriterText
                                text='Ask me anything'
                                speed={60}
                                className='text-white'
                            />
                            <br />
                            <TypewriterText
                                text='about your destiny'
                                speed={60}
                                delay={60 * "Ask me anything".length}
                                className='text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text'
                            />
                        </h1>
                    </div>

                    {/* Question Input */}
                    <div className='flex flex-col gap-6 justify-center items-center pt-8 max-w-md mx-auto'>
                        <div className='space-y-3'>
                            <Label
                                htmlFor='question'
                                className='text-lg font-serif text-foreground'
                            >
                                Your question
                            </Label>
                            <div className='relative sm:w-96 md:w-xl lg:w-2xl w-84'>
                                <Textarea
                                    id='question'
                                    ref={textareaRef}
                                    rows={1}
                                    value={question}
                                    onChange={(e) =>
                                        setQuestion(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            if (
                                                e.shiftKey ||
                                                e.ctrlKey ||
                                                e.metaKey
                                            ) {
                                                return
                                            }
                                            e.preventDefault()
                                            if (question.trim()) {
                                                handleStartReading()
                                            }
                                        }
                                    }}
                                    className='pr-14 px-4 py-4 text-lg bg-card/10 bg-primary/30 backdrop-blur-sm border-border/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60 cosmic-input resize-none overflow-hidden min-h-14 rounded-full'
                                />
                                <Button
                                    onClick={handleStartReading}
                                    disabled={!question.trim()}
                                    size='lg'
                                    variant='ghost'
                                    className={`absolute right-2 bg-transparent border-0 text-indigo-400 hover:bg-transparent text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${
                                        question.includes("\n") ||
                                        (textareaRef.current &&
                                            textareaRef.current.scrollHeight >
                                                textareaRef.current
                                                    .clientHeight)
                                            ? "bottom-2 top-auto"
                                            : "top-1/2 -translate-y-1/2"
                                    }`}
                                >
                                    <Send />
                                </Button>

                                <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100' />
                            </div>
                        </div>

                        <Button
                            asChild
                            variant='ghost'
                            size='lg'
                            className='border-border/30 hover:bg-card/20 backdrop-blur-sm px-8 py-6 text-lg bg-transparent'
                        >
                            <Link href='/about'>Learn More</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

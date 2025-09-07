"use client"
import { Send } from "lucide-react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTarot } from "@/contexts/tarot-context"

export default function QuestionInput({
    label = "Your question",
    placeholder,
    defaultValue,
}: {
    label?: string
    placeholder?: string
    defaultValue?: string
}) {
    const pathname = usePathname()
    const [question, setQuestion] = useState("")
    const [hasMultipleLines, setHasMultipleLines] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const router = useRouter()
    const { setQuestion: setContextQuestion, setCurrentStep } = useTarot()

    const handleStartReading = () => {
        const value = (question || "").trim() || (defaultValue || "").trim()
        if (value) {
            setContextQuestion(value)
            setCurrentStep("reading-type")
            if (pathname !== "/reading") {
                router.push("/reading")
            }
        }
    }

    useEffect(() => {
        const el = textareaRef.current
        if (!el) return

        // Update border radius based on content
        const hasMultipleLines = el.scrollHeight > 79
        setHasMultipleLines(hasMultipleLines)
    }, [question])

    return (
        <div className='max-w-2xl m-auto mb-6 text-left'>
            <Label htmlFor='follow-up-question' className='block mb-2 text-lg'>
                {label}
            </Label>
            <div className='relative group'>
                <div className='pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120%_120%_at_0%_0%,rgba(99,102,241,0.18),rgba(168,85,247,0.12)_35%,rgba(34,211,238,0.10)_70%,transparent_80%)] blur-xl opacity-90 group-focus-within:opacity-0 transition-opacity' />
                <Textarea
                    id='follow-up-question'
                    name='follow-up-question'
                    rows={3}
                    ref={textareaRef}
                    placeholder={placeholder}
                    className='relative z-10 w-full pl-5 pr-15 py-5 text-white placeholder:text-white/70 bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-cyan-500/15 backdrop-blur-xl border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/40 rounded-2xl resize-y shadow-[0_10px_30px_-10px_rgba(56,189,248,0.35)] resize-none'
                    onChange={(e) => setQuestion(e.target.value)}
                    defaultValue={defaultValue}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleStartReading()
                        }
                    }}
                />
                <Button
                    onClick={handleStartReading}
                    disabled={!question.trim() && !defaultValue}
                    size='lg'
                    variant='ghost'
                    className={`absolute right-2 z-20 bg-transparent hover:bg-transparent border-0 text-lg disabled:opacity-30 disabled:cursor-not-allowed text-indigo-300 hover:text-white ${
                        hasMultipleLines
                            ? "bottom-2 top-auto"
                            : "top-1/2 -translate-y-1/2"
                    }`}
                >
                    {/* Gradient aura behind icon by default; hides on hover */}
                    <span className='pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/50 via-purple-400/50 to-cyan-400/50 opacity-80 hover:opacity-0' />
                    <Send className='relative z-10 w-5 h-5 drop-shadow-sm' />
                </Button>
            </div>
        </div>
    )
}

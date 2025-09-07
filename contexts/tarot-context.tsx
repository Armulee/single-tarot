"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

export type ReadingType = "simple" | "intermediate" | "advanced"

export interface TarotCard {
    id: number
    name: string
    image: string
    meaning: string
}

export interface TarotContextType {
    // Question state
    question: string
    setQuestion: (question: string) => void

    // Reading type state
    readingType: ReadingType | null
    setReadingType: (type: ReadingType) => void

    // Selected cards state
    selectedCards: TarotCard[]
    setSelectedCards: (cards: TarotCard[]) => void

    // Current step in the reading process
    currentStep:
        | "question"
        | "reading-type"
        | "card-selection"
        | "ad-viewing"
        | "interpretation"
    setCurrentStep: (
        step:
            | "question"
            | "reading-type"
            | "card-selection"
            | "ad-viewing"
            | "interpretation"
    ) => void

    // Interpretation result
    interpretation: string | null
    setInterpretation: (interpretation: string) => void

    // User state
    isPremium: boolean
    setIsPremium: (premium: boolean) => void

    // Reset function
    resetReading: () => void
}

const TarotContext = createContext<TarotContextType | undefined>(undefined)

export function TarotProvider({ children }: { children: ReactNode }) {
    const [question, setQuestion] = useState("")
    const [readingType, setReadingType] = useState<ReadingType | null>(null)
    const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
    const [currentStep, setCurrentStep] = useState<
        | "question"
        | "reading-type"
        | "card-selection"
        | "ad-viewing"
        | "interpretation"
    >("question")
    const [interpretation, setInterpretation] = useState<string | null>(null)
    const [isPremium, setIsPremium] = useState(false)
    const pathname = usePathname()

    const STORAGE_KEY = "reading-state-v1"

    const resetReading = () => {
        setQuestion("")
        setReadingType(null)
        setSelectedCards([])
        setCurrentStep("reading-type")
        setInterpretation(null)
    }

    // Restore reading state when entering /reading
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!pathname || !pathname.startsWith("/reading")) return
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return
            const data = JSON.parse(raw) as {
                question?: string
                readingType?: ReadingType | null
                selectedCards?: TarotCard[]
                currentStep?: TarotContextType["currentStep"]
                interpretation?: string | null
            }
            if (data.question !== undefined) setQuestion(data.question)
            if (data.readingType !== undefined)
                setReadingType(data.readingType ?? null)
            if (Array.isArray(data.selectedCards))
                setSelectedCards(data.selectedCards)
            if (data.currentStep) setCurrentStep(data.currentStep)
            if (data.interpretation !== undefined)
                setInterpretation(data.interpretation ?? null)
        } catch {
            // ignore corrupt storage
        }
    }, [pathname])

    // Persist reading state while on /reading
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!pathname || !pathname.startsWith("/reading")) return
        try {
            const payload = JSON.stringify({
                question,
                readingType,
                selectedCards,
                currentStep,
                interpretation,
            })
            localStorage.setItem(STORAGE_KEY, payload)
        } catch {
            // ignore quota errors
        }
    }, [
        question,
        readingType,
        selectedCards,
        currentStep,
        interpretation,
        pathname,
    ])

    // Clear reading state when leaving /reading
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!pathname) return
        if (!pathname.startsWith("/reading")) {
            try {
                localStorage.removeItem(STORAGE_KEY)
            } catch {}
            resetReading()
        }
    }, [pathname])

    return (
        <TarotContext.Provider
            value={{
                question,
                setQuestion,
                readingType,
                setReadingType,
                selectedCards,
                setSelectedCards,
                currentStep,
                setCurrentStep,
                interpretation,
                setInterpretation,
                isPremium,
                setIsPremium,
                resetReading,
            }}
        >
            {children}
        </TarotContext.Provider>
    )
}

export function useTarot() {
    const context = useContext(TarotContext)
    if (context === undefined) {
        throw new Error("useTarot must be used within a TarotProvider")
    }
    return context
}

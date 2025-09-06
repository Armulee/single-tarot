"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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
    >("reading-type")
    const [interpretation, setInterpretation] = useState<string | null>(null)
    const [isPremium, setIsPremium] = useState(false)

    const resetReading = () => {
        setQuestion("")
        setReadingType(null)
        setSelectedCards([])
        setCurrentStep("reading-type")
        setInterpretation(null)
    }

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

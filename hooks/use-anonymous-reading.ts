"use client"

import { useEffect, useState } from "react"
import { useAuth } from "./use-auth"
import { useReadingHistory } from "@/contexts/reading-history-context"
import { TarotCard } from "@/contexts/tarot-context"

interface AnonymousReading {
    question: string
    selectedCards: TarotCard[]
    interpretation: string
    readingType: string
    createdAt: string
}

const ANONYMOUS_READING_KEY = "anonymous-reading"

export function useAnonymousReading() {
    const { user } = useAuth()
    const { saveReading } = useReadingHistory()
    const [anonymousReading, setAnonymousReading] = useState<AnonymousReading | null>(null)

    // Load anonymous reading from localStorage
    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            const stored = localStorage.getItem(ANONYMOUS_READING_KEY)
            if (stored) {
                const reading = JSON.parse(stored) as AnonymousReading
                setAnonymousReading(reading)
            }
        } catch (error) {
            console.error("Failed to load anonymous reading:", error)
        }
    }, [])

    // Save anonymous reading to localStorage
    const saveAnonymousReading = (reading: Omit<AnonymousReading, 'createdAt'>) => {
        if (typeof window === "undefined") return

        const readingWithTimestamp: AnonymousReading = {
            ...reading,
            createdAt: new Date().toISOString(),
        }

        try {
            localStorage.setItem(ANONYMOUS_READING_KEY, JSON.stringify(readingWithTimestamp))
            setAnonymousReading(readingWithTimestamp)
        } catch (error) {
            console.error("Failed to save anonymous reading:", error)
        }
    }

    // Clear anonymous reading from localStorage
    const clearAnonymousReading = () => {
        if (typeof window === "undefined") return

        try {
            localStorage.removeItem(ANONYMOUS_READING_KEY)
            setAnonymousReading(null)
        } catch (error) {
            console.error("Failed to clear anonymous reading:", error)
        }
    }

    // Migrate anonymous reading to user account when user logs in
    useEffect(() => {
        if (user && anonymousReading) {
            // Save the anonymous reading to the user's account
            saveReading({
                question: anonymousReading.question,
                selectedCards: anonymousReading.selectedCards,
                interpretation: anonymousReading.interpretation,
                readingType: anonymousReading.readingType,
            })

            // Clear the anonymous reading
            clearAnonymousReading()
        }
    }, [user, anonymousReading, saveReading])

    return {
        anonymousReading,
        saveAnonymousReading,
        clearAnonymousReading,
        hasAnonymousReading: !!anonymousReading,
    }
}
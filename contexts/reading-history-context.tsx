"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import { TarotCard } from "./tarot-context"

export interface ReadingHistoryItem {
    id: string
    question: string
    selectedCards: TarotCard[]
    interpretation: string
    readingType: string
    createdAt: string
    followUpReadings?: FollowUpReading[]
}

export interface FollowUpReading {
    id: string
    question: string
    selectedCards: TarotCard[]
    interpretation: string
    createdAt: string
}

export interface ReadingHistoryContextType {
    readings: ReadingHistoryItem[]
    loading: boolean
    error: string | null
    saveReading: (reading: Omit<ReadingHistoryItem, 'id' | 'createdAt'>) => Promise<string>
    saveFollowUpReading: (parentId: string, followUp: Omit<FollowUpReading, 'id' | 'createdAt'>) => Promise<void>
    deleteReading: (readingId: string) => Promise<void>
    refreshReadings: () => Promise<void>
}

const ReadingHistoryContext = createContext<ReadingHistoryContextType | undefined>(undefined)

export function ReadingHistoryProvider({ children }: { children: ReactNode }) {
    const [readings, setReadings] = useState<ReadingHistoryItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const fetchReadings = async () => {
        if (!user) {
            setReadings([])
            return
        }

        setLoading(true)
        setError(null)

        try {
            // Fetch main readings
            const { data: readingsData, error: readingsError } = await supabase
                .from('reading_history')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (readingsError) throw readingsError

            // Fetch follow-up readings for each main reading
            const readingsWithFollowUps = await Promise.all(
                (readingsData || []).map(async (reading) => {
                    const { data: followUpsData, error: followUpsError } = await supabase
                        .from('follow_up_readings')
                        .select('*')
                        .eq('parent_reading_id', reading.id)
                        .order('created_at', { ascending: true })

                    if (followUpsError) throw followUpsError

                    return {
                        id: reading.id,
                        question: reading.question,
                        selectedCards: reading.selected_cards as TarotCard[],
                        interpretation: reading.interpretation,
                        readingType: reading.reading_type,
                        createdAt: reading.created_at,
                        followUpReadings: (followUpsData || []).map(followUp => ({
                            id: followUp.id,
                            question: followUp.question,
                            selectedCards: followUp.selected_cards as TarotCard[],
                            interpretation: followUp.interpretation,
                            createdAt: followUp.created_at,
                        }))
                    }
                })
            )

            setReadings(readingsWithFollowUps)
        } catch (err) {
            console.error('Error fetching readings:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch readings')
        } finally {
            setLoading(false)
        }
    }

    const saveReading = async (reading: Omit<ReadingHistoryItem, 'id' | 'createdAt'>): Promise<string> => {
        if (!user) throw new Error('User not authenticated')

        try {
            const { data, error } = await supabase
                .from('reading_history')
                .insert({
                    user_id: user.id,
                    question: reading.question,
                    selected_cards: reading.selectedCards,
                    interpretation: reading.interpretation,
                    reading_type: reading.readingType,
                })
                .select()
                .single()

            if (error) throw error

            // Add to local state
            const newReading: ReadingHistoryItem = {
                id: data.id,
                question: data.question,
                selectedCards: data.selected_cards as TarotCard[],
                interpretation: data.interpretation,
                readingType: data.reading_type,
                createdAt: data.created_at,
                followUpReadings: []
            }

            setReadings(prev => [newReading, ...prev])
            return data.id
        } catch (err) {
            console.error('Error saving reading:', err)
            setError(err instanceof Error ? err.message : 'Failed to save reading')
            throw err
        }
    }

    const saveFollowUpReading = async (parentId: string, followUp: Omit<FollowUpReading, 'id' | 'createdAt'>) => {
        if (!user) return

        try {
            const { data, error } = await supabase
                .from('follow_up_readings')
                .insert({
                    parent_reading_id: parentId,
                    question: followUp.question,
                    selected_cards: followUp.selectedCards,
                    interpretation: followUp.interpretation,
                })
                .select()
                .single()

            if (error) throw error

            // Update local state
            const newFollowUp: FollowUpReading = {
                id: data.id,
                question: data.question,
                selectedCards: data.selected_cards as TarotCard[],
                interpretation: data.interpretation,
                createdAt: data.created_at,
            }

            setReadings(prev => prev.map(reading => 
                reading.id === parentId 
                    ? { ...reading, followUpReadings: [...(reading.followUpReadings || []), newFollowUp] }
                    : reading
            ))
        } catch (err) {
            console.error('Error saving follow-up reading:', err)
            setError(err instanceof Error ? err.message : 'Failed to save follow-up reading')
        }
    }

    const deleteReading = async (readingId: string) => {
        if (!user) return

        try {
            const { error } = await supabase
                .from('reading_history')
                .delete()
                .eq('id', readingId)
                .eq('user_id', user.id)

            if (error) throw error

            // Remove from local state
            setReadings(prev => prev.filter(reading => reading.id !== readingId))
        } catch (err) {
            console.error('Error deleting reading:', err)
            setError(err instanceof Error ? err.message : 'Failed to delete reading')
        }
    }

    const refreshReadings = async () => {
        await fetchReadings()
    }

    // Fetch readings when user changes
    useEffect(() => {
        fetchReadings()
    }, [user])

    return (
        <ReadingHistoryContext.Provider
            value={{
                readings,
                loading,
                error,
                saveReading,
                saveFollowUpReading,
                deleteReading,
                refreshReadings,
            }}
        >
            {children}
        </ReadingHistoryContext.Provider>
    )
}

export function useReadingHistory() {
    const context = useContext(ReadingHistoryContext)
    if (context === undefined) {
        throw new Error('useReadingHistory must be used within a ReadingHistoryProvider')
    }
    return context
}
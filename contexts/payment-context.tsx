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

export interface PaymentHistoryItem {
    id: string
    payment_intent_id: string
    subscription_id: string | null
    amount: number
    currency: string
    status: string
    description: string | null
    created_at: string
}

export interface PaymentContextType {
    paymentHistory: PaymentHistoryItem[]
    loading: boolean
    error: string | null
    refreshPaymentHistory: () => Promise<void>
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: ReactNode }) {
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const fetchPaymentHistory = async () => {
        if (!user) {
            setPaymentHistory([])
            return
        }

        setLoading(true)
        setError(null)

        try {
            const { data, error } = await supabase
                .from("payment_history")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })

            if (error) throw error

            setPaymentHistory(data || [])
        } catch (err) {
            console.error("Error fetching payment history:", err)
            setError(err instanceof Error ? err.message : "Failed to fetch payment history")
        } finally {
            setLoading(false)
        }
    }

    const refreshPaymentHistory = async () => {
        await fetchPaymentHistory()
    }

    // Fetch payment history when user changes
    useEffect(() => {
        fetchPaymentHistory()
    }, [user])

    return (
        <PaymentContext.Provider
            value={{
                paymentHistory,
                loading,
                error,
                refreshPaymentHistory,
            }}
        >
            {children}
        </PaymentContext.Provider>
    )
}

export function usePayment() {
    const context = useContext(PaymentContext)
    if (context === undefined) {
        throw new Error("usePayment must be used within a PaymentProvider")
    }
    return context
}
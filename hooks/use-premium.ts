"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"
import { supabase } from "@/lib/supabase"

interface PremiumStatus {
    isPremium: boolean
    loading: boolean
    error: string | null
    subscriptionId: string | null
    currentPeriodEnd: string | null
    cancelAtPeriodEnd: boolean
}

export function usePremium(user: any): PremiumStatus {
    const [premiumStatus, setPremiumStatus] = useState<PremiumStatus>({
        isPremium: false,
        loading: true,
        error: null,
        subscriptionId: null,
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
    })

    useEffect(() => {
        if (!user) {
            setPremiumStatus({
                isPremium: false,
                loading: false,
                error: null,
                subscriptionId: null,
                currentPeriodEnd: null,
                cancelAtPeriodEnd: false,
            })
            return
        }

        const checkPremiumStatus = async () => {
            try {
                setPremiumStatus(prev => ({ ...prev, loading: true, error: null }))

                // Check if user has an active subscription
                const { data: subscription, error } = await supabase
                    .from('subscriptions')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('status', 'active')
                    .single()

                if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
                    throw error
                }

                if (subscription) {
                    const isActive = subscription.status === 'active' && 
                                   new Date(subscription.current_period_end) > new Date()
                    
                    setPremiumStatus({
                        isPremium: isActive,
                        loading: false,
                        error: null,
                        subscriptionId: subscription.subscription_id,
                        currentPeriodEnd: subscription.current_period_end,
                        cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
                    })
                } else {
                    setPremiumStatus({
                        isPremium: false,
                        loading: false,
                        error: null,
                        subscriptionId: null,
                        currentPeriodEnd: null,
                        cancelAtPeriodEnd: false,
                    })
                }
            } catch (error) {
                console.error('Error checking premium status:', error)
                setPremiumStatus({
                    isPremium: false,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Failed to check premium status',
                    subscriptionId: null,
                    currentPeriodEnd: null,
                    cancelAtPeriodEnd: false,
                })
            }
        }

        checkPremiumStatus()
    }, [user])

    return premiumStatus
}
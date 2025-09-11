"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Loader2, AlertCircle } from "lucide-react"
import { useReadingHistory } from "@/contexts/reading-history-context"
import { useAuth } from "@/hooks/use-auth"
import { ReadingHistoryList } from "./reading-history-list"
import { ReadingHistoryItem } from "@/contexts/reading-history-context"
import Link from "next/link"

interface ReadingHistoryProps {
    onViewReading?: (reading: ReadingHistoryItem) => void
}

export function ReadingHistory({ onViewReading }: ReadingHistoryProps) {
    const { user } = useAuth()
    const { readings, loading, error, deleteReading, refreshReadings } = useReadingHistory()

    const handleViewReading = (reading: ReadingHistoryItem) => {
        if (onViewReading) {
            onViewReading(reading)
        }
    }

    const handleDeleteReading = async (readingId: string) => {
        try {
            await deleteReading(readingId)
        } catch (error) {
            console.error("Failed to delete reading:", error)
        }
    }

    if (!user) {
        return (
            <Card className="p-8 text-center">
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Sign in to save your readings</h3>
                        <p className="text-muted-foreground mb-4">
                            Create an account to save your tarot readings and access them anytime.
                        </p>
                        <div className="flex gap-2 justify-center">
                            <Button asChild>
                                <Link href="/signin">Sign In</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="p-8 text-center">
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-destructive" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Error loading readings</h3>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button onClick={refreshReadings} disabled={loading}>
                            {loading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : null}
                            Try Again
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-serif font-bold text-2xl">Reading History</h2>
                    <p className="text-muted-foreground">
                        Your past tarot readings and interpretations
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                        {readings.length} reading{readings.length !== 1 ? 's' : ''}
                    </Badge>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={refreshReadings}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Refresh"
                        )}
                    </Button>
                </div>
            </div>

            {/* Reading List */}
            <ReadingHistoryList
                readings={readings}
                onViewReading={handleViewReading}
                onDeleteReading={handleDeleteReading}
                loading={loading}
            />
        </div>
    )
}
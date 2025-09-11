"use client"

import { useState } from "react"
import { ReadingHistory } from "@/components/reading-history"
import { ReadingViewer } from "@/components/reading-history/reading-viewer"
import { ReadingHistoryItem } from "@/contexts/reading-history-context"

export default function HistoryPage() {
    const [selectedReading, setSelectedReading] = useState<ReadingHistoryItem | null>(null)

    const handleViewReading = (reading: ReadingHistoryItem) => {
        setSelectedReading(reading)
    }

    const handleBackToHistory = () => {
        setSelectedReading(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {selectedReading ? (
                    <ReadingViewer 
                        reading={selectedReading} 
                        onBack={handleBackToHistory}
                    />
                ) : (
                    <ReadingHistory onViewReading={handleViewReading} />
                )}
            </div>
        </div>
    )
}
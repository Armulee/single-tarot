"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Calendar, Trash2, Eye } from "lucide-react"
import { ReadingHistoryItem, FollowUpReading } from "@/contexts/reading-history-context"
import { CardImage } from "@/components/card-image"
import { formatDistanceToNow } from "date-fns"

interface ReadingHistoryListProps {
    readings: ReadingHistoryItem[]
    onViewReading: (reading: ReadingHistoryItem) => void
    onDeleteReading: (readingId: string) => void
    loading?: boolean
}

export function ReadingHistoryList({ 
    readings, 
    onViewReading, 
    onDeleteReading, 
    loading = false 
}: ReadingHistoryListProps) {
    const [expandedReadings, setExpandedReadings] = useState<Set<string>>(new Set())

    const toggleExpanded = (readingId: string) => {
        setExpandedReadings(prev => {
            const newSet = new Set(prev)
            if (newSet.has(readingId)) {
                newSet.delete(readingId)
            } else {
                newSet.add(readingId)
            }
            return newSet
        })
    }

    const formatDate = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true })
        } catch {
            return "Unknown time"
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-4 animate-pulse">
                        <div className="space-y-3">
                            <div className="h-4 bg-muted/20 rounded w-3/4"></div>
                            <div className="h-3 bg-muted/10 rounded w-1/2"></div>
                            <div className="flex gap-2">
                                <div className="h-6 bg-muted/10 rounded w-16"></div>
                                <div className="h-6 bg-muted/10 rounded w-20"></div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        )
    }

    if (readings.length === 0) {
        return (
            <Card className="p-8 text-center">
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">No readings yet</h3>
                        <p className="text-muted-foreground">
                            Your tarot readings will appear here once you complete them.
                        </p>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {readings.map((reading) => {
                const isExpanded = expandedReadings.has(reading.id)
                const hasFollowUps = reading.followUpReadings && reading.followUpReadings.length > 0

                return (
                    <Card key={reading.id} className="p-4 space-y-4">
                        {/* Main Reading Header */}
                        <div className="space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-2">
                                    <h3 className="font-semibold text-lg leading-tight">
                                        {reading.question}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(reading.createdAt)}</span>
                                        <Badge variant="secondary" className="text-xs">
                                            {reading.readingType}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onViewReading(reading)}
                                        className="h-8"
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDeleteReading(reading.id)}
                                        className="h-8 text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Selected Cards Preview */}
                            <div className="flex flex-wrap gap-2">
                                {reading.selectedCards.slice(0, 3).map((card, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <CardImage
                                            card={card}
                                            size="xs"
                                            showAura={false}
                                            showLabel={false}
                                            className="w-8 h-12"
                                        />
                                        <span className="text-xs text-muted-foreground">
                                            {card.meaning}
                                        </span>
                                    </div>
                                ))}
                                {reading.selectedCards.length > 3 && (
                                    <span className="text-xs text-muted-foreground">
                                        +{reading.selectedCards.length - 3} more
                                    </span>
                                )}
                            </div>

                            {/* Follow-up Toggle */}
                            {hasFollowUps && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleExpanded(reading.id)}
                                    className="h-8 p-0 text-muted-foreground hover:text-foreground"
                                >
                                    {isExpanded ? (
                                        <ChevronDown className="w-4 h-4 mr-1" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 mr-1" />
                                    )}
                                    {reading.followUpReadings!.length} follow-up question{reading.followUpReadings!.length !== 1 ? 's' : ''}
                                </Button>
                            )}
                        </div>

                        {/* Follow-up Readings Accordion */}
                        {isExpanded && hasFollowUps && (
                            <div className="border-t pt-4 space-y-3">
                                {reading.followUpReadings!.map((followUp, index) => (
                                    <Card key={followUp.id} className="p-3 bg-muted/5">
                                        <div className="space-y-2">
                                            <div className="flex items-start justify-between">
                                                <h4 className="font-medium text-sm">
                                                    Follow-up {index + 1}: {followUp.question}
                                                </h4>
                                                <span className="text-xs text-muted-foreground">
                                                    {formatDate(followUp.createdAt)}
                                                </span>
                                            </div>
                                            
                                            {/* Follow-up Cards */}
                                            <div className="flex flex-wrap gap-2">
                                                {followUp.selectedCards.map((card, cardIndex) => (
                                                    <div key={cardIndex} className="flex items-center gap-1">
                                                        <CardImage
                                                            card={card}
                                                            size="xs"
                                                            showAura={false}
                                                            showLabel={false}
                                                            className="w-6 h-9"
                                                        />
                                                        <span className="text-xs text-muted-foreground">
                                                            {card.meaning}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Card>
                )
            })}
        </div>
    )
}
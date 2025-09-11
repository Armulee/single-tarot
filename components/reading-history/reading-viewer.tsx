"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Calendar, ArrowLeft } from "lucide-react"
import { ReadingHistoryItem } from "@/contexts/reading-history-context"
import { CardImage } from "@/components/card-image"
import { formatDistanceToNow } from "date-fns"

interface ReadingViewerProps {
    reading: ReadingHistoryItem
    onBack: () => void
}

export function ReadingViewer({ reading, onBack }: ReadingViewerProps) {
    const formatDate = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true })
        } catch {
            return "Unknown time"
        }
    }

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={onBack}
                className="p-0 h-auto text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to History
            </Button>

            {/* Reading Header */}
            <Card className="px-6 pt-10 pb-6 border-0 relative overflow-hidden">
                {/* Background card images with aura */}
                <div className="absolute inset-0 pointer-events-none">
                    {reading.selectedCards.map((card, index) => {
                        const positions = [
                            {
                                top: "10%",
                                left: "5%",
                                transform: "rotate(-15deg)",
                            },
                            {
                                top: "15%",
                                right: "8%",
                                transform: "rotate(20deg)",
                            },
                            {
                                bottom: "20%",
                                left: "10%",
                                transform: "rotate(-10deg)",
                            },
                            {
                                bottom: "15%",
                                right: "12%",
                                transform: "rotate(25deg)",
                            },
                            {
                                top: "50%",
                                left: "2%",
                                transform: "rotate(-5deg)",
                            },
                            {
                                top: "60%",
                                right: "5%",
                                transform: "rotate(15deg)",
                            },
                        ]
                        const position = positions[index % positions.length]

                        return (
                            <div
                                key={`bg-${index}`}
                                className="absolute opacity-20"
                                style={position}
                            >
                                <CardImage
                                    card={card}
                                    size="sm"
                                    showAura={true}
                                    showLabel={false}
                                    className="scale-75"
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="text-center space-y-6 relative z-10">
                    <div className="flex items-center justify-center space-x-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        <h1 className="font-serif font-bold text-2xl">
                            Your Cosmic Interpretation
                        </h1>
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-muted-foreground italic">
                        &ldquo;{reading.question}&rdquo;
                    </p>

                    {/* Reading Info */}
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(reading.createdAt)}</span>
                        </div>
                        <Badge variant="secondary">
                            {reading.readingType}
                        </Badge>
                    </div>

                    {/* Card Images with Badges on Top */}
                    <div className="flex flex-wrap gap-6 justify-center">
                        {reading.selectedCards.map((card, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-3"
                            >
                                {/* Badge on top */}
                                <Badge
                                    variant="secondary"
                                    className="bg-secondary/20 text-secondary border-secondary/30"
                                >
                                    {card.meaning}
                                </Badge>

                                {/* Card Image */}
                                <CardImage
                                    card={card}
                                    size="md"
                                    showAura={true}
                                    showLabel={false}
                                    className="hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* AI Interpretation */}
            <Card className="p-8 bg-card/10 backdrop-blur-sm border-border/20 card-glow">
                <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-serif font-semibold text-xl">
                                Cosmic Guidance
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Generated by AI with ancient wisdom
                            </p>
                        </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                        <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                            {reading.interpretation}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Follow-up Readings */}
            {reading.followUpReadings && reading.followUpReadings.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-serif font-semibold text-xl">
                        Follow-up Questions
                    </h3>
                    <div className="space-y-4">
                        {reading.followUpReadings.map((followUp, index) => (
                            <Card key={followUp.id} className="p-6 bg-card/5 backdrop-blur-sm border-border/10">
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <h4 className="font-medium">
                                            Follow-up {index + 1}: {followUp.question}
                                        </h4>
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(followUp.createdAt)}
                                        </span>
                                    </div>
                                    
                                    {/* Follow-up Cards */}
                                    <div className="flex flex-wrap gap-4">
                                        {followUp.selectedCards.map((card, cardIndex) => (
                                            <div key={cardIndex} className="flex flex-col items-center gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {card.meaning}
                                                </Badge>
                                                <CardImage
                                                    card={card}
                                                    size="sm"
                                                    showAura={true}
                                                    showLabel={false}
                                                    className="hover:scale-105 transition-transform duration-200"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Follow-up Interpretation */}
                                    <div className="prose prose-invert max-w-none">
                                        <div className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
                                            {followUp.interpretation}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <Card className="p-4 bg-card/5 backdrop-blur-sm border-border/10">
                <p className="text-xs text-muted-foreground text-center">
                    This interpretation is generated by AI for entertainment and guidance purposes. 
                    Trust your intuition and use this reading as one perspective on your journey.
                </p>
            </Card>
        </div>
    )
}
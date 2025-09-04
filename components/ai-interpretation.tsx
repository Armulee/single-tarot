"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, RotateCcw, Share } from "lucide-react"
import { useEffect, useState } from "react"

interface AIInterpretationProps {
    question: string
    cards: { name: string; isReversed: boolean }[]
    onNewReading: () => void
}

export function AIInterpretation({
    question,
    cards,
    onNewReading,
}: AIInterpretationProps) {
    const [interpretation, setInterpretation] = useState<string>("")
    const [isGenerating, setIsGenerating] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const generateInterpretation = async () => {
            try {
                setError(null)
                setInterpretation("")
                setIsGenerating(true)

                const response = await fetch("/api/interpret-cards", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question,
                        cards,
                        cardCount: cards.length,
                        isPremium: false, // TODO: Get from context
                    }),
                })

                if (!response.ok) {
                    throw new Error("Failed to generate interpretation")
                }

                const result = await response.json()

                if (result.text) {
                    setInterpretation(result.text)
                } else {
                    throw new Error("No interpretation text received")
                }

                setIsGenerating(false)
            } catch (error) {
                console.error("Error generating interpretation:", error)
                setError("Failed to generate interpretation. Please try again.")
                setIsGenerating(false)
            }
        }

        if (!interpretation) {
            generateInterpretation()
        }
    }, [question, cards, interpretation])

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "My Cosmic Tarot Reading",
                    text: `Question: ${question}\nCards: ${cards
                        .map((c) =>
                            c.isReversed ? `${c.name} Reversed` : c.name
                        )
                        .join(
                            ", "
                        )}\n\nInterpretation: ${interpretation.substring(
                        0,
                        200
                    )}...`,
                    url: window.location.href,
                })
            } catch (error) {
                console.log("Error sharing:", error)
            }
        } else {
            // Fallback: copy to clipboard
            const shareText = `My Cosmic Tarot Reading\n\nQuestion: ${question}\nCards: ${cards
                .map((c) => (c.isReversed ? `${c.name} Reversed` : c.name))
                .join(", ")}\n\nInterpretation: ${interpretation}`
            navigator.clipboard.writeText(shareText)
            alert("Reading copied to clipboard!")
        }
    }

    return (
        <div className='space-y-8'>
            {/* Header */}
            <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                <div className='text-center space-y-4'>
                    <div className='flex items-center justify-center space-x-2'>
                        <Sparkles className='w-6 h-6 text-primary' />
                        <h1 className='font-serif font-bold text-2xl'>
                            Your Cosmic Interpretation
                        </h1>
                        <Sparkles className='w-6 h-6 text-primary' />
                    </div>
                    <p className='text-muted-foreground italic'>
                        &ldquo;{question}&rdquo;
                    </p>
                    <div className='flex flex-wrap gap-2 justify-center'>
                        {cards.map((card, index) => (
                            <Badge
                                key={index}
                                variant='secondary'
                                className='bg-secondary/20 text-secondary border-secondary/30'
                            >
                                {card.isReversed
                                    ? `${card.name} Reversed`
                                    : card.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Card>

            {/* AI Interpretation */}
            <Card className='p-8 bg-card/10 backdrop-blur-sm border-border/20 card-glow'>
                <div className='space-y-6'>
                    <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center'>
                            <Sparkles className='w-5 h-5 text-primary' />
                        </div>
                        <div>
                            <h2 className='font-serif font-semibold text-xl'>
                                Cosmic Guidance
                            </h2>
                            <p className='text-sm text-muted-foreground'>
                                Generated by AI with ancient wisdom
                            </p>
                        </div>
                    </div>

                    <div className='prose prose-invert max-w-none'>
                        {isGenerating && !interpretation ? (
                            <div className='text-center space-y-4'>
                                <div className='w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center animate-pulse'>
                                    <Sparkles className='w-8 h-8 text-primary' />
                                </div>
                                <p className='text-lg font-medium'>
                                    Channeling Cosmic Wisdom...
                                </p>
                            </div>
                        ) : error ? (
                            <div className='text-center space-y-4'>
                                <p className='text-destructive'>
                                    Failed to generate interpretation. Please
                                    try again.
                                </p>
                                <Button
                                    onClick={() => window.location.reload()}
                                    variant='outline'
                                >
                                    Retry
                                </Button>
                            </div>
                        ) : (
                            <div className='text-foreground leading-relaxed whitespace-pre-wrap'>
                                {interpretation}
                            </div>
                        )}
                    </div>

                    <div className='border-t border-border/20 pt-6'>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <Button
                                onClick={onNewReading}
                                size='lg'
                                className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 card-glow'
                            >
                                <RotateCcw className='w-4 h-4 mr-2' />
                                New Reading
                            </Button>
                            <Button
                                onClick={handleShare}
                                variant='outline'
                                size='lg'
                                className='border-border/30 hover:bg-card/20 bg-transparent px-8'
                            >
                                <Share className='w-4 h-4 mr-2' />
                                Share Reading
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Disclaimer */}
            <Card className='p-4 bg-card/5 backdrop-blur-sm border-border/10'>
                <p className='text-xs text-muted-foreground text-center'>
                    This interpretation is generated by AI for entertainment and
                    guidance purposes. Trust your intuition and use this reading
                    as one perspective on your journey.
                </p>
            </Card>
        </div>
    )
}

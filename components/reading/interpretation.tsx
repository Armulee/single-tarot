"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sparkles, RotateCcw, Share, Loader2, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCompletion } from "@ai-sdk/react"
import { useTarot } from "@/contexts/tarot-context"

export default function Interpretation() {
    const { 
        currentStep, 
        question, 
        setQuestion,
        selectedCards, 
        resetReading,
        followupQuestion,
        setFollowupQuestion,
        setCurrentStep,
        setInterpretation,
        followupCard,
        interpretation
    } = useTarot()
    
    // Determine if this is a follow-up interpretation
    const isFollowup = followupQuestion && followupCard
    
    const { completion, isLoading, error, complete } = useCompletion({
        api: "/api/interpret-cards/question",
        body: isFollowup ? {
            question: followupQuestion,
            cards: [followupCard],
            isFollowup: true,
            lastQuestion: question,
            lastCards: selectedCards,
            lastInterpretation: interpretation,
            followupQuestion: followupQuestion,
            followupCard: followupCard,
        } : {
            question,
            cards: selectedCards,
        },
    })

    const [followupInput, setFollowupInput] = useState("")
    const hasInitiated = useRef(false)
    
    useEffect(() => {
        // Auto-submit when we have question and cards, but only once
        if (isFollowup) {
            // For follow-up interpretations
            if (
                followupQuestion &&
                followupCard &&
                !completion &&
                !isLoading &&
                !hasInitiated.current
            ) {
                hasInitiated.current = true
                complete("")
            }
        } else {
            // For regular interpretations
            if (
                question &&
                selectedCards.length > 0 &&
                !completion &&
                !isLoading &&
                !hasInitiated.current
            ) {
                hasInitiated.current = true
                complete("")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question, selectedCards, followupQuestion, followupCard, completion, isLoading, isFollowup])

    // Store the completion result in context when it's ready
    useEffect(() => {
        if (completion && !isLoading) {
            setInterpretation(completion)
        }
    }, [completion, isLoading, setInterpretation])

    const handleFollowupQuestion = () => {
        if (followupInput.trim()) {
            setFollowupQuestion(followupInput.trim())
            setQuestion(followupInput.trim()) // Set the follow-up question as the current question
            setCurrentStep("card-selection") // Go to card selection
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "My ดูดวง.ai Reading",
                    text: `Question: ${question}\nCards: ${selectedCards
                        .map((c) => c.meaning)
                        .join(", ")}\n\nInterpretation: ${completion.substring(
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
            const shareText = `My ดูดวง.ai Reading\n\nQuestion: ${question}\nCards: ${selectedCards
                .map((c) => c.meaning)
                .join(", ")}\n\nInterpretation: ${completion}`
            navigator.clipboard.writeText(shareText)
            alert("Reading copied to clipboard!")
        }
    }

    return (
        <>
            {currentStep === "interpretation" && (
                <div className='space-y-8'>
                    {/* Header */}
                    <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                        <div className='text-center space-y-4'>
                            <div className='flex items-center justify-center space-x-2'>
                                <Sparkles className='w-6 h-6 text-primary' />
                                <h1 className='font-serif font-bold text-2xl'>
                                    {isFollowup ? "Follow-up Cosmic Interpretation" : "Your Cosmic Interpretation"}
                                </h1>
                                <Sparkles className='w-6 h-6 text-primary' />
                            </div>
                            <p className='text-muted-foreground italic'>
                                &ldquo;{isFollowup ? followupQuestion : question}&rdquo;
                            </p>
                            <div className='flex flex-wrap gap-2 justify-center'>
                                {isFollowup ? (
                                    followupCard && (
                                        <Badge
                                            variant='secondary'
                                            className='bg-secondary/20 text-secondary border-secondary/30'
                                        >
                                            {followupCard.meaning}
                                        </Badge>
                                    )
                                ) : (
                                    selectedCards.map((card, index) => (
                                        <Badge
                                            key={index}
                                            variant='secondary'
                                            className='bg-secondary/20 text-secondary border-secondary/30'
                                        >
                                            {card.meaning}
                                        </Badge>
                                    ))
                                )}
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
                                {error ? (
                                    <div className='text-center space-y-4'>
                                        <p className='text-destructive'>
                                            Failed to generate interpretation.
                                            Please try again.
                                        </p>
                                        <Button
                                            onClick={() =>
                                                window.location.reload()
                                            }
                                            variant='outline'
                                        >
                                            Retry
                                        </Button>
                                    </div>
                                ) : isLoading ? (
                                    <div className='text-center space-y-6 py-8'>
                                        <div className='flex items-center justify-center space-x-3'>
                                            <Loader2 className='w-6 h-6 text-primary animate-spin' />
                                            <span className='text-muted-foreground'>
                                                Consulting the cosmic realm...
                                            </span>
                                        </div>
                                        <div className='space-y-2'>
                                            <div className='flex justify-center space-x-1'>
                                                <div
                                                    className='w-2 h-2 bg-primary rounded-full animate-bounce'
                                                    style={{
                                                        animationDelay: "0ms",
                                                    }}
                                                ></div>
                                                <div
                                                    className='w-2 h-2 bg-primary rounded-full animate-bounce'
                                                    style={{
                                                        animationDelay: "150ms",
                                                    }}
                                                ></div>
                                                <div
                                                    className='w-2 h-2 bg-primary rounded-full animate-bounce'
                                                    style={{
                                                        animationDelay: "300ms",
                                                    }}
                                                ></div>
                                            </div>
                                            <p className='text-sm text-muted-foreground'>
                                                The cards are revealing their
                                                secrets...
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-foreground leading-relaxed whitespace-pre-wrap'>
                                        {completion}
                                    </div>
                                )}
                            </div>

                            {!isLoading && (
                                <div className='border-t border-border/20 pt-6'>
                                    <div className='space-y-6'>
                                        {/* Follow-up Question Input - only show for regular interpretations */}
                                        {!isFollowup && (
                                            <div className='space-y-4'>
                                                <div className='text-center space-y-2'>
                                                    <h3 className='font-serif font-semibold text-lg'>
                                                        Have a Follow-up Question?
                                                    </h3>
                                                    <p className='text-sm text-muted-foreground'>
                                                        Ask for deeper insight or clarification
                                                    </p>
                                                </div>
                                                <div className='flex gap-3 max-w-md mx-auto'>
                                                    <Input
                                                        value={followupInput}
                                                        onChange={(e) => setFollowupInput(e.target.value)}
                                                        placeholder='Ask your follow-up question...'
                                                        className='flex-1'
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleFollowupQuestion()
                                                            }
                                                        }}
                                                    />
                                                    <Button
                                                        onClick={handleFollowupQuestion}
                                                        disabled={!followupInput.trim()}
                                                        size='lg'
                                                        className='bg-primary hover:bg-primary/90 text-primary-foreground px-6'
                                                    >
                                                        <Send className='w-4 h-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                                            <Button
                                                onClick={resetReading}
                                                variant='outline'
                                                size='lg'
                                                className='border-border/30 hover:bg-card/20 bg-transparent px-8'
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
                            )}
                        </div>
                    </Card>

                    {/* Disclaimer */}
                    <Card className='p-4 bg-card/5 backdrop-blur-sm border-border/10'>
                        <p className='text-xs text-muted-foreground text-center'>
                            This interpretation is generated by AI for
                            entertainment and guidance purposes. Trust your
                            intuition and use this reading as one perspective on
                            your journey.
                        </p>
                    </Card>
                </div>
            )}
        </>
    )
}

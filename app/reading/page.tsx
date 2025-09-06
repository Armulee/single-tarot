"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CircularCardSpread } from "@/components/circular-card-spread"
import { AIInterpretation } from "@/components/ai-interpretation"
import { useTarot, type TarotCard } from "@/contexts/tarot-context"
import { Pencil } from "lucide-react"

export default function ReadingPage() {
    const {
        question,
        setQuestion,
        readingType,
        setReadingType,
        selectedCards,
        setSelectedCards,
        currentStep,
        setCurrentStep,
        resetReading,
    } = useTarot()

    useEffect(() => {
        if (!question && currentStep !== "question") {
            setCurrentStep("question")
        }
    }, [question, currentStep, setCurrentStep])

    const readingConfig = {
        simple: {
            cards: 1,
            title: "Simple Reading",
            description: "One card for focused guidance",
        },
        intermediate: {
            cards: 2,
            title: "Intermediate Reading",
            description: "Two cards for deeper insight",
        },
        advanced: {
            cards: 3,
            title: "Advanced Reading",
            description: "Three cards for comprehensive guidance",
        },
    }

    const handleQuestionSubmit = () => {
        if (question.trim()) {
            setCurrentStep("reading-type")
        }
    }

    const handleEditQuestion = () => {
        setCurrentStep("question")
    }

    const handleReadingTypeSelect = (
        type: "simple" | "intermediate" | "advanced"
    ) => {
        setReadingType(type)
        setCurrentStep("card-selection")
    }

    const handleBackToReadingType = () => {
        setCurrentStep("reading-type")
        setSelectedCards([])
    }

    const handleCardsSelected = (
        cards: { name: string; isReversed: boolean }[]
    ) => {
        // Convert to TarotCard format
        const tarotCards: TarotCard[] = cards.map((card, index) => ({
            id: index + 1,
            name: card.name,
            image: `/cards/${card.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
            meaning: card.isReversed ? `${card.name} (Reversed)` : card.name,
        }))

        setSelectedCards(tarotCards)
        setCurrentStep("interpretation")
    }

    return (
        <div className='min-h-screen relative overflow-hidden'>
            <main className='relative z-10 max-w-4xl mx-auto px-6 py-12'>
                {currentStep === "question" && (
                    <div className='space-y-8 animate-fade-in'>
                        <div className='text-center space-y-4'>
                            <h1 className='font-serif font-bold text-4xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent'>
                                Ask the Universe
                            </h1>
                            <p className='text-muted-foreground text-lg'>
                                What guidance do you seek from the cosmic realm?
                            </p>
                        </div>

                        <Card className='p-8 bg-card/10 backdrop-blur-sm border-border/20 card-glow'>
                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='question'
                                        className='text-lg font-medium'
                                    >
                                        Your Question
                                    </Label>
                                    <Textarea
                                        id='question'
                                        placeholder='Enter your question for the tarot cards...'
                                        value={question}
                                        onChange={(e) =>
                                            setQuestion(e.target.value)
                                        }
                                        className='min-h-[120px] bg-background/50 border-border/30 focus:border-primary/50 resize-none'
                                    />
                                </div>

                                <Button
                                    onClick={handleQuestionSubmit}
                                    disabled={!question.trim()}
                                    className='w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium py-3'
                                >
                                    Continue to Reading Selection
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}

                {currentStep === "reading-type" && (
                    <div className='space-y-8 animate-fade-in'>
                        <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                            <div className='text-center space-y-2'>
                                <div className='flex items-center justify-center gap-2'>
                                    <h2 className='font-serif font-semibold text-xl'>
                                        Your Question
                                    </h2>
                                    <Button
                                        onClick={handleEditQuestion}
                                        variant='ghost'
                                        size='sm'
                                        className='h-8 w-8 p-0 hover:bg-primary/10'
                                    >
                                        <Pencil className='h-4 w-4 text-muted-foreground hover:text-primary' />
                                    </Button>
                                </div>
                                <p className='text-muted-foreground italic'>
                                    &ldquo;{question}&rdquo;
                                </p>
                            </div>
                        </Card>

                        <div className='space-y-6'>
                            <div className='text-center space-y-2'>
                                <h2 className='font-serif font-bold text-2xl'>
                                    Choose Your Reading Type
                                </h2>
                                <p className='text-muted-foreground'>
                                    Select the depth of guidance you seek
                                </p>
                            </div>

                            <div className='grid gap-6 md:grid-cols-3'>
                                {Object.entries(readingConfig).map(
                                    ([key, config]) => (
                                        <Card
                                            key={key}
                                            className='p-6 bg-card/10 backdrop-blur-sm border-border/20 hover:border-primary/50 cursor-pointer transition-all duration-300 hover:scale-105 card-glow'
                                            onClick={() =>
                                                handleReadingTypeSelect(
                                                    key as
                                                        | "simple"
                                                        | "intermediate"
                                                        | "advanced"
                                                )
                                            }
                                        >
                                            <div className='text-center space-y-4'>
                                                <div className='w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center'>
                                                    <span className='text-primary text-2xl font-bold'>
                                                        {config.cards}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className='font-serif font-semibold text-lg'>
                                                        {config.title}
                                                    </h3>
                                                    <p className='text-sm text-muted-foreground mt-1'>
                                                        {config.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === "card-selection" && (
                    <div className='space-y-8 animate-fade-in'>
                        <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                            <div className='text-center space-y-2'>
                                <div className='flex items-center justify-center gap-2'>
                                    <h2 className='font-serif font-semibold text-xl'>
                                        Your Question
                                    </h2>
                                    <Button
                                        onClick={handleEditQuestion}
                                        variant='ghost'
                                        size='sm'
                                        className='h-8 w-8 p-0 hover:bg-primary/10'
                                    >
                                        <Pencil className='h-4 w-4 text-muted-foreground hover:text-primary' />
                                    </Button>
                                </div>
                                <p className='text-muted-foreground italic'>
                                    &ldquo;{question}&rdquo;
                                </p>
                                <p className='text-sm text-primary'>
                                    {readingType &&
                                        readingConfig[readingType].title}
                                </p>
                            </div>
                        </Card>

                        <div className='space-y-6'>
                            <div className='text-center space-y-2'>
                                <h2 className='font-serif font-bold text-2xl'>
                                    Choose Your Cards
                                </h2>
                                <p className='text-muted-foreground'>
                                    Trust your intuition and select from the
                                    cosmic spread
                                </p>
                            </div>

                            <div className='flex justify-center'>
                                <Button
                                    onClick={handleBackToReadingType}
                                    variant='outline'
                                    className='border-primary/30 hover:bg-primary/10 bg-transparent'
                                >
                                    ← Back to Reading Types
                                </Button>
                            </div>

                            {readingType && (
                                <CircularCardSpread
                                    cardsToSelect={
                                        readingConfig[readingType].cards
                                    }
                                    onCardsSelected={handleCardsSelected}
                                />
                            )}
                        </div>
                    </div>
                )}

                {currentStep === "interpretation" && (
                    <AIInterpretation
                        question={question}
                        cards={selectedCards.map((card) => ({
                            name: card.name,
                            isReversed: card.meaning.includes("Reversed"),
                        }))}
                        onNewReading={resetReading}
                    />
                )}
            </main>
        </div>
    )
}

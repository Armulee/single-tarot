"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sparkles } from "lucide-react"
import { useTarot, TarotCard } from "@/contexts/tarot-context"

interface TarotCardData {
    name: string
    isReversed: boolean
    position: number
}

const TAROT_DECK = [
    // Major
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World",
    // Minor cups
    "Ace of Cups",
    "Two of Cups",
    "Three of Cups",
    "Four of Cups",
    "Five of Cups",
    "Six of Cups",
    "Seven of Cups",
    "Eight of Cups",
    "Nine of Cups",
    "Ten of Cups",
    "Page of Cups",
    "Knight of Cups",
    "Queen of Cups",
    "King of Cups",
    // Minor swords
    "Ace of Swords",
    "Two of Swords",
    "Three of Swords",
    "Four of Swords",
    "Five of Swords",
    "Six of Swords",
    "Seven of Swords",
    "Eight of Swords",
    "Nine of Swords",
    "Ten of Swords",
    "Page of Swords",
    "Knight of Swords",
    "Queen of Swords",
    "King of Swords",
    // Minor wands
    "Ace of Wands",
    "Two of Wands",
    "Three of Wands",
    "Four of Wands",
    "Five of Wands",
    "Six of Wands",
    "Seven of Wands",
    "Eight of Wands",
    "Nine of Wands",
    "Ten of Wands",
    "Page of Wands",
    "Knight of Wands",
    "Queen of Wands",
    "King of Wands",
    // Minor pentacles
    "Ace of Pentacles",
    "Two of Pentacles",
    "Three of Pentacles",
    "Four of Pentacles",
    "Five of Pentacles",
    "Six of Pentacles",
    "Seven of Pentacles",
    "Eight of Pentacles",
    "Nine of Pentacles",
    "Ten of Pentacles",
    "Page of Pentacles",
    "Knight of Pentacles",
    "Queen of Pentacles",
    "King of Pentacles",
]

export default function FollowupCardSelection() {
    const {
        currentStep,
        followupQuestion,
        setFollowupCard,
        setCurrentStep,
        question,
        selectedCards,
        interpretation
    } = useTarot()

    const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([])
    const [selectedCard, setSelectedCard] = useState<TarotCardData | null>(null)

    useEffect(() => {
        const createShuffledDeck = () => {
            const deck = [...TAROT_DECK]
            const shuffled: TarotCardData[] = []

            for (let i = 0; i < 52; i++) {
                if (deck.length === 0) break

                const randomIndex = Math.floor(Math.random() * deck.length)
                const cardName = deck.splice(randomIndex, 1)[0]

                shuffled.push({
                    name: cardName,
                    isReversed: Math.random() < 0.5,
                    position: i,
                })
            }

            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            }

            return shuffled
        }

        setShuffledDeck(createShuffledDeck())
    }, [])

    const handleCardClick = (card: TarotCardData) => {
        setSelectedCard(card)
    }

    const handleBackToInterpretation = () => {
        setCurrentStep("interpretation")
    }

    const handleProceedToFollowupInterpretation = () => {
        if (selectedCard) {
            // Convert to TarotCard format
            const tarotCard: TarotCard = {
                id: 1,
                name: selectedCard.name,
                image: `/cards/${selectedCard.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
                meaning: selectedCard.isReversed ? `${selectedCard.name} (Reversed)` : selectedCard.name,
            }

            setFollowupCard(tarotCard)
            setCurrentStep("followup-interpretation")
        }
    }

    return (
        <>
            {currentStep === "followup-card-selection" && (
                <div className='space-y-8 animate-fade-in'>
                    {/* Header */}
                    <Card className='p-6 bg-card/10 backdrop-blur-sm border-border/20'>
                        <div className='text-center space-y-4'>
                            <div className='flex items-center justify-center space-x-2'>
                                <Sparkles className='w-6 h-6 text-primary' />
                                <h1 className='font-serif font-bold text-2xl'>
                                    Follow-up Card Selection
                                </h1>
                                <Sparkles className='w-6 h-6 text-primary' />
                            </div>
                            <p className='text-muted-foreground italic'>
                                &ldquo;{followupQuestion}&rdquo;
                            </p>
                            <div className='text-sm text-primary'>
                                Select one card for deeper insight
                            </div>
                        </div>
                    </Card>

                    {/* Previous Reading Summary */}
                    <Card className='p-6 bg-card/5 backdrop-blur-sm border-border/10'>
                        <div className='space-y-3'>
                            <h3 className='font-serif font-semibold text-lg text-center'>
                                Previous Reading
                            </h3>
                            <div className='text-center space-y-2'>
                                <p className='text-sm text-muted-foreground italic'>
                                    &ldquo;{question}&rdquo;
                                </p>
                                <div className='flex flex-wrap gap-2 justify-center'>
                                    {selectedCards.map((card, index) => (
                                        <Badge
                                            key={index}
                                            variant='secondary'
                                            className='bg-secondary/20 text-secondary border-secondary/30'
                                        >
                                            {card.meaning}
                                        </Badge>
                                    ))}
                                </div>
                                {interpretation && (
                                    <p className='text-xs text-muted-foreground mt-2 line-clamp-2'>
                                        {interpretation.substring(0, 100)}...
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Card Selection */}
                    <div className='space-y-6'>
                        <div className='text-center space-y-2'>
                            <h2 className='font-serif font-bold text-2xl'>
                                Choose Your Follow-up Card
                            </h2>
                            <p className='text-muted-foreground'>
                                Trust your intuition and select one card for deeper guidance
                            </p>
                        </div>

                        <div className='flex justify-center'>
                            <Button
                                onClick={handleBackToInterpretation}
                                variant='outline'
                                className='border-primary/30 hover:bg-primary/10 bg-transparent'
                            >
                                <ArrowLeft className='w-4 h-4 mr-2' />
                                Back to Interpretation
                            </Button>
                        </div>

                        {/* Single Card Selection Grid */}
                        <div className='relative w-full max-w-4xl mx-auto'>
                            <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 p-6'>
                                {shuffledDeck.slice(0, 40).map((card, index) => {
                                    const isSelected = selectedCard?.name === card.name

                                    return (
                                        <div
                                            key={`${card.name}-${index}`}
                                            className='cursor-pointer transition-all duration-300 hover:scale-110'
                                            onClick={() => handleCardClick(card)}
                                        >
                                            <div className='relative'>
                                                <div
                                                    className={`w-16 h-24 rounded-lg border-2 transition-all duration-500 ${
                                                        isSelected
                                                            ? "border-primary bg-primary/20 shadow-lg shadow-primary/50"
                                                            : "border-border/30 bg-card/80 hover:border-primary/50"
                                                    } backdrop-blur-sm flex items-center justify-center relative overflow-hidden`}
                                                    style={{
                                                        transform: isSelected
                                                            ? "rotateY(180deg)"
                                                            : "rotateY(0deg)",
                                                        transformStyle: "preserve-3d",
                                                    }}
                                                >
                                                    <div
                                                        className='absolute inset-0 flex items-center justify-center backface-hidden'
                                                        style={{ backfaceVisibility: "hidden" }}
                                                    >
                                                        <div className='w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg flex items-center justify-center'>
                                                            <div className='text-2xl'>🌟</div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className='absolute inset-0 flex flex-col items-center justify-center backface-hidden text-xs text-center p-1'
                                                        style={{
                                                            backfaceVisibility: "hidden",
                                                            transform: "rotateY(180deg)",
                                                        }}
                                                    >
                                                        <div
                                                            className={`text-primary mb-1 ${
                                                                card.isReversed
                                                                    ? "transform rotate-180"
                                                                    : ""
                                                            }`}
                                                        >
                                                            ✦
                                                        </div>
                                                        <div className='text-[8px] leading-tight'>
                                                            {card.name}
                                                        </div>
                                                        {card.isReversed && (
                                                            <div className='text-[6px] text-muted-foreground mt-1'>
                                                                Reversed
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {isSelected && (
                                                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold z-20'>
                                                        ✓
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Selection Status */}
                        <div className='text-center space-y-2'>
                            <p className='text-lg font-medium'>
                                {selectedCard ? "Card Selected!" : "Select one card from the cosmic spread"}
                            </p>
                            {selectedCard && (
                                <div className='space-y-2'>
                                    <Badge variant='secondary' className='bg-primary/20 text-primary border-primary/30'>
                                        {selectedCard.isReversed ? `${selectedCard.name} (Reversed)` : selectedCard.name}
                                    </Badge>
                                    <div>
                                        <Button
                                            onClick={handleProceedToFollowupInterpretation}
                                            size='lg'
                                            className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 card-glow'
                                        >
                                            <Sparkles className='w-4 h-4 mr-2' />
                                            Get Follow-up Interpretation
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
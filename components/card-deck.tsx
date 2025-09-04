"use client"

import { Card } from "@/components/ui/card"

interface CardDeckProps {
  isAnimating: boolean
  cardCount: number
}

export function CardDeck({ isAnimating, cardCount }: CardDeckProps) {
  return (
    <div className="relative w-64 h-96">
      {/* Deck of cards */}
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className={`absolute w-48 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-border/30 transition-all duration-1000 ${
            isAnimating ? "animate-pulse" : ""
          }`}
          style={{
            left: `${index * 4}px`,
            top: `${index * 2}px`,
            zIndex: 5 - index,
            transform:
              isAnimating && index < cardCount
                ? `translateX(${(index - 2) * 120}px) translateY(-50px) rotateZ(${(index - 2) * 15}deg)`
                : "",
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/30 flex items-center justify-center">
                <span className="text-3xl text-primary">✦</span>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-1 bg-primary/40 mx-auto rounded"></div>
                <div className="w-16 h-1 bg-secondary/40 mx-auto rounded"></div>
                <div className="w-12 h-1 bg-accent/40 mx-auto rounded"></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

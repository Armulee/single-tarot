"use client"

import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface TarotCardProps {
  name: string
  index: number
  isRevealed: boolean
}

export function TarotCard({ name, index, isRevealed }: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(
        () => {
          setIsFlipped(true)
        },
        index * 300 + 500,
      ) // Stagger the flip animations

      return () => clearTimeout(timer)
    }
  }, [isRevealed, index])

  return (
    <div className="perspective-1000 w-48 h-72">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Back */}
        <Card className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-border/30 flex items-center justify-center">
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
        </Card>

        {/* Card Front */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-card/20 backdrop-blur-sm border-border/30 p-6 flex flex-col items-center justify-center card-glow">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <span className="text-4xl">🌟</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-center text-balance">{name}</h3>
            <div className="space-y-1">
              <div className="w-24 h-1 bg-primary/60 mx-auto rounded"></div>
              <div className="w-16 h-1 bg-secondary/60 mx-auto rounded"></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

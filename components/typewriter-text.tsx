"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
    text: string
    speed?: number
    className?: string
}

export function TypewriterText({
    text,
    speed = 100,
    className = "",
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex])
                setCurrentIndex((prev) => prev + 1)
            }, speed)

            return () => clearTimeout(timeout)
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true)
        }
    }, [currentIndex, text, speed, isComplete])

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && (
                <span className='animate-pulse text-primary'>|</span>
            )}
        </span>
    )
}

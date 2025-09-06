"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
    text: string
    speed?: number
    className?: string
    delay?: number
}

export function TypewriterText({
    text,
    speed = 60,
    className = "",
    delay = 0,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        if (delay > 0 && !hasStarted) {
            const delayTimeout = setTimeout(() => {
                setHasStarted(true)
            }, delay)
            return () => clearTimeout(delayTimeout)
        } else if (delay === 0) {
            setHasStarted(true)
        }
    }, [delay, hasStarted])

    useEffect(() => {
        if (!hasStarted) return

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex])
                setCurrentIndex((prev) => prev + 1)
            }, speed)

            return () => clearTimeout(timeout)
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true)
        }
    }, [currentIndex, text, speed, isComplete, hasStarted])

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && hasStarted && (
                <span className='animate-pulse text-primary'>|</span>
            )}
        </span>
    )
}

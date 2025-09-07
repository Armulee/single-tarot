"use client"

import QuestionInput from "../question-input"
import { useTarot } from "@/contexts/tarot-context"

export default function QuestionStep() {
    const { currentStep, question } = useTarot()
    return (
        <>
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

                    <div className='max-w-md mx-auto'>
                        <QuestionInput defaultValue={question} />
                    </div>
                </div>
            )}
        </>
    )
}

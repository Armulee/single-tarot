import Interpretation from "@/components/reading/interpretation"
import QuestionStep from "@/components/reading/question"
import ReadingType from "@/components/reading/reading-type"
import CardSelection from "@/components/reading/card-selection"

export type ReadingConfig = {
    [type: string]: {
        cards: number
        title: string
        description: string
    }
}

const readingConfig: ReadingConfig = {
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

export default function ReadingPage() {
    return (
        <div className='min-h-screen relative overflow-hidden'>
            <main className='relative z-10 max-w-4xl mx-auto px-6 py-12'>
                <QuestionStep />
                <ReadingType readingConfig={readingConfig} />
                <CardSelection readingConfig={readingConfig} />
                <Interpretation />
            </main>
        </div>
    )
}

import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useTarot } from "@/contexts/tarot-context"

export default function QuestionStep() {
    const { currentStep, setCurrentStep, question, setQuestion } = useTarot()
    const handleQuestionSubmit = () => {
        if (question.trim()) {
            setCurrentStep("reading-type")
        }
    }
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
        </>
    )
}

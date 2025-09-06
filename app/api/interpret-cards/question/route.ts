import { streamText } from "ai"

export async function POST(req: Request) {
    try {
        const { question, cards, prompt, isFollowup, lastQuestion, lastCards, lastInterpretation, followupQuestion, followupCard } = await req.json()

        if (!question || !cards || cards.length === 0) {
            return new Response("Question and cards are required", {
                status: 400,
            })
        }

        // Format cards with reversed information
        const formattedCards = cards.map(
            (card: { name: string; isReversed: boolean }) =>
                card.isReversed ? `${card.name} Reversed` : card.name
        )

        // Use custom prompt if provided, otherwise use default
        const systemPrompt = prompt || `You are an expert tarot reader. Provide clear, concise, and mystical interpretations that directly address the user's question. Use the card's meaning as your guide, but do not explain the symbolism or card details. Focus only on delivering an insightful answer that feels intuitive and to the point.`

        let userPrompt: string

        if (isFollowup && lastQuestion && lastCards && lastInterpretation && followupQuestion && followupCard) {
            // Format follow-up data
            const formattedLastCards = lastCards.map(
                (card: { name: string; isReversed: boolean }) =>
                    card.isReversed ? `${card.name} Reversed` : card.name
            )
            const formattedFollowupCard = followupCard.isReversed ? `${followupCard.name} Reversed` : followupCard.name

            userPrompt = `Previous Reading:
Question: "${lastQuestion}"
Cards: ${formattedLastCards.join(", ")}
Interpretation: "${lastInterpretation}"

Follow-up Question: "${followupQuestion}"
Follow-up Card: ${formattedFollowupCard}

Please provide a follow-up interpretation that builds upon the previous reading and addresses the new question with the additional card insight.`
        } else {
            userPrompt = `Question: "${question}"
Cards: ${formattedCards.join(", ")}`
        }

        const result = streamText({
            model: "openai/gpt-5-nano",
            // maxOutputTokens: 200,
            system: systemPrompt,
            prompt: userPrompt,
        })

        console.log(result)

        return result.toUIMessageStreamResponse()
    } catch (error) {
        console.error("Error generating interpretation:", error)
        return new Response("Failed to generate interpretation", {
            status: 500,
        })
    }
}

import { streamText } from "ai"

export async function POST(req: Request) {
    try {
        const { question, cards } = await req.json()

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

        // const interpretationDepth = isPremium ? "premium" : "basic"

        const result = streamText({
            model: "openai/gpt-5-nano",
            // maxOutputTokens: 200,
            system: `You are an expert tarot reader. Provide clear, concise, and mystical interpretations that directly address the user’s question. Use the card’s meaning as your guide, but do not explain the symbolism or card details. Focus only on delivering an insightful answer that feels intuitive and to the point.`,
            prompt: `Question: "${question}"
Cards: ${formattedCards.join(", ")}`,
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

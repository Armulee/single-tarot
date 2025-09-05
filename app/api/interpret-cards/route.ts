import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
    try {
        const { question, cards, cardCount, isPremium } = await req.json()

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

        const interpretationDepth = isPremium ? "premium" : "basic"

        const result = streamText({
            model: "openai/gpt-5-nano",
            system: `You are a tarot reader. Provide direct, concise interpretations that answer the user's question using the card meanings. Keep responses under 1000 tokens. Be mystical but focused.`,
            prompt: `Question: "${question}"
Cards: ${formattedCards.join(", ")}

Answer the question directly using the card meanings. Explain each card briefly and how they answer the question. Keep it under 1000 tokens.`,
        })

        return result.toUIMessageStreamResponse()
    } catch (error) {
        console.error("Error generating interpretation:", error)
        return new Response("Failed to generate interpretation", { status: 500 })
    }
}

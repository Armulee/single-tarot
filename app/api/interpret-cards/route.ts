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

        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_API_KEY) {
            console.error("OpenAI API key not configured")
            return new Response("AI service not configured", {
                status: 500,
            })
        }

        // Format cards with reversed information
        const formattedCards = cards.map(
            (card: { name: string; isReversed: boolean }) =>
                card.isReversed ? `${card.name} Reversed` : card.name
        )

        const interpretationDepth = isPremium ? "premium" : "basic"

        const result = streamText({
            model: openai("gpt-5-nano"),
            system: `You are a mystical tarot reader with deep knowledge of tarot symbolism, astrology, and spiritual guidance. You provide insightful, personalized interpretations that blend traditional tarot meanings with modern wisdom. 

Your interpretations should be:
- Mystical and engaging, using cosmic language
- Personalized to the user's specific question
- Respectful of tarot traditions while being accessible
- Encouraging and empowering
- ${
                isPremium
                    ? "Detailed and comprehensive with advanced insights"
                    : "Clear and concise with basic guidance"
            }

Format your response with emojis, clear sections, and mystical language that creates an immersive experience.`,
            prompt: `Provide a ${interpretationDepth} tarot reading interpretation.

**Question:** "${question}"
**Cards Drawn:** ${formattedCards.join(", ")}
**Number of Cards:** ${cardCount}

Please provide a comprehensive interpretation that:
1. Addresses the specific question asked
2. Explains the meaning of each card drawn (including reversed meanings if applicable)
3. Shows how the cards work together to answer the question
4. Provides practical guidance and next steps
5. Uses mystical, cosmic language that feels authentic to tarot reading

${
    isPremium
        ? "As a premium reading, include deeper symbolic analysis, numerological insights, and personalized action steps."
        : "Keep the interpretation clear and accessible while maintaining the mystical atmosphere."
}

Format with clear sections, emojis, and engaging mystical language.`,
        })

        return result.toUIMessageStreamResponse()
    } catch (error) {
        console.error("Error generating interpretation:", error)
        
        // Provide more specific error messages
        if (error instanceof Error) {
            if (error.message.includes("API key")) {
                return new Response("AI service authentication failed", { status: 500 })
            }
            if (error.message.includes("model")) {
                return new Response("AI model not available", { status: 500 })
            }
        }
        
        return new Response("Failed to generate interpretation. Please try again.", { status: 500 })
    }
}

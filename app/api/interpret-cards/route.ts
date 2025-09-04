import { NextResponse, type NextRequest } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
    try {
        const { question, cards, cardCount, isPremium } = await request.json()

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

        const result = await generateText({
            model: "openai/gpt-5",
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

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.error("Error generating interpretation:", error)
        return NextResponse.json(
            { error: "Failed to generate interpretation. Please try again." },
            { status: 500 }
        )
    }
}

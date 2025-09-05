import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
    try {
        console.log("🚀 API Route: POST request received")
        console.log("🌐 Vercel Function: Starting tarot interpretation")
        
        const { question, cards, cardCount, isPremium } = await req.json()
        
        console.log("📥 API Route: Request data:", {
            question: question ? "✅ Has question" : "❌ No question",
            cardsCount: cards?.length || 0,
            cardCount,
            isPremium
        })
        
        console.log("🔍 Vercel Log: Full request body:", JSON.stringify({ question, cards, cardCount, isPremium }, null, 2))

        if (!question || !cards || cards.length === 0) {
            console.log("❌ API Route: Missing required data")
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

        console.log("🤖 API Route: Starting streamText with model openai/gpt-5-nano")
        console.log("🔑 Vercel Log: OpenAI API Key configured:", !!process.env.OPENAI_API_KEY)
        
        const result = streamText({
            model: "openai/gpt-5-nano",
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

        console.log("📤 API Route: Returning stream response")
        console.log("✅ Vercel Log: Successfully created streamText result")
        return result.toUIMessageStreamResponse()
    } catch (error) {
        console.error("❌ API Route: Error generating interpretation:", error)
        console.error("🚨 Vercel Log: Full error details:", {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            name: error instanceof Error ? error.name : undefined
        })
        return new Response("Failed to generate interpretation", { status: 500 })
    }
}

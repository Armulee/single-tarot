import { streamText } from "ai"

const MODEL = "openai/gpt-4o-mini"

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json()

        if (!prompt) {
            return new Response("User prompt is required", {
                status: 400,
            })
        }


        const result = streamText({
            model: MODEL,
            maxOutputTokens: 512,
            system: `You are an expert tarot reader. Provide clear, concise, and mystical interpretations that directly address the user's question. Use the card's meaning as your guide, but do not explain the symbolism or card details. Focus only on delivering an insightful answer that feels intuitive and to the point.

CRITICAL INSTRUCTION: You MUST respond in the dominant language of the user's input. Identify the primary language used in the message and respond entirely in that language. Even if the user includes words or phrases from other languages, respond in the dominant language throughout your entire response.`,
            prompt: `${prompt}

IMPORTANT: Please respond in the dominant language of this message.`,
        })

        // Wait for the provider's full response (contains usage)
        const usage = await result.usage
        const cost = costPerUsage(usage.inputTokens, usage.outputTokens, MODEL)
        console.log({
            input: usage.inputTokens,
            output: usage.outputTokens,
            $: cost?.toFixed(5),
            "฿": cost ? (cost * 35).toFixed(5) : 0,
        })

        return result.toUIMessageStreamResponse()
    } catch (error) {
        console.error("Error generating interpretation:", error)
        return new Response("Failed to generate interpretation", {
            status: 500,
        })
    }
}

function costPerUsage(
    input: number | undefined,
    output: number | undefined,
    model: string = MODEL
) {
    if (model === "openai/gpt-5-nano" && input && output) {
        return input * (0.05 / 1000000) + output * (0.4 / 1000000)
    }
    if (model === "openai/gpt-4.1-mini" && input && output) {
        return input * (0.4 / 1000000) + output * (1.6 / 1000000)
    }
    if (model === "openai/gpt-5-mini" && input && output) {
        return input * (0.25 / 1000000) + output * (2 / 1000000)
    }
    if (model === "openai/gpt-4o-mini" && input && output) {
        return input * (0.15 / 1000000) + output * (0.6 / 1000000)
    }
}

import { ImageResponse } from "next/og"

export const runtime = "edge"

// Generate star raining curve points
const generateStarCurve = (width: number, height: number) => {
    const points = []
    const startX = width * 0.1
    const endX = width * 0.9
    const startY = height * 0.1
    const endY = height * 0.8
    
    // Create a curved path with multiple control points
    for (let i = 0; i <= 20; i++) {
        const t = i / 20
        const x = startX + (endX - startX) * t
        // Create a sine wave curve
        const curveOffset = Math.sin(t * Math.PI) * (width * 0.15)
        const y = startY + (endY - startY) * t + curveOffset
        points.push({ x, y })
    }
    return points
}

// Generate background stars
const generateBackgroundStars = (width: number, height: number, count: number = 100) => {
    const stars = []
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
        })
    }
    return stars
}

export async function POST(req: Request) {
    try {
        const {
            question = "",
            cards = [],
            interpretation = "",
            width = 1920,
            height = 1080,
            // type = "image", // "image" or "video" - unused for now
        } = await req.json()

        const title = "dooduang.ai"
        const cardText = Array.isArray(cards) ? cards.join(", ") : String(cards)
        const safeQuestion = String(question)
        const safeInterpretation = String(interpretation)
        
        // Generate star curve and background stars
        const starCurve = generateStarCurve(width, height)
        const backgroundStars = generateBackgroundStars(width, height, 150)

        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: 80,
                        background:
                            "radial-gradient(ellipse at top, #1b1440 0%, #0f0b24 50%, #0a081a 100%)",
                        color: "#ffffff",
                        fontFamily:
                            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial",
                        position: "relative",
                    }}
                >
                    {/* Background Stars */}
                    {backgroundStars.map((star, index) => (
                        <div
                            key={`bg-star-${index}`}
                            style={{
                                position: "absolute",
                                left: star.x,
                                top: star.y,
                                width: star.size,
                                height: star.size,
                                backgroundColor: "#ffffff",
                                borderRadius: "50%",
                                opacity: star.opacity,
                                boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
                            }}
                        />
                    ))}

                    {/* Star Raining Curve */}
                    {starCurve.map((point, index) => (
                        <div
                            key={`curve-star-${index}`}
                            style={{
                                position: "absolute",
                                left: point.x - 2,
                                top: point.y - 2,
                                width: 4,
                                height: 4,
                                backgroundColor: "#8b5cf6",
                                borderRadius: "50%",
                                boxShadow: "0 0 12px rgba(139, 92, 246, 0.8), 0 0 24px rgba(139, 92, 246, 0.4)",
                                opacity: 0.9,
                            }}
                        />
                    ))}

                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            zIndex: 10,
                        }}
                    >
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 9999,
                                background:
                                    "linear-gradient(135deg,#8b5cf6,#06b6d4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 800,
                                fontSize: 24,
                            }}
                        >
                            ✨
                        </div>
                        <div style={{ fontSize: 40, fontWeight: 800 }}>
                            {title}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 40,
                            flex: 1,
                            zIndex: 10,
                        }}
                    >
                        {/* Question Section */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            <div style={{ fontSize: 28, opacity: 0.9, fontWeight: 600 }}>
                                Your Question
                            </div>
                            <div
                                style={{
                                    fontSize: 48,
                                    fontWeight: 700,
                                    lineHeight: 1.3,
                                    textShadow: "0 8px 32px rgba(56,189,248,0.3)",
                                }}
                            >
                                {`"${safeQuestion}"`}
                            </div>
                            {cardText ? (
                                <div
                                    style={{
                                        marginTop: 12,
                                        fontSize: 28,
                                        opacity: 0.8,
                                        fontWeight: 500,
                                    }}
                                >
                                    {`Cards: ${cardText}`}
                                </div>
                            ) : null}
                        </div>

                        {/* Interpretation Section */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 24,
                                borderRadius: 32,
                                padding: 40,
                                background:
                                    "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15) 35%, rgba(34,211,238,0.12) 70%)",
                                boxShadow:
                                    "0 20px 40px -10px rgba(56,189,248,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.15)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 16,
                                    marginBottom: 16,
                                }}
                            >
                                <div
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 9999,
                                        background: "rgba(99,102,241,0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 24,
                                    }}
                                >
                                    🌟
                                </div>
                                <div style={{ fontSize: 36, fontWeight: 700 }}>
                                    Cosmic Guidance
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "block",
                                    fontSize: 32,
                                    lineHeight: 1.6,
                                    whiteSpace: "pre-wrap",
                                    fontWeight: 500,
                                }}
                            >
                                {safeInterpretation}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            opacity: 0.9,
                            zIndex: 10,
                        }}
                    >
                        <div style={{ fontSize: 24, fontWeight: 500 }}>
                            Generated with dooduang.ai
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>dooduang.ai</div>
                    </div>
                </div>
            ),
            {
                width: Number(width) || 1920,
                height: Number(height) || 1080,
                headers: {
                    "Content-Type": "image/png",
                },
            }
        )
    } catch (error) {
        console.error("Image generation error:", error)
        return new Response("Failed to generate image", { status: 500 })
    }
}

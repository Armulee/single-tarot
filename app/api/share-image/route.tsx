import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function POST(req: Request) {
    try {
        const {
            question = "",
            cards = [],
            interpretation = "",
            width = 1080,
            height = 1350,
        } = await req.json()

        const title = "dooduang.ai"
        const cardText = Array.isArray(cards) ? cards.join(", ") : String(cards)
        const safeQuestion = String(question)
        const safeInterpretation = String(interpretation)

        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: 64,
                        background:
                            "radial-gradient(ellipse at top, #1b1440 0%, #0f0b24 50%, #0a081a 100%)",
                        color: "#ffffff",
                        fontFamily:
                            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 9999,
                                background:
                                    "linear-gradient(135deg,#8b5cf6,#06b6d4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 800,
                            }}
                        >
                            *
                        </div>
                        <div style={{ fontSize: 32, fontWeight: 800 }}>
                            {title}
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 28,
                        }}
                    >
                        <div style={{ fontSize: 24, opacity: 0.9 }}>
                            Question
                        </div>
                        <div
                            style={{
                                fontSize: 40,
                                fontWeight: 700,
                                lineHeight: 1.2,
                                textShadow: "0 6px 24px rgba(56,189,248,0.25)",
                            }}
                        >
                            {`"${safeQuestion}"`}
                        </div>
                        {cardText ? (
                            <div
                                style={{
                                    marginTop: 8,
                                    fontSize: 24,
                                    opacity: 0.9,
                                }}
                            >
                                {`Cards: ${cardText}`}
                            </div>
                        ) : null}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            borderRadius: 24,
                            padding: 32,
                            background:
                                "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(168,85,247,0.14) 35%, rgba(34,211,238,0.12) 70%)",
                            boxShadow:
                                "0 10px 30px -10px rgba(56,189,248,0.35)",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: 12,
                            }}
                        >
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 9999,
                                    background: "rgba(99,102,241,0.25)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                *
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 700 }}>
                                Cosmic Guidance
                            </div>
                        </div>
                        <div
                            style={{
                                display: "block",
                                fontSize: 28,
                                lineHeight: 1.5,
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {safeInterpretation}
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            opacity: 0.9,
                        }}
                    >
                        <div style={{ fontSize: 22 }}>
                            Generated with dooduang.ai
                        </div>
                        <div style={{ fontSize: 22 }}>dooduang.ai</div>
                    </div>
                </div>
            ),
            {
                width: Number(width) || 1080,
                height: Number(height) || 1350,
                headers: {
                    "Content-Type": "image/png",
                },
            }
        )
    } catch {
        return new Response("Failed to generate image", { status: 500 })
    }
}

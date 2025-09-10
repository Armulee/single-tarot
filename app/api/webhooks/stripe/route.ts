import { NextRequest, NextResponse } from "next/server"

// Temporarily disabled - requires proper Stripe configuration
export async function POST(request: NextRequest) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 500 })
}
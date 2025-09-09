import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { TarotProvider } from "@/contexts/tarot-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import "./globals.css"
import Footer from "@/components/footer"
import CosmicStars from "@/components/cosmic-stars"

/* Updated fonts to match mystical design brief */
const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair",
    weight: ["400", "600", "700"],
})

const sourceSans = Source_Sans_3({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-source-sans",
    weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
    title: "ดูดวง.ai - AI-Powered Mystical Guidance",
    description:
        "Discover your destiny with AI-powered tarot card interpretations in a stunning cosmic experience",
    generator: "v0.app",
    other: {
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
        "apple-mobile-web-app-title": "ดูดวง.ai",
    },
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#0a0a1a",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body
                className={`font-sans ${sourceSans.variable} ${playfairDisplay.variable}`}
            >
                <CosmicStars />

                <AuthProvider>
                    <TarotProvider>
                        <div className='min-h-screen flex flex-col'>
                            <Navbar />
                            <main className='pt-16 min-[calc(100dvh-65px)] relative overflow-hidden home-gradient'>
                                <Suspense fallback={null}>{children}</Suspense>
                            </main>
                            <Footer />
                        </div>
                    </TarotProvider>
                </AuthProvider>
                <Analytics />
            </body>
        </html>
    )
}

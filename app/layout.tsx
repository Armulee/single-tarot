import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { TarotProvider } from "@/contexts/tarot-context"
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
                {/* Floating Tarot Cards - Global */}
                <div className='fixed inset-0 pointer-events-none z-0'>
                    <div
                        className='absolute top-20 left-20 w-16 h-24 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30 float-animation'
                        style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                        className='absolute top-32 right-16 w-16 h-24 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30 float-animation'
                        style={{ animationDelay: "2s" }}
                    ></div>
                    <div
                        className='absolute bottom-32 left-12 w-16 h-24 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30 float-animation'
                        style={{ animationDelay: "4s" }}
                    ></div>
                    <div
                        className='absolute top-1/2 right-32 w-12 h-18 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30 float-animation'
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className='absolute bottom-20 right-1/4 w-12 h-18 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30 float-animation'
                        style={{ animationDelay: "3s" }}
                    ></div>
                </div>
                <TarotProvider>
                    <div className='min-h-screen flex flex-col'>
                        <Navbar />
                        <main className='pt-16 min-[calc(100dvh-65px)] relative overflow-hidden home-gradient'>
                            <Suspense fallback={null}>{children}</Suspense>
                        </main>
                        <Footer />
                    </div>
                </TarotProvider>
                <Analytics />
            </body>
        </html>
    )
}

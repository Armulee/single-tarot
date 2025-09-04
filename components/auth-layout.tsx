import type React from "react"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 backdrop-blur-sm bg-card/10 border-b border-border/20">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-serif font-bold">✦</span>
          </div>
          <h1 className="font-serif font-bold text-xl text-foreground">Cosmic Tarot</h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        {children}
      </main>

      {/* Floating Cosmic Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-32 h-32 rounded-full bg-primary/10 blur-xl float-animation"
          style={{ top: "20%", left: "10%", animationDelay: "0s" }}
        ></div>
        <div
          className="absolute w-24 h-24 rounded-full bg-secondary/10 blur-xl float-animation"
          style={{ top: "60%", right: "15%", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute w-40 h-40 rounded-full bg-accent/5 blur-xl float-animation"
          style={{ bottom: "20%", left: "20%", animationDelay: "4s" }}
        ></div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { AuthLayout } from "@/components/auth-layout"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    // Simulate account creation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // TODO: Implement actual sign up logic
    console.log("Sign up attempt:", formData)

    setIsLoading(false)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center float-animation">
            <span className="text-secondary font-serif font-bold text-2xl">✨</span>
          </div>
          <div className="space-y-2">
            <h1 className="font-serif font-bold text-3xl text-balance">Join the Cosmos</h1>
            <p className="text-muted-foreground">Create your account and begin your mystical journey</p>
          </div>
        </div>

        {/* Sign Up Form */}
        <Card className="p-8 bg-card/10 backdrop-blur-sm border-border/20 card-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="bg-input/20 backdrop-blur-sm border-border/30 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 floating-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="bg-input/20 backdrop-blur-sm border-border/30 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 floating-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className="bg-input/20 backdrop-blur-sm border-border/30 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 floating-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    className="bg-input/20 backdrop-blur-sm border-border/30 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 floating-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                className="border-border/30 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-secondary hover:text-secondary/80 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-secondary hover:text-secondary/80 transition-colors">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 text-lg card-glow"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-secondary hover:text-secondary/80 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

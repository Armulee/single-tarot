"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AuthLayout } from "@/components/auth-layout"

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate authentication
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // TODO: Implement actual authentication logic
        console.log("Sign in attempt:", { email, password })

        setIsLoading(false)
    }

    return (
        <AuthLayout>
            <div className='w-full max-w-md space-y-8'>
                {/* Header */}
                <div className='text-center space-y-4'>
                    <div className='w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center float-animation'>
                        <span className='text-primary font-serif font-bold text-2xl'>
                            ✦
                        </span>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='font-serif font-bold text-3xl text-balance'>
                            Welcome Back
                        </h1>
                        <p className='text-muted-foreground'>
                            Sign in to continue your cosmic journey
                        </p>
                    </div>
                </div>

                {/* Sign In Form */}
                <Card className='p-8 bg-card/10 backdrop-blur-sm border-border/20 card-glow'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label
                                    htmlFor='email'
                                    className='text-sm font-medium'
                                >
                                    Email Address
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id='email'
                                        type='email'
                                        placeholder='Enter your email'
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className='bg-input/20 backdrop-blur-sm border-border/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 floating-input'
                                        required
                                    />
                                    <div className='absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none opacity-0 transition-opacity duration-300 peer-focus:opacity-100'></div>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label
                                    htmlFor='password'
                                    className='text-sm font-medium'
                                >
                                    Password
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id='password'
                                        type='password'
                                        placeholder='Enter your password'
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className='bg-input/20 backdrop-blur-sm border-border/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 floating-input'
                                        required
                                    />
                                    <div className='absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none opacity-0 transition-opacity duration-300 peer-focus:opacity-100'></div>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between text-sm'>
                            <Link
                                href='/forgot-password'
                                className='text-primary hover:text-primary/80 transition-colors'
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type='submit'
                            disabled={isLoading}
                            className='w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg card-glow'
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </Card>

                {/* Sign Up Link */}
                <div className='text-center'>
                    <p className='text-muted-foreground'>
                        New to ดูดวง.ai?{" "}
                        <Link
                            href='/signup'
                            className='text-primary hover:text-primary/80 transition-colors font-medium'
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    )
}

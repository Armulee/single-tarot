"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { User, Mail, Lock, Trash2, ArrowLeft } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProfilePage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin")
        }
        if (user) {
            setName(user.user_metadata?.name || user.email?.split("@")[0] || "")
            setEmail(user.email || "")
        }
    }, [user, loading, router])

    const handleDeleteAccount = async () => {
        // This would typically call a backend API to delete the account
        setError(
            "Account deletion is not yet implemented. Please contact support."
        )
    }

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center'>
                        <div className='w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center float-animation'>
                            <span className='text-primary font-serif font-bold text-2xl'>
                                ✦
                            </span>
                        </div>
                        <p className='text-muted-foreground mt-4'>
                            Loading your profile...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className='w-full max-w-2xl space-y-8'>
            {/* Header */}
            <div className='text-center space-y-4'>
                <div className='w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center float-animation'>
                    <span className='text-primary font-serif font-bold text-2xl'>
                        ✦
                    </span>
                </div>
                <div className='space-y-2'>
                    <h1 className='font-serif font-bold text-3xl text-balance'>
                        Profile Settings
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage your account and preferences
                    </p>
                </div>
            </div>

            {/* Back Button */}
            <div className='flex justify-start'>
                <Button
                    variant='ghost'
                    onClick={() => router.back()}
                    className='text-muted-foreground hover:text-foreground'
                >
                    <ArrowLeft className='w-4 h-4 mr-2' />
                    Back
                </Button>
            </div>

            {/* Error/Success Messages */}
            {error && (
                <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
                    {error}
                </div>
            )}

            {/* Profile Information */}
            <Card className='p-8 bg-card/10 backdrop-blur-sm border-border/20 card-glow'>
                <div className='space-y-6'>
                    <div className='flex items-center gap-3'>
                        <User className='w-5 h-5 text-primary' />
                        <h2 className='text-xl font-semibold'>
                            Profile Information
                        </h2>
                    </div>

                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label
                                htmlFor='name'
                                className='text-sm font-medium'
                            >
                                Display Name
                            </Label>
                            <Input
                                id='name'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='bg-input/20 backdrop-blur-sm border-border/30'
                                placeholder='Enter your display name'
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label
                                htmlFor='email'
                                className='text-sm font-medium'
                            >
                                Email Address
                            </Label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                <Input
                                    id='email'
                                    type='email'
                                    value={email}
                                    className='bg-input/20 backdrop-blur-sm border-border/30 pl-10'
                                    disabled
                                />
                            </div>
                            <p className='text-xs text-muted-foreground'>
                                Email cannot be changed. Contact support if
                                needed.
                            </p>
                        </div>
                    </div>

                    <Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'>
                        Save Changes
                    </Button>
                </div>
            </Card>

            {/* Account Actions */}
            <Card className='p-8 bg-card/10 backdrop-blur-sm border-border/20 card-glow'>
                <div className='space-y-6'>
                    <div className='flex items-center gap-3'>
                        <Lock className='w-5 h-5 text-primary' />
                        <h2 className='text-xl font-semibold'>
                            Account Actions
                        </h2>
                    </div>

                    <div className='space-y-4'>
                        <div className='flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/20'>
                            <div>
                                <h3 className='font-medium text-destructive'>
                                    Delete Account
                                </h3>
                                <p className='text-sm text-muted-foreground'>
                                    Permanently delete your account and all data
                                </p>
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant='destructive' size='sm'>
                                        <Trash2 className='w-4 h-4 mr-2' />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove all your data from our
                                            servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDeleteAccount}
                                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                        >
                                            Delete Account
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

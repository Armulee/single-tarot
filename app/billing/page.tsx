"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Receipt, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import { usePayment } from "@/contexts/payment-context"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default function BillingPage() {
    const { user } = useAuth()
    const { paymentHistory, loading, error, refreshPaymentHistory } =
        usePayment()

    const formatDate = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), {
                addSuffix: true,
            })
        } catch {
            return "Unknown time"
        }
    }

    const formatAmount = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
        }).format(amount / 100) // Stripe amounts are in cents
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "succeeded":
                return "bg-green-500/20 text-green-500 border-green-500/30"
            case "pending":
                return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
            case "failed":
            case "canceled":
                return "bg-red-500/20 text-red-500 border-red-500/30"
            default:
                return "bg-gray-500/20 text-gray-500 border-gray-500/30"
        }
    }

    if (!user) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-background via-background to-background/50'>
                <div className='container mx-auto px-4 py-8 max-w-4xl'>
                    <Card className='p-8 text-center'>
                        <div className='space-y-4'>
                            <div className='w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center'>
                                <Receipt className='w-8 h-8 text-primary' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-lg mb-2'>
                                    Sign in to view billing
                                </h3>
                                <p className='text-muted-foreground mb-4'>
                                    Create an account to access your billing and
                                    payment information.
                                </p>
                                <div className='flex gap-2 justify-center'>
                                    <Button asChild>
                                        <Link href='/signin'>Sign In</Link>
                                    </Button>
                                    <Button variant='outline' asChild>
                                        <Link href='/signup'>Sign Up</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-background via-background to-background/50'>
                <div className='container mx-auto px-4 py-8 max-w-4xl'>
                    <Card className='p-8 text-center'>
                        <div className='space-y-4'>
                            <div className='w-16 h-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center'>
                                <AlertCircle className='w-8 h-8 text-destructive' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-lg mb-2'>
                                    Error loading billing information
                                </h3>
                                <p className='text-muted-foreground mb-4'>
                                    {error}
                                </p>
                                <Button
                                    onClick={refreshPaymentHistory}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                    ) : null}
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-background via-background to-background/50'>
            <div className='container mx-auto px-4 py-8 max-w-4xl'>
                <div className='space-y-6'>
                    {/* Header */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <Button
                                variant='ghost'
                                asChild
                                className='p-0 h-auto text-muted-foreground hover:text-foreground'
                            >
                                <Link href='/profile'>
                                    <ArrowLeft className='w-4 h-4 mr-2' />
                                    Back to Profile
                                </Link>
                            </Button>
                            <div>
                                <h1 className='font-serif font-bold text-3xl'>
                                    Billing
                                </h1>
                                <p className='text-muted-foreground'>
                                    Your billing and payment records
                                </p>
                            </div>
                        </div>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={refreshPaymentHistory}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className='w-4 h-4 animate-spin' />
                            ) : (
                                "Refresh"
                            )}
                        </Button>
                    </div>

                    {/* Billing Records */}
                    {loading ? (
                        <div className='space-y-4'>
                            {[...Array(3)].map((_, i) => (
                                <Card key={i} className='p-4 animate-pulse'>
                                    <div className='space-y-3'>
                                        <div className='h-4 bg-muted/20 rounded w-3/4'></div>
                                        <div className='h-3 bg-muted/10 rounded w-1/2'></div>
                                        <div className='flex gap-2'>
                                            <div className='h-6 bg-muted/10 rounded w-16'></div>
                                            <div className='h-6 bg-muted/10 rounded w-20'></div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : paymentHistory.length === 0 ? (
                        <Card className='p-8 text-center'>
                            <div className='space-y-4'>
                                <div className='w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center'>
                                    <Receipt className='w-8 h-8 text-muted-foreground' />
                                </div>
                                <div>
                                    <h3 className='font-semibold text-lg'>
                                        No billing records yet
                                    </h3>
                                    <p className='text-muted-foreground'>
                                        Your billing records will appear here
                                        once you make your first purchase.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className='space-y-4'>
                            {paymentHistory.map((payment) => (
                                <Card key={payment.id} className='p-6'>
                                    <div className='flex items-center justify-between'>
                                        <div className='space-y-2'>
                                            <div className='flex items-center gap-3'>
                                                <h3 className='font-semibold text-lg'>
                                                    {payment.description ||
                                                        "Premium Subscription"}
                                                </h3>
                                                <Badge
                                                    className={getStatusColor(
                                                        payment.status
                                                    )}
                                                >
                                                    {payment.status}
                                                </Badge>
                                            </div>
                                            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                                <span>
                                                    Payment ID:{" "}
                                                    {payment.payment_intent_id}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    {formatDate(
                                                        payment.created_at
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <div className='text-2xl font-bold'>
                                                {formatAmount(
                                                    payment.amount,
                                                    payment.currency
                                                )}
                                            </div>
                                            <div className='text-sm text-muted-foreground'>
                                                {payment.currency.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

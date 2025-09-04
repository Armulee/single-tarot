"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Crown, Zap } from "lucide-react"
import Link from "next/link"

interface UsageTrackerProps {
  isPremium: boolean
  dailyReadings: number
  monthlyReadings: number
  maxDailyReadings: number
  maxMonthlyReadings: number
}

export function UsageTracker({
  isPremium,
  dailyReadings,
  monthlyReadings,
  maxDailyReadings,
  maxMonthlyReadings,
}: UsageTrackerProps) {
  const dailyProgress = (dailyReadings / maxDailyReadings) * 100

  if (isPremium) {
    return (
      <Card className="p-4 bg-card/10 backdrop-blur-sm border-primary/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Crown className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Premium Member</h3>
            <p className="text-xs text-muted-foreground">
              {monthlyReadings} / {maxMonthlyReadings.toLocaleString()} readings this month
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 bg-card/10 backdrop-blur-sm border-border/20">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Daily Readings</h3>
          <span className="text-xs text-muted-foreground">
            {dailyReadings} / {maxDailyReadings}
          </span>
        </div>
        <Progress value={dailyProgress} className="h-2" />

        {dailyReadings >= maxDailyReadings && (
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">Daily limit reached</p>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link href="/pricing">
                <Zap className="w-3 h-3 mr-1" />
                Upgrade for Unlimited
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

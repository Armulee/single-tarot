"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface UsageTrackerProps {
  dailyReadings: number
  maxDailyReadings: number
}

export function UsageTracker({
  dailyReadings,
  maxDailyReadings,
}: UsageTrackerProps) {
  const dailyProgress = (dailyReadings / maxDailyReadings) * 100

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
            <p className="text-xs text-muted-foreground">Daily limit reached. Come back tomorrow!</p>
          </div>
        )}
      </div>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target } from "lucide-react"

interface Goal {
  id: string
  name: string
  current: number
  target: number
  type: "short-term" | "long-term"
  daysLeft?: number
}

export function GoalsProgress() {
  const goals: Goal[] = [
    { id: "1", name: "Emergency Fund", current: 80000, target: 100000, type: "short-term", daysLeft: 90 },
    { id: "2", name: "Vacation", current: 35000, target: 50000, type: "short-term", daysLeft: 120 },
    { id: "3", name: "House Down Payment", current: 250000, target: 500000, type: "long-term", daysLeft: 730 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-accent" />
          Your Goals
        </CardTitle>
        <CardDescription>Track progress toward your financial goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100
          return (
            <div key={goal.id}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{goal.name}</h3>
                <Badge variant={goal.type === "short-term" ? "default" : "secondary"}>
                  {goal.type === "short-term" ? "Short-term" : "Long-term"}
                </Badge>
              </div>
              <Progress value={Math.min(percentage, 100)} className="h-2 mb-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  ₹{goal.current.toLocaleString("en-IN")} / ₹{goal.target.toLocaleString("en-IN")}
                </span>
                <span>{percentage.toFixed(0)}%</span>
              </div>
              {goal.daysLeft && <p className="text-xs text-muted-foreground mt-1">{goal.daysLeft} days remaining</p>}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

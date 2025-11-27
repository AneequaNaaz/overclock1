"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

interface BadgeItem {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: Date
}

export function BadgesCollection() {
  const badges: BadgeItem[] = [
    {
      id: "1",
      name: "First Saver",
      description: "Set your first financial goal",
      icon: "🎯",
      earned: true,
      earnedDate: new Date(),
    },
    { id: "2", name: "Income Tracker", description: "Enter your monthly income", icon: "💰", earned: true },
    { id: "3", name: "Expense Logger", description: "Log your first 10 expenses", icon: "📝", earned: true },
    { id: "4", name: "Budget Master", description: "Complete a budget challenge", icon: "🏆", earned: false },
    { id: "5", name: "Streak Master", description: "Maintain a 7-day savings streak", icon: "🔥", earned: false },
    { id: "6", name: "Goal Achiever", description: "Complete your first financial goal", icon: "⭐", earned: false },
    { id: "7", name: "Savings Champion", description: "Reach 10k in savings", icon: "💎", earned: false },
    { id: "8", name: "Master Planner", description: "Set 5 financial goals", icon: "📊", earned: false },
  ]

  const earnedCount = badges.filter((b) => b.earned).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-secondary" />
          Badges & Achievements
        </CardTitle>
        <CardDescription>
          You've earned {earnedCount} of {badges.length} badges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-2 transition-all ${
                  badge.earned ? "bg-secondary/20 scale-110" : "bg-muted grayscale opacity-50"
                }`}
              >
                {badge.icon}
              </div>
              <p className="text-xs font-medium text-center text-foreground">{badge.name}</p>
              <p className="text-xs text-center text-muted-foreground mt-1">{badge.description}</p>
              {badge.earned && <Badge className="mt-2 text-xs">Earned</Badge>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

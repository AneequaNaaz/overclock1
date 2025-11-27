"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Zap } from "lucide-react"

interface Challenge {
  id: string
  name: string
  description: string
  type: "daily" | "weekly" | "monthly"
  progress: number
  target: number
  rewardXp: number
  completed: boolean
}

export function ChallengesWidget() {
  const challenges: Challenge[] = [
    {
      id: "1",
      name: "Daily Tracker",
      description: "Log at least one expense",
      type: "daily",
      progress: 1,
      target: 1,
      rewardXp: 10,
      completed: true,
    },
    {
      id: "2",
      name: "Weekly Saver",
      description: "Save at least $200 this week",
      type: "weekly",
      progress: 150,
      target: 200,
      rewardXp: 50,
      completed: false,
    },
    {
      id: "3",
      name: "Monthly Goal",
      description: "Reach your monthly savings target",
      type: "monthly",
      progress: 2800,
      target: 3200,
      rewardXp: 100,
      completed: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-secondary" />
          Active Challenges
        </CardTitle>
        <CardDescription>Complete challenges to earn XP and badges</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="p-4 border border-border/50 rounded-lg space-y-3 hover:border-secondary/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{challenge.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {challenge.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
              </div>
              {challenge.completed && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
            </div>

            {!challenge.completed && (
              <>
                <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {challenge.progress} / {challenge.target}
                  </span>
                  <span className="text-sm font-medium text-secondary">+{challenge.rewardXp} XP</span>
                </div>
              </>
            )}

            {challenge.completed && (
              <div className="text-sm text-primary font-medium">Completed! Claim your +{challenge.rewardXp} XP</div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

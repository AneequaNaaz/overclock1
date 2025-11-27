"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

interface LevelSystemProps {
  level: number
  totalXp: number
  currentXp: number
}

export function LevelSystem({ level, totalXp, currentXp }: LevelSystemProps) {
  const xpForNextLevel = level * 100 + 100
  const xpProgress = (currentXp / xpForNextLevel) * 100

  const getLevelColor = () => {
    if (level >= 10) return "from-secondary to-primary"
    if (level >= 5) return "from-accent to-primary"
    return "from-primary to-accent"
  }

  const getLevelBadge = () => {
    if (level >= 15) return "Legendary"
    if (level >= 10) return "Master"
    if (level >= 5) return "Expert"
    return "Novice"
  }

  return (
    <Card className={`border-2 bg-gradient-to-br ${getLevelColor()}/10 border-primary/30`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Star className="w-5 h-5 text-secondary" />
          Level Progression
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-6xl font-black bg-gradient-to-r ${getLevelColor()} bg-clip-text text-transparent mb-2`}>
            {level}
          </div>
          <p className="text-lg font-bold text-primary">{getLevelBadge()} Budget Warrior</p>
        </div>

        <div className="bg-background/50 border border-border/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">EXPERIENCE POINTS</span>
            <span className="text-sm font-bold text-primary">
              {currentXp} / {xpForNextLevel}
            </span>
          </div>
          <Progress value={Math.min(xpProgress, 100)} className="h-4" />
          <div className="w-full bg-primary/20 text-primary text-center rounded py-1">
            <p className="text-xs font-bold">
              {xpProgress.toFixed(0)}% to Level {level + 1}
            </p>
          </div>
        </div>

        <div className="bg-accent/10 border-2 border-accent/30 rounded-lg p-3">
          <p className="text-sm font-bold text-accent mb-1">Total XP Earned</p>
          <p className="text-2xl font-black text-accent">{totalXp.toLocaleString()}</p>
        </div>

        <div className="pt-2 space-y-2 bg-primary/5 border-l-4 border-primary p-3 rounded">
          <p className="text-xs font-black text-primary uppercase">XP Rewards</p>
          <ul className="text-xs text-muted-foreground space-y-1 font-medium">
            <li>⚡ +10 XP for logging expenses</li>
            <li>🎯 +25 XP for daily challenges</li>
            <li>🏆 +50 XP for goal milestones</li>
            <li>👑 +100 XP for achievements</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

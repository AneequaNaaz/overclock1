"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Award } from "lucide-react"

interface AvatarState {
  mood: "happy" | "neutral" | "sad" | "excited" | "legendary"
  message: string
  action: string
}

interface AvatarDisplayProps {
  savingsRate: number
  streakDays: number
}

export function AvatarDisplay({ savingsRate, streakDays }: AvatarDisplayProps) {
  const [state, setState] = useState<AvatarState>({ mood: "happy", message: "Welcome back!", action: "" })
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 600)

    if (savingsRate > 40) {
      setState({
        mood: "legendary",
        message: "LEGENDARY STATUS UNLOCKED!",
        action: "🔥 You're a financial warrior!",
      })
    } else if (savingsRate > 30) {
      setState({
        mood: "excited",
        message: "Amazing savings rate!",
        action: "💪 Keep crushing your goals!",
      })
    } else if (savingsRate > 20) {
      setState({
        mood: "happy",
        message: "Great job saving!",
        action: "✨ You're doing awesome!",
      })
    } else if (savingsRate > 10) {
      setState({
        mood: "neutral",
        message: "Keep tracking to improve.",
        action: "📈 Every bit helps!",
      })
    } else {
      setState({
        mood: "sad",
        message: "Let's boost those savings!",
        action: "💡 You can do this!",
      })
    }
  }, [savingsRate])

  const getMoodEmoji = () => {
    switch (state.mood) {
      case "legendary":
        return "👑"
      case "excited":
        return "🤩"
      case "happy":
        return "😊"
      case "neutral":
        return "😐"
      case "sad":
        return "😢"
    }
  }

  const getMoodColor = () => {
    switch (state.mood) {
      case "legendary":
        return "text-secondary drop-shadow-lg"
      case "excited":
        return "text-primary"
      case "happy":
        return "text-accent"
      case "neutral":
        return "text-muted-foreground"
      case "sad":
        return "text-destructive"
    }
  }

  const getBorderColor = () => {
    switch (state.mood) {
      case "legendary":
        return "border-2 border-secondary/50 bg-gradient-to-br from-secondary/10 to-primary/10"
      case "excited":
        return "border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10"
      case "happy":
        return "border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-secondary/10"
      case "neutral":
        return "border-2 border-border/50"
      case "sad":
        return "border-2 border-destructive/30"
    }
  }

  return (
    <Card className={`${getBorderColor()} transition-all hover:shadow-lg`}>
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Award className="w-5 h-5 text-secondary" />
          Your Guardian
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div
          className={`text-8xl ${getMoodColor()} transition-all ${
            showAnimation ? "scale-110 animate-bounce" : "scale-100"
          }`}
        >
          {getMoodEmoji()}
        </div>

        <p className="text-center text-lg font-bold">{state.message}</p>
        <p className="text-center text-sm text-muted-foreground">{state.action}</p>

        {streakDays > 0 && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
              streakDays > 7
                ? "bg-secondary/20 border-secondary text-secondary"
                : "bg-primary/20 border-primary text-primary"
            }`}
          >
            <Zap className="w-5 h-5" />
            <span className="font-black">{streakDays} STREAK</span>
          </div>
        )}

        <div className="w-full pt-4 border-t border-border/50 text-center">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              Savings Rate: <span className="font-bold text-foreground">{savingsRate.toFixed(1)}%</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

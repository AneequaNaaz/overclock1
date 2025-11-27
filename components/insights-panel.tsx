"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp } from "lucide-react"

interface Insight {
  title: string
  description: string
  recommendation: string
  impact: string
}

export function InsightsPanel() {
  const insights: Insight[] = [
    {
      title: "Spending Pattern Alert",
      description: "Your entertainment spending has increased 35% this month",
      recommendation: "Consider setting a weekly budget for entertainment",
      impact: "Potential savings: $150/month",
    },
    {
      title: "Smart Savings Opportunity",
      description: "You can save $50/month on your phone bill",
      recommendation: "Compare plans with other providers",
      impact: "Annual savings: $600",
    },
    {
      title: "Goal On Track",
      description: "Your emergency fund is growing nicely at 3% above target",
      recommendation: "Keep up the great work!",
      impact: "Status: Exceeding expectations",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-secondary" />
          Smart Insights
        </CardTitle>
        <CardDescription>Personalized recommendations based on your spending</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="p-4 border border-border/50 rounded-lg space-y-2 hover:border-secondary/50 transition-colors"
          >
            <div className="flex items-start gap-2">
              <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{insight.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                <div className="bg-secondary/10 border border-secondary/20 rounded p-2 mt-3">
                  <p className="text-xs font-medium text-secondary mb-1">Recommendation:</p>
                  <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
                </div>
                <p className="text-xs text-accent mt-2 font-medium">{insight.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

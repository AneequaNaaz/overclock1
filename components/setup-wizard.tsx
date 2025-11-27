"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, DollarSign, Target, Tag } from "lucide-react"

interface SetupWizardProps {
  onComplete?: () => void
}

export function SetupWizard({ onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(1)
  const [income, setIncome] = useState("")
  const [goals, setGoals] = useState<Array<{ name: string; amount: string; type: "short" | "long" }>>([
    { name: "", amount: "", type: "short" },
  ])

  const handleAddGoal = () => {
    setGoals([...goals, { name: "", amount: "", type: "short" }])
  }

  const handleGoalChange = (index: number, field: string, value: string) => {
    const newGoals = [...goals]
    newGoals[index] = { ...newGoals[index], [field]: value }
    setGoals(newGoals)
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else onComplete?.()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Step {step} of 3</p>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                What's Your Monthly Income?
              </CardTitle>
              <CardDescription>This helps us personalize your budget recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="income" className="text-base">
                  Monthly Income (after taxes)
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-3 text-muted-foreground">₹</span>
                  <Input
                    id="income"
                    type="number"
                    placeholder="0"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-sm text-foreground font-medium">💡 Pro Tip</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Use your after-tax income for accurate budgeting. This includes salary, side gigs, and passive income.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Set Your Financial Goals
              </CardTitle>
              <CardDescription>What are you saving for? Add your short-term and long-term goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index} className="p-4 border border-border/50 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Goal Name</Label>
                      <Input
                        placeholder="e.g., Vacation"
                        value={goal.name}
                        onChange={(e) => handleGoalChange(index, "name", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Target Amount</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                        <Input
                          type="number"
                          placeholder="0"
                          value={goal.amount}
                          onChange={(e) => handleGoalChange(index, "amount", e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={goal.type === "short" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleGoalChange(index, "type", "short")}
                    >
                      Short-term
                    </Button>
                    <Button
                      variant={goal.type === "long" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleGoalChange(index, "type", "long")}
                    >
                      Long-term
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent" onClick={handleAddGoal}>
                + Add Another Goal
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-secondary" />
                Ready to Start?
              </CardTitle>
              <CardDescription>Here's your setup summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly Income</span>
                  <span className="font-semibold">₹{Number.parseFloat(income || "0").toLocaleString("en-IN")}</span>
                </div>
                <div className="border-t border-border" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Your Goals ({goals.filter((g) => g.name).length})
                  </p>
                  {goals
                    .filter((g) => g.name)
                    .map((goal, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{goal.name}</span>
                        <span>₹{Number.parseFloat(goal.amount || "0").toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground">🎮 You're all set!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start earning XP and badges as you track your spending and reach your goals.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1 gap-2">
            {step === 3 ? "Complete Setup" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

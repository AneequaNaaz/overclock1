"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { DollarSign, Target, TrendingUp, Save, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EditFundsPage() {
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [mandatoryExpenses, setMandatoryExpenses] = useState("")
  const [optionalExpenses, setOptionalExpenses] = useState("")
  const [savingsGoal, setSavingsGoal] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [isDemo, setIsDemo] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setIsDemo(true)
        setMonthlyIncome("50000")
        setMandatoryExpenses("15000")
        setOptionalExpenses("17000")
        setSavingsGoal("20000")
        setLoading(false)
        return
      }

      const { data: financialData } = await supabase
        .from("financial_data")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      if (financialData) {
        setMonthlyIncome(String(financialData.monthly_income))
        setMandatoryExpenses(String(financialData.mandatory_expenses))
        setOptionalExpenses(String(financialData.optional_expenses))
        setSavingsGoal(String(financialData.savings_goal))
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const handleSave = async () => {
    if (!monthlyIncome || !mandatoryExpenses || !optionalExpenses) {
      setMessage("Please fill in all fields")
      return
    }

    setSaving(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setMessage("Please log in to save your funds")
      setSaving(false)
      return
    }

    const { error } = await supabase.from("financial_data").insert([
      {
        user_id: user.id,
        monthly_income: Number.parseFloat(monthlyIncome),
        mandatory_expenses: Number.parseFloat(mandatoryExpenses),
        optional_expenses: Number.parseFloat(optionalExpenses),
        savings_goal: Number.parseFloat(savingsGoal || "0"),
      },
    ])

    if (error) {
      setMessage("Error saving funds: " + error.message)
    } else {
      setMessage("✅ Funds updated successfully!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        <MainNav />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center">Loading your funds...</div>
        </div>
      </main>
    )
  }

  const totalExpenses = Number.parseFloat(mandatoryExpenses || "0") + Number.parseFloat(optionalExpenses || "0")
  const availableToSave = Number.parseFloat(monthlyIncome || "0") - totalExpenses
  const savingsRate = monthlyIncome ? ((availableToSave / Number.parseFloat(monthlyIncome)) * 100).toFixed(1) : "0"

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <MainNav />

      {isDemo && (
        <div className="bg-accent/20 border-b-2 border-accent/50 py-2 px-4">
          <p className="text-center text-sm text-accent font-medium">
            📊 Demo mode • Sign up to save your funds permanently
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground mb-2">Update Your Funds</h1>
          <p className="text-muted-foreground">Keep your budget data fresh and accurate</p>
        </div>

        <div className="space-y-6">
          {/* Income Card */}
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Monthly Income
              </CardTitle>
              <CardDescription>Your after-tax monthly income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="pl-8 text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Expenses Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-destructive/30 bg-gradient-to-br from-destructive/10 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="w-4 h-4 text-destructive" />
                  Mandatory Expenses
                </CardTitle>
                <CardDescription>Rent, utilities, food, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">₹</span>
                  <Input
                    type="number"
                    placeholder="0"
                    value={mandatoryExpenses}
                    onChange={(e) => setMandatoryExpenses(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  Optional Expenses
                </CardTitle>
                <CardDescription>Entertainment, dining out, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">₹</span>
                  <Input
                    type="number"
                    placeholder="0"
                    value={optionalExpenses}
                    onChange={(e) => setOptionalExpenses(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Savings Goal Card */}
          <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Monthly Savings Goal
              </CardTitle>
              <CardDescription>How much you want to save each month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  className="pl-8 text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-1">Total Expenses</p>
                <p className="text-2xl font-black text-destructive">₹{totalExpenses.toLocaleString("en-IN")}</p>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-1">Available to Save</p>
                <p className="text-2xl font-black text-accent">
                  ₹{Math.max(0, availableToSave).toLocaleString("en-IN")}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-1">Savings Rate</p>
                <p className="text-2xl font-black text-primary">{savingsRate}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-4 rounded-lg border-2 ${
                message.includes("✅")
                  ? "bg-accent/10 border-accent/50 text-accent"
                  : "bg-destructive/10 border-destructive/50 text-destructive"
              }`}
            >
              {message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={() => router.back()} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="flex-1 gap-2">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Funds
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import { ExpenseTracker } from "@/components/expense-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SpendingBreakdown } from "@/components/spending-breakdown"
import { GoalsProgress } from "@/components/goals-progress"
import { SavingsChart } from "@/components/savings-chart"
import { AvatarDisplay } from "@/components/avatar-display"
import { LevelSystem } from "@/components/level-system"
import { BadgesCollection } from "@/components/badges-collection"
import { ChallengesWidget } from "@/components/challenges-widget"
import { createClient } from "@/lib/supabase/client"
import { Flame } from "lucide-react"

interface ProfileData {
  id: string
  level: number
  xp: number
  total_saved: number
  avatar_emoji: string
  username: string
}

interface FinancialData {
  monthly_income: number
  mandatory_expenses: number
  optional_expenses: number
  savings_goal: number
}

const DEMO_PROFILE: ProfileData = {
  id: "demo",
  level: 5,
  xp: 2500,
  total_saved: 75000,
  avatar_emoji: "🎮",
  username: "Demo User",
}

const DEMO_FINANCIAL: FinancialData = {
  monthly_income: 50000,
  mandatory_expenses: 15000,
  optional_expenses: 17000,
  savings_goal: 20000,
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [financialData, setFinancialData] = useState<FinancialData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)
  const [streakDays] = useState(7)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setProfile(DEMO_PROFILE)
        setFinancialData(DEMO_FINANCIAL)
        setIsDemo(true)
        setLoading(false)
        return
      }

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profileData) {
        setProfile(profileData)
      }

      const { data: financialData } = await supabase
        .from("financial_data")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      if (financialData) {
        setFinancialData(financialData)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        <MainNav />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Loading your quest data...</div>
        </div>
      </main>
    )
  }

  const income = financialData?.monthly_income || 50000
  const mandatoryExpenses = financialData?.mandatory_expenses || 15000
  const optionalExpenses = financialData?.optional_expenses || 17000
  const monthlyExpenses = mandatoryExpenses + optionalExpenses
  const availableToSave = income - monthlyExpenses
  const savingsRate = ((availableToSave / income) * 100).toFixed(1)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <MainNav />

      {isDemo && (
        <div className="bg-accent/20 border-b-2 border-accent/50 py-2 px-4">
          <p className="text-center text-sm text-accent font-medium">
            📊 Viewing demo data •{" "}
            <a href="/auth/sign-up" className="underline hover:no-underline">
              Sign up
            </a>{" "}
            to save your real data
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border-2 border-primary/30 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground mb-2">
                Welcome, {profile?.username || "Adventurer"}!
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Flame className="w-4 h-4 text-secondary" />
                {streakDays} day streak - Keep the momentum going!
              </p>
            </div>
            <div className="text-5xl">{profile?.avatar_emoji || "🎮"}</div>
          </div>
        </div>

        {/* Quick Stats with Gamified Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-primary">₹{income.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-destructive/30 bg-gradient-to-br from-destructive/10 to-transparent hover:border-destructive/60 transition-all hover:shadow-lg hover:shadow-destructive/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-destructive">₹{monthlyExpenses.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-transparent hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available to Save</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-accent">₹{availableToSave.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-1">{savingsRate}% savings rate</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-transparent hover:border-secondary/60 transition-all hover:shadow-lg hover:shadow-secondary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-black text-secondary">
                  ₹{(profile?.total_saved || 75000).toLocaleString("en-IN")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            <SavingsChart />
            <SpendingBreakdown />
          </div>

          <div className="space-y-8">
            <GoalsProgress />
            <AvatarDisplay savingsRate={Number.parseFloat(savingsRate)} streakDays={streakDays} />
            <LevelSystem level={profile?.level || 1} totalXp={profile?.xp || 0} currentXp={profile?.xp || 0} />
          </div>
        </div>

        {/* Gamification Row */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <BadgesCollection />
          <ChallengesWidget />
        </div>

        {/* Expense Tracker */}
        <div className="mt-8">
          <ExpenseTracker />
        </div>
      </div>
    </main>
  )
}

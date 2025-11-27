import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NavWrapper from "@/components/nav-wrapper"
import { BarChart3, Target, TrendingUp, Zap } from "lucide-react"
import { GamifiedHero } from "@/components/gamified-hero"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <NavWrapper />

      {user ? (
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight text-foreground mb-4">Welcome back, {user.email}!</h2>
            <p className="text-xl text-muted-foreground mb-8">Ready to continue your financial adventure?</p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </section>
      ) : (
        <GamifiedHero />
      )}

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Epic Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Smart Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Real-time visualizations of income, expenses, and savings</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10">
            <CardHeader>
              <Target className="w-8 h-8 text-accent mb-2" />
              <CardTitle>Goal Setting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Set and track short and long-term financial goals</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-secondary/50 transition-all hover:shadow-lg hover:shadow-secondary/10">
            <CardHeader>
              <Zap className="w-8 h-8 text-secondary mb-2" />
              <CardTitle>Gamification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Earn badges, complete challenges, climb the leaderboard</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Smart Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Personalized recommendations to optimize your spending</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Budget Legend © 2025. Making finance fun, one achievement at a time.</p>
        </div>
      </footer>
    </main>
  )
}

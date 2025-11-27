"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, Sparkles, Flame } from "lucide-react"
import { useEffect, useState } from "react"

export function GamifiedHero() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `float ${3 + (p.id % 3)}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6 animate-bounce">
          <Zap className="w-8 h-8 text-primary" />
          <span className="text-sm font-bold text-primary uppercase tracking-widest">Welcome to Budget Legend</span>
          <Flame className="w-8 h-8 text-secondary" />
        </div>

        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Level Up Your Finances
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Turn boring budget planning into an epic adventure. Earn achievements, complete challenges, and watch your
          wealth grow while crushing your financial goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/sign-up">
            <Button size="lg" className="text-lg px-8 gap-2 group">
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              Start Free Quest
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Log In
            </Button>
          </Link>
        </div>

        {/* Stats with gamified styling */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-card border-2 border-primary/30 rounded-lg p-4 hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-primary/20">
            <p className="text-3xl font-black text-primary">10K+</p>
            <p className="text-sm text-muted-foreground">Players</p>
          </div>
          <div className="bg-card border-2 border-accent/30 rounded-lg p-4 hover:border-accent/60 transition-all hover:shadow-lg hover:shadow-accent/20">
            <p className="text-3xl font-black text-accent">$50M+</p>
            <p className="text-sm text-muted-foreground">Saved</p>
          </div>
          <div className="bg-card border-2 border-secondary/30 rounded-lg p-4 hover:border-secondary/60 transition-all hover:shadow-lg hover:shadow-secondary/20">
            <p className="text-3xl font-black text-secondary">98%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}

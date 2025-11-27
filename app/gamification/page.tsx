"use client"

import { AvatarDisplay } from "@/components/avatar-display"
import { LevelSystem } from "@/components/level-system"
import { BadgesCollection } from "@/components/badges-collection"
import { ChallengesWidget } from "@/components/challenges-widget"
import { MainNav } from "@/components/main-nav"

export default function GamificationPage() {
  // Mock data - in a real app, this would come from your database
  const userGameState = {
    level: 5,
    totalXp: 1250,
    currentXp: 45,
    streakDays: 7,
    savingsRate: 28,
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      <MainNav />

      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Your Progress</h1>
          <p className="text-muted-foreground">Level up your finances with our gamification system</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <AvatarDisplay savingsRate={userGameState.savingsRate} streakDays={userGameState.streakDays} />
            <LevelSystem
              level={userGameState.level}
              totalXp={userGameState.totalXp}
              currentXp={userGameState.currentXp}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <BadgesCollection />
            <ChallengesWidget />
          </div>
        </div>
      </div>
    </main>
  )
}

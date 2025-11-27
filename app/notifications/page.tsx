"use client"

import { NotificationCenter } from "@/components/notification-center"
import { BillReminders } from "@/components/bill-reminders"
import { InsightsPanel } from "@/components/insights-panel"
import { MainNav } from "@/components/main-nav"

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      <MainNav />

      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Notifications & Reminders</h1>
          <p className="text-muted-foreground">Stay updated with bills, achievements, and insights</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <NotificationCenter />
          </div>

          <div className="space-y-8">
            <BillReminders />
            <InsightsPanel />
          </div>
        </div>
      </div>
    </main>
  )
}

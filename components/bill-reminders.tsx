"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface BillReminder {
  id: string
  name: string
  amount: number
  dueDate: Date
  status: "paid" | "upcoming" | "overdue"
}

export function BillReminders() {
  const bills: BillReminder[] = [
    {
      id: "1",
      name: "Rent",
      amount: 1500,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: "upcoming",
    },
    {
      id: "2",
      name: "Internet",
      amount: 60,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: "upcoming",
    },
    {
      id: "3",
      name: "Electricity",
      amount: 120,
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "overdue",
    },
    {
      id: "4",
      name: "Phone Bill",
      amount: 80,
      dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: "paid",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="w-5 h-5 text-primary" />
      case "upcoming":
        return <Clock className="w-5 h-5 text-accent" />
      case "overdue":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Paid</Badge>
      case "upcoming":
        return <Badge className="bg-accent/20 text-accent hover:bg-accent/30">Due Soon</Badge>
      case "overdue":
        return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">Overdue</Badge>
      default:
        return null
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const upcomingTotal = bills.filter((b) => b.status === "upcoming").reduce((sum, b) => sum + b.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Reminders</CardTitle>
        <CardDescription>{bills.filter((b) => b.status === "upcoming").length} bills due this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingTotal > 0 && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              Total upcoming: <span className="font-bold text-accent">${upcomingTotal}</span>
            </p>
          </div>
        )}

        <div className="space-y-3">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center gap-3 p-3 border border-border/50 rounded-lg hover:border-primary/50 transition-colors"
            >
              {getStatusIcon(bill.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{bill.name}</p>
                  <p className="font-semibold">${bill.amount}</p>
                </div>
                <p className="text-sm text-muted-foreground">Due {formatDate(bill.dueDate)}</p>
              </div>
              {getStatusBadge(bill.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

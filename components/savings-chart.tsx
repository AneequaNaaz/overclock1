"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SavingsChart() {
  const data = [
    { month: "Jan", savings: 50000, target: 50000 },
    { month: "Feb", savings: 95000, target: 100000 },
    { month: "Mar", savings: 150000, target: 150000 },
    { month: "Apr", savings: 200000, target: 200000 },
    { month: "May", savings: 235000, target: 250000 },
    { month: "Jun", savings: 280000, target: 300000 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Trend</CardTitle>
        <CardDescription>Your cumulative savings over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
              formatter={(value) => `₹${(value as number).toLocaleString("en-IN")}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              name="Your Savings"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--accent))" }}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

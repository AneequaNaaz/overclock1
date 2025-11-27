"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

interface Expense {
  id: string
  name: string
  amount: number
  category: "mandatory" | "optional"
  frequency: "monthly" | "weekly" | "one-time"
}

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    category: "mandatory" as const,
    frequency: "monthly" as const,
  })

  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount) return

    const expense: Expense = {
      id: Math.random().toString(),
      name: newExpense.name,
      amount: Number.parseFloat(newExpense.amount),
      category: newExpense.category,
      frequency: newExpense.frequency,
    }

    setExpenses([...expenses, expense])
    setNewExpense({ name: "", amount: "", category: "mandatory", frequency: "monthly" })
  }

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const mandatoryTotal = expenses.filter((e) => e.category === "mandatory").reduce((sum, e) => sum + e.amount, 0)
  const optionalTotal = expenses.filter((e) => e.category === "optional").reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
          <CardDescription>Track both mandatory and optional spending</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Expense Name</Label>
              <Input
                placeholder="e.g., Rent"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Amount</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={newExpense.category === "mandatory" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewExpense({ ...newExpense, category: "mandatory" })}
                  className="flex-1"
                >
                  Mandatory
                </Button>
                <Button
                  variant={newExpense.category === "optional" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewExpense({ ...newExpense, category: "optional" })}
                  className="flex-1"
                >
                  Optional
                </Button>
              </div>
            </div>
            <div>
              <Label>Frequency</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={newExpense.frequency === "monthly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewExpense({ ...newExpense, frequency: "monthly" })}
                  className="flex-1"
                >
                  Monthly
                </Button>
                <Button
                  variant={newExpense.frequency === "weekly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewExpense({ ...newExpense, frequency: "weekly" })}
                  className="flex-1"
                >
                  Weekly
                </Button>
              </div>
            </div>
          </div>

          <Button onClick={handleAddExpense} className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-2 border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Mandatory Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{mandatoryTotal.toLocaleString("en-IN")}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary/20 bg-secondary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Optional Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{optionalTotal.toLocaleString("en-IN")}</p>
          </CardContent>
        </Card>
      </div>

      {expenses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Expenses ({expenses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{expense.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.category === "mandatory" ? "📌" : "🎯"} {expense.frequency}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-lg">₹{expense.amount.toLocaleString("en-IN")}</p>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveExpense(expense.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

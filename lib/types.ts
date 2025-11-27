export interface User {
  id: string
  email: string
  createdAt: Date
}

export interface FinancialProfile {
  id: string
  userId: string
  monthlyIncome: number
  totalSavings: number
  totalDebt: number
  totalAssets: number
}

export interface FinancialGoal {
  id: string
  userId: string
  name: string
  targetAmount: number
  currentAmount: number
  type: "short-term" | "long-term"
  deadline: Date
  status: "active" | "completed" | "abandoned"
}

export interface Expense {
  id: string
  userId: string
  category: "mandatory" | "optional"
  name: string
  amount: number
  frequency: "monthly" | "weekly" | "one-time"
  dueDate?: Date
  paid: boolean
}

export interface GameState {
  level: number
  totalXp: number
  currentXp: number
  streakDays: number
  lastActivityDate?: Date
}

export interface Badge {
  id: string
  name: string
  description?: string
  iconUrl?: string
  criteria: string
}

export interface Challenge {
  id: string
  userId: string
  name: string
  description?: string
  type: "daily" | "weekly" | "monthly"
  targetAmount?: number
  rewardXp: number
  status: "active" | "completed" | "failed"
  startDate: Date
  endDate: Date
}

export interface Notification {
  id: string
  userId: string
  type: "reminder" | "achievement" | "warning" | "motivational"
  title: string
  message?: string
  read: boolean
  createdAt: Date
}

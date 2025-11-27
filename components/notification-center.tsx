"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Bell, AlertCircle, Trophy, Lightbulb, Clock } from "lucide-react"

interface Notification {
  id: string
  type: "reminder" | "achievement" | "warning" | "motivational"
  title: string
  message: string
  read: boolean
  createdAt: Date
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "Badge Unlocked!",
      message: 'You\'ve earned the "Expense Logger" badge for tracking 10 expenses!',
      read: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: "2",
      type: "reminder",
      title: "Upcoming Bill",
      message: "Your rent payment is due in 3 days. Set aside $1,500.",
      read: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "3",
      type: "motivational",
      title: "Great Progress!",
      message: "You've reached 28% savings rate this month. Keep it up!",
      read: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "4",
      type: "warning",
      title: "Spending Alert",
      message: "Your optional spending is 15% higher than usual. Consider cutting back.",
      read: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="w-5 h-5 text-accent" />
      case "achievement":
        return <Trophy className="w-5 h-5 text-secondary" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      case "motivational":
        return <Lightbulb className="w-5 h-5 text-primary" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getColorClass = (type: string) => {
    switch (type) {
      case "reminder":
        return "border-accent/30 bg-accent/5"
      case "achievement":
        return "border-secondary/30 bg-secondary/5"
      case "warning":
        return "border-destructive/30 bg-destructive/5"
      case "motivational":
        return "border-primary/30 bg-primary/5"
      default:
        return "border-border/50"
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              {unreadCount} new notification{unreadCount !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          {unreadCount > 0 && <Badge className="px-3">{unreadCount}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition-all ${getColorClass(notification.type)} ${
                  !notification.read ? "border-2" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{notification.title}</h3>
                      <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                        {getTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="flex gap-2 mt-3">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs bg-transparent"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

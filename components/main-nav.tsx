"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Zap, Bell, Menu, LogOut, LogIn, User, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Profile {
  level: number
  xp: number
  avatar_emoji: string
  username: string
}

export function MainNav() {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        if (data) setProfile(data)
      }
      setIsLoading(false)
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    setProfile(null)
  }

  const routes = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/funds", label: "Edit Funds", icon: DollarSign },
    { href: "/gamification", label: "Progress", icon: Zap },
    { href: "/notifications", label: "Alerts", icon: Bell },
  ]

  return (
    <nav className="border-b-2 border-primary/20 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              BL
            </div>
            <h1 className="text-xl font-black hidden sm:block text-foreground">Budget Legend</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link key={route.href} href={route.href}>
                  <Button variant="ghost" className="gap-2 hover:bg-primary/10">
                    <Icon className="w-4 h-4" />
                    {route.label}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Profile & Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading && (
              <>
                {profile ? (
                  <>
                    <Link href="/profile">
                      <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20 hover:border-primary/50 cursor-pointer transition-colors">
                        <span className="text-lg">{profile.avatar_emoji}</span>
                        <div className="text-sm">
                          <p className="font-bold text-primary">Lvl {profile.level}</p>
                          <p className="text-xs text-muted-foreground">{profile.username}</p>
                        </div>
                      </div>
                    </Link>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <LogIn className="w-4 h-4" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button size="sm" className="gap-2">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden mt-4 space-y-2">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link key={route.href} href={route.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-transparent hover:bg-primary/10"
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {route.label}
                  </Button>
                </Link>
              )
            })}
            {!isLoading && (
              <>
                {profile ? (
                  <>
                    <Link href="/profile">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 bg-transparent hover:bg-primary/10"
                        onClick={() => setOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent hover:bg-destructive/10 text-destructive"
                      onClick={() => {
                        handleLogout()
                        setOpen(false)
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                        <LogIn className="w-4 h-4" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <Button className="w-full justify-start gap-2">Sign Up</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

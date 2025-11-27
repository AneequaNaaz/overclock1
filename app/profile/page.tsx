"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { createClient } from "@/lib/supabase/client"
import { Save, Edit2 } from "lucide-react"

interface ProfileData {
  id: string
  username: string
  avatar_emoji: string
  level: number
  total_saved: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    avatar_emoji: "🎮",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (data) {
          setProfile(data)
          setFormData({
            username: data.username || "",
            avatar_emoji: data.avatar_emoji || "🎮",
          })
        }
      }
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleSave = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from("profiles")
        .update({
          username: formData.username,
          avatar_emoji: formData.avatar_emoji,
        })
        .eq("id", user.id)

      setProfile({
        ...profile!,
        username: formData.username,
        avatar_emoji: formData.avatar_emoji,
      })
      setIsEditing(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        <MainNav />
        <div className="max-w-2xl mx-auto px-4 py-8">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      <MainNav />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Profile</span>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="gap-2">
                <Edit2 className="w-4 h-4" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardTitle>
            <CardDescription>Manage your budget quest profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label>Display Name</Label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Enter your name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Avatar Emoji</Label>
                  <Input
                    value={formData.avatar_emoji}
                    onChange={(e) => setFormData({ ...formData, avatar_emoji: e.target.value })}
                    placeholder="Pick an emoji"
                    className="mt-2"
                    maxLength={2}
                  />
                </div>

                <Button onClick={handleSave} className="w-full gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{profile?.avatar_emoji}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="text-2xl font-bold">{profile?.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="text-2xl font-bold text-primary">{profile?.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Saved</p>
                    <p className="text-2xl font-bold text-accent">₹{profile?.total_saved.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

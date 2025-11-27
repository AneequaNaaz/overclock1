"use client"
import { SetupWizard } from "@/components/setup-wizard"
import { useRouter } from "next/navigation"

export default function SetupPage() {
  const router = useRouter()

  const handleComplete = () => {
    router.push("/dashboard")
  }

  return <SetupWizard onComplete={handleComplete} />
}

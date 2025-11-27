import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Zap } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Zap className="w-8 h-8" />
            Budget Legend
          </div>
        </div>

        <div className="bg-card border-2 border-secondary/20 rounded-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-secondary/20 p-4 rounded-full">
              <Mail className="w-12 h-12 text-secondary" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
          <p className="text-muted-foreground mb-6">
            We've sent you a confirmation link. Click it to verify your account and start your adventure!
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6 text-sm text-muted-foreground">
            Didn't receive an email? Check your spam folder or try signing up again.
          </div>

          <Link href="/auth/login">
            <Button className="w-full" size="lg">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { LockKeyhole, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async () => {
    if (password.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Password updated successfully')
      router.push('/login')
    }

    setLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-[-100px]
            top-[-100px]
            h-[300px]
            w-[300px]
            rounded-full
            bg-primary/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-120px]
            right-[-120px]
            h-[320px]
            w-[320px]
            rounded-full
            bg-primary/5
            blur-3xl
          "
        />

      </div>

      <div className="relative z-10 w-full max-w-md">

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-border/30
            bg-card/50
            backdrop-blur-xl
            shadow-2xl
          "
        >

          {/* Header */}

          <div className="border-b border-border/20 p-8 text-center">

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-primary/20
                bg-primary/10
              "
            >
              <LockKeyhole className="h-7 w-7 text-primary" />
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight">
              Reset Password
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              Create a strong new password for your account.
            </p>

          </div>

          {/* Form */}

          <div className="space-y-6 p-8">

            <div className="space-y-2">

              <Label>
                New Password
              </Label>

              <Input
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  h-12
                  border-border/30
                  bg-background/50
                "
              />

              <p className="text-xs text-foreground/50">
                Password must contain at least 8 characters.
              </p>

            </div>

            <div
              className="
                rounded-2xl
                border
                border-primary/15
                bg-primary/5
                p-4
              "
            >

              <div className="flex items-start gap-3">

                <ShieldCheck
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                    text-primary
                  "
                />

                <div>

                  <p className="text-sm font-medium">
                    Security Tip
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                    Use a combination of uppercase letters,
                    lowercase letters, numbers, and symbols.
                  </p>

                </div>

              </div>

            </div>

            <Button
              onClick={handleResetPassword}
              disabled={loading}
              className="
                h-12
                w-full
                rounded-xl
                text-base
                font-semibold
              "
            >

              {loading ? (
                'Updating Password...'
              ) : (
                <>
                  Update Password
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}

            </Button>

          </div>

        </div>

      </div>

    </div>
  )
}
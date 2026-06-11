'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    setLoading(true)

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            `${window.location.origin}/reset-password`
        }
      )

    if (error) {
      alert(error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-[-120px]
            top-[-120px]
            h-[320px]
            w-[320px]
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
            h-[340px]
            w-[340px]
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
              <Mail className="h-7 w-7 text-primary" />
            </div>

            <h1 className="mt-5 text-3xl font-black">
              Forgot Password
            </h1>

            <p className="mt-3 text-sm text-foreground/60">
              Enter your email address and we'll send
              you a password reset link.
            </p>

          </div>

          {/* Content */}

          <div className="space-y-6 p-8">

            {success ? (

              <div
                className="
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-green-500/10
                  p-5
                "
              >

                <div className="flex gap-3">

                  <ShieldCheck
                    className="
                      h-5
                      w-5
                      shrink-0
                      text-green-500
                    "
                  />

                  <div>

                    <h3 className="font-semibold">
                      Email Sent
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-foreground/70
                      "
                    >
                      Check your inbox and click the
                      password reset link.
                    </p>

                  </div>

                </div>

              </div>

            ) : (

              <>
                <div className="space-y-2">

                  <Label>
                    Email Address
                  </Label>

                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="
                      h-12
                      border-border/30
                      bg-background/50
                    "
                  />

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

                  <div className="flex gap-3">

                    <ShieldCheck
                      className="
                        mt-0.5
                        h-5
                        w-5
                        shrink-0
                        text-primary
                      "
                    />

                    <p
                      className="
                        text-xs
                        leading-relaxed
                        text-foreground/60
                      "
                    >
                      We'll send a secure password reset
                      link to the email associated with
                      your account.
                    </p>

                  </div>

                </div>

                <Button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="
                    h-12
                    w-full
                    rounded-xl
                    text-base
                    font-semibold
                  "
                >

                  {loading
                    ? 'Sending Reset Link...'
                    : (
                      <>
                        Send Reset Link
                        <ArrowRight
                          className="
                            ml-2
                            h-4
                            w-4
                          "
                        />
                      </>
                    )}

                </Button>
              </>

            )}

            <Link
              href="/login"
              className="
                flex
                items-center
                justify-center
                gap-2
                text-sm
                text-foreground/60
                transition-colors
                hover:text-primary
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}
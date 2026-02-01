'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CheckCircle2, ChevronLeft } from 'lucide-react'
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { icons, Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }


  const supabase = createClient()
  const router = useRouter()


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      // ✅ USER CREATED → REDIRECT TO LOGIN
      if (data.user) {
        router.push('/login')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }




  const benefits = [
    'Live classes with industry experts',
    'Personalized mentorship',
    'Structured learning path',
    '24/7 community support',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/" className="absolute top-4 left-4 sm:top-8 sm:left-8 animate-fade-in">
          <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Value proposition */}
          <div className="hidden md:block space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg mb-4">
                CG
              </div>
              <h1 className="text-4xl font-bold text-foreground leading-tight">Build the Future of Tech</h1>
              <p className="text-foreground/60 mt-3 text-lg">Master system design, competitive programming, and engineering excellence</p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/30">
              <p className="text-sm text-foreground/60 mb-3">Trusted by 15,000+ engineers</p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary/70"></div>
                  <div className="h-8 w-8 rounded-full bg-primary/50"></div>
                  <div className="h-8 w-8 rounded-full bg-primary/30"></div>
                  <div className="h-8 w-8 rounded-full bg-primary/10 border border-border flex items-center justify-center text-xs font-bold">+</div>
                </div>
                <span className="text-sm font-semibold text-foreground">★★★★★ 4.9/5</span>
              </div>
            </div>
          </div>

          {/* Right side - Signup form */}
          <div className="animate-slide-up">
            <Card className="border border-border/50 shadow-xl backdrop-blur-sm bg-background/95">
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Start your journey to becoming an elite engineer today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-medium">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-10 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-10 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="password" className="font-medium">Password</Label>

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="h-10 border-border/50 focus:border-primary pr-10"
                    />

                    {showPassword ? (
                      <EyeOff
                        className="absolute right-3 top-9 cursor-pointer text-muted-foreground"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Eye
                        className="absolute right-3 top-9 cursor-pointer text-muted-foreground"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="confirmPassword" className="font-medium">
                      Confirm Password
                    </Label>

                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="h-10 border-border/50 focus:border-primary pr-10"
                    />

                    {showConfirmPassword ? (
                      <EyeOff
                        className="absolute right-3 top-9 cursor-pointer text-muted-foreground"
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <Eye
                        className="absolute right-3 top-9 cursor-pointer text-muted-foreground"
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )}
                  </div>


                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                      <p className="text-sm text-destructive font-medium">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-foreground/60">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign in
                  </Link>
                </p>

                <div className="mt-6 pt-6 border-t border-border/30">
                  <p className="text-xs text-foreground/50 text-center">
                    By signing up, you agree to our{' '}
                    <Link href="#" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

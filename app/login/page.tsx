'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ArrowRight, ChevronLeft, User } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Eye, EyeOff } from 'lucide-react'


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      console.log("login page ka hu : ", data.user)
      if (error) {
        alert(error.message)
        console.log("error in login : ", error)
        return
      }

      console.log('Logged in user:', data.user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .single()

      console.log("User role is : ", profile?.role);

      // Redirect based on role
      if (profile?.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email first')
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Password reset link sent to your email')
    }
  }


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

        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto font-bold text-lg">
              CG
            </div>
            <h1 className="text-3xl font-bold text-foreground">Welcome to CP Geeks</h1>
            <p className="text-foreground/60">Build the future of tech with industry-leading courses</p>
          </div>

          {/* Login Card */}
          <Card className="border border-border/50 shadow-xl backdrop-blur-sm bg-background/95 animate-slide-up">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-medium">Password</Label>
                    <Link href="#" onClick={handleForgotPassword} className="text-xs text-primary hover:underline font-medium">
                      Forgot password?
                    

                    </Link>
                  </div>

                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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


                <Button
                  type="submit"
                  className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-foreground/50">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-10 border-border/50 hover:bg-foreground/5 bg-transparent"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" />
                </svg>
                Google
              </Button>

              <p className="mt-6 text-center text-sm text-foreground/60">
                New to CP Geeks?{' '}
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Footer CTA */}
          <div className="text-center text-sm text-foreground/50 space-y-2">
            <p>Join 15k+ engineers learning at CP Geeks</p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full bg-primary/70"></div>
                <div className="h-6 w-6 rounded-full bg-primary/50"></div>
                <div className="h-6 w-6 rounded-full bg-primary/30"></div>
              </div>
              <span className="text-xs">★★★★★ 4.9/5</span>
            </div>
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
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

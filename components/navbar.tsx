'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            CG
          </div>
          <span className="text-xl font-bold text-foreground">CP Geeks</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/courses"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Courses
          </Link>
          <Link
            href="/instructors"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Instructors
          </Link>
          <Link
            href="/dsa-sheets"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            DSA Sheets
          </Link>
          <Link
            href="/jobs"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Jobs
          </Link>
        </div>

        {/* Right side: Theme Toggle and Login */}
        <div className="flex items-center gap-3">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full hover:bg-primary/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Link href="/login">
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

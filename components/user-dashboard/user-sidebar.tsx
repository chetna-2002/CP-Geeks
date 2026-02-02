'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  LogOut,
  User,
} from 'lucide-react'

export default function UserSidebar() {
  const supabase = createClient()
  const router = useRouter()

  const [userName, setUserName] = useState('User')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setEmail(user.email || '')

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      if (profile?.full_name) {
        setUserName(profile.full_name)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-64 min-h-screen border-r border-border bg-background px-4 py-6 flex flex-col">
      {/* User Info */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold">{userName}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <Link href="/dashboard/user">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>

        <Link href="/dashboard/user/courses">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            My Courses
          </Button>
        </Link>

        <Link href="/jobs">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Briefcase className="h-4 w-4" />
            Jobs
          </Button>
        </Link>
      </nav>

      {/* Logout */}
      <Button
        variant="destructive"
        className="mt-6 gap-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </aside>
  )
}

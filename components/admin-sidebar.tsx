'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, LayoutGrid, BookOpen, Users, Briefcase, Code2, User, CreditCard, BarChart3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/dashboard/admin/instructors', label: 'Instructors', icon: Users },
  { href: '/dashboard/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/dashboard/admin/dsa-sheets', label: 'DSA Sheets', icon: Code2 },
  { href: '/dashboard/admin/users', label: 'Users', icon: User },
  { href: '/dashboard/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
]


export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 md:hidden z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 z-30 h-screen w-64 border-r border-border/30 bg-background/95 backdrop-blur transition-transform duration-300 md:relative md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full p-6 space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
              CG
            </div>
            <span className="font-bold text-lg text-foreground">CP Geeks</span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon

              const isActive =
                item.href === '/dashboard/admin'
                  ? pathname === '/dashboard/admin'
                  : pathname.startsWith(item.href)

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start gap-3 text-foreground/70 hover:text-foreground hover:bg-primary/10',
                      isActive && 'bg-primary/10 text-primary font-semibold'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}

          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

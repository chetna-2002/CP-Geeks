'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {

  Menu,
  X,

  LayoutGrid,
  BookOpen,
  Users,
  Briefcase,
  Code2,
  User,
  CreditCard,
  User2Icon,

  Shield,

} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [

  {
    href: '/dashboard/admin',
    label: 'Dashboard',
    icon: LayoutGrid,
  },

  {
    href: '/dashboard/admin/courses',
    label: 'Courses',
    icon: BookOpen,
  },

  {
    href: '/dashboard/admin/placements',
    label: 'Placements',
    icon: User2Icon,
  },

  {
    href: '/dashboard/admin/instructors',
    label: 'Instructors',
    icon: Users,
  },

  {
    href: '/dashboard/admin/jobs',
    label: 'Jobs',
    icon: Briefcase,
  },

  {
    href: '/dashboard/admin/dsa-sheets',
    label: 'DSA Sheets',
    icon: Code2,
  },

  {
    href: '/dashboard/admin/users',
    label: 'Users',
    icon: User,
  },

  {
    href: '/dashboard/admin/payments',
    label: 'Payments',
    icon: CreditCard,
  },

]

export function AdminSidebar() {

  const pathname =
    usePathname()

  const [isOpen, setIsOpen] =
    useState(false)

  return (

    <>

      {/* MOBILE */}

      <Button

        variant='outline'

        size='icon'

        onClick={() =>
          setIsOpen(!isOpen)
        }

        className='
        fixed
        bottom-5
        right-5
        z-50

        h-12
        w-12

        rounded-2xl

        border-border/30

        bg-card/95

        backdrop-blur-xl

        shadow-xl

        md:hidden
        '

      >

        {

          isOpen

            ? <X className='h-5 w-5' />

            : <Menu className='h-5 w-5' />

        }

      </Button>

      {/* SIDEBAR */}

      <aside

        className={cn(

          `
          fixed

          left-0
          top-0

          z-40

          h-screen

          w-[250px]

          border-r

          border-border/30

          bg-background/85

          backdrop-blur-2xl

          transition-all

          duration-300

          md:relative
          md:translate-x-0
          `,

          isOpen

            ? 'translate-x-0'

            : '-translate-x-full'

        )}

      >

        {/* GRID BG */}

        <div

          className='
          absolute
          inset-0
          opacity-[0.03]
          '

          style={{

            backgroundImage:

              `
              linear-gradient(
              to right,
              white 1px,
              transparent 1px
              ),

              linear-gradient(
              to bottom,
              white 1px,
              transparent 1px
              )
              `,

            backgroundSize:
              '36px 36px',

          }}

        />

        {/* GLOW */}

        <div

          className='
          absolute

          left-[-100px]
          top-[80px]

          h-[220px]
          w-[220px]

          rounded-full

          bg-primary/[0.05]

          blur-[90px]
          '

        />

        <div

          className='
          relative

          flex
          h-full
          flex-col

          px-4
          py-5
          '

        >

          {/* TOP */}

          <Link

            href='/'

            className='
            border-b
            border-border/30
            pb-5
            '

          >

            <div

              className='
              flex
              items-center
              gap-3
              '

            >

              <div

                className='
                flex

                h-11
                w-11

                items-center
                justify-center

                rounded-2xl

                border
                border-primary/20

                bg-primary/10

                text-primary

                shadow-lg
                shadow-primary/10
                '

              >

                <Shield

                  className='
                  h-5
                  w-5
                  '

                />

              </div>

              <div>

                <h2

                  className='
                  text-base
                  font-black
                  '

                >

                  CP Geeks

                </h2>

                <p

                  className='
                  text-xs
                  text-foreground/45
                  '

                >

                  Control Panel

                </p>

              </div>

            </div>

          </Link>

          {/* NAV */}

          <div

            className='
            mt-6
            flex-1
            '

          >

            <p

              className='
              px-3

              text-[11px]

              font-bold

              uppercase

              tracking-[0.2em]

              text-foreground/35
              '

            >

              Platform

            </p>

            <nav

              className='
              mt-3
              space-y-1.5
              '

            >

              {

                navItems.map(

                  (item) => {

                    const Icon =
                      item.icon

                    const isActive =

                      item.href ===
                      '/dashboard/admin'

                        ?

                        pathname ===
                        '/dashboard/admin'

                        :

                        pathname.startsWith(
                          item.href
                        )

                    return (

                      <Link

                        key={item.href}

                        href={item.href}

                      >

                        <button

                          onClick={() =>
                            setIsOpen(false)
                          }

                          className={cn(

                            `
                            relative

                            flex

                            w-full

                            items-center

                            gap-3

                            rounded-2xl

                            px-3.5
                            py-3

                            text-sm

                            transition-all

                            duration-300
                            `,

                            isActive

                              ?

                              `
                              bg-primary/10

                              text-primary

                              shadow-lg
                              shadow-primary/5
                              `

                              :

                              `
                              text-foreground/60

                              hover:bg-card/60

                              hover:text-foreground
                              `

                          )}

                        >

                          {

                            isActive &&

                            <div

                              className='
                              absolute

                              left-0

                              top-1/2

                              h-6

                              w-[3px]

                              -translate-y-1/2

                              rounded-r-full

                              bg-primary
                              '

                            />

                          }

                          <Icon

                            className='
                            h-4
                            w-4
                            shrink-0
                            '

                          />

                          <span>

                            {item.label}

                          </span>

                        </button>

                      </Link>

                    )

                  }

                )

              }

            </nav>

          </div>

          {/* FOOTER */}

          <div

            className='
            border-t

            border-border/30

            pt-4

            text-xs

            text-foreground/40
            '

          >

            Internal tools for managing
            CP Geeks platform.

          </div>

        </div>

      </aside>

      {/* OVERLAY */}

      {

        isOpen &&

        <div

          onClick={() =>
            setIsOpen(false)
          }

          className='
          fixed
          inset-0

          z-30

          bg-black/70

          backdrop-blur-sm

          md:hidden
          '

        />

      }

    </>

  )

}
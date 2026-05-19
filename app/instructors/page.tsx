'use client'

import { Navbar } from '@/components/navbar'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

import {
  BriefcaseBusiness,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

export default function InstructorsPage() {

  const [instructors, setInstructors] = useState<any[]>([])

  const supabase = createClient()

  useEffect(() => {
    const loadInstructors = async () => {
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setInstructors(data)
      }
    }

    loadInstructors()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 py-16 md:py-20">

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute left-1/4 top-0 h-[320px] w-[320px] rounded-full bg-primary/[0.05] blur-[120px]" />

          <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-primary/[0.03] blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Industry Mentors
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-5xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
              Learn from
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                {' '}Experienced Engineers
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground/65">
              Learn through mentorship, practical engineering experience,
              and structured guidance from mentors focused on long-term growth.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-14">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {instructors.length > 0 ? (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {instructors.map((instructor, i) => (

                <div
                  key={instructor.id}
                  className="group relative overflow-hidden rounded-[26px] border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                >

                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top */}
                  <div className="relative border-b border-border/20 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent p-5">

                    <div className="flex items-start gap-4">

                      {/* Image */}
                      <img
                        src={instructor.image_url}
                        alt={instructor.name}
                        className="h-16 w-16 rounded-2xl object-cover border border-border/30"
                      />

                      {/* Info */}
                      <div className="min-w-0 flex-1">

                        <h2 className="truncate text-xl font-black text-foreground transition-colors group-hover:text-primary">
                          {instructor.name}
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-primary">
                          {instructor.role}
                        </p>

                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/60">
                          {instructor.bio}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col p-5">

                    {/* Description */}
                    <p className="line-clamp-4 text-sm leading-relaxed text-foreground/70">
                      {instructor.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">

                      {[
                        'Mentorship',
                        'Engineering',
                        'Career Growth',
                      ].map((tag, idx) => (
                        <div
                          key={idx}
                          className="rounded-full border border-border/20 bg-background/30 px-3 py-1.5 text-xs text-foreground/60"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>

                    {/* Bottom */}
                    <div className="mt-5 flex items-center justify-between border-t border-border/20 pt-5">

                      {/* Students */}
                      <div>

                        <p className="text-xs uppercase tracking-wide text-foreground/45">
                          Learners Mentored
                        </p>

                        <p className="mt-1 text-xl font-black text-foreground">
                          {instructor.students?.toLocaleString() || '0'}+
                        </p>
                      </div>

                      {/* Icon */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Glow */}
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/[0.05] blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
              ))}
            </div>

          ) : (

            <div className="flex justify-center py-20">

              <div className="max-w-md rounded-[28px] border border-border/40 bg-card/50 p-10 text-center backdrop-blur-xl">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Users className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-black text-foreground">
                  No Instructors Yet
                </h3>

                <p className="mt-3 leading-relaxed text-foreground/60">
                  Instructor profiles will appear here once added.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
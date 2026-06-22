'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import {
  Clock3,
  Layers3,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
  GraduationCap,
  CircleCheck,
} from 'lucide-react'

export default function CourseDetailsPage() {
  const params = useParams()

  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', params.slug)
        .single()

      if (!error) {
        setCourse(data)
      }

      setLoading(false)
    }

    fetchCourse()
  }, [params.slug])

  const handlePurchase = async () => {
  try {
    setPurchasing(true)

    const response = await fetch("/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: course.id,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || "Failed to initiate payment")
      return
    }

    if (!data.checkoutUrl) {
      alert("Checkout URL not received")
      return
    }

    window.location.href = data.checkoutUrl
  } catch (error) {
    console.error(error)
    alert("Something went wrong")
  } finally {
    setPurchasing(false)
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="flex items-center justify-center py-40">
          <div className="rounded-2xl border border-border/30 bg-card/40 px-6 py-4 text-foreground/60 backdrop-blur-xl">
            Loading course...
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="flex items-center justify-center py-40">
          <div className="rounded-2xl border border-border/30 bg-card/40 px-6 py-4 text-foreground/60 backdrop-blur-xl">
            Course not found.
          </div>
        </div>
      </div>
    )
  }

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

          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">

            {/* Left */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                {course.level || 'Professional Course'}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
                {course.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/65">
                {course.tagline || course.description}
              </p>

              {/* Meta */}
              <div className="mt-8 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-xl border border-border/30 bg-card/40 px-4 py-3 text-sm text-foreground/70 backdrop-blur-xl">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {course.duration || 'Flexible Duration'}
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border/30 bg-card/40 px-4 py-3 text-sm text-foreground/70 backdrop-blur-xl">
                  <Layers3 className="h-4 w-4 text-primary" />
                  {course.cohort_type || 'Live Cohort'}
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border/30 bg-card/40 px-4 py-3 text-sm text-foreground/70 backdrop-blur-xl">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  {course.language || 'English'}
                </div>
              </div>
            </div>

            {/* Right Pricing Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl">

              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />

              <div className="relative z-10 p-7">

                <p className="text-sm uppercase tracking-wide text-foreground/50">
                  Course Fee
                </p>

                <h2 className="mt-3 text-5xl font-black text-primary">
                  ₹{course.price?.toLocaleString()}
                </h2>

                <div className="mt-7 space-y-3">

                  {[
                    'Live mentorship sessions',
                    'Structured roadmap',
                    'Assignments & practice',
                    'Interview preparation',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-border/20 bg-background/30 px-4 py-3"
                    >
                      <CircleCheck className="h-4 w-4 text-primary" />

                      <p className="text-sm text-foreground/70">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <Button
  onClick={handlePurchase}
  disabled={purchasing}
  className="mt-8 h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01]"
>
  {purchasing ? "Redirecting..." : "Enroll Now"}
</Button>

                <p className="mt-4 text-center text-xs leading-relaxed text-foreground/45">
                  Secure payment integration and enrollment onboarding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">

            {/* Left Content */}
            <div className="space-y-10">

              {/* About */}
              <div className="rounded-[28px] border border-border/40 bg-card/50 p-7 backdrop-blur-xl">

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <h2 className="text-2xl font-black text-foreground">
                    About This Course
                  </h2>
                </div>

                <p className="mt-6 whitespace-pre-line leading-relaxed text-foreground/70">
                  {course.description}
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="rounded-[28px] border border-border/40 bg-card/50 p-7 backdrop-blur-xl">

                <h2 className="text-2xl font-black text-foreground">
                  What You'll Learn
                </h2>

                <div className="mt-7 grid gap-4 md:grid-cols-2">

                  {(course.what_you_learn || []).map((item: string, i: number) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-2xl border border-border/30 bg-background/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/[0.03]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative z-10 flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </div>

                        <p className="text-sm leading-relaxed text-foreground/75">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap */}
              <div className="rounded-[28px] border border-border/40 bg-card/50 p-7 backdrop-blur-xl">

                <h2 className="text-2xl font-black text-foreground">
                  Course Roadmap
                </h2>

                <div className="mt-8 space-y-5">

                  {(course.roadmap || []).map((step: string, i: number) => (
                    <div
                      key={i}
                      className="flex gap-5 rounded-2xl border border-border/20 bg-background/30 p-5"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 font-bold text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground">
                          {step}
                        </h3>

                        <p className="mt-1 text-sm text-foreground/55">
                          Structured learning and practical implementation.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Features */}
              <div className="rounded-[28px] border border-border/40 bg-card/50 p-6 backdrop-blur-xl">

                <h3 className="text-xl font-black text-foreground">
                  Course Features
                </h3>

                <div className="mt-6 space-y-3">

                  {(course.features || []).map((feature: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-border/20 bg-background/30 px-4 py-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />

                      <p className="text-sm text-foreground/70">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="rounded-[28px] border border-border/40 bg-card/50 p-6 backdrop-blur-xl">

                <h3 className="text-xl font-black text-foreground">
                  Requirements
                </h3>

                <div className="mt-6 space-y-3">

                  {(course.requirements || []).map((req: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-border/20 bg-background/30 px-4 py-3"
                    >
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                      <p className="text-sm leading-relaxed text-foreground/70">
                        {req}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

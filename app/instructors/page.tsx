'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

export default function InstructorsPage() {
  const instructors = [
    // {
    //   id: 1,
    //   name: 'Harkirat Singh',
    //   role: 'Lead Instructor',
    //   bio: 'Ex-Google, Ex-Goldman Sachs',
    //   description: 'Open source contributor and full stack expert. I bridge the gap between theory and production-grade code.',
    //   rating: 4.9,
    //   students: 12500,
    //   expertise: ['Full Stack', 'System Design', 'Open Source'],
    // },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Meet Your Mentors</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Learn from engineers who have actually built and scaled systems at top companies
            </p>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instructors.map((instructor, i) => (
              <div
                key={instructor.id}
                className="group rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="p-8 space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/50 group-hover:from-primary/90 group-hover:to-primary/70 transition-all"></div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{instructor.name}</h3>
                      <p className="text-sm text-primary font-semibold">{instructor.role}</p>
                      <p className="text-xs text-foreground/60 mt-1">{instructor.bio}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 leading-relaxed">{instructor.description}</p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {instructor.expertise.map((skill, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-foreground">{instructor.rating} Rating</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{instructor.students.toLocaleString()}</p>
                      <p className="text-xs text-foreground/60">Students Taught</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    View Courses
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  )
}

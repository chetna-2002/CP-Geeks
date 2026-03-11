'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from "@/utils/supabase/client";

export default function InstructorsPage() {

  const [instructors, setInstructors] = useState<any[]>([])
  const supabase = createClient();
  useEffect(() => {
    const loadInstructors = async () => {
      const { data, error } = await supabase
        .from("instructors")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("INSTRUCTORS DATA:", data);
      console.log("INSTRUCTORS ERROR:", error);

      if (!error && data) {
        setInstructors(data);
      }
    };

    loadInstructors();
  }, []);

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
                className="group rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card animate-slide-up flex flex-col"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="p-8 space-y-6 flex flex-col h-full">

                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <img
                      src={instructor.image_url}
                      alt={instructor.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {instructor.name}
                      </h3>

                      <p className="text-sm text-primary font-semibold">
                        {instructor.role}
                      </p>

                      <p className="text-xs text-foreground/60 mt-1">
                        {instructor.bio}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 leading-relaxed line-clamp-3">
                    {instructor.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30 mt-auto">

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < Math.round(instructor.rating)
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>

                      <span className="text-sm font-semibold text-foreground">
                        {instructor.rating}.0
                      </span>
                    </div>

                    {/* Students */}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {instructor.students.toLocaleString()}+
                      </p>
                      <p className="text-xs text-foreground/60">
                        Students
                      </p>
                    </div>

                  </div>

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

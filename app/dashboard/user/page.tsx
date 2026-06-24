"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpen,
  Briefcase,
  User,
  ArrowRight,
  Sparkles,
  Compass,
  GraduationCap,
  Bell,
  Code2,
  MessageCircle,
  Video,
  FolderDown,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

export default function StudentLiveDashboard() {
  const { profile, loading } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const loadEnrollments = async () => {
      if (!profile?.id) return;

      const { data, error } = await supabase
        .from("course_enrollments")
        .select(`
          *,
          courses(
            *,
            instructors(*)
          )
        `)
        .eq("user_id", profile.id);

      if (error) {
        console.error(error);
        return;
      }

      setEnrolledCourses(data || []);
    };

    loadEnrollments();
  }, [profile?.id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse font-mono text-sm text-foreground/40">
          Initializing workspace...
        </div>
      </div>
    );
  }

  const firstName = profile?.full_name?.split(" ")[0] || "Engineer";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 pb-20">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-primary/[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 left-0 h-[350px] w-[350px] bg-primary/[0.03] blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
        
        {/* HEADER / GREETING */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="w-full md:w-auto text-center md:text-left">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Welcome to the Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Good to see you, {firstName}.
            </h1>
            <p className="text-foreground/60 text-sm sm:text-base mt-2 max-w-xl mx-auto md:mx-0">
              This is your central command for tracking active cohorts, applying to partner jobs, and managing your engineering profile.
            </p>
          </div>
          
          <Link href="/courses" className="w-full md:w-auto">
            <Button className="w-full md:w-auto h-11 rounded-xl font-bold shadow-lg shadow-primary/10 hover:scale-105 transition-all">
              <Compass className="mr-2 h-4 w-4" /> Explore Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          
          {/* LEFT SIDE: LEARNING PATHWAY */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border/20 pb-4">
              <div className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight">
                <GraduationCap className="h-5 w-5 text-primary" /> Active Enrollments
              </div>
            </div>

            {enrolledCourses.length === 0 ? (
              /* EMPTY STATE (If no courses) */
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-border/40 bg-card/40 p-8 sm:p-10 md:p-14 text-center backdrop-blur-xl shadow-2xl shadow-primary/5 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-[20px] sm:rounded-3xl border border-primary/20 bg-primary/10 text-primary shadow-inner mb-5 sm:mb-6">
                    <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3">
                    No Active Tracks Yet
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/60 max-w-md mx-auto leading-relaxed mb-6 sm:mb-8">
                    You aren't enrolled in any live cohorts at the moment. Join a course to unlock live mentorship, DSA sheets, and real-time tracking.
                  </p>
                  <Link href="/courses" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-12 rounded-xl font-bold px-8 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                      Browse Curriculum <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              /* ENROLLED COURSES LIST */
              <div className="grid gap-6">
                {enrolledCourses.map((enrollment) => (
                  <div 
                    key={enrollment.courses.id}
                    className="group relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-border/40 bg-card/40 p-5 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/20 pb-5 sm:pb-6">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-3 py-1 text-[10px] sm:text-xs font-medium text-foreground/70 mb-3">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            {enrollment.courses.status}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
                            {enrollment.courses.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                            Instructor: <span className="font-semibold text-foreground/80">{enrollment.courses.instructors?.name}</span>
                          </p>
                        </div>
                      </div>

                      {/* Static Action Buttons */}
                      <div className="pt-5 sm:pt-6">
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground/40 mb-3 sm:mb-4">
                          Course Resources
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                          
                          {/* WhatsApp Button */}
                          {enrollment.courses.whatsapp_link && (
                            <a href={enrollment.courses.whatsapp_link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                              <Button className="w-full sm:w-auto h-11 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 font-semibold gap-2 transition-all">
                                <MessageCircle className="h-4 w-4" /> WhatsApp Community
                              </Button>
                            </a>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: QUICK ACTIONS & PROFILE STATUS */}
          <div className="space-y-6">
            
            <h3 className="text-lg sm:text-xl font-bold tracking-tight border-b border-border/20 pb-4">
              Quick Actions
            </h3>

            {/* Profile Card */}
            <Card className="border-border/40 bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group">
              <CardContent className="p-0">
                <Link href="/dashboard/user/profile" className="flex items-center gap-4 p-4 sm:p-5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <User className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                      Engineering Profile
                    </h4>
                    <p className="text-[10px] sm:text-xs text-foreground/50 mt-0.5">
                      Update your resume & links
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground/30 ml-auto group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </Link>
              </CardContent>
            </Card>

            {/* Job Board Card */}
            <Card className="border-border/40 bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group">
              <CardContent className="p-0">
                <Link href="/dashboard/user/jobs" className="flex items-center gap-4 p-4 sm:p-5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                    <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-green-500 transition-colors">
                      Career Portal
                    </h4>
                    <p className="text-[10px] sm:text-xs text-foreground/50 mt-0.5">
                      Explore partner opportunities
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground/30 ml-auto group-hover:translate-x-1 group-hover:text-green-500 transition-all" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
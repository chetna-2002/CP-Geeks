"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Users,
  Zap,
  Star,
  Code2,
  Briefcase,
  Award,
  Shield,
  MessageCircle,
  Linkedin
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [placements, setPlacements] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleElements((prev) => new Set([...prev, id]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    document.querySelectorAll("[data-scroll-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [instructors, courses, placements]);

  /* Redirect if session exists */
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace("/dashboard");
      }
    };
    checkSession();
  }, [router, supabase]);

  /* Fetch Placements */
  useEffect(() => {
    const loadPlacements = async () => {
      const { data, error } = await supabase
        .from("placements")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPlacements(data);
      }
    };
    loadPlacements();
  }, [supabase]);

  /* Fetch Courses */
  useEffect(() => {
    const loadCourses = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(`*, instructors (id, name)`)
        .eq("is_published", true)
        .order("created_at", { ascending: false });


      setCourses(data || []);
    };

    loadCourses();
  }, [supabase]);

  /* Fetch Instructors */
  useEffect(() => {
    const loadInstructors = async () => {
      const { data, error } = await supabase
        .from("instructors")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setInstructors(data);
      }
    };
    loadInstructors();
  }, [supabase]);

  const features = [
    { icon: Code2, title: "Live Classes", description: "Interactive sessions with industry experts." },
    { icon: Users, title: "1:1 Mentorship", description: "Personalized guidance to clear your path." },
    { icon: BookOpen, title: "Structured Learning", description: "Step-by-step curriculum for mastery." },
    { icon: Zap, title: "24/7 Support", description: "Instant doubt resolution anytime." },
    { icon: Award, title: "Resume Reviews", description: "Craft a profile that demands attention." },
    { icon: Briefcase, title: "Verified Referrals", description: "Direct access to top hiring companies." }
  ];

  const roadmapSteps = [
    { icon: BookOpen, title: "Fundamentals", description: "Master language basics" },
    { icon: Code2, title: "DSA Mastery", description: "Solve 400+ problems" },
    { icon: Award, title: "System Design", description: "LLD & HLD mastery" },
    { icon: Zap, title: "Real Projects", description: "Build production clones" },
    { icon: Users, title: "Interview Prep", description: "Mock interviews" },
    { icon: Briefcase, title: "Dream Offer", description: "Land your dream job" }
  ];

  const faqs = [
    { q: "What is CP Geeks?", a: "CP Geeks is a comprehensive learning platform for aspiring software engineers to master DSA, system design, and land roles at top tech companies." },
    { q: "Do I need prior coding experience?", a: "While basic coding helps, our fundamentals track starts from zero. We teach C++, Java, and Python from the ground up." },
    { q: "What is the placement success rate?", a: "Our students have secured roles at Big MNC's with average package improvements of 40-60%." },
    { q: "How long to complete?", a: "Most courses take 3-4 months with consistent effort and lifetime access." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/30 min-h-[92vh] flex items-center py-12 md:py-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-0 h-[450px] w-[450px] bg-primary/10 blur-3xl rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-8 text-center lg:text-left pt-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-sm animate-scale-in mx-auto lg:mx-0">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Cohort Based Learning Platform
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-balance animate-slide-down">
                  Become a<br />
                  <span className="bg-gradient-to-r from-primary via-white to-primary/70 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                    Top 1% Engineer
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Master DSA, Full Stack, System Design, and interview preparation through live mentorship, real projects, and structured learning.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold gap-2 rounded-xl bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/20">
                    Explore Courses
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 max-w-xl mx-auto lg:mx-0">
                {[
                  { value: "100+", label: "Students" },
                  { value: "15+", label: "Projects" },
                  { value: "24/7", label: "Support" }
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md p-3 sm:p-5 hover:border-primary/30 transition-all hover:-translate-y-1">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{item.value}</p>
                    <p className="text-xs sm:text-sm text-foreground/60 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-[520px] aspect-square">
                <div className="absolute inset-0 rounded-[32px] border border-border/50 bg-card/70 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-foreground/60">Current Track</p>
                          <h3 className="text-2xl font-bold mt-1">DSA & System Design</h3>
                        </div>
                        <div className="h-14 w-14 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                          <Code2 className="h-7 w-7 text-primary" />
                        </div>
                      </div>

                      <div className="space-y-3 pt-4">
                        {["Scalable Architecture", "Distributed Systems", "Real Production Patterns", "Interview Preparation"].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-xl border border-border/30 bg-background/50 px-4 py-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <p className="text-sm text-foreground/80">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                        <p className="text-sm text-foreground/60">Live Classes</p>
                        <p className="text-xl font-bold mt-1">Weekly</p>
                      </div>
                      <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                        <p className="text-sm text-foreground/60">Mentorship</p>
                        <p className="text-xl font-bold mt-1">1:1 Support</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 rounded-2xl border border-border/40 bg-card/80 backdrop-blur-md px-5 py-4 shadow-xl animate-float hidden xl:block">
                  <p className="text-sm text-foreground/60">Interview Focused</p>
                  <p className="text-lg font-bold">FAANG Ready</p>
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl border border-border/40 bg-card/80 backdrop-blur-md px-5 py-4 shadow-xl animate-float hidden xl:block" style={{ animationDelay: "1s" }}>
                  <p className="text-sm text-foreground/60">Learning Mode</p>
                  <p className="text-lg font-bold">Live Cohorts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="relative border-b border-border/30 py-16 sm:py-24 overflow-hidden" data-scroll-animate id="roadmap-section">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 h-[350px] w-[350px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-primary font-medium backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Structured Learning Path
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              From Beginner to
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent block sm:inline"> Top Engineer</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              A carefully designed roadmap covering problem solving, development, system design, projects, and interview preparation.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:block" />
            <div className="space-y-8 sm:space-y-10">
              {roadmapSteps.map((step, i) => {
                const Icon = step.icon;
                const isVisible = visibleElements.has(`roadmap-${i}`);

                return (
                  <div
                    key={i}
                    id={`roadmap-${i}`}
                    data-scroll-animate
                    className={`relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                    style={{ animationDelay: isVisible ? `${i * 120}ms` : "0ms" }}
                  >
                    <div className={`${i % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:order-2 lg:pl-16"}`}>
                      <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card/50 backdrop-blur-xl p-6 sm:p-8 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                          <div className="mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-3 justify-start lg:justify-end">
                              <span className="text-xs sm:text-sm font-medium text-primary">Step {i + 1}</span>
                              <div className="h-px w-10 bg-primary/30 hidden sm:block" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                            <p className="text-sm sm:text-base text-foreground/65 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-background shadow-xl shadow-primary/10">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        <div className="relative z-10 h-4 w-4 rounded-full bg-primary" />
                      </div>
                    </div>
                    <div className={`${i % 2 === 0 ? "lg:order-2" : ""}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Placements Wall */}
      <section className="relative border-b border-border/30 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-primary font-medium backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Student Success Stories
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">Recent Placements</h2>
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Our learners are building careers at fast-growing startups and top product companies through consistent mentorship and structured preparation.
            </p>
          </div>

          {placements.length > 0 && (
            <>
              <div className="marquee mask-fade">
                <div className="marquee-track">
                  {[...placements, ...placements].map((p, i) => (
                    <div key={i} className="group relative min-w-[260px] sm:min-w-[300px] h-[180px] sm:h-[220px] rounded-3xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                      <img src={`${p.image_url}?auto=format&fit=crop&w=900&q=80`} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/10 blur-2xl animate-shine" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <div className="space-y-1">
                          <h3 className="text-base sm:text-lg font-bold text-white">{p.name}</h3>
                          <p className="text-xs sm:text-sm text-white/70">Placed at {p.company}</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] sm:text-xs text-white/80">Placement</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="marquee mask-fade mt-6 sm:mt-8 reverse">
                <div className="marquee-track">
                  {[...placements, ...placements].map((p, i) => (
                    <div key={i} className="group relative min-w-[220px] sm:min-w-[260px] h-[140px] sm:h-[180px] rounded-3xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                      <img src={`${p.image_url}?auto=format&fit=crop&w=800&q=80`} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <h3 className="text-sm sm:text-base font-semibold text-white">{p.name}</h3>
                        <p className="text-[10px] sm:text-xs text-white/70">{p.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="relative border-b border-border/30 py-16 sm:py-24 overflow-hidden" data-scroll-animate id="courses-section">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-primary font-medium backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Career Focused Learning
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Featured
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent block sm:inline"> Courses</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Industry-aligned programs designed to help you crack interviews, build real-world projects, and grow into a confident engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {courses.map((course, i) => {
              const isVisible = visibleElements.has(`course-${course.id}`);

              const categoryColors: any = {
                dsa: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                web: "bg-green-500/10 text-green-400 border-green-500/20",
                ai: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                cloud: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
                mobile: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                "system-design": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                "data-science": "bg-pink-500/10 text-pink-400 border-pink-500/20",
              };

              return (
                <div
                  key={course.id}
                  id={`course-${course.id}`}
                  data-scroll-animate
                  className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-border/30 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex items-center justify-between px-6 pt-6">
                    <div className={`rounded-full border px-3 py-1 text-[10px] sm:text-xs font-semibold ${categoryColors[course.category] || "bg-primary/10 text-primary border-primary/20"}`}>
                      {course.category?.replace("-", " ")?.toUpperCase()}
                    </div>
                    <div className="rounded-full border border-border/20 bg-background/40 px-3 py-1 text-[10px] sm:text-xs text-foreground/60">
                      {course.duration || "Self Paced"}
                    </div>
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col p-6">
                    <h3 className="text-xl sm:text-2xl font-black leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-foreground/65 line-clamp-4 min-h-[80px] sm:min-h-[88px]">
                      {course.tagline || course.description}
                    </p>

                    <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                      {(course.what_you_learn || []).slice(0, 3).map((item: string, idx: number) => (
                        <div key={idx} className="rounded-full border border-border/20 bg-background/30 px-3 py-1 text-[10px] sm:text-xs text-foreground/70">
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 sm:mt-5 rounded-2xl border border-border/20 bg-background/30 p-4">
                      <p className="text-[10px] sm:text-xs text-foreground/50">Level</p>
                      <p className="font-semibold text-sm sm:text-base">{course.level || "Beginner"}</p>
                    </div>

                    <div className="mt-auto pt-6 sm:pt-8 flex flex-row items-end justify-between">
                      <div>
                        <p className="text-[10px] sm:text-xs uppercase text-foreground/50">Starting From</p>
                        <p className="text-2xl sm:text-3xl font-black">₹{course.price?.toLocaleString()}</p>
                      </div>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="lg" className="rounded-xl px-4 sm:px-6 gap-2">
                          Explore
                          <ArrowRight className="h-4 w-4 hidden sm:block" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose CP Geeks */}
      <section className="relative border-b border-border/30 py-16 sm:py-24 overflow-hidden" data-scroll-animate id="features-section">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 h-[320px] w-[320px] rounded-full bg-primary/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-primary/[0.03] blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-primary font-medium backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Built for Serious Engineers
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Why Choose
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent block sm:inline"> CP Geeks</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              A focused ecosystem for engineers who want structured growth, practical skills, mentorship, and real interview preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Code2, title: "Structured Learning Paths", description: "Roadmaps designed to take you from beginner concepts to advanced engineering topics step-by-step." },
              { icon: Users, title: "Live Mentorship", description: "Interactive sessions, doubt solving, and mentorship focused on consistent improvement." },
              { icon: Briefcase, title: "Interview Preparation", description: "Preparation aligned with coding rounds, system design interviews, and hiring expectations." },
              { icon: Zap, title: "Project Based Learning", description: "Build practical projects while strengthening engineering thinking and problem-solving ability." },
              { icon: Award, title: "Career Focused Growth", description: "Learn modern development skills relevant to real product engineering environments." },
              { icon: BookOpen, title: "Consistency Driven", description: "Designed to help learners avoid random tutorial hopping and maintain long-term progress." },
              { icon: Star, title: "Focused Community", description: "Surround yourself with learners working toward similar engineering and career goals." },
              { icon: ArrowRight, title: "Practical Curriculum", description: "Concepts taught with implementation, problem solving, and real-world engineering context." },
              { icon: Shield, title: "Long-Term Engineering Mindset", description: "Beyond interview prep, the focus is on developing scalable thinking and strong fundamentals." }
            ].map((item, i) => {
              const Icon = item.icon;
              const isVisible = visibleElements.has(`feature-${i}`);

              return (
                <div
                  key={i}
                  id={`feature-${i}`}
                  data-scroll-animate
                  className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: isVisible ? `${i * 70}ms` : "0ms" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary/15">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="relative z-10 mt-5 sm:mt-6">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground transition-colors group-hover:text-primary">{item.title}</h3>
                    <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-foreground/65">{item.description}</p>
                  </div>
                  <div className="relative z-10 mt-5 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm text-primary">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Focused Learning Experience</span>
                  </div>
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/[0.05] blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="relative border-b border-border/30 py-16 sm:py-24 overflow-hidden" data-scroll-animate id="instructors-section">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 h-[320px] w-[320px] rounded-full bg-primary/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-primary/[0.03] blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-primary font-medium backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Core Mentorship Team
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Learn from
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent block sm:inline"> Featured Mentors</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Practical mentorship and engineering guidance focused on long-term growth, consistency, and real-world learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {instructors.map((instructor, i) => {
              const isVisible = visibleElements.has(`instructor-${i}`);

              return (
                <div
                  key={i}
                  id={`instructor-${i}`}
                  data-scroll-animate
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: isVisible ? `${i * 100}ms` : "0ms" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative h-20 sm:h-24 border-b border-border/20 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="absolute right-4 sm:right-5 top-4 sm:top-5 rounded-full border border-primary/20 bg-background/50 px-3 py-1 text-[10px] sm:text-xs font-medium text-primary backdrop-blur-md">Mentor</div>
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
                    <div className="-mt-12 sm:-mt-14">
                      <img src={instructor.image_url} alt={instructor.name} className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-background object-cover shadow-xl" />
                      <div className="mt-4 sm:mt-5">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground transition-colors group-hover:text-primary">{instructor.name}</h3>
                        <p className="mt-1 text-xs sm:text-sm font-semibold text-primary">{instructor.role}</p>
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6">
                      <p className="text-sm leading-relaxed text-foreground/60">{instructor.bio}</p>
                      <div className="mt-4 sm:mt-5 rounded-2xl border border-border/20 bg-background/30 p-3 sm:p-4">
                        <p className="text-xs sm:text-sm leading-relaxed text-foreground/75">{instructor.description}</p>
                      </div>
                    </div>

                    <div className="flex-1" />

                    <div className="mt-4 border-t border-border/20 pt-4 sm:pt-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-foreground/50">Learners Mentored</p>
                          <p className="mt-1 text-xl sm:text-2xl font-black text-foreground">{instructor.students?.toLocaleString()}+</p>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                        {["Mentorship", "Projects", "Career Growth"].map((tag, idx) => (
                          <div key={idx} className="rounded-full border border-border/20 bg-background/40 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-foreground/65">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/[0.05] blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative border-b border-border/30 py-16 sm:py-24 overflow-hidden" data-scroll-animate id="faq-section">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 h-[320px] w-[320px] rounded-full bg-primary/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-primary/[0.03] blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-primary font-medium backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Common Questions
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Frequently Asked
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent block sm:inline"> Questions</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about learning, mentorship, live cohorts, and the CP Geeks experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 sm:gap-8 items-start">
            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isVisible = visibleElements.has(`faq-${i}`);

                return (
                  <div
                    key={i}
                    id={`faq-${i}`}
                    data-scroll-animate
                    className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                    style={{ animationDelay: isVisible ? `${i * 70}ms` : "0ms" }}
                  >
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left transition-all duration-300 hover:bg-primary/[0.03]">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-xs sm:text-sm font-semibold text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-foreground transition-colors group-hover:text-primary">{faq.q}</h3>
                        </div>
                      </div>
                      <div className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-background/40 text-foreground/60 transition-all duration-300 ml-2 ${openFaq === i ? "rotate-180 border-primary/20 bg-primary/10 text-primary" : ""}`}>
                        ▼
                      </div>
                    </button>

                    <div className={`grid transition-all duration-500 ease-in-out ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="border-t border-border/20 px-4 sm:px-6 pb-4 sm:pb-6 pt-4 sm:pt-5">
                          <div className="ml-[44px] sm:ml-[52px]">
                            <p className="text-sm sm:text-base leading-relaxed text-foreground/70">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  </div>
                );
              })}
            </div>

            <div className="sticky top-24 hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/50 backdrop-blur-xl p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <MessageCircle className="h-6 w-6" />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-bold text-foreground">Still have questions?</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                      Reach out for guidance regarding cohorts, learning paths, mentorship, or engineering preparation.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Live Cohorts", "DSA", "System Design", "Projects"].map((tag, idx) => (
                      <div key={idx} className="rounded-full border border-border/20 bg-background/40 px-3 py-1.5 text-xs text-foreground/65">
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-border/20 pt-5">
                    <p className="text-xs uppercase tracking-wide text-foreground/50">Support</p>
                    <p className="mt-2 font-semibold text-foreground break-all">cpgeeksofficial@gmail.com</p>
                  </div>
                </div>
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/[0.05] blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden" data-scroll-animate id="cta-section">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[36px] border border-border/40 bg-card/50 backdrop-blur-xl px-5 py-10 sm:px-8 sm:py-14 md:px-14 md:py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent" />
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/[0.05] blur-[120px]" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-sm text-primary font-medium backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Start Your Engineering Journey
              </div>

              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
                  Build Skills That
                  <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent block sm:inline"> Actually Matter</span>
                </h2>
                <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/65">
                  Learn through structured roadmaps, mentorship, practical projects, and interview-focused preparation designed for aspiring software engineers.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {["Live Cohorts", "DSA", "System Design", "Projects", "Mentorship"].map((tag, idx) => (
                  <div key={idx} className="rounded-full border border-border/20 bg-background/40 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-sm text-foreground/70">
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto group gap-2 rounded-xl px-8 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:gap-3">
                    Start Learning
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/courses" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-xl border border-border/40 bg-white/5 px-8 text-foreground shadow-none backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.08] hover:text-foreground">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-border/30 bg-background">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/4 top-0 h-[280px] w-[280px] rounded-full bg-primary/[0.04] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[240px] w-[240px] rounded-full bg-primary/[0.03] blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr_0.8fr] gap-10 sm:gap-12 border-b border-border/20 pb-10 sm:pb-12">
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-lg sm:text-xl font-black text-primary shadow-lg shadow-primary/10">CG</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">CP Geeks</h3>
                  <p className="mt-1 text-xs sm:text-sm text-foreground/55">Structured Learning for Engineers</p>
                </div>
              </div>
              <p className="max-w-md text-xs sm:text-sm leading-relaxed text-foreground/65">
                CP Geeks is a modern engineering learning platform focused on DSA, System Design, Full Stack Development, practical projects, and interview preparation through structured learning paths.
              </p>
              <div className="flex flex-wrap gap-2">
                {["DSA", "System Design", "Projects", "Mentorship", "Interview Prep"].map((tag, idx) => (
                  <div key={idx} className="rounded-full border border-border/20 bg-card/40 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-foreground/65 backdrop-blur-sm">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-foreground mb-4 sm:mb-5">Navigation</h4>
              <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm">
                <Link href="/courses" className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  Courses
                </Link>
                <Link href="/dsa-sheets" className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  DSA Sheets
                </Link>
                <Link href="/jobs" className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  Jobs
                </Link>
                <Link href="/signup" className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  Get Started
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-foreground mb-4 sm:mb-5">Legal & Contact</h4>
              <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm">
                <Link href="/terms" className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  Terms & Conditions
                </Link>
                <Link href="/privacy-policy" className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  Privacy Policy
                </Link>
                <Link href="/refund-policy" className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  Refund Policy
                </Link>
                <a href="mailto:cpgeeksofficial@gmail.com" className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary break-all">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  cpgeeksofficial@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-5 pt-8 md:flex-row">
            <p className="text-xs sm:text-sm text-foreground/50 text-center md:text-left">
              © {new Date().getFullYear()} CP Geeks. All rights reserved.
            </p>
            <div className="hidden md:flex items-center gap-3 text-[10px] sm:text-xs text-foreground/40">
              <span>Built for Engineers</span>
              <div className="h-1 w-1 rounded-full bg-primary/40" />
              <span>Focused Learning</span>
              <div className="h-1 w-1 rounded-full bg-primary/40" />
              <span>Long-Term Growth</span>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
              <a href="https://www.linkedin.com/company/cp-geeks" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center w-full md:w-auto gap-3 rounded-xl border border-border/30 bg-card/40 px-4 py-2.5 text-foreground/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/[0.06] hover:text-primary">
                <Linkedin className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); will-change: transform, opacity; }
          to { opacity: 1; transform: translateY(0); will-change: auto; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-25px); will-change: transform, opacity; }
          to { opacity: 1; transform: translateY(0); will-change: auto; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); will-change: transform, opacity; }
          to { opacity: 1; transform: scale(1); will-change: auto; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-down { animation: slide-down 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 8s ease infinite; }

        .marquee { overflow: hidden; width: 100%; }
        .marquee-track { display: flex; gap: 1.5rem; width: max-content; animation: scroll 40s linear infinite; }
        .marquee-track > * { flex-shrink: 0; }
        
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 0.75rem)); }
        }
        .marquee.reverse .marquee-track { animation: scrollReverse 40s linear infinite; }
        @keyframes scrollReverse {
          from { transform: translateX(calc(-50% - 0.75rem)); }
          to { transform: translateX(0); }
        }

        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes shine {
          0% { transform: translateX(-250px) rotate(12deg); }
          100% { transform: translateX(1200px) rotate(12deg); }
        }
        .animate-shine { animation: shine 4s linear infinite; }
      `}</style>
    </div>
  );
}
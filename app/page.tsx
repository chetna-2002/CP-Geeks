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
} from "lucide-react";
import Link from "next/link";

/* ADDED */
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  /* ADDED */
  const router = useRouter();
  const supabase = createClient();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set(),
  );
  const [placements, setPlacements] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);

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
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    document.querySelectorAll("[data-scroll-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [instructors]);

  /* ADDED: auto redirect if session exists */
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  // Fetch placements data from Supabase on component mount
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
  }, []);
  interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    students: number;
    duration: string;
    price: string;
    badge: string;
    features: string[];
  }

  const courses: Course[] = [
    {
      id: 1,
      title: "DSA & GenAI Masterclass",
      description:
        "Crack top tiers like Google & Amazon. Complete DSA (C++, Java, Python) integrated with Generative AI patterns.",
      instructor: "Sandeep Jain",
      students: 8300,
      duration: "4 months",
      price: "₹6,999",
      badge: "FAANG Ready",
      features: ["Live Mentorship", "Mock Interviews", "Placement Support"],
    },
    {
      id: 2,
      title: "Full Stack Innovation",
      description:
        "Beyond the basics. React 19, Next.js 14, Server Actions, and building scalable microservices from scratch.",
      instructor: "Akshay Saini",
      students: 6200,
      duration: "3 months",
      price: "₹5,499",
      badge: "Project Heavy",
      features: ["Real-time Projects", "Code Reviews", "Architecture Labs"],
    },
    {
      id: 3,
      title: "System Design Architect",
      description:
        "Scale from 1 to 100 million users. Learn real patterns used by Uber, Airbnb, and WhatsApp engineers.",
      instructor: "Harkirat Singh",
      students: 5800,
      duration: "3 months",
      price: "₹4,999",
      badge: "L5+ Level",
      features: ["Scale 0 to 1M", "Distributed Systems", "Cloud Native"],
    },
  ];

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

  const features = [
    {
      icon: Code2,
      title: "Live Classes",
      description: "Interactive sessions with industry experts.",
    },
    {
      icon: Users,
      title: "1:1 Mentorship",
      description: "Personalized guidance to clear your path.",
    },
    {
      icon: BookOpen,
      title: "Structured Learning",
      description: "Step-by-step curriculum for mastery.",
    },
    {
      icon: Zap,
      title: "24/7 Support",
      description: "Instant doubt resolution anytime.",
    },
    {
      icon: Award,
      title: "Resume Reviews",
      description: "Craft a profile that demands attention.",
    },
    {
      icon: Briefcase,
      title: "Verified Referrals",
      description: "Direct access to top hiring companies.",
    },
  ];

  const roadmapSteps = [
    {
      icon: BookOpen,
      title: "Fundamentals",
      description: "Master language basics",
    },
    { icon: Code2, title: "DSA Mastery", description: "Solve 400+ problems" },
    { icon: Award, title: "System Design", description: "LLD & HLD mastery" },
    {
      icon: Zap,
      title: "Real Projects",
      description: "Build production clones",
    },
    { icon: Users, title: "Interview Prep", description: "Mock interviews" },
    {
      icon: Briefcase,
      title: "Dream Offer",
      description: "Land your dream job",
    },
  ];

  const faqs = [
    {
      q: "What is CP Geeks?",
      a: "CP Geeks is a comprehensive learning platform for aspiring software engineers to master DSA, system design, and land roles at top tech companies.",
    },
    {
      q: "Do I need prior coding experience?",
      a: "While basic coding helps, our fundamentals track starts from zero. We teach C++, Java, and Python from the ground up.",
    },
    {
      q: "What is the placement success rate?",
      a: "Our students have secured roles at Big MNC's with average package improvements of 40-60%.",
    },
    {
      q: "How long to complete?",
      a: "Most courses take 3-4 months with consistent effort and lifetime access.",
    },
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-block animate-scale-in">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
                System Design Cohort 3.0
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance animate-slide-down">
              Build the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 animate-gradient">
                Future of Tech
              </span>
            </h1>

            <p className="text-xl text-foreground/70 max-w-2xl mx-auto text-balance">
              Master system design, scaling, and engineering leadership. Join
              the top 1% of engineers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/courses">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90 hover:scale-105 transition-transform"
                >
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-border/30">
              <div className="text-center hover:scale-110 transition-transform cursor-pointer">
                <p className="text-2xl font-bold text-foreground">15k+</p>
                <p className="text-sm text-foreground/60">Enrolled Students</p>
              </div>
              <div className="text-center hover:scale-110 transition-transform cursor-pointer">
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500 animate-bounce"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground/60">4.9/5 Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section
        className="border-b border-border/30 py-20"
        data-scroll-animate
        id="roadmap-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl font-bold text-foreground">
              From Zero to SDE-II
            </h2>
            <p className="text-foreground/60 text-lg">
              A carefully crafted timeline to take you from beginner to
              industry-ready engineer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapSteps.map((step, i) => {
              const Icon = step.icon;
              const isVisible = visibleElements.has(`roadmap-${i}`);
              return (
                <div
                  key={i}
                  id={`roadmap-${i}`}
                  data-scroll-animate
                  className={`group p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer bg-card ${isVisible ? "animate-slide-up" : "opacity-0"
                    }`}
                  style={{ animationDelay: isVisible ? `${i * 60}ms` : "0" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:rotate-12">
                      <Icon className="h-5 w-5 text-primary transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ⭐ Placements Wall */}
      <section className="border-b border-border/30 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            Recent Placements
          </h2>
          <p className="text-foreground/60">Real outcomes. Visible momentum.</p>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            {[...placements, ...placements].map((p, i) => (
              <div key={i} className="placement-card">
                <img src={`${p.image_url}?auto=format&fit=crop&w=600&q=60`} />

                <div className="placement-overlay">
                  <p className="placement-name">{p.name}</p>
                  <p className="placement-company">{p.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee mt-6 reverse">
          <div className="marquee-track">
            {[...placements, ...placements, ...placements].map((p, i) => (
              <div key={i} className="placement-card">
                <img src={`${p.image_url}?auto=format&fit=crop&w=600&q=60`} />

                <div className="placement-overlay">
                  <p className="placement-name">{p.name}</p>
                  <p className="placement-company">{p.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section
        className="border-b border-border/30 py-20"
        data-scroll-animate
        id="courses-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl font-bold text-foreground">
              Featured Courses
            </h2>
            <p className="text-foreground/60 text-lg">
              Choose the path that matches your career goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => {
              const isVisible = visibleElements.has(`course-${course.id}`);
              return (
                <div
                  key={course.id}
                  id={`course-${course.id}`}
                  data-scroll-animate
                  className={`group rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card hover:-translate-y-2 ${isVisible ? "animate-slide-up" : "opacity-0"
                    }`}
                  style={{ animationDelay: isVisible ? `${i * 120}ms` : "0" }}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary whitespace-nowrap">
                        {course.badge}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="space-y-2">
                      {course.features.map((feature, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 text-sm text-foreground/60"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                      <p className="text-2xl font-bold text-foreground">
                        {course.price}
                      </p>
                      <Link href="/courses">
                        <Button
                          size="sm"
                          className="gap-2 group/btn hover:gap-3 transition-all"
                        >
                          Explore <ArrowRight className="h-3 w-3" />
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

      {/* Features Grid */}
      <section
        className="border-b border-border/30 py-20 bg-primary/5"
        data-scroll-animate
        id="features-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl font-bold text-foreground">
              Why Choose CP Geeks?
            </h2>
            <p className="text-foreground/60 text-lg">
              Everything you need to accelerate your tech career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isVisible = visibleElements.has(`feature-${i}`);
              return (
                <div
                  key={i}
                  id={`feature-${i}`}
                  data-scroll-animate
                  className={`group p-6 rounded-xl border border-border/50 hover:border-primary/30 bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-2 ${isVisible ? "animate-slide-up" : "opacity-0"
                    }`}
                  style={{ animationDelay: isVisible ? `${i * 60}ms` : "0" }}
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instructors Preview */}
      <section
        className="border-b border-border/30 py-20"
        data-scroll-animate
        id="instructors-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl font-bold text-foreground">
              Learn from the Best
            </h2>
            <p className="text-foreground/60 text-lg">
              Industry experts with real-world experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, i) => {
              const isVisible = visibleElements.has(`instructor-${i}`);
              return (
                <div
                  key={i}
                  id={`instructor-${i}`}
                  data-scroll-animate
                  className={`group rounded-xl border border-border/50 p-8 hover:border-primary/30 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${isVisible ? "animate-slide-up" : "opacity-0"
                    }`}
                  style={{ animationDelay: isVisible ? `${i * 120}ms` : "0" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={instructor.image_url}
                      alt={instructor.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {instructor.name}
                      </h3>
                      <p className="text-xs text-primary font-semibold">
                        {instructor.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/60 mb-3">
                    {instructor.bio}
                  </p>
                  <p className="text-sm text-foreground/70 mb-4">
                    {instructor.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className="h-3 w-3 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>
                    <span className="text-foreground/60">
                      {instructor.students.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="border-b border-border/30 py-20 bg-primary/5"
        data-scroll-animate
        id="faq-section"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground/60">
              Everything you need to know about CP Geeks
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isVisible = visibleElements.has(`faq-${i}`);
              return (
                <div
                  key={i}
                  id={`faq-${i}`}
                  data-scroll-animate
                  className={`rounded-lg border border-border/50 bg-background overflow-hidden hover:border-primary/30 transition-all ${isVisible ? "animate-slide-up" : "opacity-0"
                    }`}
                  style={{ animationDelay: isVisible ? `${i * 75}ms` : "0" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-semibold text-foreground text-left">
                      {faq.q}
                    </span>
                    <span
                      className={`transition-transform ${openFaq === i ? "rotate-180" : ""
                        }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 py-4 border-t border-border/30 bg-primary/5 animate-slide-down">
                      <p className="text-foreground/70">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-scroll-animate id="cta-section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-5xl font-bold text-foreground">
            Ready to Begin?
          </h2>
          <p className="text-lg text-foreground/70">
            Join 15,000+ engineers building the future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 hover:scale-105 transition-transform"
              >
                Start Learning Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="hover:scale-105 transition-transform bg-transparent"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-border/30 px-4 py-12 sm:px-6 lg:px-8 bg-foreground/2">
        <div className="mx-auto max-w-7xl">
          <div className="border-t border-border/30 pt-8 flex items-center justify-between">
            <p className="text-sm text-foreground/50">
              © {new Date().getFullYear()} CP Geeks. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/cp-geeks"
                className="text-foreground/50 hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer> */}
      <footer className="border-t border-border/30 px-4 py-12 sm:px-6 lg:px-8 bg-foreground/2">
  <div className="mx-auto max-w-7xl">
    
    {/* Top Footer */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-border/30">
      
      {/* Brand */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-black font-bold">
            CG
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              CP Geeks
            </h3>
            <p className="text-sm text-foreground/60">
              Build the Future of Tech
            </p>
          </div>
        </div>

        <p className="text-sm text-foreground/60 max-w-sm leading-relaxed">
          CP Geeks is a modern learning platform focused on DSA,
          System Design, Full Stack Development, and interview preparation
          for aspiring software engineers.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4">
          Quick Links
        </h4>

        <div className="flex flex-col gap-3 text-sm">
          <Link
            href="/courses"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            Courses
          </Link>

          <Link
            href="/instructors"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            Instructors
          </Link>

          <Link
            href="/jobs"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            Jobs
          </Link>

          <Link
            href="/dsa-sheets"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            DSA Sheets
          </Link>
        </div>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4">
          Legal
        </h4>

        <div className="flex flex-col gap-3 text-sm">
          <Link
            href="/terms"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            Terms & Conditions
          </Link>

          <Link
            href="/privacy-policy"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            href="/refund-policy"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            Refund Policy
          </Link>

          <a
            href="mailto:support@cpgeeks.com"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            cpgeeksofficial@gmail.com
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-foreground/50 text-center md:text-left">
        © {new Date().getFullYear()} CP Geeks. All rights reserved.
      </p>

      <div className="flex items-center gap-5 text-sm">
        <a
          href="https://www.linkedin.com/company/cp-geeks"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/50 hover:text-primary transition-colors"
        >
          LinkedIn
        </a>

        {/* <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/50 hover:text-primary transition-colors"
        >
          Twitter
        </a> */}

        {/* <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/50 hover:text-primary transition-colors"
        >
          GitHub
        </a> */}
      </div>
    </div>
  </div>
</footer>

      <style>{`
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(40px);
            will-change: transform, opacity;
          }
          to { 
            opacity: 1;
            transform: translateY(0);
            will-change: auto;
          }
        }
        @keyframes slide-down {
          from { 
            opacity: 0;
            transform: translateY(-25px);
            will-change: transform, opacity;
          }
          to { 
            opacity: 1;
            transform: translateY(0);
            will-change: auto;
          }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95);
            will-change: transform, opacity;
          }
          to { 
            opacity: 1;
            transform: scale(1);
            will-change: auto;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .marquee{ overflow:hidden;
          width:100%;
        }

        .marquee-track{
          display:flex;
          gap:1.5rem;
          width:max-content;
          animation:scroll 40s linear infinite;
        }

        /* IMPORTANT: prevent shrinking */
        .marquee-track > *{
          flex-shrink:0;
        }

        /* continuous scroll */
        @keyframes scroll{
          from{ transform:translateX(0); }
          to{ transform:translateX(calc(-50% - 0.75rem)); }
        }

        /* reverse row */
        .marquee.reverse .marquee-track{
          animation:scrollReverse 40s linear infinite;
        }

        @keyframes scrollReverse{
          from{ transform:translateX(calc(-50% - 0.75rem)); }
          to{ transform:translateX(0); }
        }
        .placement-card{
        min-width:260px;
        height:170px;
        border-radius:16px;
        overflow:hidden;
        flex-shrink:0;
        background:#111;
        }

        .placement-card img{
        width:100%;
        height:100%;
        object-fit:cover;
        }

        @keyframes scroll{
        from{transform:translateX(0)}
        to{transform:translateX(-50%)}
        }

        @keyframes scroll-reverse{
        from{transform:translateX(-50%)}
        to{transform:translateX(0)}
        }

        .placement-card{
        min-width:260px;
        height:170px;
        border-radius:16px;
        overflow:hidden;
        flex-shrink:0;
        background:#111;
        position:relative;
        }

        .placement-card img{
        width:100%;
        height:100%;
        object-fit:cover;
        }

        .placement-overlay{
        position:absolute;
        inset:0;
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        padding:12px;
        background:linear-gradient(to top, rgba(0,0,0,0.75), transparent);
        opacity:0;
        transition:opacity .25s ease;
        }

        .placement-card:hover .placement-overlay{
        opacity:1;
        }

        .placement-name{
        font-weight:600;
        font-size:14px;
        color:white;
        }

        .placement-company{
        font-size:12px;
        color:#d1d5db;
        }
      `}</style>
    </div>
  );
}

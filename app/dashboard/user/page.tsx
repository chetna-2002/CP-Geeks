"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Settings,
  ShoppingCart,
  Award,
  Clock,
  Star,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
  const [userName, setUserName] = useState<string>("User");
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set(),
  );
  const [purchasedCourses, setPurchasedCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const supabase = createClient();

      // 1️⃣ Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // 2️⃣ Get profile (for name)
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profile?.full_name) {
        setUserName(profile.full_name);
      }

      // 3️⃣ Get enrolled courses
      const { data, error } = await supabase
        .from("enrollments")
        .select(
          `
        id,
        courses (
          id,
          title,
          instructor_name,
          duration
        )
      `,
        )
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
        return;
      }

      const mappedCourses = data.map((item: any) => ({
        id: item.courses.id,
        title: item.courses.title,
        instructor: item.courses.instructor_name,
        progress: 0,
        duration: item.courses.duration ?? "—",
        image: "from-purple-500 to-pink-500",
      }));

      setPurchasedCourses(mappedCourses);
    };

    fetchDashboardData();
  }, []);
  console.log("in user dashboard", purchasedCourses);

  const stats = [
    {
      label: "Courses Enrolled",
      value: purchasedCourses.length.toString(),
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      label: "Learning Hours",
      value: "—",
      icon: Clock,
      color: "text-purple-500",
    },
    {
      label: "Certificates",
      value: "0",
      icon: Award,
      color: "text-green-500",
    },
    {
      label: "Wishlist Items",
      value: "0",
      icon: ShoppingCart,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-border/30 py-12 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome back, {userName}!
            </h1>
            <p className="text-lg text-foreground/70">
              Continue your learning journey with CP Geeks
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="border-b border-border/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              const isVisible = visibleElements.has(`stat-${i}`);
              return (
                <div
                  key={i}
                  id={`stat-${i}`}
                  data-scroll-animate
                  className={`group rounded-xl border border-border/50 p-6 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 ${
                    isVisible ? "animate-slide-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: isVisible ? `${i * 60}ms` : "0" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <Icon
                      className={`h-12 w-12 ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* My Courses Section */}
      <section className="border-b border-border/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Continue Learning
              </h2>
              <p className="text-foreground/60 mt-1">
                Pick up where you left off
              </p>
            </div>
            <Link href="/dashboard/my-courses"></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {purchasedCourses.map((course, i) => {
              const isVisible = true;
              return (
                <div
                  key={course.id}
                  id={`course-${i}`}
                  data-scroll-animate
                  className={`group rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-card ${
                    isVisible ? "animate-slide-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: isVisible ? `${i * 60}ms` : "0" }}
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${course.image} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="p-6 space-y-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {course.instructor}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/50">
                          Progress
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-foreground/50">
                      {course.duration} total
                    </p>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Continue Course
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore More Courses Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/30 bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Discover More Courses
              </h2>
              <p className="text-foreground/70 mb-6">
                Level up your skills with our comprehensive course catalog. From
                DSA to System Design, we have everything you need.
              </p>
              <Link href="/courses">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  Browse All Courses <ShoppingCart className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

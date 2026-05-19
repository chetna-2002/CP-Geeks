"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";

import {
  Users,
  BookOpen,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Sparkles,
  Eye
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const enrollmentData = [
  { month: "Jan", enrollments: 240 },
  { month: "Feb", enrollments: 340 },
  { month: "Mar", enrollments: 280 },
  { month: "Apr", enrollments: 420 },
  { month: "May", enrollments: 380 },
  { month: "Jun", enrollments: 520 }
];

const recentActivity = [
  {
    id: 1,
    user: "Aarav Sharma",
    action: "Enrolled in",
    course: "Master DSA",
    timestamp: "2 hours ago",
    type: "enrollment"
  },
  {
    id: 2,
    user: "Priya Mehta",
    action: "Purchased",
    course: "System Design",
    timestamp: "4 hours ago",
    type: "purchase"
  },
  {
    id: 3,
    user: "Rahul Verma",
    action: "Completed",
    course: "Full Stack Development",
    timestamp: "6 hours ago",
    type: "completion"
  },
  {
    id: 4,
    user: "Sneha Kapoor",
    action: "Enrolled in",
    course: "React Advanced",
    timestamp: "8 hours ago",
    type: "enrollment"
  }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const supabase = createClient();

      try {
        const [usersResult, coursesResult] = await Promise.all([
          supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .eq("role", "user"),

          supabase.from("courses").select("*", { count: "exact", head: true })
        ]);

        setStats({
          totalUsers: usersResult.count || 0,
          totalCourses: coursesResult.count || 0
        });
      } catch (error) {
        console.error("Dashboard stats error:", error);
      }

      setLoading(false);
    };

    fetchDashboardStats();
  }, []);

  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      subtitle: "Registered learners"
    },

    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      subtitle: "Published programs"
    },

    {
      title: "Platform Activity",
      value: "Active",
      icon: Activity,
      subtitle: "Operational status"
    },

    {
      title: "Growth",
      value: "Scaling",
      icon: TrendingUp,
      subtitle: "Platform expansion"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 px-6 py-10 md:px-8 md:py-12">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/4 top-0 h-[320px] w-[320px] rounded-full bg-primary/[0.05] blur-[120px]" />

          <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-primary/[0.03] blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Top */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Admin Control Center
              </div>

              {/* Heading */}
              <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-foreground">
                Dashboard Overview
              </h1>

              <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">
                Monitor platform growth, manage courses, and track activity
                across the CP Geeks ecosystem.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {statsCards.map((stat, i) => {
              const Icon = stat.icon;

              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[26px] border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 p-6">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
                        <ArrowUpRight className="h-3 w-3" />
                        Live
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-6">
                      <p className="text-sm font-medium text-foreground/55">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-4xl font-black tracking-tight text-foreground">
                        {loading ? "—" : stat.value}
                      </h2>

                      <p className="mt-2 text-sm text-foreground/50">
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="px-6 py-8 md:px-8 md:py-10">
        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Enrollment Trend */}
          <div className="relative overflow-hidden rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

            <div className="relative z-10 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-foreground">
                    Enrollment Trend
                  </h2>

                  <p className="mt-1 text-sm text-foreground/55">
                    Monthly enrollment overview
                  </p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  Live Data
                </div>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border/40"
                  />

                  <XAxis dataKey="month" className="text-xs" />

                  <YAxis className="text-xs" />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    stroke="var(--color-primary)"
                    strokeWidth={3}
                    dot={{
                      fill: "var(--color-primary)",
                      r: 5
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue */}
          <div className="relative overflow-hidden rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

            <div className="relative z-10 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-foreground">
                    Platform Growth
                  </h2>

                  <p className="mt-1 text-sm text-foreground/55">
                    Engagement distribution overview
                  </p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  Analytics
                </div>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border/40"
                  />

                  <XAxis dataKey="month" className="text-xs" />

                  <YAxis className="text-xs" />

                  <Tooltip />

                  <Bar
                    dataKey="enrollments"
                    fill="var(--color-primary)"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-6">
          <div className="relative overflow-hidden rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-foreground">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-sm text-foreground/55">
                    Latest platform interactions and enrollments
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="rounded-xl border-border/30 bg-background/40"
                >
                  View All
                </Button>
              </div>

              {/* Activity List */}
              <div className="mt-8 space-y-4">
                {recentActivity.map(activity =>
                  <div
                    key={activity.id}
                    className="group flex flex-col gap-5 rounded-2xl border border-border/30 bg-background/30 p-5 transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.03] md:flex-row md:items-center md:justify-between"
                  >
                    {/* Left */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <Users className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm leading-relaxed text-foreground/75">
                          <span className="font-semibold text-foreground">
                            {activity.user}
                          </span>{" "}
                          {activity.action}{" "}
                          <span className="font-semibold text-primary">
                            {activity.course}
                          </span>
                        </p>

                        <p className="mt-2 text-xs text-foreground/45">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div
                      className={`
                        inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium border
                        ${activity.type === "enrollment"
                          ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                          : activity.type === "purchase"
                            ? "border-green-500/20 bg-green-500/10 text-green-400"
                            : "border-purple-500/20 bg-purple-500/10 text-purple-400"}
                      `}
                    >
                      {activity.type.charAt(0).toUpperCase() +
                        activity.type.slice(1)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Insights */}
      </section>
    </div>
  );
}

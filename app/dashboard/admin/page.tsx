"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Users,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  ShoppingCart,
  Sparkles
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

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalRevenue: 0
  });

  const [enrollmentData, setEnrollmentData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const supabase = createClient();

      try {
        const [
          usersResult,
          coursesResult,
          enrollmentsResult,
          purchasesResult
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .eq("role", "user"),

          supabase
            .from("courses")
            .select("*", { count: "exact", head: true }),

          supabase
            .from("course_enrollments")
            .select("*", { count: "exact", head: true }),

          supabase
            .from("purchases")
            .select("amount, created_at")
            .eq("status", "SUCCESS")
        ]);

        const revenue =
          purchasesResult.data?.reduce(
            (sum, purchase) => sum + purchase.amount,
            0
          ) || 0;

        setStats({
          totalUsers: usersResult.count || 0,
          totalCourses: coursesResult.count || 0,
          totalEnrollments: enrollmentsResult.count || 0,
          totalRevenue: revenue
        });

        const revenueMap = new Map<string, number>();

        purchasesResult.data?.forEach(item => {
          const month = new Date(item.created_at).toLocaleString("en-US", {
            month: "short"
          });

          revenueMap.set(
            month,
            (revenueMap.get(month) || 0) + item.amount
          );
        });

        setRevenueData(
          Array.from(revenueMap.entries()).map(([month, revenue]) => ({
            month,
            revenue
          }))
        );

        const { data: enrollments } = await supabase
          .from("course_enrollments")
          .select("enrolled_at");

        const enrollmentMap = new Map<string, number>();

        enrollments?.forEach(item => {
          const month = new Date(item.enrolled_at).toLocaleString("en-US", {
            month: "short"
          });

          enrollmentMap.set(
            month,
            (enrollmentMap.get(month) || 0) + 1
          );
        });

        setEnrollmentData(
          Array.from(enrollmentMap.entries()).map(
            ([month, enrollments]) => ({
              month,
              enrollments
            })
          )
        );

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
      title: "Total Enrollments",
      value: stats.totalEnrollments,
      icon: ShoppingCart,
      subtitle: "Course enrollments"
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      subtitle: "Successful payments"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
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

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Top */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between text-center lg:text-left">
            <div className="w-full">
              {/* Badge */}
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs sm:text-sm font-medium text-primary backdrop-blur-sm mx-auto lg:mx-0">
                <Sparkles className="h-4 w-4" />
                Admin Control Center
              </div>

              {/* Heading */}
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
                Dashboard Overview
              </h1>

              <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg leading-relaxed text-foreground/65">
                Monitor Enrollment Trend, Revenue Analytics and more in real-time.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {statsCards.map((stat, i) => {
              const Icon = stat.icon;

              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[20px] sm:rounded-[26px] border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 p-5 sm:p-6">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-green-400">
                        <ArrowUpRight className="h-3 w-3" />
                        Live
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-5 sm:mt-6">
                      <p className="text-xs sm:text-sm font-medium text-foreground/55">
                        {stat.title}
                      </p>

                      <h2 className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black tracking-tight text-foreground truncate">
                        {loading ? "—" : stat.value}
                      </h2>

                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-foreground/50">
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
      <section className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            
            {/* Enrollment Trend */}
            <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

              <div className="relative z-10 p-5 sm:p-6">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                      Enrollment Trend
                    </h2>

                    <p className="mt-1 text-xs sm:text-sm text-foreground/55">
                      Monthly enrollment overview
                    </p>
                  </div>

                  <div className="w-fit rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] sm:text-xs font-medium text-primary">
                    Live Data
                  </div>
                </div>

                <div className="w-full overflow-x-auto scrollbar-hide pb-2">
                  <div className="min-w-[400px]">
                    <ResponsiveContainer width="100%" height={280} className="sm:h-[320px]">
                      <LineChart data={enrollmentData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-border/40"
                        />

                        <XAxis dataKey="month" className="text-[10px] sm:text-xs" />

                        <YAxis className="text-[10px] sm:text-xs" />

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
              </div>
            </div>

            {/* Revenue */}
            <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

              <div className="relative z-10 p-5 sm:p-6">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                      Revenue Analytics
                    </h2>

                    <p className="mt-1 text-xs sm:text-sm text-foreground/55">
                      Monthly revenue overview
                    </p>
                  </div>

                  <div className="w-fit rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] sm:text-xs font-medium text-primary">
                    Analytics
                  </div>
                </div>

                <div className="w-full overflow-x-auto scrollbar-hide pb-2">
                  <div className="min-w-[400px]">
                    <ResponsiveContainer width="100%" height={280} className="sm:h-[320px]">
                      <BarChart data={enrollmentData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-border/40"
                        />

                        <XAxis dataKey="month" className="text-[10px] sm:text-xs" />

                        <YAxis className="text-[10px] sm:text-xs" />

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
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
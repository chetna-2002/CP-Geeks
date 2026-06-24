"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data || []);
      }

      setLoading(false);
    };

    fetchCourses();
  }, []);

  const categories = [
    { id: "all", label: "All Courses" },
    { id: "dsa", label: "DSA & Algorithms" },
    { id: "web", label: "Web Development" },
    { id: "system-design", label: "System Design" },
    { id: "data-science", label: "Data Science" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "mobile", label: "Mobile Dev" }
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        course.title.toLowerCase().includes(search) ||
        course.description?.toLowerCase().includes(search) ||
        course.instructor_name?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, courses]);

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
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-primary font-medium backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Practical Engineering Courses
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
              Explore
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                {" "}
                Courses
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/65">
              Learn DSA, Full Stack Development, System Design, and practical
              engineering skills through structured learning paths and
              mentorship.
            </p>

            {/* Search */}
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-300 focus-within:border-primary/30 focus-within:shadow-xl focus-within:shadow-primary/5">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />

                <Input
                  placeholder="Search courses"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="relative z-10 h-14 border-0 bg-transparent pl-14 text-base shadow-none focus-visible:ring-0"
                />
              </div>

              {/* Count */}
              <p className="mt-5 text-sm text-foreground/50">
                {filteredCourses.length}{" "}
                {filteredCourses.length === 1
                  ? "course available"
                  : "courses available"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="relative py-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-16 md:py-20">
              <div className="rounded-2xl border border-border/30 bg-card/40 px-6 py-4 text-foreground/60 backdrop-blur-xl">
                Loading courses...
              </div>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course, i) => (
                <div
                  key={course.id}
                  className="group relative flex flex-col overflow-hidden rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top */}
                  <div className="relative border-b border-border/20 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <span className="text-lg font-black">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="rounded-full border border-primary/20 bg-background/50 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                        Course
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-2xl font-black leading-tight text-foreground transition-colors group-hover:text-primary">
                        {course.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/65">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-1 flex-col p-6">
                    {/* Instructor */}
                    <div className="rounded-2xl border border-border/20 bg-background/30 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-foreground/45">
                            Instructor
                          </p>

                          <p className="mt-1 font-semibold text-foreground">
                            {course.instructor_name || "CP Geeks"}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs uppercase tracking-wide text-foreground/45">
                            Duration
                          </p>

                          <p className="mt-1 font-semibold text-foreground">
                            {course.duration || "Flexible"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Bottom */}
                    <div className="mt-6 border-t border-border/20 pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-foreground/45">
                            Course Fee
                          </p>

                          <p className="mt-1 text-3xl font-black text-primary">
                            ₹{course.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="w-full sm:w-auto">
                          {course.slug ? (
                            <Link href={`/courses/${course.slug}`} className="block w-full">
                              <Button className="w-full sm:w-auto rounded-xl px-6 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
                                Explore
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              disabled
                              className="w-full sm:w-auto rounded-xl px-6 opacity-50 cursor-not-allowed"
                            >
                              Coming Soon
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Glow */}
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/[0.05] blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-12 md:py-24">
              <div className="w-full max-w-md rounded-[28px] border border-border/40 bg-card/50 p-6 sm:p-10 text-center backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Search className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl sm:text-2xl font-black text-foreground">
                  No Courses Found
                </h3>

                <p className="mt-3 leading-relaxed text-foreground/60 text-sm sm:text-base">
                  Try searching with different keywords or clear your search.
                </p>

                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mt-6 w-full sm:w-auto rounded-xl border-border/30 bg-background/40"
                >
                  Clear Search
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
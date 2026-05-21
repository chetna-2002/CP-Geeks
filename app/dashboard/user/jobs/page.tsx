"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, MapPin, DollarSign } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "Active")
        .order("posted_date", { ascending: false });

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data || []);
      }

      setLoading(false);
    };

    fetchJobs();
  }, []);

  const categories = [
    { id: "all", label: "All Jobs" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Full Stack" },
    { id: "devops", label: "DevOps" },
    { id: "ml", label: "ML/AI" },
    { id: "data", label: "Data" },
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        (job.location?.toLowerCase().includes(search) ?? false);

      const matchesCategory =
        selectedCategory === "all" || job.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, jobs]);

  return (
    <div className="bg-background selection:bg-primary/20 pb-20">
      
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
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Briefcase className="h-4 w-4" />
              Engineering Opportunities
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-5xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
              Explore
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                {" "}
                Tech Jobs
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground/65">
              Discover internships and engineering opportunities across modern
              technology teams.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-300 focus-within:border-primary/30 focus-within:shadow-xl focus-within:shadow-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                <Input
                  placeholder="Search jobs, companies, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="relative z-10 h-12 border-0 bg-transparent pl-14 text-base shadow-none focus-visible:ring-0"
                />
              </div>

              {/* Filters */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => {
                  const active = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`group relative overflow-hidden rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "border-primary/30 bg-primary text-black shadow-lg shadow-primary/20"
                          : "border-border/30 bg-card/40 text-foreground/65 backdrop-blur-xl hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/[0.04] hover:text-primary"
                      }`}
                    >
                      {!active && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Count */}
              <p className="mt-5 text-center text-sm text-foreground/50">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1
                  ? "opportunity found"
                  : "opportunities found"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-12 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="rounded-2xl border border-border/30 bg-card/40 px-6 py-4 text-foreground/60 backdrop-blur-xl">
                Loading opportunities...
              </div>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredJobs.map((job, i) => (
                <div
                  key={job.id}
                  className="group relative overflow-hidden rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top */}
                  <div className="relative border-b border-border/20 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                            <span className="font-black">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <h2 className="truncate text-2xl font-black text-foreground transition-colors group-hover:text-primary">
                              {job.title}
                            </h2>
                            <p className="mt-1 text-sm font-semibold text-primary">
                              {job.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-full border border-primary/20 bg-background/50 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                        Active
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col p-6">
                    {/* Meta */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {job.location && (
                        <div className="flex items-center gap-3 rounded-xl border border-border/20 bg-background/30 px-4 py-3">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-xs uppercase tracking-wide text-foreground/45">
                              Location
                            </p>
                            <p className="text-sm font-medium text-foreground/75">
                              {job.location}
                            </p>
                          </div>
                        </div>
                      )}

                      {job.job_type && (
                        <div className="flex items-center gap-3 rounded-xl border border-border/20 bg-background/30 px-4 py-3">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-xs uppercase tracking-wide text-foreground/45">
                              Role Type
                            </p>
                            <p className="text-sm font-medium text-foreground/75">
                              {job.job_type}
                            </p>
                          </div>
                        </div>
                      )}

                      {job.salary && (
                        <div className="flex items-center gap-3 rounded-xl border border-border/20 bg-background/30 px-4 py-3">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-xs uppercase tracking-wide text-foreground/45">
                              Compensation
                            </p>
                            <p className="text-sm font-medium text-foreground/75">
                              {job.salary.includes("-") 
                                ? `₹${job.salary.split("-")[0]}L - ₹${job.salary.split("-")[1]}L`
                                : job.salary}
                            </p>
                          </div>
                        </div>
                      )}

                      {job.posted_date && (
                        <div className="flex items-center gap-3 rounded-xl border border-border/20 bg-background/30 px-4 py-3">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <div>
                            <p className="text-xs uppercase tracking-wide text-foreground/45">
                              Posted
                            </p>
                            <p className="text-sm font-medium text-foreground/75">
                              {new Date(job.posted_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom */}
                    <div className="mt-6 flex items-center justify-between border-t border-border/20 pt-6">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-foreground/45">
                          Opportunity
                        </p>
                        <p className="mt-1 font-semibold text-foreground">
                          Engineering Role
                        </p>
                      </div>

                      {/* Updated routing path here */}
                      <Link href={`/dashboard/user/jobs/${job.id}`}>
                        <Button className="rounded-xl px-6 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
                          View Job
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/[0.05] blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-20">
              <div className="max-w-md rounded-[28px] border border-border/40 bg-card/50 p-10 text-center backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Search className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-black text-foreground">
                  No Jobs Found
                </h3>
                <p className="mt-3 leading-relaxed text-foreground/60">
                  Try searching with different keywords.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="mt-6 rounded-xl border-border/30 bg-background/40"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
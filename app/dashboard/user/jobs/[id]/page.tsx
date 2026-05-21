"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ExternalLink,
  Copy,
  Briefcase,
  MapPin,
  Clock3,
  Sparkles,
  CircleCheck,
} from "lucide-react";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setJob(data);
      }

      setLoading(false);
    };

    fetchJob();
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="bg-background">
        <div className="flex items-center justify-center py-40">
          <div className="rounded-2xl border border-border/30 bg-card/40 px-6 py-4 text-foreground/60 backdrop-blur-xl">
            Loading opportunity...
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-background">
        <div className="flex items-center justify-center py-40">
          <div className="rounded-2xl border border-border/30 bg-card/40 px-6 py-4 text-foreground/60 backdrop-blur-xl">
            Job not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 py-12 md:py-14">
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
          {/* Back */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 gap-2 rounded-xl border border-border/30 bg-card/40 backdrop-blur-xl hover:bg-primary/[0.06]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Active Opportunity
            </div>

            {/* Title */}
            <h1 className="mt-5 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-foreground">
              {job.title}
            </h1>

            {/* Company */}
            <p className="mt-4 text-xl font-semibold text-primary">
              {job.company}
            </p>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/65">
              Engineering opportunity for developers looking to build practical
              experience and work on modern systems.
            </p>

            {/* Meta */}
            <div className="mt-7 flex flex-wrap gap-3">
              {job.location && (
                <div className="flex items-center gap-2 rounded-xl border border-border/30 bg-card/40 px-3.5 py-2.5 text-sm text-foreground/70 backdrop-blur-xl">
                  <MapPin className="h-4 w-4 text-primary" />
                  {job.location}
                </div>
              )}

              {job.job_type && (
                <div className="flex items-center gap-2 rounded-xl border border-border/30 bg-card/40 px-3.5 py-2.5 text-sm text-foreground/70 backdrop-blur-xl">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {job.job_type}
                </div>
              )}

              {job.experience && (
                <div className="flex items-center gap-2 rounded-xl border border-border/30 bg-card/40 px-3.5 py-2.5 text-sm text-foreground/70 backdrop-blur-xl">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {job.experience}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] items-start">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Description */}
              <div className="rounded-[28px] border border-border/40 bg-card/50 p-6 md:p-7 backdrop-blur-xl">
                <h2 className="text-2xl font-black text-foreground">
                  Job Description
                </h2>
                <div className="mt-6 whitespace-pre-line leading-relaxed text-foreground/70">
                  {job.description}
                </div>
              </div>

              {/* Requirements */}
              {job.requirements?.length > 0 && (
                <div className="rounded-[28px] border border-border/40 bg-card/50 p-6 md:p-7 backdrop-blur-xl">
                  <h2 className="text-2xl font-black text-foreground">
                    Requirements
                  </h2>
                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    {job.requirements.map((req: string, i: number) => (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-2xl border border-border/30 bg-background/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/[0.03]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-3">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CircleCheck className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/75">
                            {req}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits?.length > 0 && (
                <div className="rounded-[28px] border border-border/40 bg-card/50 p-6 md:p-7 backdrop-blur-xl">
                  <h2 className="text-2xl font-black text-foreground">
                    Benefits & Perks
                  </h2>
                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    {job.benefits.map((benefit: string, i: number) => (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-2xl border border-border/30 bg-background/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/[0.03]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-3">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CircleCheck className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/75">
                            {benefit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Sticky Panel */}
            <div className="space-y-6 lg:sticky lg:top-24">
              
              {/* Apply Card */}
              <div className="relative overflow-hidden rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />
                <div className="relative z-10 p-6">
                  <p className="text-sm uppercase tracking-wide text-foreground/50">
                    Compensation
                  </p>
                  <h2 className="mt-3 text-4xl font-black text-primary">
                    {job.salary
                      ? job.salary.includes("-") 
                          ? `₹${job.salary.split("-")[0]}L - ₹${job.salary.split("-")[1]}L`
                          : job.salary
                      : "Competitive"}
                  </h2>

                  {/* Features */}
                  <div className="mt-5 space-y-2.5">
                    {[
                      "Engineering-focused role",
                      "Modern development environment",
                      "Practical project exposure",
                      "Career growth opportunity",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-border/20 bg-background/30 px-4 py-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <p className="text-sm text-foreground/70">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  {job.apply_link && (
                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="mt-7 h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01]">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Apply Now
                      </Button>
                    </a>
                  )}

                  <Button
                    variant="outline"
                    onClick={copyLink}
                    className="mt-3 h-11 w-full rounded-xl border border-border/30 bg-background/40 text-foreground shadow-none backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.06] hover:text-foreground"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? "Copied Link" : "Copy Job Link"}
                  </Button>
                </div>
              </div>

              {/* Details Card */}
              <div className="rounded-[28px] border border-border/40 bg-card/50 p-6 backdrop-blur-xl">
                <h3 className="text-xl font-black text-foreground">
                  Job Details
                </h3>

                <div className="mt-6 space-y-4">
                  {job.posted_date && (
                    <div className="rounded-xl border border-border/20 bg-background/30 p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/45">
                        Posted
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {new Date(job.posted_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {job.deadline && (
                    <div className="rounded-xl border border-border/20 bg-background/30 p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/45">
                        Deadline
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {new Date(job.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {job.status && (
                    <div className="rounded-xl border border-border/20 bg-background/30 p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/45">
                        Status
                      </p>
                      <p className="mt-1 font-semibold text-primary">
                        {job.status}
                      </p>
                    </div>
                  )}

                  {job.category && (
                    <div className="rounded-xl border border-border/20 bg-background/30 p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/45">
                        Category
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {job.category}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
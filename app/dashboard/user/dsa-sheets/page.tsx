"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Brain,
  Layers,
  Sparkles,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DsaSheetsPage() {
  const supabase = createClient();
  const router = useRouter();
  const { profile, loading } = useAuth();

  const [dsaSheetsData, setDsaSheetsData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetching, setFetching] = useState(true);
  
  // Dynamic Real-Time Stats
  const [totalProblems, setTotalProblems] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);

  // Authentication and Access Guard
  useEffect(() => {
    if (!loading && !profile) {
      router.replace("/login");
    }
  }, [profile, loading, router]);

  // Fetch Topics and calculate dynamic problems counts from database
  useEffect(() => {
    if (!profile) return;

    const fetchTopics = async () => {
      setFetching(true);
      const { data: topics } = await supabase
        .from("dsa_topics")
        .select("*")
        .order("title");

      if (!topics) {
        setFetching(false);
        return;
      }

      const mapped = await Promise.all(
        topics.map(async (topic) => {
          const { count } = await supabase
            .from("dsa_problems")
            .select("*", { count: "exact", head: true })
            .eq("topic_id", topic.id);

          // Standardize difficulty levels to group them correctly
          const diff = topic.difficulty?.toLowerCase() || "";
          let groupLevel = "Beginner";
          if (diff === "medium" || diff === "intermediate") {
            groupLevel = "Intermediate";
          } else if (diff === "hard" || diff === "advanced") {
            groupLevel = "Advanced";
          }

          return {
            id: topic.id,
            title: topic.title,
            difficulty: topic.difficulty, 
            groupLevel,                  
            problems: count || 0,
            topics: topic.tags || []     
          };
        })
      );

      // Calculate true totals from the database map
      const dbTotalProblems = mapped.reduce((acc, sheet) => acc + sheet.problems, 0);
      
      setTotalProblems(dbTotalProblems);
      setTotalTopics(topics.length);
      setDsaSheetsData(mapped);
      setFetching(false);
    };

    fetchTopics();
  }, [profile, supabase]);

  if (loading || !profile) return null;

  // Search filter implementation matching layouts
  const filteredSheets = dsaSheetsData.filter(sheet => 
    sheet.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDifficultyGroup = (groupLabel: string, sectionTitle: string) => {
    const items = filteredSheets.filter(sheet => sheet.groupLevel === groupLabel);
    if (items.length === 0) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" /> {sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((sheet) => {
            
            // Determine dynamic color based on the actual difficulty string
            const diffCheck = sheet.difficulty?.toLowerCase() || "";
            let colorClasses = "bg-red-500/10 text-red-400 border border-red-500/20"; // Default Hard/Red
            
            if (diffCheck === "easy" || diffCheck === "beginner") {
              colorClasses = "bg-green-500/10 text-green-400 border border-green-500/20";
            } else if (diffCheck === "medium" || diffCheck === "intermediate") {
              colorClasses = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
            }

            return (
              <div
                key={sheet.id}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-border/30 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-6 flex flex-col flex-1 space-y-4 relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {sheet.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${colorClasses}`}>
                      {sheet.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-foreground/60 font-medium">
                    {sheet.problems} Challenges curated
                  </p>

                  {sheet.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {sheet.topics.map((tag: string, j: number) => (
                        <span key={j} className="px-2 py-0.5 rounded-md border border-border/20 bg-background/50 text-[11px] text-foreground/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 mt-auto">
                    <Link href={`/dsa-sheets/${sheet.id}`}>
                      <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-md shadow-primary/10 gap-2 group/btn">
                        Start Learning
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Real Database Metrics Array
  const dynamicStats = [
    { value: totalProblems.toString(), label: "Curated Problems", icon: Brain },
    { value: totalTopics.toString(), label: "Algorithms & Topics", icon: Layers },
  ];

  return (
    <div className="bg-background text-foreground selection:bg-primary/20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/30 py-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[125px]" />
          <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-primary/[0.04] rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Core Curriculum Track
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-none">
            DSA & Algorithms Mastery
          </h1>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Complete high-intensity Data Structures and Algorithms path. Systematically advance across {totalProblems > 0 ? totalProblems : "our"} targeted coding challenges curated directly from the database.
          </p>

          <div className="relative max-w-md mx-auto pt-4">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <Input 
              type="text"
              placeholder="Filter topics (e.g. Arrays, Trees, Dynamic Programming)..." 
              className="h-12 pl-11 bg-card/50 border-border/40 rounded-xl focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* STATS DISCOVERY SECTION - REAL DATA ONLY */}
      <section className="border-b border-border/20 bg-card/[0.15] backdrop-blur-sm py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5">
            {dynamicStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="relative group p-5 rounded-2xl border border-border/30 bg-card/25 transition-all duration-300 hover:border-primary/20"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-3xl font-black tracking-tight text-primary">
                        {fetching ? "..." : stat.value}
                      </p>
                      <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary/60 group-hover:text-primary transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPACT MATRIX TOPICS LIST CONTAINER */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {fetching ? (
            <div className="py-20 text-center text-sm font-mono text-foreground/40 animate-pulse">
              Computing dynamic progress parameters from database...
            </div>
          ) : filteredSheets.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border/30 rounded-3xl text-sm text-foreground/40">
              No matching topic templates matched your search configuration.
            </div>
          ) : (
            <div className="space-y-16">
              {renderDifficultyGroup("Beginner", "Beginner Foundations")}
              {renderDifficultyGroup("Intermediate", "Intermediate Algorithms")}
              {renderDifficultyGroup("Advanced", "Advanced Complexities")}
            </div>
          )}
        </div>
      </section>

      {/* LOWER FOOTER ENGAGEMENT BLOCK */}
      <section className="border-t border-border/30 py-20 bg-gradient-to-b from-transparent to-card/10">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-black tracking-tight">Accelerate Your Engineering Path</h2>
          <p className="text-base text-foreground/60 leading-relaxed max-w-xl mx-auto">
            Surround yourself with structured accountability patterns, real live mentorship queues, and verified company referrals.
          </p>
          <Link href="/dashboard/user">
            <Button size="lg" className="gap-2 rounded-xl font-bold h-12 px-6 shadow-xl shadow-primary/10 transition-transform hover:scale-[1.02]">
              View Current Live Cohort <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
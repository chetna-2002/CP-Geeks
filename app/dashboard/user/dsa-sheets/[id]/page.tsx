"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TopicProblemsPage() {
  const supabase = createClient();
  const params = useParams();
  const topicId = params.id as string;

  const [topic, setTopic] = useState<any>(null);
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: topicData } = await supabase
      .from("dsa_topics")
      .select("*")
      .eq("id", topicId)
      .single();

    const { data: problemsData } = await supabase
      .from("dsa_problems")
      .select("*")
      .eq("topic_id", topicId)
      .order("order_index");

    setTopic(topicData);
    setProblems(problemsData || []);
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading problems...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <div className="relative overflow-hidden rounded-[32px] border border-border/40 bg-card/50 p-8 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent" />

        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            DSA Roadmap Topic
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight">
            {topic?.title}
          </h1>

          <p className="mt-3 text-muted-foreground">
            Solve problems progressively and build strong pattern recognition.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl border px-4 py-2 text-sm">
              {problems.length} Problems
            </div>

            <div className="rounded-xl border px-4 py-2 text-sm">
              Practice Sheet
            </div>
          </div>
        </div>
      </div>

      {problems.map((p) => (
        <Card
          key={p.id}
          className="group overflow-hidden rounded-[24px] border-border/40 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
        >
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-muted-foreground">
                {p.platform} • {p.difficulty}
              </p>
            </div>

            <a href={p.url} target="_blank">
              <Button>Open</Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

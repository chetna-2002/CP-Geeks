'use client'

import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const dsaTopics = [
  {
    category: 'Arrays & Hashing',
    difficulty: 'Beginner',
    problems: 45,
    topics: ['Two Pointers', 'Prefix Sum', 'Hash Maps'],
  },
  {
    category: 'Linked Lists',
    difficulty: 'Beginner',
    problems: 38,
    topics: ['Reversal', 'Cycle Detection', 'Merging'],
  },
  {
    category: 'Binary Search',
    difficulty: 'Intermediate',
    problems: 35,
    topics: ['Search Space', 'Boundaries', 'Answer Binary Search'],
  },
  {
    category: 'Stacks & Queues',
    difficulty: 'Intermediate',
    problems: 42,
    topics: ['Monotonic Stack', 'Deque', 'Priority Queue'],
  },
  {
    category: 'Trees & Graphs',
    difficulty: 'Intermediate',
    problems: 65,
    topics: ['DFS', 'BFS', 'LCA', 'Topological Sort'],
  },
  {
    category: 'Dynamic Programming',
    difficulty: 'Advanced',
    problems: 85,
    topics: ['1D DP', '2D DP', 'Digit DP', 'Tree DP'],
  },
  {
    category: 'Greedy Algorithms',
    difficulty: 'Advanced',
    problems: 32,
    topics: ['Activity Selection', 'Huffman Coding', 'Interval Scheduling'],
  },
  {
    category: 'Advanced Data Structures',
    difficulty: 'Advanced',
    problems: 55,
    topics: ['Segment Trees', 'Fenwick Trees', 'Tries', 'Disjoint Set'],
  },
]

const stats = [
  { value: '400+', label: 'Problems' },
  { value: '50+', label: 'Video Solutions' },
  { value: '10+', label: 'Live Mentorship Sessions' },
  { value: '20+', label: 'Mock Interviews' },
]

const dsaSheets = dsaTopics.map((topic, index) => ({
  id: index + 1,
  title: topic.category,
  difficulty: topic.difficulty,
  problems: topic.problems,
  topics: topic.topics,
  color: 'border-border/30',
  textColor: 'text-foreground',
}));

export default function DsaSheetsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">DSA & Algorithms Mastery</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Complete Data Structures and Algorithms learning path with 400+ problems and video solutions
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-all animate-slide-up" style={{ animationDelay: `${i * 75}ms` }}>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DSA Topics */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Beginner */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Beginner Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dsaSheets
                  .filter((sheet) => sheet.difficulty === 'Beginner')
                  .map((sheet, i) => (
                    <div
                      key={sheet.id}
                      className={`group rounded-xl border ${sheet.color} overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-slide-up bg-card`}
                      style={{ animationDelay: `${i * 75}ms` }}
                    >
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{sheet.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${sheet.textColor}`}>{sheet.difficulty}</span>
                        </div>
                        <p className="text-sm text-foreground/70">{sheet.problems} problems</p>
                        <div className="flex flex-wrap gap-2">
                          {sheet.topics.map((topic, j) => (
                            <span key={j} className="px-2 py-1 rounded bg-foreground/5 text-xs text-foreground/70">
                              {topic}
                            </span>
                          ))}
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-4">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Intermediate */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Intermediate Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dsaSheets
                  .filter((sheet) => sheet.difficulty === 'Intermediate')
                  .map((sheet, i) => (
                    <div
                      key={sheet.id}
                      className={`group rounded-xl border ${sheet.color} overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-slide-up bg-card`}
                      style={{ animationDelay: `${(i + 2) * 75}ms` }}
                    >
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{sheet.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${sheet.textColor}`}>{sheet.difficulty}</span>
                        </div>
                        <p className="text-sm text-foreground/70">{sheet.problems} problems</p>
                        <div className="flex flex-wrap gap-2">
                          {sheet.topics.map((topic, j) => (
                            <span key={j} className="px-2 py-1 rounded bg-foreground/5 text-xs text-foreground/70">
                              {topic}
                            </span>
                          ))}
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-4">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Advanced */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Advanced Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dsaSheets
                  .filter((sheet) => sheet.difficulty === 'Advanced')
                  .map((sheet, i) => (
                    <div
                      key={sheet.id}
                      className={`group rounded-xl border ${sheet.color} overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-slide-up bg-card`}
                      style={{ animationDelay: `${(i + 5) * 75}ms` }}
                    >
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{sheet.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${sheet.textColor}`}>{sheet.difficulty}</span>
                        </div>
                        <p className="text-sm text-foreground/70">{sheet.problems} problems</p>
                        <div className="flex flex-wrap gap-2">
                          {sheet.topics.map((topic, j) => (
                            <span key={j} className="px-2 py-1 rounded bg-foreground/5 text-xs text-foreground/70">
                              {topic}
                            </span>
                          ))}
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-4">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/30 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Master DSA?</h2>
          <p className="text-lg text-foreground/70">Join our comprehensive course with live mentorship and mock interviews</p>
          <Link href="/courses">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              Explore Course <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  )
}

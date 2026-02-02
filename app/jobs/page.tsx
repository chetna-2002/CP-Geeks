'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Briefcase, MapPin, DollarSign } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'Active')
        .order('posted_date', { ascending: false })

      if (error) {
        console.error('Error fetching jobs:', error)
      } else {
        setJobs(data || [])
      }

      setLoading(false)
    }

    fetchJobs()
  }, [])

  const categories = [
    { id: 'all', label: 'All Jobs' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'devops', label: 'DevOps' },
    { id: 'ml', label: 'ML/AI' },
    { id: 'data', label: 'Data' },
  ]

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const search = searchTerm.toLowerCase()

      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        (job.location?.toLowerCase().includes(search) ?? false)

      // Category not yet supported in DB
      const matchesCategory = selectedCategory === 'all'

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, jobs])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Find Your Dream Job</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Exclusive job opportunities at top tech companies
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-foreground/40" />
            <Input
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-11"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <p className="text-sm text-foreground/60">
            Showing <span className="font-semibold">{filteredJobs.length}</span> of {jobs.length} jobs
          </p>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          {loading ? (
            <p className="text-center text-foreground/60">Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-xl border border-border/50 bg-card hover:border-primary/30 transition"
                >
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-sm text-primary font-semibold">{job.company}</p>
                      </div>
                      <Link href={`/jobs/${job.id}`}>
                        <Button>View Job</Button>
                      </Link>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-border/30">
                      {job.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-foreground/60" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      {job.salary && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-foreground/60" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                      {job.job_type && (
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="h-4 w-4 text-foreground/60" />
                          <span>{job.job_type}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <p className="text-lg text-foreground/60">No jobs found</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/30 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Placed at Top Companies</h2>
        <p className="text-lg text-foreground/70 mb-6">
          Prepare with our courses and get direct referrals
        </p>
        <Button size="lg" onClick={() => router.push('/courses')}>Explore Courses</Button>
      </section>
    </div>
  )
}

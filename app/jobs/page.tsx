'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Briefcase, MapPin, DollarSign } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const jobs = [
    {
      id: 1,
      title: 'Senior Backend Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '$200k - $250k',
      type: 'Full-time',
      category: 'backend',
      skills: ['Go', 'Java', 'Kubernetes', 'System Design'],
      featured: true,
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Uber',
      location: 'San Francisco, CA',
      salary: '$180k - $230k',
      type: 'Full-time',
      category: 'fullstack',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      featured: true,
    },
    {
      id: 3,
      title: 'Frontend Engineer',
      company: 'Meta',
      location: 'Menlo Park, CA',
      salary: '$170k - $220k',
      type: 'Full-time',
      category: 'frontend',
      skills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
      featured: true,
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'Amazon',
      location: 'Remote',
      salary: '$160k - $210k',
      type: 'Full-time',
      category: 'devops',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
      featured: false,
    },
    {
      id: 5,
      title: 'Data Engineer',
      company: 'Microsoft',
      location: 'Seattle, WA',
      salary: '$150k - $200k',
      type: 'Full-time',
      category: 'data',
      skills: ['Python', 'Spark', 'SQL', 'Big Data'],
      featured: false,
    },
    {
      id: 6,
      title: 'Machine Learning Engineer',
      company: 'OpenAI',
      location: 'San Francisco, CA',
      salary: '$190k - $240k',
      type: 'Full-time',
      category: 'ml',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'ML'],
      featured: false,
    },
    {
      id: 7,
      title: 'Mobile Developer',
      company: 'Apple',
      location: 'Cupertino, CA',
      salary: '$170k - $220k',
      type: 'Full-time',
      category: 'mobile',
      skills: ['Swift', 'iOS', 'Objective-C', 'UI/UX'],
      featured: false,
    },
    {
      id: 8,
      title: 'Cloud Architect',
      company: 'IBM',
      location: 'Remote',
      salary: '$180k - $230k',
      type: 'Full-time',
      category: 'cloud',
      skills: ['AWS', 'Azure', 'GCP', 'Architecture'],
      featured: false,
    },
  ]

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
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )

      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Find Your Dream Job</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Exclusive job opportunities at top tech companies for our graduates
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative animate-slide-up">
              <Search className="absolute left-4 top-3 h-5 w-5 text-foreground/40" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-11 border-border/50 focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`transition-all ${selectedCategory === cat.id ? 'bg-primary hover:bg-primary/90' : 'border-border/50 hover:border-primary/30'}`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-foreground/60">
              Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> of {jobs.length} jobs
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job, i) => (
                <div
                  key={job.id}
                  className={`group rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card animate-slide-up ${
                    job.featured ? 'ring-1 ring-primary/30' : ''
                  }`}
                  style={{ animationDelay: `${i * 75}ms` }}
                >
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-primary font-semibold mt-1">{job.company}</p>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Apply Now
                      </Button>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-border/30">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-foreground/60" />
                        <span className="text-foreground/80">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-foreground/60" />
                        <span className="text-foreground/80">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-foreground/60" />
                        <span className="text-foreground/80">{job.type}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
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
      <section className="border-t border-border/30 py-16 bg-gradient-to-r from-primary/5 to-primary/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Get Placed at Top Companies</h2>
          <p className="text-lg text-foreground/70">
            Prepare with our courses and get direct referrals to your dream company
          </p>
          <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
            Explore Courses
          </Button>
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

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ExternalLink, Copy } from 'lucide-react'

export default function JobDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [job, setJob] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchJob = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching job:', error)
      } else {
        setJob(data)
      }

      setLoading(false)
    }

    fetchJob()
  }, [id])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading job details...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Job not found</p>
      </div>
    )
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {job.apply_link && (
              <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Apply
                </Button>
              </a>
            )}
            <Button variant="outline" onClick={copyLink}>
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left */}
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            {job.requirements?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {job.requirements.map((req: string, i: number) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {job.benefits?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {job.benefits.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline">{job.status}</Badge>
                </div>

                {job.location && (
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p>{job.location}</p>
                  </div>
                )}

                {job.job_type && (
                  <div>
                    <p className="text-sm text-muted-foreground">Job Type</p>
                    <p>{job.job_type}</p>
                  </div>
                )}

                {job.salary && (
                  <div>
                    <p className="text-sm text-muted-foreground">Salary</p>
                    <p>{job.salary}</p>
                  </div>
                )}

                {job.posted_date && (
                  <div>
                    <p className="text-sm text-muted-foreground">Posted</p>
                    <p>{new Date(job.posted_date).toLocaleDateString()}</p>
                  </div>
                )}

                {job.deadline && (
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p>{new Date(job.deadline).toLocaleDateString()}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

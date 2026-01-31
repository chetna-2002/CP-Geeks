'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState<any>(null)

  useEffect(() => {
    const fetchJob = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setJob(data)
    }

    fetchJob()
  }, [id])

  if (!job) return <p>Loading...</p>

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Job link copied!')
  }

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-lg font-semibold">{job.company}</p>
      <p>{job.description}</p>

      <div className="flex gap-4">
        {job.apply_link && (
          <a href={job.apply_link} target="_blank">
            <Button>Apply Now</Button>
          </a>
        )}
        <Button variant="outline" onClick={copyLink}  className="bg-primary hover:bg-white hover:text-primary transition"
>
          Copy Job Link
        </Button>
      </div>
    </div>
  )
}

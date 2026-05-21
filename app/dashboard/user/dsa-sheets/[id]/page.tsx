'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TopicProblemsPage() {
  const supabase = createClient()
  const params = useParams()
  const topicId = params.id as string

  const [topic, setTopic] = useState<any>(null)
  const [problems, setProblems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: topicData } = await supabase
      .from('dsa_topics')
      .select('*')
      .eq('id', topicId)
      .single()

    const { data: problemsData } = await supabase
      .from('dsa_problems')
      .select('*')
      .eq('topic_id', topicId)
      .order('order_index')

    setTopic(topicData)
    setProblems(problemsData || [])
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading problems...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{topic?.title}</CardTitle>
        </CardHeader>
      </Card>

      {problems.map((p) => (
        <Card key={p.id}>
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
  )
}

'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  ExternalLink,
  Brain,
  Layers,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

export default function DSASheetsPage() {
  const supabase = createClient()

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [topics, setTopics] = useState<any[]>([])
  const [problems, setProblems] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const pageSize = 50

  const [form, setForm] = useState({
    topicId: '',
    question: '',
    difficulty: '',
    externalLink: '',
  })

  useEffect(() => {
    fetchTopics()
    fetchProblems()
  }, [page])

  async function fetchTopics() {
    const { data } = await supabase.from('dsa_topics').select('*').order('title')
    setTopics(data || [])
  }

  async function fetchProblems() {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, count } = await supabase
      .from('dsa_problems')
      .select('*,dsa_topics(title)', { count: 'exact' })
      .order('order_index')
      .range(from, to)

    if (!data) return
    setCount(count || 0)
    setProblems(
      data.map((p: any) => ({
        id: p.id,
        topic: p.dsa_topics?.title,
        topic_id: p.topic_id,
        question: p.title,
        difficulty: p.difficulty,
        link: p.url,
      }))
    )
  }

  function reset() {
    setEditingId(null)
    setForm({
      topicId: '',
      question: '',
      difficulty: '',
      externalLink: '',
    })
  }

  function openCreate() {
    reset()
    setIsOpen(true)
  }

  async function save() {
    const payload = {
      topic_id: form.topicId,
      title: form.question,
      difficulty: form.difficulty,
      url: form.externalLink,
    }

    if (editingId) {
      await supabase.from('dsa_problems').update(payload).eq('id', editingId)
    } else {
      await supabase.from('dsa_problems').insert(payload)
    }

    fetchProblems()
    setIsOpen(false)
    reset()
  }

  async function remove(id: string) {
    await supabase.from('dsa_problems').delete().eq('id', id)
    fetchProblems()
  }

  const filtered = problems.filter(
    (p) =>
      p.question.toLowerCase().includes(search.toLowerCase()) ||
      p.topic?.toLowerCase().includes(search.toLowerCase())
  )

  const easy = useMemo(() => problems.filter((i) => i.difficulty === 'Easy').length, [problems])

  return (
    <div className="space-y-8 p-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] border border-border/30 bg-card/25 p-8">
        <div className="absolute left-0 top-0 h-[220px] w-[220px] rounded-full bg-primary/[0.05] blur-[100px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
          <div>
            <div className="inline-flex gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary text-sm">
              <Sparkles className="h-4 w-4" />
              DSA Management
            </div>
            <h1 className="mt-5 text-5xl font-black">DSA Sheets</h1>
            <p className="mt-3 text-foreground/60">Manage and organize DSA questions at scale.</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate} className="gap-2 h-12">
                <Plus />
                Add Question
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl border-border/30 bg-background/95 backdrop-blur-2xl">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Question' : 'Add Question'}</DialogTitle>
                <DialogDescription>Manage DSA sheets</DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div>
                  <Label>Topic</Label>
                  <Select value={form.topicId} onValueChange={(v) => setForm({ ...form, topicId: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((t: any) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Field label="Question" value={form.question} set={(v:any) => setForm({ ...form, question: v })} />

                <div>
                  <Label>Difficulty</Label>
                  <Select value={form.difficulty} onValueChange={(v) => setForm({ ...form, difficulty: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Field label="External Link" value={form.externalLink} set={(v:any) => setForm({ ...form, externalLink: v })} />

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-primary/10 hover:border-primary/30 hover:text-foreground"
                  >
                    Cancel
                  </Button>
                  <Button onClick={save}>{editingId ? 'Update' : 'Create'}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-5">
        <Metric icon={<Brain />} label="Questions" value={count} />
        <Metric icon={<Layers />} label="Topics" value={topics.length} />
        <Metric icon={<BarChart3 />} label="Easy" value={easy} />
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input placeholder="Search questions" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-12" />
      </div>

      <Card className="border-border/30">
        <CardContent className="p-0">
          <div>
            {filtered.map((q: any) => (
              <div key={q.id} className="flex items-center justify-between border-b border-border/20 px-6 py-5 transition-all hover:bg-primary/[0.03]">
                <div className="flex-1">
                  <div className="mb-2 flex gap-2 items-center">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{q.topic}</span>
                    <Diff d={q.difficulty} />
                  </div>
                  <h3 className="font-semibold">{q.question}</h3>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => window.open(q.link, '_blank')} className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                    <ExternalLink />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingId(q.id)
                      setForm({
                        topicId: q.topic_id,
                        question: q.question,
                        difficulty: q.difficulty,
                        externalLink: q.link,
                      })
                      setIsOpen(true)
                    }}
                    className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  >
                    <Edit2 />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="border-border/30 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-[1px] active:scale-95">
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-border/30 bg-background/95 backdrop-blur-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Question?</AlertDialogTitle>
                        <AlertDialogDescription>Cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="hover:bg-primary/10 hover:text-foreground">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => remove(q.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-3">
        <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          <ChevronLeft />
        </Button>
        <div className="px-4 py-2">
          {page} / {Math.ceil(count / pageSize)}
        </div>
        <Button variant="outline" disabled={page >= Math.ceil(count / pageSize)} onClick={() => setPage((p) => p + 1)}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

function Field({ label, value, set }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => set(e.target.value)} />
    </div>
  )
}

function Metric({ icon, value, label }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-primary">{icon}</div>
        <h2 className="mt-4 text-4xl font-black">{value}</h2>
        <p>{label}</p>
      </CardContent>
    </Card>
  )
}

function Diff({ d }: any) {
  const map: any = {
    Easy: 'bg-green-500/10 text-green-500',
    Medium: 'bg-yellow-500/10 text-yellow-500',
    Hard: 'bg-red-500/10 text-red-500',
  }

  return <span className={`px-2 py-1 rounded-full text-xs ${map[d]}`}>{d}</span>
}
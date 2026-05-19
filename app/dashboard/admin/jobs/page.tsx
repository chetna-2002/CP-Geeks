'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
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
  Briefcase,
  Building2,
  Users,
  Trash2,
  Edit2,
  ExternalLink,
  MapPin,
  Clock3,
  IndianRupee,
  Sparkles,
} from 'lucide-react'

export default function JobsPage() {
  const supabase = createClient()

  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const initialState = {
    company: '',
    title: '',
    location: '',
    description: '',
    experience: '',
    jobType: '',
    applyLink: '',
    requirements: '',
    benefits: '',
    deadline: '',
    status: 'Draft',
    salaryMin: '',
    salaryMax: '',
    category: '',
  }

  const [form, setForm] = useState(initialState)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })

    setJobs(data || [])
  }

  function resetForm() {
    setEditingId(null)
    setForm(initialState)
  }

  function openCreate() {
    resetForm()
    setIsOpen(true)
  }

  async function saveJob() {
    setLoading(true)
    const payload = {
      company: form.company,
      title: form.title,
      location: form.location,
      description: form.description,
      experience: form.experience,
      job_type: form.jobType,
      apply_link: form.applyLink,
      salary: form.salaryMin && form.salaryMax ? `${form.salaryMin}-${form.salaryMax}` : null,
      requirements: form.requirements.split(',').map((i) => i.trim()).filter(Boolean),
      benefits: form.benefits.split(',').map((i) => i.trim()).filter(Boolean),
      deadline: form.deadline,
      status: form.status,
      category: form.category,
    }

    if (editingId) {
      await supabase.from('jobs').update(payload).eq('id', editingId)
    } else {
      await supabase.from('jobs').insert(payload)
    }

    await fetchJobs()
    setIsOpen(false)
    resetForm()
    setLoading(false)
  }

  async function deleteJob(id: string) {
    await supabase.from('jobs').delete().eq('id', id)
    fetchJobs()
  }

  const filtered = jobs.filter(
    (j) =>
      j.company?.toLowerCase().includes(search.toLowerCase()) ||
      j.title?.toLowerCase().includes(search.toLowerCase())
  )

  const activeJobs = useMemo(() => jobs.filter((j) => j.status === 'Active').length, [jobs])
  const categories = useMemo(() => new Set(jobs.map((j) => j.category)).size, [jobs])

  return (
    <div className="space-y-8 p-8">
      <section className="relative overflow-hidden rounded-[32px] border border-border/30 bg-card/25 p-8">
        <div className="absolute left-0 top-0 h-[240px] w-[240px] rounded-full bg-primary/[0.05] blur-[110px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Job Management
            </div>
            <h1 className="mt-5 text-5xl font-black">Jobs Dashboard</h1>
            <p className="mt-3 text-foreground/60">
              Manage job opportunities and platform hiring ecosystem.
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate} className="h-12 rounded-xl gap-2">
                <Plus className="h-4 w-4" />
                Post Job
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl border-border/30 bg-background/95 backdrop-blur-2xl">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Job' : 'Post Job'}</DialogTitle>
                <DialogDescription>Manage platform opportunities</DialogDescription>
              </DialogHeader>

              <div className="max-h-[75vh] overflow-y-auto pr-3 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Company" value={form.company} set={(v) => setForm({ ...form, company: v })} />
                  <Field label="Role" value={form.title} set={(v) => setForm({ ...form, title: v })} />
                  <Field label="Location" value={form.location} set={(v) => setForm({ ...form, location: v })} />
                  <Field label="Experience" value={form.experience} set={(v) => setForm({ ...form, experience: v })} />
                </div>

                <TextBlock label="Description" value={form.description} set={(v) => setForm({ ...form, description: v })} />

                <div className="grid md:grid-cols-2 gap-4">
                  <SelectBox
                    label="Job Type"
                    value={form.jobType}
                    set={(v) => setForm({ ...form, jobType: v })}
                    items={['Full Time', 'Internship', 'Part Time', 'Remote', 'Contract']}
                  />
                  <SelectBox
                    label="Status"
                    value={form.status}
                    set={(v) => setForm({ ...form, status: v })}
                    items={['Draft', 'Active', 'Closed']}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Apply Link" value={form.applyLink} set={(v) => setForm({ ...form, applyLink: v })} />
                  <Field label="Category" value={form.category} set={(v) => setForm({ ...form, category: v })} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Min LPA" value={form.salaryMin} set={(v) => setForm({ ...form, salaryMin: v })} />
                  <Field label="Max LPA" value={form.salaryMax} set={(v) => setForm({ ...form, salaryMax: v })} />
                </div>

                <TextBlock
                  label="Requirements"
                  placeholder="React, Node.js, SQL"
                  value={form.requirements}
                  set={(v) => setForm({ ...form, requirements: v })}
                />
                <TextBlock
                  label="Benefits"
                  placeholder="WFH, Insurance"
                  value={form.benefits}
                  set={(v) => setForm({ ...form, benefits: v })}
                />

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-primary/10 hover:text-foreground hover:border-primary/30"
                  >
                    Cancel
                  </Button>
                  <Button onClick={saveJob}>
                    {loading ? 'Saving' : editingId ? 'Update' : 'Create'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* METRICS */}
      <div className="grid gap-5 md:grid-cols-3">
        <Metric icon={<Briefcase />} value={jobs.length} label="Jobs" />
        <Metric icon={<Users />} value={activeJobs} label="Active" />
        <Metric icon={<Building2 />} value={categories} label="Categories" />
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs"
          className="pl-11 h-12"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((job) => (
          <Card key={job.id} className="border-border/30 bg-card/30 transition-all hover:-translate-y-1 hover:border-primary/30">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-primary">{job.company}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setEditingId(job.id)
                      setForm({
                        company: job.company || '',
                        title: job.title || '',
                        location: job.location || '',
                        description: job.description || '',
                        experience: job.experience || '',
                        jobType: job.job_type || '',
                        applyLink: job.apply_link || '',
                        requirements: job.requirements?.join(', ') || '',
                        benefits: job.benefits?.join(', ') || '',
                        deadline: job.deadline || '',
                        status: job.status || 'Draft',
                        salaryMin: job.salary?.split('-')[0] || '',
                        salaryMax: job.salary?.split('-')[1] || '',
                        category: job.category || '',
                      })
                      setIsOpen(true)
                    }}
                    className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="icon" onClick={() => window.open(`/jobs/${job.id}`, '_blank')} className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Row icon={<MapPin />} text={job.location} />
                <Row icon={<Clock3 />} text={job.experience} />
                <Row icon={<IndianRupee />} text={job.salary} />
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="mt-5 w-full hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-border/30 bg-background/95 backdrop-blur-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Job?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-primary/10 hover:text-foreground">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteJob(job.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Metric({ icon, value, label }: any) {
  return (
    <Card className="border-border/30 bg-card/30">
      <CardContent className="p-6">
        <div className="text-primary mb-4">{icon}</div>
        <h2 className="text-4xl font-black">{value}</h2>
        <p className="text-foreground/60">{label}</p>
      </CardContent>
    </Card>
  )
}

function Row({ icon, text }: any) {
  return (
    <div className="flex gap-2 text-sm text-foreground/60">
      {icon}
      {text || '-'}
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

function TextBlock({ label, value, set, placeholder }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea placeholder={placeholder} value={value} onChange={(e) => set(e.target.value)} />
    </div>
  )
}

function SelectBox({ label, value, set, items }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <Select value={value} onValueChange={set}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i: string) => (
            <SelectItem key={i} value={i}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
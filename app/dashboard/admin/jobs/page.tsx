'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react'
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
} from "@/components/ui/alert-dialog"


export default function JobsPage() {

  const supabase = createClient()

  const [jobs, setJobs] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [jobType, setJobType] = useState('')
  const [applyLink, setApplyLink] = useState('')
  const [requirements, setRequirements] = useState('')
  const [benefits, setBenefits] = useState('')
  const [deadline, setDeadline] = useState('')
  const [status, setStatus] = useState('Draft')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [category, setCategory] = useState('')

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
    setJobs(data || [])
  }

  const handleSaveJob = async () => {

    const payload = {
      company,
      title,
      description,
      location,
      experience,
      job_type: jobType,
      apply_link: applyLink,
      salary: salaryMin && salaryMax ? `${salaryMin}-${salaryMax}` : null,
      requirements: requirements.split(',').map(i => i.trim()),
      benefits: benefits.split(',').map(i => i.trim()),
      deadline,
      status,
      category
    }

    if (editingId) {
      await supabase.from('jobs').update(payload).eq('id', editingId)
    } else {
      await supabase.from('jobs').insert(payload)
    }

    await fetchJobs()
    setEditingId(null)
    setIsOpen(false)
  }

  const handleDeleteJob = async (id: string) => {
    await supabase.from('jobs').delete().eq('id', id)
    fetchJobs()
  }



  const filteredJobs = jobs.filter(job =>
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => {
    setEditingId(null)

    setCompany('')
    setTitle('')
    setLocation('')
    setDescription('')
    setExperience('')
    setJobType('')
    setApplyLink('')
    setRequirements('')
    setBenefits('')
    setDeadline('')
    setSalaryMin('')
    setSalaryMax('')
    setCategory('')
    setStatus('Draft')
  }


  return (
    <div className="flex-1 space-y-8 p-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-sm text-muted-foreground">Manage job listings</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="gap-2"
              onClick={() => { resetForm() }}
            >
              <Plus className="h-4 w-4" />
              Post Job
            </Button>
          </DialogTrigger>


          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Job' : 'Post New Job'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the selected job listing' : 'Create a new job listing'}
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">

              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} className="bg-card border-border" />
              </div>

              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-card border-border" />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} className="bg-card border-border" />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-card border-border" />
              </div>

              <div className="space-y-2">
                <Label>Experience</Label>
                <Input value={experience} onChange={(e) => setExperience(e.target.value)} className="bg-card border-border" />
              </div>

              {/* <div className="space-y-2">
                <Label>Job Type</Label>
                <Input value={jobType} onChange={(e) => setJobType(e.target.value)} className="bg-card border-border" />
              </div> */}
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Full Stack</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="ml">ML / AI</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              <div className="space-y-2">
                <Label>Salary Range (LPA)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Min"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="bg-card border-border"
                  />
                  <Input
                    placeholder="Max"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="bg-card border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Apply Link</Label>
                <Input value={applyLink} onChange={(e) => setApplyLink(e.target.value)} className="bg-card border-border" />
              </div>

              <div className="space-y-2">
                <Label>Requirements (comma separated)</Label>
                <Textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} className="bg-card border-border" />
              </div>

              <div className="space-y-2">
                <Label>Benefits (comma separated)</Label>
                <Textarea value={benefits} onChange={(e) => setBenefits(e.target.value)} className="bg-card border-border" />
              </div>

              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="bg-card border-border" />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select onValueChange={setStatus} defaultValue={status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveJob}>
                  {editingId ? 'Update Job' : 'Post Job'}
                </Button>
              </div>

            </div>
          </DialogContent>

        </Dialog>
      </div>

      <Input
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
          <CardDescription>Total: {filteredJobs.length}</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredJobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    {job.posted_date
                      ? new Date(job.posted_date).toLocaleDateString()
                      : '-'}
                  </TableCell>

                  <TableCell><Badge>{job.status}</Badge></TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">

                      <Button variant="ghost" size="icon" onClick={() => window.open(`/jobs/${job.id}`, '_blank')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingId(job.id)
                          setCompany(job.company || '')
                          setTitle(job.title || '')
                          setLocation(job.location || '')
                          setDescription(job.description || '')
                          setExperience(job.experience || '')
                          setJobType(job.job_type || '')
                          setApplyLink(job.apply_link || '')
                          setStatus(job.status || 'Draft')

                          setRequirements(job.requirements ? job.requirements.join(', ') : '')
                          setBenefits(job.benefits ? job.benefits.join(', ') : '')
                          setDeadline(job.deadline || '')

                          if (job.salary) {
                            const parts = job.salary.split('-')
                            setSalaryMin(parts[0])
                            setSalaryMax(parts[1])
                          }

                          setIsOpen(true)
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Job?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently remove the job listing.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteJob(job.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>



                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

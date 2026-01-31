'use client'

import { useState } from 'react'
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

const jobs = [
  { id: 1, company: 'Google', role: 'Senior SWE', location: 'Mountain View, CA', status: 'Active', applications: 45 },
  { id: 2, company: 'Meta', role: 'Full Stack Engineer', location: 'Menlo Park, CA', status: 'Active', applications: 32 },
  { id: 3, company: 'Amazon', role: 'Backend Engineer', location: 'Seattle, WA', status: 'Active', applications: 28 },
  { id: 4, company: 'Microsoft', role: 'DevOps Engineer', location: 'Redmond, WA', status: 'Closed', applications: 19 },
  { id: 5, company: 'Apple', role: 'iOS Developer', location: 'Cupertino, CA', status: 'Draft', applications: 0 },
]

export default function JobsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Jobs</h1>
          <p className="text-sm text-foreground/60">Manage job listings</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Post Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post New Job</DialogTitle>
              <DialogDescription>Create a new job listing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input placeholder="e.g., Google" />
              </div>
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input placeholder="e.g., Senior Software Engineer" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="e.g., San Francisco, CA" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Job description and requirements..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Apply URL</Label>
                <Input placeholder="https://careers.example.com/job/123" type="url" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsOpen(false)}>Post Job</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          placeholder="Search jobs..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Jobs Table */}
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
          <CardDescription>Total: {filteredJobs.length} listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="border-border/30 hover:bg-primary/5">
                    <TableCell className="font-medium text-foreground">{job.company}</TableCell>
                    <TableCell className="text-foreground/70">{job.role}</TableCell>
                    <TableCell className="text-foreground/70">{job.location}</TableCell>
                    <TableCell className="text-foreground/70">{job.applications}</TableCell>
                    <TableCell>
                      <Badge className={
                        job.status === 'Active' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30' :
                        job.status === 'Closed' ? 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30' :
                        'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30'
                      } variant="outline">
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit2, Trash2, Search, Star } from 'lucide-react'

const instructors = [
  { id: 1, name: 'Harkirat Singh', email: 'harkirat@cpgeeks.com', courses: 5, students: 2340, rating: 4.9, status: 'Active' },
  { id: 2, name: 'Sandeep Jain', email: 'sandeep@cpgeeks.com', courses: 3, students: 1890, rating: 4.95, status: 'Active' },
  { id: 3, name: 'Akshay Saini', email: 'akshay@cpgeeks.com', courses: 4, students: 1560, rating: 4.85, status: 'Active' },
  { id: 4, name: 'Priya Sharma', email: 'priya@cpgeeks.com', courses: 2, students: 890, rating: 4.8, status: 'Active' },
  { id: 5, name: 'Rohit Kapoor', email: 'rohit@cpgeeks.com', courses: 1, students: 340, rating: 4.7, status: 'Pending' },
]

export default function InstructorsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Instructors</h1>
          <p className="text-sm text-foreground/60">Manage platform instructors</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Instructor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Instructor</DialogTitle>
              <DialogDescription>Onboard a new instructor to the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="e.g., John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input placeholder="instructor@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea placeholder="Tell us about this instructor..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Expertise Areas</Label>
                <Input placeholder="e.g., DSA, System Design, Web Dev" />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsOpen(false)}>Add Instructor</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          placeholder="Search instructors..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Instructors Table */}
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle>All Instructors</CardTitle>
          <CardDescription>Total: {filteredInstructors.length} instructors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstructors.map((instructor) => (
                  <TableRow key={instructor.id} className="border-border/30 hover:bg-primary/5">
                    <TableCell className="font-medium text-foreground">{instructor.name}</TableCell>
                    <TableCell className="text-foreground/70">{instructor.email}</TableCell>
                    <TableCell className="text-foreground/70">{instructor.courses}</TableCell>
                    <TableCell className="text-foreground/70">{instructor.students}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-foreground">{instructor.rating}</span>
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        instructor.status === 'Active' 
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
                          : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {instructor.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
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

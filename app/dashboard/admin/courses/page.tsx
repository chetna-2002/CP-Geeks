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
import { Plus, Edit2, Trash2, Search } from 'lucide-react'

const courses = [
  { id: 1, name: 'Advanced DSA', instructor: 'Sandeep Jain', price: '$99', status: 'Published', students: 234 },
  { id: 2, name: 'System Design', instructor: 'Harkirat Singh', price: '$149', status: 'Published', students: 189 },
  { id: 3, name: 'React Mastery', instructor: 'Akshay Saini', price: '$79', status: 'Draft', students: 0 },
  { id: 4, name: 'Node.js Deep Dive', instructor: 'Priya Sharma', price: '$89', status: 'Published', students: 145 },
  { id: 5, name: 'Web Performance', instructor: 'Harkirat Singh', price: '$69', status: 'Published', students: 78 },
]

export default function CoursesPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-sm text-foreground/60">Manage all courses on the platform</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>Create a new course for your platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input placeholder="e.g., Advanced React Patterns" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Course description..." rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Instructor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="harkirat">Harkirat Singh</SelectItem>
                      <SelectItem value="sandeep">Sandeep Jain</SelectItem>
                      <SelectItem value="akshay">Akshay Saini</SelectItem>
                      <SelectItem value="priya">Priya Sharma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input placeholder="$99" type="number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsOpen(false)}>Create Course</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          placeholder="Search courses..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Courses Table */}
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Total: {filteredCourses.length} courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>Course Name</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id} className="border-border/30 hover:bg-primary/5">
                    <TableCell className="font-medium text-foreground">{course.name}</TableCell>
                    <TableCell className="text-foreground/70">{course.instructor}</TableCell>
                    <TableCell className="font-semibold text-foreground">{course.price}</TableCell>
                    <TableCell className="text-foreground/70">{course.students}</TableCell>
                    <TableCell>
                      <Badge className={course.status === 'Published' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30' : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30'} variant="outline">
                        {course.status}
                      </Badge>
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

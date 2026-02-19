// 'use client'

// import { useState, useEffect } from 'react'
// import { createClient } from '@/utils/supabase/client'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Plus, Edit2, Trash2, Search } from 'lucide-react'

// export default function CoursesPage() {

//   const supabase = createClient()

//   const [courses, setCourses] = useState<any[]>([])
//   const [instructors, setInstructors] = useState<any[]>([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [isOpen, setIsOpen] = useState(false)
//   const [editingId, setEditingId] = useState<string | null>(null)

//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [instructor, setInstructor] = useState('')
//   const [price, setPrice] = useState('')

//   useEffect(() => {
//     fetchCourses()
//     fetchInstructors()
//   }, [])

//   const fetchCourses = async () => {
//     const { data } = await supabase
//       .from('courses')
//       .select('*, instructors(name)')
//       .order('created_at', { ascending: false })

//     setCourses(data || [])
//   }

//   const fetchInstructors = async () => {
//     const { data } = await supabase.from('instructors').select('*')
//     setInstructors(data || [])
//     console.log('Instructors:', data)
//   }

//   const handleSaveCourse = async () => {

//     const payload = {
//       title,
//       description,
//       instructor_id: instructor,
//       price: Number(price)
//     }

//     if (editingId) {
//       await supabase.from('courses').update(payload).eq('id', editingId)
//     } else {
//       await supabase.from('courses').insert(payload)
//     }

//     resetForm()
//     setIsOpen(false)
//     fetchCourses()
//   }

//   const handleDelete = async (id: string) => {
//     await supabase.from('courses').delete().eq('id', id)
//     fetchCourses()
//   }

//   const resetForm = () => {
//     setEditingId(null)
//     setTitle('')
//     setDescription('')
//     setInstructor('')
//     setPrice('')
//   }

//   const filteredCourses = courses.filter(c =>
//     c.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="flex-1 space-y-8 p-8">

//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Courses</h1>
//           <p className="text-sm text-muted-foreground">Manage all courses</p>
//         </div>

//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//           <DialogTrigger asChild>
//             <Button className="gap-2" onClick={resetForm}>
//               <Plus className="h-4 w-4" />
//               Add Course
//             </Button>
//           </DialogTrigger>

//           <DialogContent className="max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>{editingId ? 'Edit Course' : 'Add Course'}</DialogTitle>
//               <DialogDescription>Course details</DialogDescription>
//             </DialogHeader>

//             <div className="space-y-4">

//               <div className="space-y-2">
//                 <Label>Course Title</Label>
//                 <Input value={title} onChange={e => setTitle(e.target.value)} />
//               </div>

//               <div className="space-y-2">
//                 <Label>Description</Label>
//                 <Textarea value={description} onChange={e => setDescription(e.target.value)} />
//               </div>

//               <div className="space-y-2">
//                 <Label>Instructor</Label>
//                 <Select
//                   value={instructor ? String(instructor) : undefined}
//                   onValueChange={(v) => setInstructor(v)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select instructor" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     {instructors.map((i) => (
//                       <SelectItem key={i.id} value={String(i.id)}>
//                         {i.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label>Price</Label>
//                 <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
//               </div>

//               <div className="flex justify-end gap-3">
//                 <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
//                 <Button onClick={handleSaveCourse}>
//                   {editingId ? 'Update Course' : 'Create Course'}
//                 </Button>
//               </div>

//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
//         <Input className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>All Courses</CardTitle>
//           <CardDescription>Total: {filteredCourses.length}</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Course</TableHead>
//                 <TableHead>Instructor</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {filteredCourses.map(course => (
//                 <TableRow key={course.id}>
//                   <TableCell>{course.title}</TableCell>
//                   <TableCell>{course.instructors?.name}</TableCell>
//                   <TableCell>{course.price}</TableCell>

//                   <TableCell className="text-right flex justify-end gap-2">

//                     <Button variant="ghost" size="icon"
//                       onClick={() => {
//                         setEditingId(course.id)
//                         setTitle(course.title)
//                         setDescription(course.description)
//                         setInstructor(course.instructor_id ? String(course.instructor_id) : '')
//                         setPrice(String(course.price))
//                         setIsOpen(true)
//                       }}>
//                       <Edit2 className="h-4 w-4" />
//                     </Button>

//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </AlertDialogTrigger>

//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>Delete course?</AlertDialogTitle>
//                           <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
//                         </AlertDialogHeader>

//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction onClick={() => handleDelete(course.id)}>
//                             Delete
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>

//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>

//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'

export default function CoursesPage() {

  const supabase = createClient()

  const [courses, setCourses] = useState<any[]>([])
  const [instructors, setInstructors] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState<string>('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    fetchCourses()
    fetchInstructors()
  }, [])

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*, instructors(name)')
      .order('created_at', { ascending: false })

    setCourses(data || [])
  }

  const fetchInstructors = async () => {
    const { data } = await supabase.from('instructors').select('*')
    setInstructors(data || [])
  }

  const handleSaveCourse = async () => {

    const payload = {
      title,
      description,
      instructor_id: instructor,
      price: Number(price)
    }

    if (editingId) {
      await supabase.from('courses').update(payload).eq('id', editingId)
    } else {
      await supabase.from('courses').insert(payload)
    }

    resetForm()
    setIsOpen(false)
    fetchCourses()
  }

  const handleDelete = async (id: string) => {
    await supabase.from('courses').delete().eq('id', id)
    fetchCourses()
  }

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setDescription('')
    setInstructor('')
    setPrice('')
  }

  const filteredCourses = courses.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-8 p-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-sm text-muted-foreground">Manage all courses</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={resetForm}>
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Course' : 'Add Course'}</DialogTitle>
              <DialogDescription>Course details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">

              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Instructor</Label>
                <Select
                  value={instructor || undefined}
                  onValueChange={(v) => setInstructor(v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>

                  <SelectContent>
                    {instructors.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveCourse}>
                  {editingId ? 'Update Course' : 'Create Course'}
                </Button>
              </div>

            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Total: {filteredCourses.length}</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCourses.map(course => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.instructors?.name}</TableCell>
                  <TableCell>{course.price}</TableCell>

                  <TableCell className="text-right flex justify-end gap-2">

                    <Button variant="ghost" size="icon"
                      onClick={() => {
                        setEditingId(course.id)
                        setTitle(course.title)
                        setDescription(course.description)
                        setInstructor(course.instructor_id || '')
                        setPrice(String(course.price))
                        setIsOpen(true)
                      }}>
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete course?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(course.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

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

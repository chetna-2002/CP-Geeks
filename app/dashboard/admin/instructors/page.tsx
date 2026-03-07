'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Search } from 'lucide-react'

interface Instructor {
  id: string
  name: string
  email: string
  role: string
  bio: string
  description: string
  image_url: string
  rating: number
  students: number
  status: string
}

export default function InstructorsPage() {

  const supabase = createClient()

  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    description: '',
    rating: 5,
    students: 0,
    image_url: '',
  })

  useEffect(() => {
    fetchInstructors()
  }, [])

  const fetchInstructors = async () => {
    const { data } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setInstructors(data)
  }

  const handleImageUpload = async (file: File) => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'Instructors')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dnwl0iqfe/image/upload',
      {
        method: 'POST',
        body: data
      }
    )

    const result = await res.json()

    if (result.secure_url) {
      setFormData(prev => ({
        ...prev,
        image_url: result.secure_url
      }))
    }
  }

  const handleAddInstructor = async () => {
    if (!formData.name || !formData.role || !formData.image_url) return

    setLoading(true)

    await supabase.from('instructors').insert([
      {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        bio: formData.bio,
        description: formData.description,
        rating: formData.rating,
        students: formData.students,
        image_url: formData.image_url,
      }
    ])

    await fetchInstructors()

    setFormData({
      name: '',
      email: '',
      role: '',
      bio: '',
      description: '',
      rating: 5,
      students: 0,
      image_url: '',
    })

    setIsOpen(false)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    await supabase.from('instructors').delete().eq('id', id)
    fetchInstructors()
  }

  const filtered = instructors.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-8 p-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Instructors</h1>
          <p className="text-sm text-muted-foreground">
            Manage platform instructors
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Instructor
            </Button>
          </DialogTrigger>

          <DialogContent className='max-h-[65vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Add Instructor</DialogTitle>
              <DialogDescription>
                Add new instructor to platform
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">

              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Role</Label>
                <Input
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Rating</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: Number(e.target.value) })
                  }
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Students</Label>
                <Input
                  type="number"
                  value={formData.students}
                  onChange={(e) =>
                    setFormData({ ...formData, students: Number(e.target.value) })
                  }
                  className='mt-1'
                />
              </div>

              <div>
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files) return
                    handleImageUpload(e.target.files[0])
                  }}
                  className='mt-1'
                />
              </div>

              {formData.image_url && (
                <img
                  src={formData.image_url}
                  className="h-16 w-16 rounded-md object-cover"
                />
              )}

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddInstructor}
                  disabled={loading || !formData.name || !formData.role || !formData.image_url}
                >
                  {loading ? 'Adding...' : 'Add Instructor'}
                </Button>
              </div>

            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search instructors..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Instructors</CardTitle>
          <CardDescription>Total: {filtered.length}</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((i) => (
                <TableRow key={i.id}>
                  <TableCell>
                    {i.image_url && (
                      <img
                        src={i.image_url}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i.email}</TableCell>
                  <TableCell>{i.role}</TableCell>
                  <TableCell>{i.students?.toLocaleString()}</TableCell>
                  {/* <TableCell>{i.status}</TableCell> */}
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Instructor?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(i.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
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
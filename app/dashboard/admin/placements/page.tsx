'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, AlertDialogTitle } from '@/components/ui/alert-dialog'

interface Placement {
    id: string
    name: string
    company: string
    role: string
    image_url: string
}

export default function PlacementsPage() {
    const supabase = createClient()

    const [placements, setPlacements] = useState<Placement[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        role: '',
        image_url: ''
    })

    // 🔥 FETCH DATA
    useEffect(() => {
        fetchPlacements()
    }, [])

    const fetchPlacements = async () => {
        const { data, error } = await supabase
            .from('placements')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setPlacements(data)
        }
    }

    // 🔥 INSERT
    const handleAddPlacement = async () => {
        setLoading(true)

        const { error } = await supabase.from('placements').insert([
            {
                name: formData.name,
                company: formData.company,
                role: formData.role,
                image_url: formData.image_url
            }
        ])

        if (!error) {
            await fetchPlacements()
            setFormData({ name: '', company: '', role: '', image_url: '' })
            setIsOpen(false)
        }

        setLoading(false)
    }

    // 🔥 DELETE
    const handleDelete = async (id: string) => {
        await supabase.from('placements').delete().eq('id', id)
        fetchPlacements()
    }

    const filteredPlacements = placements.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleImageUpload = async (file: File) => {
        const formDataCloud = new FormData()
        formDataCloud.append('file', file)
        formDataCloud.append('upload_preset', 'Placements')

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dnwl0iqfe/image/upload',
            {
                method: 'POST',
                body: formDataCloud
            }
        )

        const data = await res.json()

        if (data.secure_url) {
            setFormData(prev => ({
                ...prev,
                image_url: data.secure_url
            }))
        }
    }
    return (
        <div className="flex-1 space-y-8 p-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Placements</h1>
                    <p className="text-sm text-foreground/60">Manage placed students</p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-primary hover:bg-primary/90">
                            <Plus className="h-4 w-4" />
                            Add Placement
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Placement</DialogTitle>
                            <DialogDescription>
                                Add a newly placed student
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">

                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Input
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Upload Image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (!e.target.files) return
                                        handleImageUpload(e.target.files[0])
                                    }}
                                />
                            </div>

                            {formData.image_url && (
                                <img
                                    src={formData.image_url}
                                    className="h-16 w-16 rounded-md object-cover"
                                />
                            )}

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={handleAddPlacement}
                                    disabled={loading}
                                >
                                    {loading ? 'Adding...' : 'Add Placement'}
                                </Button>
                            </div>

                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
                <Input
                    placeholder="Search placements..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <Card className="border-border/30">
                <CardHeader>
                    <CardTitle>All Placements</CardTitle>
                    <CardDescription>
                        Total: {filteredPlacements.length}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredPlacements.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>{p.company}</TableCell>
                                    <TableCell>{p.role}</TableCell>
                                    <TableCell>
                                        {p.image_url && (
                                            <img
                                                src={p.image_url}
                                                className="h-10 w-10 rounded-md object-cover"
                                                alt="placement"
                                            />
                                        )}
                                    </TableCell>
                                    {/* <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell> */}
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
                                                        Delete Placement?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>

                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(p.id)}
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
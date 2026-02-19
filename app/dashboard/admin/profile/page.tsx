'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, Save } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function AdminProfilePage() {
  const supabase = createClient()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    profession: '',
    company: '',
    linkedin: '',
    github: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setFormData({
          full_name: profile.full_name ?? '',
          email: user.email ?? '',
          phone: profile.phone ?? '',
          location: profile.location ?? '',
          bio: profile.bio ?? '',
          profession: profile.profession ?? '',
          company: profile.company ?? '',
          linkedin: profile.linkedin ?? '',
          github: profile.github ?? '',
        })
      }

      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        profession: formData.profession,
        company: formData.company,
        linkedin: formData.linkedin,
        github: formData.github,
      })
      .eq('id', user.id)

    setIsEditing(false)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/60">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-8 p-8">

      <div>
        <Link href="/dashboard/admin">
          <Button variant="ghost" size="sm" className="gap-2 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Admin Dashboard
          </Button>
        </Link>

        <h1 className="text-3xl font-bold">Admin Profile</h1>
        <p className="text-muted-foreground">Manage your administrator profile</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Admin personal details</CardDescription>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'destructive' : 'default'}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input name="full_name" value={formData.full_name} onChange={handleChange} disabled={!isEditing} className='border-white mt-0.5'/>
            </div>

            <div>
              <Label>Email</Label>
              <Input value={formData.email} disabled className='border-white mt-0.5'/>
            </div>

            <div>
              <Label>Phone</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className='border-white mt-0.5'/>
            </div>

            <div>
              <Label>Location</Label>
              <Input name="location" value={formData.location} onChange={handleChange} disabled={!isEditing} className='border-white mt-0.5'/>
            </div>
          </div>

          {isEditing && (
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4"/>
              Save Changes
            </Button>
          )}

        </CardContent>
      </Card>

    </div>
  )
}

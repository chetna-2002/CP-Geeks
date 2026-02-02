'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, Save } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function ProfilePage() {
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

  // 🔹 Fetch user + profile
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!error && profile) {
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

  // 🔹 Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🔹 Save profile
  const handleSave = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase
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

    if (!error) {
      setIsEditing(false)
    }

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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/dashboard/user">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-foreground/60 mt-2">
            Manage your personal and professional information
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 space-y-8">

          {/* Personal Info */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic user details</CardDescription>
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
                  <Input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input value={formData.email} disabled />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label>Bio</Label>
                <Textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Professional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Career & social profiles</CardDescription>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Profession</Label>
                <Input
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label>Company</Label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label>LinkedIn</Label>
                <Input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label>GitHub</Label>
                <Input
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  )
}

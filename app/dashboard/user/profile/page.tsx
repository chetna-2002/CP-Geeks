'use client'

import React from "react"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, Save, Mail, Phone, MapPin, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Arjun Sharma',
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    bio: 'Full-stack developer passionate about competitive programming and system design.',
    profession: 'Senior Software Engineer',
    company: 'Tech Startup Inc',
    linkedIn: 'linkedin.com/in/arjun-sharma',
    github: 'github.com/arjunsharma',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 mb-4 hover:bg-primary/10">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-foreground/60 mt-2">Manage your personal information and preferences</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Personal Information */}
            <Card className="border-border/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your basic profile details</CardDescription>
                  </div>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={isEditing ? 'bg-destructive hover:bg-destructive/90' : ''}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-foreground/5 border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-foreground/5 border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-foreground/5 border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-foreground/5 border-border/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    className="bg-foreground/5 border-border/30"
                  />
                </div>

                {isEditing && (
                  <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="border-border/30">
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Your work details and social profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Profession</Label>
                    <Input
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-foreground/5 border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-foreground/5 border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn Profile</Label>
                    <Input
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="linkedin.com/in/yourprofile"
                      className="bg-foreground/5 border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GitHub Profile</Label>
                    <Input
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="github.com/yourprofile"
                      className="bg-foreground/5 border-border/30"
                    />
                  </div>
                </div>

                {isEditing && (
                  <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="border-border/30">
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-foreground/5">
                    <div>
                      <p className="font-medium text-foreground">Password</p>
                      <p className="text-sm text-foreground/60">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline" className="bg-transparent">Change Password</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-foreground/5">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-foreground/60">Not enabled</p>
                    </div>
                    <Button variant="outline" className="bg-transparent">Enable 2FA</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

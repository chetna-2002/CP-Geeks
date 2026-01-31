'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, Play, Download, Share2, Clock, Award } from 'lucide-react'

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState('ongoing')

  const myCourses = [
    { id: 1, title: 'Complete DSA Mastery', instructor: 'Harkirat Singh', progress: 65, lessons: 48, completed: 31, duration: '48 hours', image: 'from-purple-500 to-pink-500', status: 'ongoing' },
    { id: 2, title: 'System Design Expert', instructor: 'Sandeep Jain', progress: 32, lessons: 40, completed: 13, duration: '40 hours', image: 'from-blue-500 to-cyan-500', status: 'ongoing' },
    { id: 3, title: 'Web Development Pro', instructor: 'Akshay Saini', progress: 89, lessons: 56, completed: 50, duration: '56 hours', image: 'from-green-500 to-emerald-500', status: 'ongoing' },
    { id: 4, title: 'Advanced JavaScript', instructor: 'Akshay Saini', progress: 100, lessons: 32, completed: 32, duration: '32 hours', image: 'from-yellow-500 to-orange-500', status: 'completed' },
  ]

  const filteredCourses = myCourses.filter(course => course.status === activeTab)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 mb-4 hover:bg-primary/10">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-foreground/60 mt-2">Track your learning progress</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 pt-0">
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'ongoing'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground/60 hover:text-foreground'
              }`}
            >
              Ongoing Courses
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground/60 hover:text-foreground'
              }`}
            >
              Completed Courses
            </button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="group rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card hover:-translate-y-2">
                  <div className={`h-48 bg-gradient-to-br ${course.image} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-sm text-foreground/60 mt-1">{course.instructor}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-foreground/5">
                      <div>
                        <p className="text-xs text-foreground/60">Lessons Completed</p>
                        <p className="text-lg font-semibold text-foreground">{course.completed}/{course.lessons}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/60">Total Duration</p>
                        <p className="text-lg font-semibold text-foreground">{course.duration}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/50">Progress</span>
                        <span className="text-xs font-semibold text-foreground">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      {course.status === 'ongoing' ? (
                        <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                          <Play className="h-4 w-4" />
                          Continue Course
                        </Button>
                      ) : (
                        <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                          <Award className="h-4 w-4" />
                          Download Certificate
                        </Button>
                      )}
                      <Button variant="outline" size="icon" className="bg-transparent">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No {activeTab} courses</h3>
              <p className="text-foreground/60 mb-6">
                {activeTab === 'ongoing' ? 'Start a course to begin learning' : 'Complete a course to see it here'}
              </p>
              {activeTab === 'ongoing' && (
                <Link href="/dashboard/browse-courses">
                  <Button className="gap-2 bg-primary hover:bg-primary/90">Explore Courses</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

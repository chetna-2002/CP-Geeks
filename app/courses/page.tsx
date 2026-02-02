
'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching courses:', error)
      } else {
        setCourses(data || [])
      }

      setLoading(false)
    }

    fetchCourses()
  }, [])

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'dsa', label: 'DSA & Algorithms' },
    { id: 'web', label: 'Web Development' },
    { id: 'system-design', label: 'System Design' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'mobile', label: 'Mobile Dev' },
  ]

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const search = searchTerm.toLowerCase()

      const matchesSearch =
        course.title.toLowerCase().includes(search) ||
        course.description?.toLowerCase().includes(search) ||
        course.instructor_name?.toLowerCase().includes(search)

      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, courses])


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-border/30 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Explore Our Courses</h1>
        <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
          Industry-focused courses designed to make you job-ready
        </p>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-foreground/40" />
            <Input
              placeholder="Search courses or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-11"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <p className="text-sm text-foreground/60">
            Showing <span className="font-semibold">{filteredCourses.length}</span> of {courses.length} courses
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          {loading ? (
            <p className="text-center text-foreground/60">Loading courses...</p>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl border border-border/50 bg-card hover:border-primary/30 transition"
                >
                  <div className="p-6 space-y-4 h-full flex flex-col">
                    <div>
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <p className="text-sm text-foreground/70 mt-2 line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex justify-between pt-2 border-t border-border/30">
                        <div>
                          <p className="text-xs text-foreground/60">Instructor</p>
                          <p className="text-sm font-medium">
                            {course.instructor_name || 'CP Geeks'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60">Duration</p>
                          <p className="text-sm font-medium">
                            {course.duration || '—'}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-foreground/60">Price</p>
                        <p className="text-lg font-bold text-primary">
                          ₹{course.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <p className="text-lg text-foreground/60">No courses found</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

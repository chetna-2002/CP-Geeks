'use client'

import { Navbar } from '@/components/navbar'
import { CourseCard } from '@/components/course-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const allCourses = [
    {
      id: 1,
      title: 'DSA & GenAI Masterclass',
      description: 'Crack top tiers like Google & Amazon. Complete DSA (C++, Java, Python) integrated with Generative AI patterns.',
      instructor: 'Sandeep Jain',
      students: 8300,
      duration: '4 months',
      category: 'dsa',
      price: '₹6,999',
    },
    {
      id: 2,
      title: 'Full Stack Innovation',
      description: 'Beyond the basics. React 19, Next.js 14, Server Actions, and building scalable microservices from scratch.',
      instructor: 'Akshay Saini',
      students: 6200,
      duration: '3 months',
      category: 'web',
      price: '₹5,499',
    },
    {
      id: 3,
      title: 'System Design Architect',
      description: 'Scale from 1 to 100 million users. Learn real patterns used by Uber, Airbnb, and WhatsApp engineers.',
      instructor: 'Harkirat Singh',
      students: 5800,
      duration: '3 months',
      category: 'system-design',
      price: '₹4,999',
    },
    {
      id: 4,
      title: 'Python for Data Science',
      description: 'Master Python and machine learning fundamentals with real-world projects.',
      instructor: 'Lisa Zhang',
      students: 9200,
      duration: '5 months',
      category: 'data-science',
      price: '₹5,999',
    },
    {
      id: 5,
      title: 'Cloud Architecture with AWS',
      description: 'Design and deploy scalable cloud applications using AWS services.',
      instructor: 'James Rodriguez',
      students: 4500,
      duration: '3 months',
      category: 'cloud',
      price: '₹5,299',
    },
    {
      id: 6,
      title: 'Mobile Development with React Native',
      description: 'Build native mobile apps for iOS and Android with React Native.',
      instructor: 'Nina Patel',
      students: 7100,
      duration: '2.5 months',
      category: 'mobile',
      price: '₹4,799',
    },
    {
      id: 7,
      title: 'Advanced JavaScript & TypeScript',
      description: 'Deep dive into JavaScript, async programming, and TypeScript best practices.',
      instructor: 'Akshay Saini',
      students: 10500,
      duration: '2 months',
      category: 'web',
      price: '₹3,999',
    },
    {
      id: 8,
      title: 'Competitive Programming Bootcamp',
      description: 'Master competitive programming with problem-solving strategies and optimizations.',
      instructor: 'Sandeep Jain',
      students: 6800,
      duration: '4 months',
      category: 'dsa',
      price: '₹4,499',
    },
  ]

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
    return allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Explore Our Courses</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose from industry-expert curated courses designed to make you job-ready
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative animate-slide-up">
              <Search className="absolute left-4 top-3 h-5 w-5 text-foreground/40" />
              <Input
                placeholder="Search courses, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-11 border-border/50 focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`transition-all ${selectedCategory === cat.id ? 'bg-primary hover:bg-primary/90' : 'border-border/50 hover:border-primary/30'}`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-foreground/60">
              Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> of {allCourses.length} courses
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, i) => (
                <div
                  key={course.id}
                  className="group rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card animate-slide-up"
                  style={{ animationDelay: `${i * 75}ms` }}
                >
                  <div className="p-6 space-y-4 h-full flex flex-col">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{course.description}</p>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between pt-2 border-t border-border/30">
                        <div>
                          <p className="text-xs text-foreground/60">Instructor</p>
                          <p className="text-sm font-medium text-foreground">{course.instructor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60">Duration</p>
                          <p className="text-sm font-medium text-foreground">{course.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-foreground/60">Students</p>
                          <p className="text-sm font-medium text-foreground">{course.students.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60">Price</p>
                          <p className="text-lg font-bold text-primary">{course.price}</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-4">
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

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  )
}

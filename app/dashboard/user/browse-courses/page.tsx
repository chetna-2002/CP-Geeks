'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Search, Star, Users, Clock, ShoppingCart, Heart } from 'lucide-react'

export default function BrowseCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Full Stack', 'DSA', 'System Design', 'Mobile', 'Data Science', 'Cloud']

  const courses = [
    { id: 1, title: 'Complete DSA Mastery', instructor: 'Harkirat Singh', rating: 4.9, reviews: 2345, students: 12500, price: 2999, image: 'from-purple-500 to-pink-500', category: 'DSA', duration: '48 hours' },
    { id: 2, title: 'System Design Expert', instructor: 'Sandeep Jain', rating: 4.8, reviews: 1876, students: 8300, price: 3999, image: 'from-blue-500 to-cyan-500', category: 'System Design', duration: '40 hours' },
    { id: 3, title: 'React & Next.js Pro', instructor: 'Akshay Saini', rating: 4.9, reviews: 2012, students: 6200, price: 2499, image: 'from-green-500 to-emerald-500', category: 'Full Stack', duration: '56 hours' },
    { id: 4, title: 'AWS Cloud Mastery', instructor: 'Priya Sharma', rating: 4.7, reviews: 1543, students: 5500, price: 3499, image: 'from-orange-500 to-red-500', category: 'Cloud', duration: '35 hours' },
    { id: 5, title: 'Node.js Backend API', instructor: 'David Kumar', rating: 4.8, reviews: 1889, students: 4200, price: 2799, image: 'from-red-500 to-pink-500', category: 'Full Stack', duration: '42 hours' },
    { id: 6, title: 'Data Structures Intensive', instructor: 'Sandeep Jain', rating: 4.9, reviews: 2456, students: 9800, price: 1999, image: 'from-indigo-500 to-purple-500', category: 'DSA', duration: '32 hours' },
    { id: 7, title: 'Mobile Development iOS', instructor: 'Alex Singh', rating: 4.6, reviews: 892, students: 3200, price: 2899, image: 'from-yellow-500 to-orange-500', category: 'Mobile', duration: '45 hours' },
    { id: 8, title: 'Machine Learning Basics', instructor: 'Lisa Chen', rating: 4.8, reviews: 1567, students: 7100, price: 3299, image: 'from-cyan-500 to-blue-500', category: 'Data Science', duration: '38 hours' },
  ]

  const filteredCourses = courses.filter(course =>
    (selectedCategory === 'All' || course.category === selectedCategory) &&
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

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
          <h1 className="text-3xl font-bold text-foreground">Browse Courses</h1>
          <p className="text-foreground/60 mt-2">Explore our comprehensive course catalog</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
            <Input
              placeholder="Search courses or instructors..."
              className="pl-12 py-6 text-base border-border/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="text-sm text-foreground/60">Showing {filteredCourses.length} courses</p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="group rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card hover:-translate-y-2">
                {/* Course Image */}
                <div className="relative h-40 overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${course.image} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <button
                    onClick={() => toggleWishlist(course.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-sm"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        wishlist.has(course.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  {/* Title and Instructor */}
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-foreground/60 mt-1">{course.instructor}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(course.rating)
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-foreground/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{course.rating}</span>
                    <span className="text-xs text-foreground/60">({course.reviews})</span>
                  </div>

                  {/* Course Info */}
                  <div className="flex gap-4 text-xs text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {(course.students / 1000).toFixed(1)}k
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="pt-4 border-t border-border/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">₹{course.price}</span>
                      <span className="text-xs text-foreground/60">{course.category}</span>
                    </div>
                    <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4" />
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-foreground/60">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

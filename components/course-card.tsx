import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Clock } from 'lucide-react'

interface CourseCardProps {
  title: string
  description: string
  instructor: string
  students: number
  duration: string
}

export function CourseCard({ title, description, instructor, students, duration }: CourseCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:border-primary/50">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <p className="text-sm text-muted-foreground">By {instructor}</p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          View Course
        </Button>
      </CardContent>
    </Card>
  )
}

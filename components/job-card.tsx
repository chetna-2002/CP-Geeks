import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Briefcase, MapPin, DollarSign } from 'lucide-react'

interface JobCardProps {
  title: string
  company: string
  location: string
  salary: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
  skills: string[]
}

export function JobCard({ title, company, location, salary, type, skills }: JobCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:border-primary/50">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{salary}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <Badge variant="outline">{type}</Badge>
        </div>
        <Button className="w-full">View Details</Button>
      </CardContent>
    </Card>
  )
}

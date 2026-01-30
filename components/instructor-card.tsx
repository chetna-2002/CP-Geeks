import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

interface InstructorCardProps {
  name: string
  specialty: string
  rating: number
  reviews: number
  bio: string
}

export function InstructorCard({ name, specialty, rating, reviews, bio }: InstructorCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:border-primary/50">
      <CardHeader>
        <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
        <CardTitle>{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{specialty}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
        </div>
        <p className="text-sm text-foreground/70">{bio}</p>
        <Button variant="outline" className="w-full bg-transparent">
          View Profile
        </Button>
      </CardContent>
    </Card>
  )
}

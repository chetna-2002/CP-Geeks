'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react'

const dsaSheets = [
  { id: 1, topic: 'Arrays', question: 'Two Sum', difficulty: 'Easy', externalLink: 'https://leetcode.com/problems/two-sum' },
  { id: 2, topic: 'Linked Lists', question: 'Reverse Linked List', difficulty: 'Medium', externalLink: 'https://leetcode.com/problems/reverse-linked-list' },
  { id: 3, topic: 'Binary Search', question: 'Search in Rotated Sorted Array', difficulty: 'Medium', externalLink: 'https://leetcode.com/problems/search-in-rotated-sorted-array' },
  { id: 4, topic: 'Dynamic Programming', question: 'Longest Increasing Subsequence', difficulty: 'Hard', externalLink: 'https://leetcode.com/problems/longest-increasing-subsequence' },
  { id: 5, topic: 'Graphs', question: 'Number of Islands', difficulty: 'Medium', externalLink: 'https://leetcode.com/problems/number-of-islands' },
  { id: 6, topic: 'Trees', question: 'Level Order Traversal', difficulty: 'Easy', externalLink: 'https://leetcode.com/problems/binary-tree-level-order-traversal' },
]

export default function DSASheetsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDSA = dsaSheets.filter(sheet =>
    sheet.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.question.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30'
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30'
      case 'Hard':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30'
      default:
        return ''
    }
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">DSA Questions</h1>
          <p className="text-sm text-foreground/60">Manage DSA sheet questions</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add DSA Question</DialogTitle>
              <DialogDescription>Add a new question to the DSA sheets</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Topic</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arrays">Arrays</SelectItem>
                    <SelectItem value="linked-lists">Linked Lists</SelectItem>
                    <SelectItem value="binary-search">Binary Search</SelectItem>
                    <SelectItem value="trees">Trees</SelectItem>
                    <SelectItem value="graphs">Graphs</SelectItem>
                    <SelectItem value="dp">Dynamic Programming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Question</Label>
                <Input placeholder="e.g., Two Sum" />
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>External Link</Label>
                <Input placeholder="https://leetcode.com/problems/..." type="url" />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsOpen(false)}>Add Question</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          placeholder="Search questions..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* DSA Table */}
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle>DSA Questions</CardTitle>
          <CardDescription>Total: {filteredDSA.length} questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>Topic</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDSA.map((sheet) => (
                  <TableRow key={sheet.id} className="border-border/30 hover:bg-primary/5">
                    <TableCell className="font-medium text-foreground">{sheet.topic}</TableCell>
                    <TableCell className="text-foreground/70">{sheet.question}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(sheet.difficulty)}`}>
                        {sheet.difficulty}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          onClick={() => window.open(sheet.externalLink, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

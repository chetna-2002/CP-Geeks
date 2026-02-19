'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function DSASheetsPage() {

  const supabase = createClient()

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [dsaSheets, setDsaSheets] = useState<any[]>([])
  const [topics, setTopics] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const [topicId, setTopicId] = useState('')
  const [question, setQuestion] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 50
  const [totalCount, setTotalCount] = useState(0)


  useEffect(() => {
    fetchTopics()
    fetchProblems(page)
  }, [page])

  const fetchTopics = async () => {
    const { data } = await supabase.from('dsa_topics').select('*')
    setTopics(data || [])
  }

  // const fetchProblems = async () => {
  //   const { data } = await supabase
  //     .from('dsa_problems')
  //     .select('*, dsa_topics(title)')
  //     .order('order_index')

  //   if (!data) return

  //   const mapped = data.map((item: any) => ({
  //     id: item.id,
  //     topic: item.dsa_topics?.title,
  //     topic_id: item.topic_id,
  //     question: item.title,
  //     difficulty: item.difficulty,
  //     externalLink: item.url
  //   }))


  //   setDsaSheets(mapped)
  // }
  const fetchProblems = async (currentPage = page) => {
    const from = (currentPage - 1) * pageSize
    const to = from + pageSize - 1

    const { data, count } = await supabase
      .from('dsa_problems')
      .select('*, dsa_topics(title)', { count: 'exact' })
      .order('order_index')
      .range(from, to)

    if (!data) return

    setTotalCount(count || 0)

    const mapped = data.map((item: any) => ({
      id: item.id,
      topic: item.dsa_topics?.title,
      topic_id: item.topic_id,
      question: item.title,
      difficulty: item.difficulty,
      externalLink: item.url
    }))

    setDsaSheets(mapped)
  }


  const handleAddQuestion = async () => {

    if (editingId) {
      await supabase
        .from('dsa_problems')
        .update({
          topic_id: topicId,
          title: question,
          difficulty,
          url: externalLink
        })
        .eq('id', editingId)
    } else {
      await supabase
        .from('dsa_problems')
        .insert({
          topic_id: topicId,
          title: question,
          difficulty,
          url: externalLink
        })
    }

    setEditingId(null)
    resetForm()
    setIsOpen(false)
    fetchProblems()
  }


  const handleEdit = (sheet: any) => {
    setEditingId(sheet.id)
    setQuestion(sheet.question)
    setDifficulty(sheet.difficulty)
    setExternalLink(sheet.externalLink)
    setTopicId(sheet.topic_id)   // IMPORTANT
    setIsOpen(true)
  }


  const handleDelete = async (id: string) => {
    await supabase.from('dsa_problems').delete().eq('id', id)
    fetchProblems()
  }

  const resetForm = () => {
    setEditingId(null)
    setTopicId('')
    setQuestion('')
    setDifficulty('')
    setExternalLink('')
  }


  const filteredDSA = dsaSheets.filter(sheet =>
    sheet.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.question?.toLowerCase().includes(searchTerm.toLowerCase())
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

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">DSA Questions</h1>
          <p className="text-sm text-foreground/60">Manage DSA sheet questions</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => {
                resetForm()
                setIsOpen(true)
              }}
            >
              <Plus className="h-4 w-4" />
              Add Question
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit DSA Question' : 'Add DSA Question'}</DialogTitle>
              <DialogDescription>{editingId ? 'Update the selected question' : 'Add a new question to the DSA sheets'}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Topic</Label>
                <Select onValueChange={setTopicId}>
                  <SelectTrigger className='border-white'>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Question</Label>
                <Input value={question} onChange={(e) => setQuestion(e.target.value)} className='border-white' />
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select onValueChange={setDifficulty} >
                  <SelectTrigger className='border-white'>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>External Link</Label>
                <Input value={externalLink} onChange={(e) => setExternalLink(e.target.value)} className='border-white' />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleAddQuestion}>
                  Add Question
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          placeholder="Search questions..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10"
                          onClick={() => {
                            setEditingId(sheet.id)
                            setTopicId(sheet.topic_id)
                            setQuestion(sheet.question)
                            setDifficulty(sheet.difficulty)
                            setExternalLink(sheet.externalLink)
                            setIsOpen(true)
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Question?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(sheet.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center gap-4 mt-6">
  <Button
    variant="outline"
    disabled={page === 1}
    onClick={() => setPage(p => p - 1)}
  >
    Prev
  </Button>

  <span className="flex items-center text-sm text-muted-foreground">
    Page {page} / {Math.ceil(totalCount / pageSize)}
  </span>

  <Button
    variant="outline"
    disabled={page >= Math.ceil(totalCount / pageSize)}
    onClick={() => setPage(p => p + 1)}
  >
    Next
  </Button>
</div>

        </CardContent>
      </Card>
    </div>
  )
}

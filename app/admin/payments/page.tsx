'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const transactions = [
  { id: 1, user: 'John Doe', course: 'Advanced DSA', amount: '$99.00', status: 'Completed', date: '2024-02-10' },
  { id: 2, user: 'Jane Smith', course: 'System Design', amount: '$149.00', status: 'Completed', date: '2024-02-10' },
  { id: 3, user: 'Mike Johnson', course: 'React Mastery', amount: '$79.00', status: 'Pending', date: '2024-02-09' },
  { id: 4, user: 'Sarah Williams', course: 'Node.js Deep Dive', amount: '$89.00', status: 'Completed', date: '2024-02-09' },
  { id: 5, user: 'David Brown', course: 'Web Performance', amount: '$69.00', status: 'Failed', date: '2024-02-08' },
  { id: 6, user: 'Emily Davis', course: 'Advanced DSA', amount: '$99.00', status: 'Completed', date: '2024-02-08' },
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = transactions.filter(tx =>
    tx.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.course.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = transactions
    .filter(tx => tx.status === 'Completed')
    .reduce((sum, tx) => sum + parseFloat(tx.amount.slice(1)), 0)

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
        <p className="text-sm text-foreground/60">Manage transactions and revenue</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{transactions.length}</div>
            <p className="text-xs text-foreground/60 mt-1">All time</p>
          </CardContent>
        </Card>
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {transactions.filter(t => t.status === 'Pending').length}
            </div>
            <p className="text-xs text-foreground/60 mt-1">Awaiting completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          placeholder="Search transactions..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Total: {filteredTransactions.length} transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id} className="border-border/30 hover:bg-primary/5">
                    <TableCell className="font-medium text-foreground">{tx.user}</TableCell>
                    <TableCell className="text-foreground/70">{tx.course}</TableCell>
                    <TableCell className="font-semibold text-foreground">{tx.amount}</TableCell>
                    <TableCell>
                      <Badge className={
                        tx.status === 'Completed' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30' :
                        tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30'
                      } variant="outline">
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground/70">{tx.date}</TableCell>
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

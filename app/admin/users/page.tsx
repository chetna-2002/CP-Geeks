'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, Search, ShieldAlert } from 'lucide-react'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', joinedDate: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Student', joinedDate: '2024-01-20', status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Instructor', joinedDate: '2023-12-10', status: 'Active' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Student', joinedDate: '2024-02-01', status: 'Inactive' },
  { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Student', joinedDate: '2024-02-05', status: 'Active' },
  { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', joinedDate: '2023-11-01', status: 'Active' },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-foreground/60">Manage platform users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{users.length}</div>
            <p className="text-xs text-foreground/60 mt-1">All registered users</p>
          </CardContent>
        </Card>
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{users.filter(u => u.status === 'Active').length}</div>
            <p className="text-xs text-foreground/60 mt-1">Currently active</p>
          </CardContent>
        </Card>
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{users.filter(u => u.role === 'Student').length}</div>
            <p className="text-xs text-foreground/60 mt-1">Enrolled users</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          placeholder="Search users by name or email..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Total: {filteredUsers.length} users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-border/30 hover:bg-primary/5">
                    <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                    <TableCell className="text-foreground/70">{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Admin' ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400' :
                        user.role === 'Instructor' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                        'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground/70">{user.joinedDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Active' 
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
                          : 'bg-red-500/10 text-red-700 dark:text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                          <ShieldAlert className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 text-destructive hover:text-destructive">
                          {/* Delete icon would go here */}
                          <span className="text-xs">×</span>
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

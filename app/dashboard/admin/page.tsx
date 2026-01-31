'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const stats = [
  {
    title: 'Total Users',
    value: '2,543',
    change: '+12.5%',
    positive: true,
    icon: Users,
  },
  {
    title: 'Total Courses',
    value: '48',
    change: '+4',
    positive: true,
    icon: BookOpen,
  },
  {
    title: 'Total Enrollments',
    value: '1,289',
    change: '+23.1%',
    positive: true,
    icon: ShoppingCart,
  },
  {
    title: 'Total Revenue',
    value: '$42,580',
    change: '+18.2%',
    positive: true,
    icon: TrendingUp,
  },
]

const enrollmentData = [
  { month: 'Jan', enrollments: 240 },
  { month: 'Feb', enrollments: 340 },
  { month: 'Mar', enrollments: 280 },
  { month: 'Apr', enrollments: 420 },
  { month: 'May', enrollments: 380 },
  { month: 'Jun', enrollments: 520 },
]

const recentActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Enrolled in',
    course: 'Advanced DSA',
    timestamp: '2 hours ago',
    type: 'enrollment',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Purchased',
    course: 'System Design Mastery',
    timestamp: '4 hours ago',
    type: 'purchase',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Completed',
    course: 'Full Stack Development',
    timestamp: '6 hours ago',
    type: 'completion',
  },
  {
    id: 4,
    user: 'Sarah Williams',
    action: 'Enrolled in',
    course: 'React Advanced Patterns',
    timestamp: '8 hours ago',
    type: 'enrollment',
  },
]

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-foreground/60">Welcome back! Here's your platform overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="border-border/30 hover:border-primary/30 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-foreground/70">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className={`flex items-center gap-1 text-xs ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <Card className="border-border/30">
          <CardHeader>
            <CardTitle>Enrollment Trend</CardTitle>
            <CardDescription>Monthly enrollment data</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="enrollments" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: 'var(--color-primary)' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="border-border/30">
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Revenue by course category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="enrollments" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest enrollments and purchases</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/30">
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id} className="border-border/30 hover:bg-primary/5">
                  <TableCell className="text-sm font-medium">{activity.user}</TableCell>
                  <TableCell className="text-sm text-foreground/70">{activity.action}</TableCell>
                  <TableCell className="text-sm text-foreground/70">{activity.course}</TableCell>
                  <TableCell className="text-sm text-foreground/60">{activity.timestamp}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={activity.type === 'enrollment' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30' : activity.type === 'purchase' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30' : 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30'}
                    >
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

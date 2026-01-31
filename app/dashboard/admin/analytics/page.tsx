'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const enrollmentData = [
  { month: 'Jan', enrollments: 240, revenue: 2400 },
  { month: 'Feb', enrollments: 340, revenue: 3100 },
  { month: 'Mar', enrollments: 280, revenue: 2900 },
  { month: 'Apr', enrollments: 420, revenue: 3800 },
  { month: 'May', enrollments: 380, revenue: 3200 },
  { month: 'Jun', enrollments: 520, revenue: 4200 },
]

const coursePopularity = [
  { name: 'Advanced DSA', value: 34 },
  { name: 'System Design', value: 28 },
  { name: 'React Mastery', value: 22 },
  { name: 'Web Performance', value: 16 },
]

const COLORS = ['#6B46C1', '#8B5CF6', '#A78BFA', '#C4B5FD']

const stats = [
  { title: 'Total Page Views', value: '24,568', change: '+8.2%' },
  { title: 'Unique Visitors', value: '12,340', change: '+12.5%' },
  { title: 'Avg. Session Duration', value: '4m 32s', change: '+2.1%' },
  { title: 'Bounce Rate', value: '42.3%', change: '-5.2%' },
]

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-foreground/60">Platform performance and user insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border/30 hover:border-primary/30 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-green-600 dark:text-green-400">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment & Revenue Trend */}
        <Card className="border-border/30">
          <CardHeader>
            <CardTitle>Enrollment & Revenue Trend</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="enrollments" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Popularity */}
        <Card className="border-border/30">
          <CardHeader>
            <CardTitle>Course Popularity</CardTitle>
            <CardDescription>By enrollment percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={coursePopularity}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {coursePopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
          <CardDescription>Enrollment numbers by month</CardDescription>
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
  )
}

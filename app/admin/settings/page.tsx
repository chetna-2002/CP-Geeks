'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Bell, Lock, User, CreditCard, Shield, Zap } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-foreground/60">Manage platform settings and configuration</p>
      </div>

      {/* Profile Settings */}
      <Card className="border-border/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input placeholder="Admin" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input placeholder="User" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input placeholder="admin@cpgeeks.com" type="email" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-border/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Security & Password</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Update Password</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-border/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage notification preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-primary/5">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-foreground/60">Receive updates about enrollments</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-primary/5">
            <div>
              <p className="font-medium text-foreground">Payment Alerts</p>
              <p className="text-sm text-foreground/60">Get notified of new transactions</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-primary/5">
            <div>
              <p className="font-medium text-foreground">Weekly Reports</p>
              <p className="text-sm text-foreground/60">Receive weekly analytics reports</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-primary/5">
            <div>
              <p className="font-medium text-foreground">User Registrations</p>
              <p className="text-sm text-foreground/60">Notify on new user signups</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Billing Settings */}
      <Card className="border-border/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage billing information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-foreground mb-4">Current Plan</p>
            <div className="p-4 border border-primary/30 bg-primary/5 rounded-lg space-y-3">
              <p className="font-semibold text-foreground">Pro Plan</p>
              <p className="text-sm text-foreground/60">Unlimited courses, users, and more</p>
              <p className="text-sm font-medium text-foreground">$99/month</p>
            </div>
          </div>
          <Separator className="bg-border/30" />
          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/90">Upgrade Plan</Button>
            <Button variant="outline" className="border-border/30 bg-transparent">View Invoices</Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card className="border-border/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure platform behavior</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default Currency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="inr">INR (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-primary/5">
            <div>
              <p className="font-medium text-foreground">Maintenance Mode</p>
              <p className="text-sm text-foreground/60">Take the platform offline for maintenance</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-primary/5">
            <div>
              <p className="font-medium text-foreground">New User Registrations</p>
              <p className="text-sm text-foreground/60">Allow new users to sign up</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border/30 border-red-500/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            <div>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 bg-transparent">
            Delete All User Data
          </Button>
          <Button variant="outline" className="w-full border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 bg-transparent">
            Reset Platform
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

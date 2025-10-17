"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Trophy, 
  Calendar, 
  TrendingUp,
  Bell,
  Plus,
  ArrowRight,
  Star,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for demonstration
const mockAcademyData = {
  name: "Elite Sports Academy",
  package: "Gold",
  renewalDate: "2024-12-31",
  totalMembers: 156,
  totalTournaments: 12,
  totalBookings: 89,
  notifications: [
    { id: 1, message: "New player registration request", type: "info", time: "2 hours ago" },
    { id: 2, message: "Tournament 'Summer Cup' approved", type: "success", time: "1 day ago" },
    { id: 3, message: "Stadium booking confirmed for tomorrow", type: "info", time: "2 days ago" }
  ]
}

export function DashboardOverview() {
  const [showAddPlayer, setShowAddPlayer] = useState(false)
  const [showAddStadium, setShowAddStadium] = useState(false)
  const [showCreateTournament, setShowCreateTournament] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAcademyData.totalMembers}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tournaments</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAcademyData.totalTournaments}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAcademyData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAcademyData.notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2",
                  notification.type === "success" ? "bg-green-500" : "bg-blue-500"
                )} />
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" onClick={() => setShowAddPlayer(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Register New Player
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setShowAddStadium(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Stadium
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setShowCreateTournament(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Tournament
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New player Ahmed Hassan registered", time: "2 hours ago", type: "success" },
              { action: "Stadium booking confirmed for Main Stadium", time: "4 hours ago", type: "info" },
              { action: "Tournament 'Summer Cup' created", time: "1 day ago", type: "success" },
              { action: "Video 'Training Session' uploaded", time: "2 days ago", type: "info" },
              { action: "Payment received for stadium booking", time: "3 days ago", type: "success" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  activity.type === "success" ? "bg-green-500" : "bg-blue-500"
                )} />
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Academy Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Academy Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{mockAcademyData.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {mockAcademyData.package} Package
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Renewal: {mockAcademyData.renewalDate}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Members</span>
                  <span className="font-semibold">{mockAcademyData.totalMembers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Tournaments</span>
                  <span className="font-semibold">{mockAcademyData.totalTournaments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Stadium Bookings</span>
                  <span className="font-semibold">{mockAcademyData.totalBookings}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">Package Benefits</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Up to 500 players</li>
                  <li>• 10 admin accounts</li>
                  <li>• 100GB storage</li>
                  <li>• Advanced CRM integration</li>
                  <li>• 24/7 support</li>
                </ul>
              </div>
              <Button className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Upgrade Package
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

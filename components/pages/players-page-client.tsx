"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  MoreHorizontal
} from "lucide-react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { AddPlayerModal } from "@/components/modals/add-player-modal"
import { cn } from "@/lib/utils"

// Mock data for players
const mockPlayers = [
  { 
    id: 1, 
    name: "Ahmed Hassan", 
    age: 18, 
    position: "Forward", 
    status: "Active", 
    joinDate: "2024-01-15",
    email: "ahmed.hassan@email.com",
    phone: "+1234567890",
    location: "Cairo, Egypt",
    rating: 4.8,
    totalGames: 25,
    goals: 12
  },
  { 
    id: 2, 
    name: "Sara Ali", 
    age: 17, 
    position: "Midfielder", 
    status: "Active", 
    joinDate: "2024-02-20",
    email: "sara.ali@email.com",
    phone: "+1234567891",
    location: "Alexandria, Egypt",
    rating: 4.6,
    totalGames: 22,
    goals: 8
  },
  { 
    id: 3, 
    name: "Omar Khalil", 
    age: 19, 
    position: "Defender", 
    status: "Pending", 
    joinDate: "2024-03-10",
    email: "omar.khalil@email.com",
    phone: "+1234567892",
    location: "Giza, Egypt",
    rating: 4.4,
    totalGames: 18,
    goals: 3
  },
  { 
    id: 4, 
    name: "Fatima Mohamed", 
    age: 16, 
    position: "Goalkeeper", 
    status: "Active", 
    joinDate: "2024-01-28",
    email: "fatima.mohamed@email.com",
    phone: "+1234567893",
    location: "Luxor, Egypt",
    rating: 4.9,
    totalGames: 20,
    goals: 0
  }
]

export function PlayersPageClient({ locale, username }: { locale: string; username: string }) {
  const [showAddPlayer, setShowAddPlayer] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || player.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout username={username}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Players Management</h1>
            <p className="text-muted-foreground">Manage your academy players and their information</p>
          </div>
          <Button onClick={() => setShowAddPlayer(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Register New Player
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players by name or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("active")}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPlayers.length}</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Players</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPlayers.filter(p => p.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPlayers.filter(p => p.status === "Pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(mockPlayers.reduce((acc, p) => acc + p.rating, 0) / mockPlayers.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <Card key={player.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{player.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={player.status === "Active" ? "default" : "secondary"}>
                      {player.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{player.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{player.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{player.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined: {player.joinDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{player.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {player.totalGames} games • {player.goals} goals
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No players found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by registering your first player"
                }
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Button onClick={() => setShowAddPlayer(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Register First Player
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <AddPlayerModal open={showAddPlayer} onOpenChange={setShowAddPlayer} />
    </DashboardLayout>
  )
}

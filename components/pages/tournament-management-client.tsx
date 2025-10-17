"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Trophy, Users, Clock, MapPin, Plus, Edit, Trash2, Eye, Star, Megaphone, Award, Target, Download, PlayCircle, Settings, Globe } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { toast } from "sonner"

interface Tournament {
  id: string
  name: string
  type: 'football' | 'basketball' | 'tennis' | 'swimming' | 'martial-arts'
  startDate: string
  endDate: string
  description: string
  status: 'upcoming' | 'ongoing' | 'completed'
  teams: Team[]
  fixtures: Fixture[]
  isPublic: boolean
}

interface Team {
  id: string
  name: string
  players: Player[]
  wins: number
  losses: number
  draws: number
}

interface Player {
  id: string
  name: string
  position: string
  age: number
}

interface Fixture {
  id: string
  team1: string
  team2: string
  date: string
  time: string
  venue: string
  status: 'scheduled' | 'live' | 'completed'
  score1?: number
  score2?: number
}

export function TournamentManagementClient({ locale, username }: { locale: string; username: string }) {
  const t = getClientTranslation(locale as any)
  
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: "1",
      name: "Spring Football Championship",
      type: "football",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      description: "Annual spring football tournament for youth teams",
      status: "upcoming",
      isPublic: true,
      teams: [
        { id: "1", name: "Thunder FC", players: [
          { id: "1", name: "Ahmed Hassan", position: "Forward", age: 18 },
          { id: "2", name: "Mohamed Ali", position: "Midfielder", age: 19 }
        ], wins: 2, losses: 1, draws: 0 },
        { id: "2", name: "Lightning United", players: [
          { id: "3", name: "Omar Ibrahim", position: "Defender", age: 17 },
          { id: "4", name: "Youssef Ahmed", position: "Goalkeeper", age: 20 }
        ], wins: 1, losses: 2, draws: 0 },
        { id: "3", name: "Eagles FC", players: [], wins: 3, losses: 0, draws: 0 },
        { id: "4", name: "Lions United", players: [], wins: 0, losses: 3, draws: 0 }
      ],
      fixtures: [
        {
          id: "1",
          team1: "Thunder FC",
          team2: "Lightning United",
          date: "2024-03-05",
          time: "15:00",
          venue: "Main Football Field",
          status: "completed",
          score1: 2,
          score2: 1
        },
        {
          id: "2",
          team1: "Eagles FC",
          team2: "Lions United",
          date: "2024-03-08",
          time: "16:00",
          venue: "Main Football Field",
          status: "scheduled",
          score1: 0,
          score2: 0
        }
      ]
    },
    {
      id: "2",
      name: "Basketball Summer League",
      type: "basketball", 
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      description: "Summer basketball league for all age groups",
      status: "upcoming",
      isPublic: false,
      teams: [
        { id: "5", name: "Hoops Masters", players: [], wins: 0, losses: 0, draws: 0 },
        { id: "6", name: "Slam Dunkers", players: [], wins: 0, losses: 0, draws: 0 }
      ],
      fixtures: []
    },
    {
      id: "3",
      name: "Tennis Championship",
      type: "tennis",
      startDate: "2024-04-01",
      endDate: "2024-04-07",
      description: "Annual tennis championship for academy members",
      status: "ongoing",
      isPublic: true,
      teams: [
        { id: "7", name: "Ace Players", players: [], wins: 1, losses: 0, draws: 0 },
        { id: "8", name: "Net Masters", players: [], wins: 0, losses: 1, draws: 0 }
      ],
      fixtures: [
        {
          id: "3",
          team1: "Ace Players",
          team2: "Net Masters",
          date: "2024-04-03",
          time: "10:00",
          venue: "Tennis Court Complex",
          status: "completed",
          score1: 6,
          score2: 4
        }
      ]
    }
  ])

  const [registeredPlayers] = useState<Player[]>([
    { id: "1", name: "Ahmed Hassan", position: "Forward", age: 18 },
    { id: "2", name: "Mohamed Ali", position: "Midfielder", age: 19 },
    { id: "3", name: "Omar Ibrahim", position: "Defender", age: 17 },
    { id: "4", name: "Youssef Ahmed", position: "Goalkeeper", age: 20 },
    { id: "5", name: "Sara Johnson", position: "Forward", age: 19 },
    { id: "6", name: "Mike Davis", position: "Midfielder", age: 18 },
    { id: "7", name: "Emma Wilson", position: "Defender", age: 20 },
    { id: "8", name: "Alex Brown", position: "Goalkeeper", age: 17 },
    { id: "9", name: "Layla Ahmed", position: "Forward", age: 16 },
    { id: "10", name: "Hassan Ali", position: "Midfielder", age: 21 }
  ])

  const [showCreateTournament, setShowCreateTournament] = useState(false)
  const [showManageTournament, setShowManageTournament] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [selectedStartDate, setSelectedStartDate] = useState<Date>()
  const [selectedEndDate, setSelectedEndDate] = useState<Date>()

  const [tournamentForm, setTournamentForm] = useState({
    name: "",
    type: "",
    description: "",
    selectedPlayers: [] as string[]
  })

  const handleCreateTournament = () => {
    if (!tournamentForm.name || !tournamentForm.type || !selectedStartDate || !selectedEndDate) {
      toast.error("Please fill in all required fields")
      return
    }

    const newTournament: Tournament = {
      id: Date.now().toString(),
      name: tournamentForm.name,
      type: tournamentForm.type as any,
      startDate: format(selectedStartDate, "yyyy-MM-dd"),
      endDate: format(selectedEndDate, "yyyy-MM-dd"),
      description: tournamentForm.description,
      status: "upcoming",
      isPublic: false,
      teams: [],
      fixtures: []
    }

    setTournaments([...tournaments, newTournament])
    setTournamentForm({
      name: "",
      type: "",
      description: "",
      selectedPlayers: []
    })
    setSelectedStartDate(undefined)
    setSelectedEndDate(undefined)
    setShowCreateTournament(false)
    toast.success("Tournament created successfully!")
  }

  const handleRequestPromotion = (tournamentId: string) => {
    toast.success("Promotion request sent to admin for homepage feature!")
  }

  const handleDeleteTournament = (tournamentId: string) => {
    setTournaments(tournaments.filter(tournament => tournament.id !== tournamentId))
    toast.success("Tournament deleted successfully!")
  }

  const handleManageTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setShowManageTournament(true)
  }

  const getTournamentTypeIcon = (type: string) => {
    switch (type) {
      case 'football': return '⚽'
      case 'basketball': return '🏀'
      case 'tennis': return '🎾'
      case 'swimming': return '🏊'
      case 'martial-arts': return '🥋'
      default: return '🏆'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tournament Management</h1>
          <p className="text-muted-foreground">Create and manage tournaments</p>
        </div>
        <Dialog open={showCreateTournament} onOpenChange={setShowCreateTournament}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Tournament
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Tournament</DialogTitle>
              <DialogDescription>
                Set up a new tournament for your academy
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Tournament Name"
                value={tournamentForm.name}
                onChange={(e) => setTournamentForm({...tournamentForm, name: e.target.value})}
                label="Tournament Name"
                required
              />
              
              <Select value={tournamentForm.type} onValueChange={(value) => setTournamentForm({...tournamentForm, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sport Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">⚽ Football</SelectItem>
                  <SelectItem value="basketball">🏀 Basketball</SelectItem>
                  <SelectItem value="tennis">🎾 Tennis</SelectItem>
                  <SelectItem value="swimming">🏊 Swimming</SelectItem>
                  <SelectItem value="martial-arts">🥋 Martial Arts</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedStartDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedStartDate ? format(selectedStartDate, "PPP") : "Pick start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedStartDate}
                        onSelect={setSelectedStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedEndDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedEndDate ? format(selectedEndDate, "PPP") : "Pick end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedEndDate}
                        onSelect={setSelectedEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <Textarea
                placeholder="Tournament description..."
                value={tournamentForm.description}
                onChange={(e) => setTournamentForm({...tournamentForm, description: e.target.value})}
                label="Description"
                rows={3}
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Players</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {registeredPlayers.map((player) => (
                    <div key={player.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={player.id}
                        checked={tournamentForm.selectedPlayers.includes(player.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTournamentForm({
                              ...tournamentForm,
                              selectedPlayers: [...tournamentForm.selectedPlayers, player.id]
                            })
                          } else {
                            setTournamentForm({
                              ...tournamentForm,
                              selectedPlayers: tournamentForm.selectedPlayers.filter(id => id !== player.id)
                            })
                          }
                        }}
                      />
                      <label htmlFor={player.id} className="text-sm">
                        {player.name} - {player.position} ({player.age} years)
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateTournament(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTournament}>
                  Create Tournament
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tournaments</p>
                <p className="text-2xl font-bold">{tournaments.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tournaments</p>
                <p className="text-2xl font-bold">{tournaments.filter(t => t.status === 'ongoing').length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                <p className="text-2xl font-bold">{tournaments.reduce((acc, t) => acc + t.teams.length, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Public Tournaments</p>
                <p className="text-2xl font-bold">{tournaments.filter(t => t.isPublic).length}</p>
              </div>
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTournamentTypeIcon(tournament.type)}</span>
                  {tournament.name}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => handleManageTournament(tournament)}>
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteTournament(tournament.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>{tournament.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(tournament.status)}>
                  {tournament.status}
                </Badge>
                <Badge variant={tournament.isPublic ? "default" : "secondary"}>
                  {tournament.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span>{format(new Date(tournament.startDate), "MMM dd")} - {format(new Date(tournament.endDate), "MMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{tournament.teams.length} teams</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span>{tournament.fixtures.length} fixtures</span>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Completed matches:</span>
                  <span className="font-medium text-green-600">
                    {tournament.fixtures.filter(f => f.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Upcoming matches:</span>
                  <span className="font-medium text-blue-600">
                    {tournament.fixtures.filter(f => f.status === 'scheduled').length}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleManageTournament(tournament)}
                >
                  Manage Tournament
                </Button>
                <Button 
                  variant="outline"
                  size="sm" 
                  className="w-full"
                  onClick={() => toast.info("Tournament details feature coming soon!")}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                <Button 
                  variant="secondary"
                  size="sm" 
                  className="w-full"
                  onClick={() => handleRequestPromotion(tournament.id)}
                >
                  <Megaphone className="h-3 w-3 mr-1" />
                  Request Promotion
                </Button>
                <Button 
                  variant="outline"
                  size="sm" 
                  className="w-full"
                  onClick={() => toast.info("Tournament settings feature coming soon!")}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tournament Management Dialog */}
      <Dialog open={showManageTournament} onOpenChange={setShowManageTournament}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Manage Tournament: {selectedTournament?.name}</DialogTitle>
            <DialogDescription>
              Manage teams, fixtures, and results
            </DialogDescription>
          </DialogHeader>
          
          {selectedTournament && (
            <Tabs defaultValue="teams" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="teams">Teams</TabsTrigger>
                <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="teams" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Teams ({selectedTournament.teams.length})</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.info("Team registration feature coming soon!")}>
                      <Users className="h-4 w-4 mr-1" />
                      Register Team
                    </Button>
                    <Button size="sm" onClick={() => toast.info("Add team feature coming soon!")}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Team
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTournament.teams.map((team) => (
                    <Card key={team.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {team.name}
                          <Badge variant="outline">
                            {team.wins}W - {team.losses}L - {team.draws}D
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span>{team.players.length} players</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-green-600" />
                              <span>{team.wins}W - {team.losses}L</span>
                            </div>
                          </div>
                          
                          {team.players.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground">Key Players:</p>
                              <div className="space-y-1">
                                {team.players.slice(0, 2).map((player) => (
                                  <div key={player.id} className="text-xs flex justify-between">
                                    <span>{player.name}</span>
                                    <span className="text-muted-foreground">{player.position}</span>
                                  </div>
                                ))}
                                {team.players.length > 2 && (
                                  <p className="text-xs text-muted-foreground">+{team.players.length - 2} more</p>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => toast.info("Edit team feature coming soon!")}>
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => toast.info("View team details coming soon!")}>
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="fixtures" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Fixtures ({selectedTournament.fixtures.length})</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.info("Auto-generate fixtures feature coming soon!")}>
                      <Target className="h-4 w-4 mr-1" />
                      Auto Generate
                    </Button>
                    <Button size="sm" onClick={() => toast.info("Add fixture feature coming soon!")}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Fixture
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedTournament.fixtures.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Target className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No fixtures scheduled yet</p>
                        <Button className="mt-2" size="sm">
                          Create Fixtures
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    selectedTournament.fixtures.map((fixture) => (
                      <Card key={fixture.id}>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="font-medium">{fixture.team1}</p>
                                  <p className="text-2xl font-bold">{fixture.score1 || 0}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm text-muted-foreground">VS</p>
                                  <Badge variant={
                                    fixture.status === 'completed' ? 'default' :
                                    fixture.status === 'live' ? 'destructive' : 'secondary'
                                  }>
                                    {fixture.status}
                                  </Badge>
                                </div>
                                <div className="text-center">
                                  <p className="font-medium">{fixture.team2}</p>
                                  <p className="text-2xl font-bold">{fixture.score2 || 0}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{fixture.date}</p>
                                <p className="text-sm text-muted-foreground">{fixture.time}</p>
                                <p className="text-sm">{fixture.venue}</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center pt-2 border-t">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => toast.info("Edit fixture feature coming soon!")}>
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => toast.info("View fixture details coming soon!")}>
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                {fixture.status === 'scheduled' && (
                                  <Button size="sm" variant="outline" onClick={() => toast.info("Start match feature coming soon!")}>
                                    <PlayCircle className="h-3 w-3 mr-1" />
                                    Start
                                  </Button>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {fixture.status === 'completed' && 'Match completed'}
                                {fixture.status === 'live' && 'Live match'}
                                {fixture.status === 'scheduled' && 'Upcoming match'}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Results & Standings</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.info("Export results feature coming soon!")}>
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button size="sm" onClick={() => toast.info("Generate report feature coming soon!")}>
                      <Award className="h-4 w-4 mr-1" />
                      Generate Report
                    </Button>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tournament Standings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedTournament.teams
                        .sort((a, b) => (b.wins * 3 + b.draws) - (a.wins * 3 + a.draws))
                        .map((team, index) => (
                        <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{team.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {team.wins}W - {team.losses}L - {team.draws}D
                              </p>
                              {team.players.length > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  {team.players.length} players
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {team.wins * 3 + team.draws}
                            </p>
                            <p className="text-sm text-muted-foreground">Points</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

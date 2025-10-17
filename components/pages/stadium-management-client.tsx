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
import { CalendarIcon, MapPin, Clock, Users, Camera, Plus, Edit, Trash2, Eye, Star, Globe, Lock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { toast } from "sonner"

interface Stadium {
  id: string
  name: string
  location: string
  hourlyRate: number
  capacity: number
  photos: string[]
  isPublic: boolean
  availability: {
    date: string
    timeSlots: { start: string; end: string; available: boolean }[]
  }[]
}

interface Booking {
  id: string
  stadiumId: string
  date: string
  startTime: string
  endTime: string
  customerName: string
  customerPhone: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export function StadiumManagementClient({ locale, username }: { locale: string; username: string }) {
  const t = getClientTranslation(locale as any)
  const [stadiums, setStadiums] = useState<Stadium[]>([
    {
      id: "1",
      name: "Main Football Field",
      location: "Downtown Sports Complex",
      hourlyRate: 50,
      capacity: 22,
      photos: ["https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop"],
      isPublic: true,
      availability: []
    },
    {
      id: "2", 
      name: "Indoor Basketball Court",
      location: "Sports Center Building A",
      hourlyRate: 35,
      capacity: 20,
      photos: ["https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop"],
      isPublic: false,
      availability: []
    },
    {
      id: "3",
      name: "Tennis Court Complex",
      location: "Elite Sports Academy",
      hourlyRate: 40,
      capacity: 4,
      photos: ["https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop"],
      isPublic: true,
      availability: []
    },
    {
      id: "4",
      name: "Swimming Pool",
      location: "Aquatic Center",
      hourlyRate: 30,
      capacity: 30,
      photos: ["https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop"],
      isPublic: false,
      availability: []
    }
  ])

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      stadiumId: "1",
      date: "2024-01-15",
      startTime: "10:00",
      endTime: "12:00",
      customerName: "John Smith",
      customerPhone: "+1234567890",
      status: 'confirmed'
    },
    {
      id: "2",
      stadiumId: "2",
      date: "2024-01-16",
      startTime: "14:00",
      endTime: "16:00",
      customerName: "Sarah Johnson",
      customerPhone: "+1987654321",
      status: 'pending'
    },
    {
      id: "3",
      stadiumId: "3",
      date: "2024-01-17",
      startTime: "09:00",
      endTime: "11:00",
      customerName: "Mike Davis",
      customerPhone: "+1555123456",
      status: 'confirmed'
    }
  ])

  const [showAddStadium, setShowAddStadium] = useState(false)
  const [showEditStadium, setShowEditStadium] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showBookingDetails, setShowBookingDetails] = useState(false)
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")

  const [stadiumForm, setStadiumForm] = useState({
    name: "",
    location: "",
    hourlyRate: "",
    capacity: "",
    description: "",
    photos: [] as File[]
  })

  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerPhone: "",
    date: "",
    startTime: "",
    endTime: "",
    notes: ""
  })

  const handleAddStadium = () => {
    if (!stadiumForm.name || !stadiumForm.location || !stadiumForm.hourlyRate || !stadiumForm.capacity) {
      toast.error("Please fill in all required fields")
      return
    }

    const newStadium: Stadium = {
      id: Date.now().toString(),
      name: stadiumForm.name,
      location: stadiumForm.location,
      hourlyRate: parseFloat(stadiumForm.hourlyRate),
      capacity: parseInt(stadiumForm.capacity),
      photos: stadiumForm.photos.length > 0 
        ? stadiumForm.photos.map(() => "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop")
        : ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"],
      isPublic: false,
      availability: []
    }

    setStadiums([...stadiums, newStadium])
    setStadiumForm({
      name: "",
      location: "",
      hourlyRate: "",
      capacity: "",
      description: "",
      photos: []
    })
    setShowAddStadium(false)
    toast.success("Stadium added successfully!")
  }

  const handleMakePublic = (stadiumId: string) => {
    setStadiums(stadiums.map(stadium => 
      stadium.id === stadiumId 
        ? { ...stadium, isPublic: !stadium.isPublic }
        : stadium
    ))
    toast.success("Stadium visibility updated!")
  }

  const handleBookingSubmit = () => {
    if (!selectedStadium || !bookingForm.customerName || !bookingForm.customerPhone || !bookingForm.date || !bookingForm.startTime || !bookingForm.endTime) {
      toast.error("Please fill in all required fields")
      return
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      stadiumId: selectedStadium.id,
      date: bookingForm.date,
      startTime: bookingForm.startTime,
      endTime: bookingForm.endTime,
      customerName: bookingForm.customerName,
      customerPhone: bookingForm.customerPhone,
      status: 'pending'
    }

    setBookings([...bookings, newBooking])
    setBookingForm({
      customerName: "",
      customerPhone: "",
      date: "",
      startTime: "",
      endTime: "",
      notes: ""
    })
    setShowBookingForm(false)
    setSelectedStadium(null)
    toast.success("Booking request submitted successfully!")
  }

  const handleDeleteStadium = (stadiumId: string) => {
    setStadiums(stadiums.filter(stadium => stadium.id !== stadiumId))
    toast.success("Stadium deleted successfully!")
  }

  const handleEditStadium = (stadium: Stadium) => {
    setSelectedStadium(stadium)
    setStadiumForm({
      name: stadium.name,
      location: stadium.location,
      hourlyRate: stadium.hourlyRate.toString(),
      capacity: stadium.capacity.toString(),
      description: "",
      photos: []
    })
    setShowEditStadium(true)
  }

  const handleUpdateStadium = () => {
    if (!selectedStadium || !stadiumForm.name || !stadiumForm.location || !stadiumForm.hourlyRate || !stadiumForm.capacity) {
      toast.error("Please fill in all required fields")
      return
    }

    setStadiums(stadiums.map(stadium => 
      stadium.id === selectedStadium.id 
        ? {
            ...stadium,
            name: stadiumForm.name,
            location: stadiumForm.location,
            hourlyRate: parseFloat(stadiumForm.hourlyRate),
            capacity: parseInt(stadiumForm.capacity)
          }
        : stadium
    ))
    
    setStadiumForm({
      name: "",
      location: "",
      hourlyRate: "",
      capacity: "",
      description: "",
      photos: []
    })
    setShowEditStadium(false)
    setSelectedStadium(null)
    toast.success("Stadium updated successfully!")
  }

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowBookingDetails(true)
  }

  const handleUpdateBookingStatus = (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status }
        : booking
    ))
    toast.success(`Booking ${status} successfully!`)
  }

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Stadium Management</h1>
          <p className="text-muted-foreground">Manage your stadiums and pitch bookings</p>
        </div>
        <Dialog open={showAddStadium} onOpenChange={setShowAddStadium}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Stadium
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Stadium</DialogTitle>
              <DialogDescription>
                Add a new stadium or pitch to your academy
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Stadium Name"
                  value={stadiumForm.name}
                  onChange={(e) => setStadiumForm({...stadiumForm, name: e.target.value})}
                  label="Stadium Name"
                  required
                />
                <Input
                  placeholder="Location"
                  value={stadiumForm.location}
                  onChange={(e) => setStadiumForm({...stadiumForm, location: e.target.value})}
                  label="Location"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="50"
                  value={stadiumForm.hourlyRate}
                  onChange={(e) => setStadiumForm({...stadiumForm, hourlyRate: e.target.value})}
                  label="Hourly Rate ($)"
                  required
                />
                <Input
                  type="number"
                  placeholder="22"
                  value={stadiumForm.capacity}
                  onChange={(e) => setStadiumForm({...stadiumForm, capacity: e.target.value})}
                  label="Capacity"
                  required
                />
              </div>
              <Textarea
                placeholder="Stadium description..."
                value={stadiumForm.description}
                onChange={(e) => setStadiumForm({...stadiumForm, description: e.target.value})}
                label="Description"
                rows={3}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Photos</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload stadium photos</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setStadiumForm({...stadiumForm, photos: Array.from(e.target.files)})
                      }
                    }}
                    className="hidden"
                    id="stadium-photos"
                  />
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('stadium-photos')?.click()}>
                    Choose Photos
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddStadium(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStadium}>
                  Add Stadium
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
                <p className="text-sm font-medium text-muted-foreground">Total Stadiums</p>
                <p className="text-2xl font-bold">{stadiums.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Public Stadiums</p>
                <p className="text-2xl font-bold">{stadiums.filter(s => s.isPublic).length}</p>
              </div>
              <Globe className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Bookings</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stadiums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stadiums.map((stadium) => (
          <Card key={stadium.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              {stadium.photos.length > 0 ? (
                <img 
                  src={stadium.photos[0]} 
                  alt={stadium.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant={stadium.isPublic ? "default" : "secondary"}>
                  {stadium.isPublic ? (
                    <>
                      <Globe className="h-3 w-3 mr-1" />
                      Public
                    </>
                  ) : (
                    <>
                      <Lock className="h-3 w-3 mr-1" />
                      Private
                    </>
                  )}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {stadium.name}
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => handleEditStadium(stadium)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteStadium(stadium.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {stadium.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>${stadium.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{stadium.capacity} players</span>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Bookings this month:</span>
                  <span className="font-medium">
                    {bookings.filter(b => b.stadiumId === stadium.id).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated revenue:</span>
                  <span className="font-medium text-green-600">
                    ${bookings.filter(b => b.stadiumId === stadium.id).length * stadium.hourlyRate * 2}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setSelectedStadium(stadium)
                    setShowBookingForm(true)
                  }}
                >
                  Reserve Pitch
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => toast.info("Availability calendar feature coming soon!")}
                >
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  View Calendar
                </Button>
                <Button 
                  variant={stadium.isPublic ? "secondary" : "default"}
                  size="sm" 
                  className="w-full"
                  onClick={() => handleMakePublic(stadium.id)}
                >
                  {stadium.isPublic ? "Make Private" : "Make Public"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Form Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reserve Pitch</DialogTitle>
            <DialogDescription>
              Book {selectedStadium?.name} for your event
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Customer Name"
                value={bookingForm.customerName}
                onChange={(e) => setBookingForm({...bookingForm, customerName: e.target.value})}
                label="Customer Name"
                required
              />
              <Input
                placeholder="Phone Number"
                value={bookingForm.customerPhone}
                onChange={(e) => setBookingForm({...bookingForm, customerPhone: e.target.value})}
                label="Phone Number"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        setBookingForm({...bookingForm, date: date ? format(date, "yyyy-MM-dd") : ""})
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Select value={bookingForm.startTime} onValueChange={(value) => setBookingForm({...bookingForm, startTime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Start Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={bookingForm.endTime} onValueChange={(value) => setBookingForm({...bookingForm, endTime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="End Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Textarea
              placeholder="Additional notes..."
              value={bookingForm.notes}
              onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
              label="Notes"
              rows={3}
            />
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBookingForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleBookingSubmit}>
                Submit Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Manage and track all stadium bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => {
              const stadium = stadiums.find(s => s.id === booking.stadiumId)
              return (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{stadium?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date} • {booking.startTime} - {booking.endTime}
                    </p>
                    <p className="text-sm">{booking.customerName} • {booking.customerPhone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      booking.status === 'confirmed' ? 'default' :
                      booking.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {booking.status}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => handleViewBooking(booking)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Stadium Dialog */}
      <Dialog open={showEditStadium} onOpenChange={setShowEditStadium}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Stadium</DialogTitle>
            <DialogDescription>
              Update stadium information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Stadium Name"
                value={stadiumForm.name}
                onChange={(e) => setStadiumForm({...stadiumForm, name: e.target.value})}
                label="Stadium Name"
                required
              />
              <Input
                placeholder="Location"
                value={stadiumForm.location}
                onChange={(e) => setStadiumForm({...stadiumForm, location: e.target.value})}
                label="Location"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="50"
                value={stadiumForm.hourlyRate}
                onChange={(e) => setStadiumForm({...stadiumForm, hourlyRate: e.target.value})}
                label="Hourly Rate ($)"
                required
              />
              <Input
                type="number"
                placeholder="22"
                value={stadiumForm.capacity}
                onChange={(e) => setStadiumForm({...stadiumForm, capacity: e.target.value})}
                label="Capacity"
                required
              />
            </div>
            <Textarea
              placeholder="Stadium description..."
              value={stadiumForm.description}
              onChange={(e) => setStadiumForm({...stadiumForm, description: e.target.value})}
              label="Description"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditStadium(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStadium}>
                Update Stadium
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              View and manage booking information
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Customer Name</label>
                  <p className="text-lg font-semibold">{selectedBooking.customerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <p className="text-lg font-semibold">{selectedBooking.customerPhone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="text-lg font-semibold">{selectedBooking.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time</label>
                  <p className="text-lg font-semibold">{selectedBooking.startTime} - {selectedBooking.endTime}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Stadium</label>
                <p className="text-lg font-semibold">
                  {stadiums.find(s => s.id === selectedBooking.stadiumId)?.name}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={
                    selectedBooking.status === 'confirmed' ? 'default' :
                    selectedBooking.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {selectedBooking.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                {selectedBooking.status === 'pending' && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => handleUpdateBookingStatus(selectedBooking.id, 'cancelled')}
                    >
                      Cancel Booking
                    </Button>
                    <Button 
                      onClick={() => handleUpdateBookingStatus(selectedBooking.id, 'confirmed')}
                    >
                      Confirm Booking
                    </Button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <Button 
                    variant="destructive" 
                    onClick={() => handleUpdateBookingStatus(selectedBooking.id, 'cancelled')}
                  >
                    Cancel Booking
                  </Button>
                )}
                <Button variant="outline" onClick={() => setShowBookingDetails(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download, 
  Eye, 
  Filter,
  Search,
  Plus,
  BarChart3,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  Mail,
  MessageSquare
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { toast } from "sonner"

interface Booking {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  stadiumName: string
  stadiumLocation: string
  date: string
  startTime: string
  endTime: string
  duration: number // hours
  totalCost: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  bookingDate: string
  notes?: string
  paymentStatus: 'pending' | 'paid' | 'refunded'
  specialRequests?: string
}

interface BookingStats {
  totalBookings: number
  pendingBookings: number
  confirmedBookings: number
  totalRevenue: number
  averageBookingValue: number
  occupancyRate: number
}

export function BookingManagementClient({ locale, username }: { locale: string; username: string }) {
  const t = getClientTranslation(locale as any)
  
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      customerPhone: "+1234567890",
      stadiumName: "Main Football Field",
      stadiumLocation: "Downtown Sports Complex",
      date: "2024-01-20",
      startTime: "10:00",
      endTime: "12:00",
      duration: 2,
      totalCost: 100,
      status: "pending",
      bookingDate: "2024-01-15",
      notes: "Birthday party booking",
      paymentStatus: "pending",
      specialRequests: "Need sound system setup"
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@email.com",
      customerPhone: "+1987654321",
      stadiumName: "Indoor Basketball Court",
      stadiumLocation: "Sports Center Building A",
      date: "2024-01-22",
      startTime: "14:00",
      endTime: "16:00",
      duration: 2,
      totalCost: 70,
      status: "confirmed",
      bookingDate: "2024-01-16",
      notes: "Corporate team building event",
      paymentStatus: "paid",
      specialRequests: "Catering setup required"
    },
    {
      id: "3",
      customerName: "Mike Davis",
      customerEmail: "mike.davis@email.com",
      customerPhone: "+1555123456",
      stadiumName: "Tennis Court Complex",
      stadiumLocation: "Elite Sports Academy",
      date: "2024-01-25",
      startTime: "09:00",
      endTime: "11:00",
      duration: 2,
      totalCost: 80,
      status: "confirmed",
      bookingDate: "2024-01-18",
      notes: "Weekly tennis practice",
      paymentStatus: "paid"
    },
    {
      id: "4",
      customerName: "Emma Wilson",
      customerEmail: "emma.wilson@email.com",
      customerPhone: "+1444987654",
      stadiumName: "Swimming Pool",
      stadiumLocation: "Aquatic Center",
      date: "2024-01-28",
      startTime: "16:00",
      endTime: "18:00",
      duration: 2,
      totalCost: 60,
      status: "pending",
      bookingDate: "2024-01-19",
      notes: "Swimming lessons for kids",
      paymentStatus: "pending",
      specialRequests: "Lifeguard supervision needed"
    },
    {
      id: "5",
      customerName: "Alex Brown",
      customerEmail: "alex.brown@email.com",
      customerPhone: "+1333444555",
      stadiumName: "Main Football Field",
      stadiumLocation: "Downtown Sports Complex",
      date: "2024-01-30",
      startTime: "18:00",
      endTime: "20:00",
      duration: 2,
      totalCost: 100,
      status: "cancelled",
      bookingDate: "2024-01-17",
      notes: "Football training session",
      paymentStatus: "refunded"
    },
    {
      id: "6",
      customerName: "Lisa Garcia",
      customerEmail: "lisa.garcia@email.com",
      customerPhone: "+1666777888",
      stadiumName: "Indoor Basketball Court",
      stadiumLocation: "Sports Center Building A",
      date: "2024-02-01",
      startTime: "12:00",
      endTime: "14:00",
      duration: 2,
      totalCost: 70,
      status: "completed",
      bookingDate: "2024-01-20",
      notes: "Basketball tournament",
      paymentStatus: "paid"
    }
  ])

  const [stats] = useState<BookingStats>({
    totalBookings: 6,
    pendingBookings: 2,
    confirmedBookings: 2,
    totalRevenue: 410,
    averageBookingValue: 68.33,
    occupancyRate: 75
  })

  const [showCalendar, setShowCalendar] = useState(false)
  const [showBookingDetails, setShowBookingDetails] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const handleApproveBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'confirmed' as const }
        : booking
    ))
    toast.success("Booking approved successfully!")
  }

  const handleRejectBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ))
    toast.success("Booking rejected successfully!")
  }

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowBookingDetails(true)
  }

  const handleExportReport = () => {
    toast.success("Exporting booking report...")
    // In a real app, this would generate and download a PDF/Excel report
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === "all" || booking.status === activeTab
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        booking.stadiumName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <AlertCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'refunded': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Booking Management</h1>
          <p className="text-muted-foreground">Manage stadium bookings and reservations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowCalendar(true)}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pendingBookings}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold">{stats.occupancyRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Booking Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({bookings.filter(b => b.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({bookings.filter(b => b.status === 'confirmed').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({bookings.filter(b => b.status === 'completed').length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({bookings.filter(b => b.status === 'cancelled').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{booking.status}</span>
                        </Badge>
                        <Badge variant="outline" className={getPaymentStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{booking.stadiumName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>${booking.totalCost}</span>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm"><strong>Notes:</strong> {booking.notes}</p>
                        </div>
                      )}
                      
                      {booking.specialRequests && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800"><strong>Special Requests:</strong> {booking.specialRequests}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewBooking(booking)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {booking.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => handleApproveBooking(booking.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectBooking(booking.id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-4">
            {bookings.filter(b => b.status === 'pending').map((booking) => (
              <Card key={booking.id} className="border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <AlertCircle className="h-4 w-4" />
                          <span className="ml-1">Pending Approval</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{booking.stadiumName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>${booking.totalCost}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewBooking(booking)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => handleApproveBooking(booking.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleRejectBooking(booking.id)}>
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          <div className="space-y-4">
            {bookings.filter(b => b.status === 'confirmed').map((booking) => (
              <Card key={booking.id} className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                          <span className="ml-1">Confirmed</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{booking.stadiumName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>${booking.totalCost}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewBooking(booking)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="space-y-4">
            {bookings.filter(b => b.status === 'completed').map((booking) => (
              <Card key={booking.id} className="border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          <CheckCircle className="h-4 w-4" />
                          <span className="ml-1">Completed</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{booking.stadiumName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>${booking.totalCost}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewBooking(booking)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <div className="space-y-4">
            {bookings.filter(b => b.status === 'cancelled').map((booking) => (
              <Card key={booking.id} className="border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          <XCircle className="h-4 w-4" />
                          <span className="ml-1">Cancelled</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{booking.stadiumName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>${booking.totalCost}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewBooking(booking)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Calendar View Dialog */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Booking Calendar</DialogTitle>
            <DialogDescription>
              View all confirmed bookings in calendar format
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Bookings for {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Select a date"}</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {selectedDate && bookings
                    .filter(booking => 
                      new Date(booking.date).toDateString() === selectedDate.toDateString() && 
                      booking.status === 'confirmed'
                    )
                    .map((booking) => (
                      <Card key={booking.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-muted-foreground">{booking.stadiumName}</p>
                            <p className="text-sm text-muted-foreground">{booking.startTime} - {booking.endTime}</p>
                          </div>
                          <Badge variant="outline">${booking.totalCost}</Badge>
                        </div>
                      </Card>
                    ))}
                  {selectedDate && bookings.filter(booking => 
                    new Date(booking.date).toDateString() === selectedDate.toDateString() && 
                    booking.status === 'confirmed'
                  ).length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No confirmed bookings for this date</p>
                  )}
                </div>
              </div>
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
              Complete information about this booking
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
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg font-semibold">{selectedBooking.customerEmail}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-lg font-semibold">{selectedBooking.customerPhone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stadium</label>
                  <p className="text-lg font-semibold">{selectedBooking.stadiumName}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="text-lg font-semibold">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time</label>
                  <p className="text-lg font-semibold">{selectedBooking.startTime} - {selectedBooking.endTime}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p className="text-lg font-semibold">{selectedBooking.duration} hours</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Cost</label>
                  <p className="text-lg font-semibold">${selectedBooking.totalCost}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(selectedBooking.status)}>
                  {getStatusIcon(selectedBooking.status)}
                  <span className="ml-1">{selectedBooking.status}</span>
                </Badge>
                <Badge variant="outline" className={getPaymentStatusColor(selectedBooking.paymentStatus)}>
                  {selectedBooking.paymentStatus}
                </Badge>
              </div>
              
              {selectedBooking.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="text-lg font-semibold">{selectedBooking.notes}</p>
                </div>
              )}
              
              {selectedBooking.specialRequests && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Special Requests</label>
                  <p className="text-lg font-semibold">{selectedBooking.specialRequests}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowBookingDetails(false)}>
                  Close
                </Button>
                {selectedBooking.status === 'pending' && (
                  <>
                    <Button variant="destructive" onClick={() => handleRejectBooking(selectedBooking.id)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button onClick={() => handleApproveBooking(selectedBooking.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

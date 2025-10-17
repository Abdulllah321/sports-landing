"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar, 
  Download, 
  FileText, 
  PieChart, 
  Activity,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  RefreshCw,
  Settings,
  Database,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Mail,
  Phone,
  MessageSquare,
  UserPlus,
  UserMinus,
  CreditCard,
  Receipt,
  Calculator,
  LineChart,
  BarChart,
  PieChart as PieChartIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { toast } from "sonner"

interface CrmData {
  totalRevenue: number
  monthlyRevenue: number
  revenueGrowth: number
  totalCustomers: number
  newCustomers: number
  customerGrowth: number
  totalBookings: number
  completedBookings: number
  bookingGrowth: number
  averageBookingValue: number
  occupancyRate: number
  customerSatisfaction: number
}

interface RecentActivity {
  id: string
  type: 'booking' | 'payment' | 'customer' | 'tournament' | 'video'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'error' | 'info'
  amount?: number
}

interface TopCustomer {
  id: string
  name: string
  email: string
  totalSpent: number
  bookings: number
  lastBooking: string
  status: 'active' | 'inactive' | 'vip'
}

interface RevenueData {
  month: string
  revenue: number
  bookings: number
  customers: number
}

interface BookingAnalytics {
  totalBookings: number
  completedBookings: number
  cancelledBookings: number
  pendingBookings: number
  averageBookingValue: number
  peakHours: string[]
  popularStadiums: { name: string; bookings: number }[]
}

export function CrmManagementClient({ locale, username }: { locale: string; username: string }) {
  const t = getClientTranslation(locale as any)
  
  const [crmData] = useState<CrmData>({
    totalRevenue: 15420.50,
    monthlyRevenue: 3240.75,
    revenueGrowth: 12.5,
    totalCustomers: 156,
    newCustomers: 23,
    customerGrowth: 8.3,
    totalBookings: 89,
    completedBookings: 76,
    bookingGrowth: 15.2,
    averageBookingValue: 173.26,
    occupancyRate: 78.5,
    customerSatisfaction: 4.6
  })

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "booking",
      title: "New Booking Confirmed",
      description: "John Smith booked Main Football Field for 2 hours",
      timestamp: "2 hours ago",
      status: "success",
      amount: 100
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Received",
      description: "Sarah Johnson paid $70 for basketball court booking",
      timestamp: "4 hours ago",
      status: "success",
      amount: 70
    },
    {
      id: "3",
      type: "customer",
      title: "New Customer Registration",
      description: "Mike Davis registered and completed profile",
      timestamp: "6 hours ago",
      status: "info"
    },
    {
      id: "4",
      type: "tournament",
      title: "Tournament Created",
      description: "Summer Basketball Tournament created successfully",
      timestamp: "1 day ago",
      status: "success"
    },
    {
      id: "5",
      type: "video",
      title: "Video Uploaded",
      description: "Training session video uploaded to YouSport",
      timestamp: "2 days ago",
      status: "success"
    }
  ])

  const [topCustomers] = useState<TopCustomer[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      totalSpent: 1250.00,
      bookings: 15,
      lastBooking: "2024-01-20",
      status: "vip"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      totalSpent: 980.50,
      bookings: 12,
      lastBooking: "2024-01-18",
      status: "active"
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      totalSpent: 750.25,
      bookings: 8,
      lastBooking: "2024-01-15",
      status: "active"
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      totalSpent: 420.75,
      bookings: 5,
      lastBooking: "2024-01-10",
      status: "inactive"
    }
  ])

  const [revenueData] = useState<RevenueData[]>([
    { month: "Jan", revenue: 2800, bookings: 45, customers: 120 },
    { month: "Feb", revenue: 3200, bookings: 52, customers: 135 },
    { month: "Mar", revenue: 2900, bookings: 48, customers: 128 },
    { month: "Apr", revenue: 3500, bookings: 58, customers: 142 },
    { month: "May", revenue: 3800, bookings: 62, customers: 148 },
    { month: "Jun", revenue: 4200, bookings: 68, customers: 156 }
  ])

  const [bookingAnalytics] = useState<BookingAnalytics>({
    totalBookings: 89,
    completedBookings: 76,
    cancelledBookings: 8,
    pendingBookings: 5,
    averageBookingValue: 173.26,
    peakHours: ["10:00-12:00", "14:00-16:00", "18:00-20:00"],
    popularStadiums: [
      { name: "Main Football Field", bookings: 25 },
      { name: "Indoor Basketball Court", bookings: 20 },
      { name: "Tennis Court Complex", bookings: 15 },
      { name: "Swimming Pool", bookings: 12 },
      { name: "Gymnasium", bookings: 8 }
    ]
  })

  const [activeTab, setActiveTab] = useState("operations")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const handleDownloadReport = (type: string) => {
    toast.success(`Downloading ${type} report...`)
    // In a real app, this would generate and download a CSV/PDF report
  }

  const handleRefreshData = () => {
    toast.success("Data refreshed successfully!")
    // In a real app, this would refresh data from the server
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      case 'info': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertCircle className="h-4 w-4" />
      case 'error': return <XCircle className="h-4 w-4" />
      case 'info': return <Activity className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getCustomerStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">CRM Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive business analytics and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" onClick={() => handleDownloadReport("comprehensive")}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${crmData.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{crmData.revenueGrowth}%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{crmData.totalCustomers}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{crmData.customerGrowth}%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{crmData.totalBookings}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{crmData.bookingGrowth}%</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold">{crmData.occupancyRate}%</p>
                <div className="flex items-center mt-1">
                  <Target className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm text-blue-600">Target: 80%</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CRM Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest business activities and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={cn("p-2 rounded-full", getStatusColor(activity.status))}>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                          {activity.amount && (
                            <span className="text-sm font-medium text-green-600">+${activity.amount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Customers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Customers
                </CardTitle>
                <CardDescription>Your most valuable customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCustomers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${customer.totalSpent.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{customer.bookings} bookings</p>
                        <Badge className={getCustomerStatusColor(customer.status)}>
                          {customer.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common business operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <UserPlus className="h-6 w-6" />
                  <span>Add Customer</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>New Booking</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <span>Process Payment</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Generate Invoice</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounting Tab */}
        <TabsContent value="accounting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Overview
                </CardTitle>
                <CardDescription>Financial performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Revenue</span>
                    <span className="text-lg font-bold">${crmData.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Revenue</span>
                    <span className="text-lg font-bold">${crmData.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Booking Value</span>
                    <span className="text-lg font-bold">${crmData.averageBookingValue.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Revenue Growth</span>
                      <span className="text-green-600">+{crmData.revenueGrowth}%</span>
                    </div>
                    <Progress value={crmData.revenueGrowth} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Status
                </CardTitle>
                <CardDescription>Payment tracking and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Paid Bookings</span>
                    <span className="text-lg font-bold text-green-600">76</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pending Payments</span>
                    <span className="text-lg font-bold text-yellow-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overdue Payments</span>
                    <span className="text-lg font-bold text-red-600">2</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Payment Success Rate</span>
                      <span className="text-green-600">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Download detailed financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center gap-2"
                  onClick={() => handleDownloadReport("revenue")}
                >
                  <Receipt className="h-6 w-6" />
                  <span>Revenue Report</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center gap-2"
                  onClick={() => handleDownloadReport("expenses")}
                >
                  <Calculator className="h-6 w-6" />
                  <span>Expense Report</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center gap-2"
                  onClick={() => handleDownloadReport("profit-loss")}
                >
                  <BarChart className="h-6 w-6" />
                  <span>Profit & Loss</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((data, index) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{data.month}</span>
                        <span className="font-medium">${data.revenue.toLocaleString()}</span>
                      </div>
                      <Progress value={(data.revenue / 4200) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Booking Analytics
                </CardTitle>
                <CardDescription>Booking performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{bookingAnalytics.completedBookings}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{bookingAnalytics.pendingBookings}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{bookingAnalytics.cancelledBookings}</p>
                      <p className="text-sm text-muted-foreground">Cancelled</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{bookingAnalytics.totalBookings}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Stadiums */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Popular Stadiums
              </CardTitle>
              <CardDescription>Most booked facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingAnalytics.popularStadiums.map((stadium, index) => (
                  <div key={stadium.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{stadium.name}</span>
                      <span className="font-medium">{stadium.bookings} bookings</span>
                    </div>
                    <Progress value={(stadium.bookings / 25) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Peak Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Peak Hours
              </CardTitle>
              <CardDescription>Most popular booking times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bookingAnalytics.peakHours.map((hour, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">{hour}</p>
                    <p className="text-sm text-muted-foreground">Peak Time</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Satisfaction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Customer Satisfaction
              </CardTitle>
              <CardDescription>Overall customer satisfaction rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-primary">{crmData.customerSatisfaction}/5</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-6 w-6",
                        i < Math.floor(crmData.customerSatisfaction) ? "text-yellow-400 fill-current" : "text-gray-300"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Based on 156 customer reviews</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download comprehensive business reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => handleDownloadReport("comprehensive")}
            >
              <FileText className="h-6 w-6" />
              <span>Comprehensive Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => handleDownloadReport("customer")}
            >
              <Users className="h-6 w-6" />
              <span>Customer Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => handleDownloadReport("booking")}
            >
              <Calendar className="h-6 w-6" />
              <span>Booking Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => handleDownloadReport("financial")}
            >
              <DollarSign className="h-6 w-6" />
              <span>Financial Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

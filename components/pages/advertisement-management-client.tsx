"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Megaphone, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Share2, 
  Calendar, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe,
  Target,
  Users,
  MapPin,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { toast } from "sonner"

interface Advertisement {
  id: string
  title: string
  description: string
  type: 'banner' | 'video' | 'social'
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'paused'
  media: string
  text?: string
  targetAudience: string
  budget: number
  duration: number // days
  startDate: string
  endDate: string
  locations: string[]
  impressions: number
  clicks: number
  ctr: number // click-through rate
  cost: number
  createdAt: string
  approvedAt?: string
}

interface AdPlacement {
  id: string
  name: string
  type: 'banner' | 'video' | 'social'
  location: string
  size: string
  price: number
  description: string
  preview: string
}

export function AdvertisementManagementClient({ locale, username }: { locale: string; username: string }) {
  const t = getClientTranslation(locale as any)
  
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: "1",
      title: "Elite Sports Academy - Training Programs",
      description: "Promote our comprehensive training programs for all age groups",
      type: "banner",
      status: "active",
      media: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=728&h=90&fit=crop",
      text: "Join Elite Sports Academy - Train with Champions",
      targetAudience: "Sports enthusiasts, parents, young athletes",
      budget: 500,
      duration: 30,
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      locations: ["Homepage Banner", "Tournament Pages"],
      impressions: 12500,
      clicks: 187,
      ctr: 1.5,
      cost: 245.50,
      createdAt: "2023-12-15",
      approvedAt: "2023-12-20"
    },
    {
      id: "2",
      title: "Summer Camp Registration - Video Ad",
      description: "Video advertisement for summer sports camp registration",
      type: "video",
      status: "pending",
      media: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1280&h=720&fit=crop",
      targetAudience: "Parents of children aged 6-16",
      budget: 800,
      duration: 45,
      startDate: "2024-02-01",
      endDate: "2024-03-17",
      locations: ["Video Player", "Social Media"],
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cost: 0,
      createdAt: "2024-01-10"
    },
    {
      id: "3",
      title: "Academy Merchandise - Social Media",
      description: "Social media campaign for academy merchandise and apparel",
      type: "social",
      status: "approved",
      media: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1080&h=1080&fit=crop",
      text: "Show your academy pride! Get official merchandise now",
      targetAudience: "Academy members, alumni, supporters",
      budget: 300,
      duration: 21,
      startDate: "2024-01-15",
      endDate: "2024-02-05",
      locations: ["Instagram", "Facebook", "Twitter"],
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cost: 0,
      createdAt: "2024-01-12",
      approvedAt: "2024-01-14"
    }
  ])

  const [adPlacements] = useState<AdPlacement[]>([
    {
      id: "1",
      name: "Homepage Banner",
      type: "banner",
      location: "Top of homepage",
      size: "728x90",
      price: 50,
      description: "Premium banner placement on main homepage",
      preview: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=728&h=90&fit=crop"
    },
    {
      id: "2",
      name: "Video Player Overlay",
      type: "video",
      location: "Video player overlay",
      size: "1280x720",
      price: 100,
      description: "Overlay advertisement on video content",
      preview: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1280&h=720&fit=crop"
    },
    {
      id: "3",
      name: "Social Media Feed",
      type: "social",
      location: "Social media platforms",
      size: "1080x1080",
      price: 75,
      description: "Sponsored posts on social media feeds",
      preview: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1080&h=1080&fit=crop"
    },
    {
      id: "4",
      name: "Tournament Pages",
      type: "banner",
      location: "Tournament listing pages",
      size: "300x250",
      price: 30,
      description: "Sidebar banner on tournament pages",
      preview: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=250&fit=crop"
    }
  ])

  const [showRequestAd, setShowRequestAd] = useState(false)
  const [showPlacementPreview, setShowPlacementPreview] = useState(false)
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const [adForm, setAdForm] = useState({
    title: "",
    description: "",
    type: "banner",
    text: "",
    targetAudience: "",
    budget: "",
    duration: "",
    startDate: "",
    endDate: "",
    media: null as File | null,
    locations: [] as string[]
  })

  const handleRequestAdvertisement = () => {
    if (!adForm.title || !adForm.description || !adForm.budget || !adForm.duration) {
      toast.error("Please fill in all required fields")
      return
    }

    const newAd: Advertisement = {
      id: Date.now().toString(),
      title: adForm.title,
      description: adForm.description,
      type: adForm.type as any,
      status: "pending",
      media: adForm.media ? URL.createObjectURL(adForm.media) : "",
      text: adForm.text,
      targetAudience: adForm.targetAudience,
      budget: parseFloat(adForm.budget),
      duration: parseInt(adForm.duration),
      startDate: adForm.startDate,
      endDate: adForm.endDate,
      locations: adForm.locations,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cost: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setAdvertisements([newAd, ...advertisements])
    setAdForm({
      title: "",
      description: "",
      type: "banner",
      text: "",
      targetAudience: "",
      budget: "",
      duration: "",
      startDate: "",
      endDate: "",
      media: null,
      locations: []
    })
    setShowRequestAd(false)
    toast.success("Advertisement request submitted for admin approval!")
  }

  const handleDeleteAd = (adId: string) => {
    setAdvertisements(advertisements.filter(ad => ad.id !== adId))
    toast.success("Advertisement deleted successfully!")
  }

  const handleViewPlacement = (ad: Advertisement) => {
    setSelectedAd(ad)
    setShowPlacementPreview(true)
  }

  const filteredAds = advertisements.filter(ad => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return ad.status === "pending"
    if (activeTab === "active") return ad.status === "active"
    if (activeTab === "approved") return ad.status === "approved"
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-blue-100 text-blue-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'paused': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <AlertCircle className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      case 'paused': return <Clock className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'banner': return <ImageIcon className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'social': return <Share2 className="h-4 w-4" />
      default: return <Megaphone className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Advertisement Management</h1>
          <p className="text-muted-foreground">Request and manage your advertisements</p>
        </div>
        <Dialog open={showRequestAd} onOpenChange={setShowRequestAd}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Request Advertisement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Request New Advertisement</DialogTitle>
              <DialogDescription>
                Submit an advertisement request for admin approval
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Advertisement Title"
                value={adForm.title}
                onChange={(e) => setAdForm({...adForm, title: e.target.value})}
                label="Title"
                required
              />
              
              <Textarea
                placeholder="Advertisement description..."
                value={adForm.description}
                onChange={(e) => setAdForm({...adForm, description: e.target.value})}
                label="Description"
                rows={3}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Select value={adForm.type} onValueChange={(value) => setAdForm({...adForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ad Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banner">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Banner Advertisement
                      </div>
                    </SelectItem>
                    <SelectItem value="video">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Video Advertisement
                      </div>
                    </SelectItem>
                    <SelectItem value="social">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Social Media Ad
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  placeholder="Target Audience"
                  value={adForm.targetAudience}
                  onChange={(e) => setAdForm({...adForm, targetAudience: e.target.value})}
                  label="Target Audience"
                />
              </div>
              
              {adForm.type === 'banner' && (
                <Input
                  placeholder="Banner text content"
                  value={adForm.text}
                  onChange={(e) => setAdForm({...adForm, text: e.target.value})}
                  label="Banner Text"
                />
              )}
              
              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="number"
                  placeholder="500"
                  value={adForm.budget}
                  onChange={(e) => setAdForm({...adForm, budget: e.target.value})}
                  label="Budget ($)"
                  required
                />
                <Input
                  type="number"
                  placeholder="30"
                  value={adForm.duration}
                  onChange={(e) => setAdForm({...adForm, duration: e.target.value})}
                  label="Duration (days)"
                  required
                />
                <Input
                  type="date"
                  value={adForm.startDate}
                  onChange={(e) => setAdForm({...adForm, startDate: e.target.value})}
                  label="Start Date"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Media Upload</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  {adForm.type === 'video' ? (
                    <Video className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  ) : (
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    {adForm.media ? adForm.media.name : `Choose ${adForm.type} file`}
                  </p>
                  <input
                    type="file"
                    accept={adForm.type === 'video' ? 'video/*' : 'image/*'}
                    onChange={(e) => e.target.files?.[0] && setAdForm({...adForm, media: e.target.files[0]})}
                    className="hidden"
                    id="media-upload"
                  />
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('media-upload')?.click()}>
                    Choose File
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Ad Placements</label>
                <div className="grid grid-cols-2 gap-2">
                  {adPlacements.map((placement) => (
                    <div key={placement.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={placement.id}
                        checked={adForm.locations.includes(placement.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAdForm({...adForm, locations: [...adForm.locations, placement.name]})
                          } else {
                            setAdForm({...adForm, locations: adForm.locations.filter(loc => loc !== placement.name)})
                          }
                        }}
                      />
                      <label htmlFor={placement.id} className="text-sm">
                        {placement.name} (${placement.price})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowRequestAd(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRequestAdvertisement}>
                  Submit Request
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
                <p className="text-sm font-medium text-muted-foreground">Total Ads</p>
                <p className="text-2xl font-bold">{advertisements.length}</p>
              </div>
              <Megaphone className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Ads</p>
                <p className="text-2xl font-bold">{advertisements.filter(ad => ad.status === 'active').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Impressions</p>
                <p className="text-2xl font-bold">{advertisements.reduce((acc, ad) => acc + ad.impressions, 0).toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${advertisements.reduce((acc, ad) => acc + ad.cost, 0).toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advertisement Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Ads ({advertisements.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({advertisements.filter(ad => ad.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="active">Active ({advertisements.filter(ad => ad.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({advertisements.filter(ad => ad.status === 'approved').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  {ad.media ? (
                    <img 
                      src={ad.media} 
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {getTypeIcon(ad.type)}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className={getStatusColor(ad.status)}>
                      {getStatusIcon(ad.status)}
                      <span className="ml-1">{ad.status}</span>
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className="bg-black/50 text-white">
                      {getTypeIcon(ad.type)}
                      <span className="ml-1">{ad.type}</span>
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{ad.title}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewPlacement(ad)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteAd(ad.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{ad.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span>${ad.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{ad.duration} days</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Impressions:</span>
                      <span className="font-medium">{ad.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Clicks:</span>
                      <span className="font-medium">{ad.clicks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>CTR:</span>
                      <span className="font-medium">{ad.ctr}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost:</span>
                      <span className="font-medium text-green-600">${ad.cost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {ad.locations.map((location, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {location}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisements.filter(ad => ad.status === 'pending').map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  {ad.media ? (
                    <img 
                      src={ad.media} 
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {getTypeIcon(ad.type)}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="ml-1">Pending</span>
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="truncate">{ad.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{ad.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>Submitted: {new Date(ad.createdAt).toLocaleDateString()}</p>
                    <p>Budget: ${ad.budget}</p>
                    <p>Duration: {ad.duration} days</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisements.filter(ad => ad.status === 'active').map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  {ad.media ? (
                    <img 
                      src={ad.media} 
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {getTypeIcon(ad.type)}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="ml-1">Active</span>
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="truncate">{ad.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{ad.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Impressions:</span>
                      <span className="font-medium">{ad.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Clicks:</span>
                      <span className="font-medium">{ad.clicks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>CTR:</span>
                      <span className="font-medium">{ad.ctr}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisements.filter(ad => ad.status === 'approved').map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  {ad.media ? (
                    <img 
                      src={ad.media} 
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {getTypeIcon(ad.type)}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="ml-1">Approved</span>
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="truncate">{ad.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{ad.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>Approved: {ad.approvedAt ? new Date(ad.approvedAt).toLocaleDateString() : 'N/A'}</p>
                    <p>Start Date: {new Date(ad.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(ad.endDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Placement Preview Dialog */}
      <Dialog open={showPlacementPreview} onOpenChange={setShowPlacementPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Advertisement Placement Preview</DialogTitle>
            <DialogDescription>
              Preview how your advertisement will appear in different locations
            </DialogDescription>
          </DialogHeader>
          {selectedAd && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedAd.locations.map((location, index) => {
                  const placement = adPlacements.find(p => p.name === location)
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {location}
                        </CardTitle>
                        <CardDescription>{placement?.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4 bg-muted/50">
                            <div className="text-center text-sm text-muted-foreground mb-2">
                              Preview: {placement?.size}
                            </div>
                            <div className="relative">
                              {selectedAd.media ? (
                                <img 
                                  src={selectedAd.media} 
                                  alt={selectedAd.title}
                                  className="w-full h-auto rounded"
                                />
                              ) : (
                                <div className="aspect-video bg-muted rounded flex items-center justify-center">
                                  {getTypeIcon(selectedAd.type)}
                                </div>
                              )}
                              {selectedAd.text && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                                  {selectedAd.text}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Price:</span>
                              <span className="ml-2">${placement?.price}</span>
                            </div>
                            <div>
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{placement?.type}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPlacementPreview(false)}>
                  Close
                </Button>
                <Button onClick={() => toast.info("Edit placement feature coming soon!")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Placement
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

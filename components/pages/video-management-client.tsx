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
  PlayCircle, 
  Upload, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Globe, 
  Lock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Heart, 
  BarChart3,
  Download,
  Share2,
  Settings,
  Video,
  Image as ImageIcon,
  Tag,
  Calendar,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { toast } from "sonner"

interface Video {
  id: string
  title: string
  description: string
  type: 'public' | 'private'
  thumbnail: string
  videoUrl: string
  tags: string[]
  uploadDate: string
  duration: string
  views: number
  likes: number
  revenue: number
  status: 'uploading' | 'processing' | 'ready' | 'error'
  uploadProgress: number
}

interface Analytics {
  views: number
  likes: number
  revenue: number
  engagement: number
  topCountries: { country: string; views: number }[]
  demographics: { age: string; percentage: number }[]
}

export function VideoManagementClient({ locale, username }: { locale: string; username: string }) {
  const t = getClientTranslation(locale as any)
  
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "Academy Training Session Highlights",
      description: "Best moments from our weekly training session featuring advanced techniques and drills.",
      type: "public",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
      videoUrl: "/videos/training-highlights.mp4",
      tags: ["training", "football", "techniques", "academy"],
      uploadDate: "2024-01-15",
      duration: "5:32",
      views: 1247,
      likes: 87,
      revenue: 12.50,
      status: "ready",
      uploadProgress: 100
    },
    {
      id: "2",
      title: "Player Development Program",
      description: "Exclusive content for agents and scouts showing our player development methodology.",
      type: "private",
      thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=225&fit=crop",
      videoUrl: "/videos/player-development.mp4",
      tags: ["development", "scouts", "agents", "exclusive"],
      uploadDate: "2024-01-12",
      duration: "12:45",
      views: 89,
      likes: 23,
      revenue: 45.20,
      status: "ready",
      uploadProgress: 100
    },
    {
      id: "3",
      title: "Tournament Finals Highlights",
      description: "Championship match highlights from our annual tournament.",
      type: "public",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=225&fit=crop",
      videoUrl: "/videos/tournament-finals.mp4",
      tags: ["tournament", "championship", "highlights", "finals"],
      uploadDate: "2024-01-10",
      duration: "8:15",
      views: 2156,
      likes: 156,
      revenue: 28.75,
      status: "ready",
      uploadProgress: 100
    },
    {
      id: "4",
      title: "New Player Showcase",
      description: "Showcasing new talent for professional opportunities.",
      type: "private",
      thumbnail: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=225&fit=crop",
      videoUrl: "/videos/player-showcase.mp4",
      tags: ["showcase", "talent", "professional", "opportunities"],
      uploadDate: "2024-01-08",
      duration: "6:20",
      views: 45,
      likes: 12,
      revenue: 8.90,
      status: "ready",
      uploadProgress: 100
    }
  ])

  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    type: "public",
    tags: "",
    thumbnail: null as File | null,
    video: null as File | null
  })

  const [analytics] = useState<Analytics>({
    views: 3537,
    likes: 278,
    revenue: 95.35,
    engagement: 7.8,
    topCountries: [
      { country: "United States", views: 1200 },
      { country: "United Kingdom", views: 890 },
      { country: "Germany", views: 650 },
      { country: "Spain", views: 450 },
      { country: "France", views: 347 }
    ],
    demographics: [
      { age: "18-24", percentage: 35 },
      { age: "25-34", percentage: 28 },
      { age: "35-44", percentage: 22 },
      { age: "45-54", percentage: 15 }
    ]
  })

  const handleUploadVideo = () => {
    if (!uploadForm.title || !uploadForm.description || !uploadForm.video) {
      toast.error("Please fill in all required fields and select a video")
      return
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      title: uploadForm.title,
      description: uploadForm.description,
      type: uploadForm.type as 'public' | 'private',
      thumbnail: uploadForm.thumbnail ? URL.createObjectURL(uploadForm.thumbnail) : "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
      videoUrl: URL.createObjectURL(uploadForm.video),
      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      uploadDate: new Date().toISOString().split('T')[0],
      duration: "0:00",
      views: 0,
      likes: 0,
      revenue: 0,
      status: "uploading",
      uploadProgress: 0
    }

    setVideos([newVideo, ...videos])
    setUploadForm({
      title: "",
      description: "",
      type: "public",
      tags: "",
      thumbnail: null,
      video: null
    })
    setShowUploadDialog(false)
    toast.success("Video upload started!")

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setVideos(prev => prev.map(video => 
        video.id === newVideo.id 
          ? { ...video, uploadProgress: progress }
          : video
      ))
      
      if (progress >= 100) {
        clearInterval(interval)
        setVideos(prev => prev.map(video => 
          video.id === newVideo.id 
            ? { ...video, status: "ready", uploadProgress: 100 }
            : video
        ))
        toast.success("Video uploaded successfully!")
      }
    }, 200)
  }

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter(video => video.id !== videoId))
    toast.success("Video deleted successfully!")
  }

  const handleViewAnalytics = (video: Video) => {
    setSelectedVideo(video)
    setShowAnalytics(true)
  }

  const filteredVideos = videos.filter(video => {
    if (activeTab === "all") return true
    if (activeTab === "public") return video.type === "public"
    if (activeTab === "private") return video.type === "private"
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800'
      case 'uploading': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Video Management</h1>
          <p className="text-muted-foreground">Upload and manage your YouSport videos</p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Video</DialogTitle>
              <DialogDescription>
                Upload a video to YouSport platform with public or private access
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Video Title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                label="Video Title"
                required
              />
              
              <Textarea
                placeholder="Video description..."
                value={uploadForm.description}
                onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                label="Description"
                rows={3}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Select value={uploadForm.type} onValueChange={(value) => setUploadForm({...uploadForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Video Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Public - Visible on YouSport
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Private - Agents/Clubs Only
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  placeholder="tags, separated, by, commas"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm({...uploadForm, tags: e.target.value})}
                  label="Tags"
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Video File</label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Video className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploadForm.video ? uploadForm.video.name : "Choose video file"}
                    </p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => e.target.files?.[0] && setUploadForm({...uploadForm, video: e.target.files[0]})}
                      className="hidden"
                      id="video-upload"
                    />
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('video-upload')?.click()}>
                      Choose Video
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Thumbnail (Optional)</label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploadForm.thumbnail ? uploadForm.thumbnail.name : "Choose thumbnail image"}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && setUploadForm({...uploadForm, thumbnail: e.target.files[0]})}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('thumbnail-upload')?.click()}>
                      Choose Thumbnail
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUploadVideo}>
                  Upload Video
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
                <p className="text-sm font-medium text-muted-foreground">Total Videos</p>
                <p className="text-2xl font-bold">{videos.length}</p>
              </div>
              <Video className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{analytics.views.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${analytics.revenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">{analytics.engagement}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Videos ({videos.length})</TabsTrigger>
          <TabsTrigger value="public">Public ({videos.filter(v => v.type === 'public').length})</TabsTrigger>
          <TabsTrigger value="private">Private ({videos.filter(v => v.type === 'private').length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant={video.type === 'public' ? 'default' : 'secondary'}>
                      {video.type === 'public' ? (
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
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className="bg-black/50 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  {video.status === 'uploading' && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                      <Progress value={video.uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{video.title}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewAnalytics(video)}>
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteVideo(video.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-primary" />
                        <span>{video.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{video.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>${video.revenue.toFixed(2)}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(video.status)}>
                      {video.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {video.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="public" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.filter(video => video.type === 'public').map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="default">
                      <Globe className="h-3 w-3 mr-1" />
                      Public
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="truncate">{video.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-primary" />
                        <span>{video.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(video.status)}>
                      {video.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="private" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.filter(video => video.type === 'private').map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">
                      <Lock className="h-3 w-3 mr-1" />
                      Private
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="truncate">{video.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-primary" />
                        <span>{video.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>${video.revenue.toFixed(2)}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(video.status)}>
                      {video.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Views by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{country.country}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(country.views / analytics.topCountries[0].views) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{country.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>Viewer age distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.demographics.map((demo, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{demo.age}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${demo.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{demo.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Video Analytics</DialogTitle>
            <DialogDescription>
              Detailed analytics for {selectedVideo?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{selectedVideo.views.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{selectedVideo.likes}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">${selectedVideo.revenue.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Engagement Rate</span>
                  <span className="text-lg font-bold">{analytics.engagement}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Video Type</span>
                  <Badge variant={selectedVideo.type === 'public' ? 'default' : 'secondary'}>
                    {selectedVideo.type === 'public' ? 'Public' : 'Private'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Upload Date</span>
                  <span>{new Date(selectedVideo.uploadDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Duration</span>
                  <span>{selectedVideo.duration}</span>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAnalytics(false)}>
                  Close
                </Button>
                <Button onClick={() => toast.info("Export analytics feature coming soon!")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

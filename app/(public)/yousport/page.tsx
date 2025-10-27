"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { videos } from "@/data/videos";
import { VideoPlayer } from "@/components/video-player";
import { VideoCard } from "@/components/video-card";
import { LiveStreamCard } from "@/components/live-stream-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Play,
  TrendingUp,
  Clock,
  Star,
  Shield,
  DollarSign,
  BarChart3,
  Users,
  X,
  Grid3X3,
  List,
  SortAsc,
  Radio,
  Wifi,
  Eye,
  Heart,
  MessageCircle,
  Zap,
  Crown,
  Flame,
} from "lucide-react";

export default function YouSportPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [requestAccessOpen, setRequestAccessOpen] = useState(false);
  const [accessEmail, setAccessEmail] = useState("");
  const [accessOrg, setAccessOrg] = useState("");
  const [accessSent, setAccessSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSport, setSelectedSport] = useState("all");
  const [sortBy, setSortBy] = useState("trending");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const currentVideo = videos.find((v) => v.id === selectedVideo);

  // Separate videos by type
  const liveStreams = videos.filter((v) => v.isLive);
  const publicVideos = videos.filter((v) => v.public && !v.isLive);
  const privateVideos = videos.filter((v) => !v.public && !v.isLive);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(videos.map((v) => v.category))];
    return cats;
  }, []);

  // Extract sports from tags
  const sports = useMemo(() => {
    const sportsList = videos.flatMap((v) => 
      v.tags.filter(tag => 
        ["football", "basketball", "tennis", "swimming", "volleyball", "rugby", "baseball", "soccer"].includes(tag.toLowerCase())
      )
    );
    return [...new Set(sportsList)];
  }, []);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = videos;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (video) => video.category === selectedCategory
      );
    }

    // Filter by sport
    if (selectedSport !== "all") {
      filtered = filtered.filter((video) =>
        video.tags.some((tag) => tag.toLowerCase() === selectedSport.toLowerCase())
      );
    }

    // Sort videos
    switch (sortBy) {
      case "trending":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        );
        break;
      case "likes":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "duration":
        filtered.sort((a, b) => {
          const aDuration = parseInt(a.duration.replace(":", ""));
          const bDuration = parseInt(b.duration.replace(":", ""));
          return bDuration - aDuration;
        });
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedSport, sortBy]);

  const liveFilteredStreams = filteredVideos.filter((v) => v.isLive);
  const publicFilteredVideos = filteredVideos.filter(
    (v) => v.public && !v.isLive
  );
  const privateFilteredVideos = filteredVideos.filter(
    (v) => !v.public && !v.isLive
  );

  function handleAccessSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAccessSent(true);
    setTimeout(() => {
      setRequestAccessOpen(false);
      setAccessSent(false);
      setAccessEmail("");
      setAccessOrg("");
    }, 2000);
  }

  function handlePlayVideo(videoId: string) {
    setSelectedVideo(videoId);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 overflow-hidden">
        {/* Dotted Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Noise Texture
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
         */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Live Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold mb-6"
            >
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
              LIVE STREAMING NOW
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 leading-tight font-serif">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                YouSport
              </span>
              <br />
              <span className="text-foreground">Live</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience sports like never before. Watch live matches, exclusive
              training sessions, and behind-the-scenes content from the world's
              top athletes.
            </p>

            {/* Live Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border">
                <Radio className="h-5 w-5 text-primary" />
                <span className="text-foreground font-semibold">
                  12 Live Streams
                </span>
              </div>
              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border">
                <Users className="h-5 w-5 text-secondary" />
                <span className="text-foreground font-semibold">
                  2.5M+ Viewers
                </span>
              </div>
              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border">
                <Crown className="h-5 w-5 text-accent" />
                <span className="text-foreground font-semibold">
                  Premium Content
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-bold rounded-full"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Live Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted px-8 py-4 text-lg font-bold rounded-full"
              >
                <Crown className="h-5 w-5 mr-2" />
                Get Premium
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="sticky top-[65px] z-40 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search live streams, creators, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 rounded-full h-12"
              />
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-semibold">
                {liveFilteredStreams.length} Live Now
              </span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sport Filter */}
              <Select
                value={selectedSport}
                onValueChange={setSelectedSport}
              >
                <SelectTrigger className="w-40 bg-card/50 border-border text-foreground rounded-full h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sport Type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-foreground">
                    All Sports
                  </SelectItem>
                  {sports.map((sport) => (
                    <SelectItem
                      key={sport}
                      value={sport}
                      className="text-foreground"
                    >
                      {sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40 bg-card/50 border-border text-foreground rounded-full h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-foreground">
                    All Categories
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-foreground"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 bg-card/50 border-border text-foreground rounded-full h-12">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="trending" className="text-foreground">
                    <TrendingUp className="h-4 w-4 mr-2 inline" />
                    Trending
                  </SelectItem>
                  <SelectItem value="newest" className="text-foreground">
                    <Clock className="h-4 w-4 mr-2 inline" />
                    Newest
                  </SelectItem>
                  <SelectItem value="likes" className="text-foreground">
                    <Heart className="h-4 w-4 mr-2 inline" />
                    Most Liked
                  </SelectItem>
                  <SelectItem value="views" className="text-foreground">
                    <Eye className="h-4 w-4 mr-2 inline" />
                    Most Viewed
                  </SelectItem>
                  <SelectItem value="duration" className="text-foreground">
                    <Clock className="h-4 w-4 mr-2 inline" />
                    Longest
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex items-center bg-card/50 border border-border rounded-full p-1">
                {/* Sliding Background */}
                <motion.div
                  className="absolute bg-primary rounded-full h-10 w-10"
                  animate={{
                    x: viewMode === "grid" ? 0 : 40,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />

                <button
                  onClick={() => setViewMode("grid")}
                  className={`relative z-10 rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-200 ${
                    viewMode === "grid"
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`relative z-10 rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-200 ${
                    viewMode === "list"
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Streams Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                <h2 className="text-3xl md:text-4xl font-black text-foreground font-mono tracking-wide font-extralight">
                  Live Now
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary text-sm font-bold font-serif">
                  {liveFilteredStreams.length} STREAMING
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl font-serif">
              Watch live sports action, exclusive training sessions, and
              behind-the-scenes content happening right now.
            </p>
          </motion.div>

          {liveFilteredStreams.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {liveFilteredStreams.map((stream, index) => (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <LiveStreamCard
                    className=""
                    stream={stream}
                    onPlay={handlePlayVideo}
                    onRequestAccess={() => setRequestAccessOpen(true)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground">
                <Radio className="h-16 w-16 mx-auto mb-6 opacity-50" />
                <p className="text-xl mb-2 font-serif">No live streams at the moment</p>
                <p className="text-sm font-serif">Check back later for live content</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Public Videos Section */}
      <section className="relative z-10 py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-secondary to-accent rounded-full" />
                <h2 className="text-3xl md:text-4xl font-black text-foreground font-mono tracking-wide font-extralight">
                  Highlights & VODs
                </h2>
              </div>
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 font-serif">
                Free to Watch
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl font-serif">
              Catch up on the best moments, training videos, and community
              highlights from our archive.
            </p>
          </motion.div>

          {publicFilteredVideos.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 max-w-4xl"
              }`}
            >
              {publicFilteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <VideoCard
                    video={video}
                    onPlay={handlePlayVideo}
                    size={viewMode === "list" ? "large" : "medium"}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground">
                <Play className="h-16 w-16 mx-auto mb-6 opacity-50" />
                <p className="text-xl mb-2 font-serif">No videos found</p>
                <p className="text-sm font-serif">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Exclusive Content Section */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-muted/50 to-background/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-accent to-secondary rounded-full" />
                <h2 className="text-3xl md:text-4xl font-black text-foreground font-mono tracking-wide font-extralight">
                  Premium Content
                </h2>
              </div>
              <Badge className="bg-secondary/20 text-secondary border-secondary/30 px-4 py-2 font-serif">
                <Crown className="h-4 w-4 mr-2" />
                Premium Only
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl font-serif">
              Unlock exclusive training sessions, behind-the-scenes content, and
              premium interviews with top athletes.
            </p>
          </motion.div>

          {privateFilteredVideos.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 max-w-4xl"
              }`}
            >
              {privateFilteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <VideoCard
                    video={video}
                    onPlay={handlePlayVideo}
                    onRequestAccess={() => setRequestAccessOpen(true)}
                    size={viewMode === "list" ? "large" : "medium"}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground">
                <Crown className="h-16 w-16 mx-auto mb-6 opacity-50" />
                <p className="text-xl mb-2 font-serif">No premium content found</p>
                <p className="text-sm font-serif">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl tracking-tight mb-4 font-mono tracking-wide font-extralight">
            How YouSport Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-serif">
            Discover how creators earn revenue and access detailed analytics
            through our platform.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Revenue Sharing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-serif">
                  Creators earn 70% of ad revenue and subscription fees. Premium
                  content generates higher payouts with transparent analytics
                  and monthly payouts.
                </CardDescription>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm font-medium text-primary font-serif">
                    Current Payout Rate
                  </div>
                  <div className="text-2xl font-bold text-primary font-serif">70%</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Private Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-serif">
                  Access detailed performance metrics including view counts,
                  engagement rates, revenue tracking, and audience demographics
                  for your content.
                </CardDescription>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-serif">Views</span>
                    <span className="font-medium font-serif">12.5k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-serif">Engagement</span>
                    <span className="font-medium font-serif">8.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-serif">Revenue</span>
                    <span className="font-medium font-serif">$245</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Growth Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-serif">
                  Leverage our platform's promotion tools, cross-platform
                  sharing, and community features to grow your audience and
                  maximize earnings.
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-serif">Auto-promotion</Badge>
                  <Badge variant="secondary" className="font-serif">Social sharing</Badge>
                  <Badge variant="secondary" className="font-serif">Community</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Video Player Modal */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="max-w-6xl p-0">
          {currentVideo && currentVideo.src && (
            <VideoPlayer
              video={currentVideo}
              onClose={() => setSelectedVideo(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Request Access Modal */}
      <Dialog open={requestAccessOpen} onOpenChange={setRequestAccessOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Request Premium Access
            </DialogTitle>
          </DialogHeader>
          {accessSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Request Submitted!
              </h3>
              <p className="text-sm text-muted-foreground">
                We'll review your request and get back to you within 2 business
                days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAccessSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={accessEmail}
                  onChange={(e) => setAccessEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Organization/Team
                </label>
                <Input
                  type="text"
                  placeholder="Your organization name"
                  value={accessOrg}
                  onChange={(e) => setAccessOrg(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Goals (Optional)
                </label>
                <Textarea
                  placeholder="Tell us about your content creation goals..."
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                <Crown className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

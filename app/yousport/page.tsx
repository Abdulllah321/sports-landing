"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { videos } from "@/data/videos";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Lock,
  Play,
  Clock,
  Eye,
  DollarSign,
  BarChart3,
  Users,
  TrendingUp,
  Shield,
  Star,
  X,
} from "lucide-react";

export default function YouSportPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [requestAccessOpen, setRequestAccessOpen] = useState(false);
  const [accessEmail, setAccessEmail] = useState("");
  const [accessOrg, setAccessOrg] = useState("");
  const [accessSent, setAccessSent] = useState(false);

  const current = videos.find((v) => v.id === open);
  const publicVideos = videos.filter((v) => v.public);
  const privateVideos = videos.filter((v) => !v.public);

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

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4">
              YouSport Channel
            </Badge>
            <h1 className="text-pretty font-serif tracking-tight text-4xl md:text-6xl">
              Sports Content Revolution
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Watch highlights, access exclusive content, and discover how
              creators earn through our revenue-sharing platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Public Videos Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 rounded bg-primary" />
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
              Public Highlights
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Free access to the best sports moments, training tips, and community
            highlights.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publicVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => setOpen(video.id)}
                >
                  <img
                    src={`https://picsum.photos/400/225?random=${
                      video.id === "v1" ? "1" : "2"
                    }`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all group-hover:bg-white/30 group-hover:scale-110">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>2:30</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-green-500/20 text-green-700 dark:text-green-400"
                    >
                      Free
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{video.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        1.2k views
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        4.8 rating
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:opacity-95"
                    onClick={() => setOpen(video.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Private/Paid Section */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 rounded bg-accent" />
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
                Exclusive Content
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Premium training sessions, behind-the-scenes content, and
              exclusive interviews with top athletes.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {privateVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <Lock className="h-8 w-8 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-500">Premium Content</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className="bg-accent/20 text-accent"
                      >
                        Premium
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {video.title}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Shield className="h-4 w-4" />
                          Exclusive
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          Revenue Share
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setRequestAccessOpen(true)}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Request Access
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">
            How YouSport Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                  <CardTitle>Revenue Sharing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Creators earn 70% of ad revenue and subscription fees. Premium
                  content generates higher payouts with transparent analytics
                  and monthly payouts.
                </CardDescription>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm font-medium text-primary">
                    Current Payout Rate
                  </div>
                  <div className="text-2xl font-bold text-primary">70%</div>
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
                  <div className="p-3 rounded-lg bg-accent/10">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Private Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access detailed performance metrics including view counts,
                  engagement rates, revenue tracking, and audience demographics
                  for your content.
                </CardDescription>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Views</span>
                    <span className="font-medium">12.5k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Engagement</span>
                    <span className="font-medium">8.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Revenue</span>
                    <span className="font-medium">$245</span>
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
                  <CardTitle>Growth Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Leverage our platform's promotion tools, cross-platform
                  sharing, and community features to grow your audience and
                  maximize earnings.
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Auto-promotion</Badge>
                  <Badge variant="secondary">Social sharing</Badge>
                  <Badge variant="secondary">Community</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Video Player Modal */}
      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{current?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video overflow-hidden rounded-lg">
            <video controls className="h-full w-full">
              <source src={current?.src} type="video/mp4" />
            </video>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Access Modal */}
      <Dialog open={requestAccessOpen} onOpenChange={setRequestAccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Premium Access</DialogTitle>
          </DialogHeader>
          {accessSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Request Submitted!</h3>
              <p className="text-sm text-muted-foreground">
                We'll review your request and get back to you within 2 business
                days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAccessSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={accessEmail}
                  onChange={(e) => setAccessEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Organization/Team name"
                  value={accessOrg}
                  onChange={(e) => setAccessOrg(e.target.value)}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tell us about your content creation goals..."
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:opacity-95"
              >
                <Shield className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

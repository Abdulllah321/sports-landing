"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Users,
  Wifi,
  WifiOff,
  Heart,
  Share2,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LiveStreamCardProps {
  stream: {
    id: string;
    title: string;
    src?: string;
    thumbnail?: string;
    duration: string;
    views: number;
    likes: number;
    category: string;
    creator: string;
    public: boolean;
    price?: number;
    isLive?: boolean;
    liveViewers?: number;
  };
  onPlay: (streamId: string) => void;
  onRequestAccess?: () => void;
  className?: string;
}

export function LiveStreamCard({
  className,
  stream,
  onPlay,
  onRequestAccess,
}: LiveStreamCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [viewerCount, setViewerCount] = useState(stream.liveViewers || 0);

  // Simulate live viewer count changes
  useEffect(() => {
    if (stream.isLive) {
      const interval = setInterval(() => {
        setViewerCount((prev) =>
          Math.max(0, prev + Math.floor(Math.random() * 10) - 5)
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [stream.isLive]);

  const formatViewers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-2xl border-0 bg-gradient-to-br from-card/90 to-muted/90 backdrop-blur-sm px-6">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          {/* Thumbnail */}
          <img
            src={
              stream.thumbnail ||
              `https://picsum.photos/400/225?random=${stream.id}`
            }
            alt={stream.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
          />

          {/* Live Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Live Indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="flex items-center gap-2 bg-primary px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
              <span className="text-primary-foreground text-xs font-bold">
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              <Users className="h-3 w-3" />
              <span>{formatViewers(viewerCount)} watching</span>
            </div>
          </div>

          {/* Creator Avatar */}
          <div className="absolute top-4 right-4">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stream.creator}`}
              />
              <AvatarFallback>{stream.creator.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="rounded-full bg-primary p-4 backdrop-blur-sm transition-all group-hover:bg-primary/90 group-hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-8 w-8 text-primary-foreground ml-1" />
            </motion.div>
          </div>

          {/* Hover Actions */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30"
                >
                  <Share2 className="h-4 w-4 text-white" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30"
                >
                  <MessageCircle className="h-4 w-4 text-white" />
                </Button>
              </div>

              {stream.public ? (
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
                  onClick={() => onPlay(stream.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Join Live
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={onRequestAccess}
                >
                  <Wifi className="h-4 w-4 mr-2" />
                  Unlock Live
                </Button>
              )}
            </motion.div>
          )}

          {/* Price Badge for Premium */}
          {!stream.public && (
            <div className="absolute top-4 right-16">
              <Badge className="bg-yellow-500/90 text-black font-bold">
                ${stream.price}
              </Badge>
            </div>
          )}
        </div>

        {/* Stream Info */}
        <CardContent className="p-1 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {stream.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {stream.creator}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {stream.category}
                </span>
              </div>
            </div>
          </div>

          {/* Live Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {formatViewers(viewerCount)} watching
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {formatViewers(stream.likes)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Wifi className="h-3 w-3" />
              <span>Live</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

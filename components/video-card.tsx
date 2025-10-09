"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Eye, Heart, Lock, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
  video: {
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
  };
  onPlay: (videoId: string) => void;
  onRequestAccess?: () => void;
  size?: "small" | "medium" | "large";
}

export function VideoCard({
  video,
  onPlay,
  onRequestAccess,
  size = "medium",
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "aspect-video";
      case "large":
        return "aspect-video";
      default:
        return "aspect-video";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl border-0 !bg-muted pt-0">
        <div
          className={`relative ${getSizeClasses()} overflow-hidden`}
          onClick={() =>
            video.public ? onPlay(video.id) : onRequestAccess?.()
          }
        >
          {/* Thumbnail */}
          <img
            src={
              video.thumbnail ||
              `https://picsum.photos/400/225?random=${video.id}`
            }
            alt={video.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all group-hover:bg-white/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {video.public ? (
                <Play className="h-6 w-6 text-white ml-1" />
              ) : (
                <Lock className="h-6 w-6 text-white" />
              )}
            </motion.div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
              <Clock className="h-3 w-3" />
              <span>{video.duration}</span>
            </div>
          </div>

          {/* Category/Price Badge */}
          <div className="absolute top-4 right-4">
            {video.public ? (
              <Badge
                variant="secondary"
                className="bg-green-500/80 text-green-100 border-green-500/30"
              >
                Free
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-secondary/80 text-secondary-100 border-secondary/30"
              >
                <DollarSign className="h-3 w-3 mr-1" />
                {video.price}
              </Badge>
            )}
          </div>

          {/* Hover Overlay for Premium Content */}
          {!video.public && isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Lock className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Premium Content</p>
                <p className="text-xs opacity-80">Request access to unlock</p>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <CardContent className="p-3 space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatViews(video.views)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {formatViews(video.likes)}
            </span>
            <span>•</span>
            <span>{video.creator}</span>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {video.category}
            </Badge>

            {video.public ? (
              <Button
                size="sm"
                className="h-7 px-3 text-xs"
                onClick={() => onPlay(video.id)}
              >
                <Play className="h-3 w-3 mr-1" />
                Watch
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-xs"
                onClick={onRequestAccess}
              >
                <Lock className="h-3 w-3 mr-1" />
                Unlock
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

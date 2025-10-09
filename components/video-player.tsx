"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Heart,
  Share2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    src?: string;
    thumbnail?: string;
    duration: string;
    views: number;
    likes: number;
    creator: string;
    description: string;
    uploadDate: string;
    category: string;
    tags: string[];
  };
  onClose?: () => void;
  isFullscreen?: boolean;
}

export function VideoPlayer({
  video,
  onClose,
  isFullscreen = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div
      className={`relative bg-black ${
        isFullscreen ? "fixed inset-0 z-50" : "rounded-lg overflow-hidden"
      }`}
    >
      <div
        className="relative aspect-video w-full"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={video.src || ""}
          poster={video.thumbnail}
          className="w-full h-full object-cover"
          onClick={togglePlay}
        />

        {/* Video Overlay Controls */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                {video.category}
              </Badge>
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="text-white hover:bg-white/20"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {formatViews(video.likes)}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPlaybackRate(0.5)}>
                    0.5x
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPlaybackRate(1)}>
                    1x
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPlaybackRate(1.25)}>
                    1.25x
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPlaybackRate(1.5)}>
                    1.5x
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPlaybackRate(2)}>
                    2x
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              onClick={togglePlay}
              className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white ml-1" />
              )}
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div
                ref={progressRef}
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = progressRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  const clickX = e.clientX - rect.left;
                  const percentage = (clickX / rect.width) * 100;
                  handleSeek([percentage]);
                }}
              >
                <div
                  className="h-full bg-white rounded-full transition-all duration-200"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      {!isFullscreen && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>{video.uploadDate}</span>
              <span>•</span>
              <span>{video.creator}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {video.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

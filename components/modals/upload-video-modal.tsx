"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Upload, Eye, Lock, DollarSign, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"

const videoFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.string().min(1, "Please select video type"),
  tags: z.string().optional(),
  thumbnail: z.any().optional(),
  video: z.any().optional()
})

type VideoFormData = z.infer<typeof videoFormSchema>

interface UploadVideoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadVideoModal({ open, onOpenChange }: UploadVideoModalProps) {
  const { locale } = useLanguage()
  const t = getClientTranslation(locale as any)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      tags: "",
      thumbnail: null,
      video: null
    }
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form

  const onSubmit = async (data: VideoFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Video uploaded:', data)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVideoUpload = (file: File) => {
    setValue('video', file)
  }

  const handleThumbnailUpload = (file: File) => {
    setValue('thumbnail', file)
  }

  const videoType = watch('type')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            Upload Video to YouSport
          </DialogTitle>
          <DialogDescription>
            Upload videos to share with the community or keep private for agents and clubs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('title')}
              placeholder="Enter video title"
              label="Video Title"
              error={!!errors.title}
              errorMessage={errors.title?.message}
              required
            />
            
            <Select value={watch('type')} onValueChange={(value) => setValue('type', value)}>
              <SelectTrigger 
                error={!!errors.type} 
                required
                label="Video Type"
                errorMessage={errors.type?.message}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public Video</SelectItem>
                <SelectItem value="private">Private Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            {...register('description')}
            placeholder="Describe your video content"
            label="Description"
            error={!!errors.description}
            errorMessage={errors.description?.message}
            rows={4}
            required
          />

          <Input
            {...register('tags')}
            placeholder="Enter tags separated by commas"
            label="Tags"
            error={!!errors.tags}
            errorMessage={errors.tags?.message}
          />

          {/* Video Type Information */}
          {videoType && (
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                {videoType === 'public' ? (
                  <>
                    <Eye className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">Public Video</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-600">Private Video</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {videoType === 'public' 
                  ? "This video will be visible to everyone on YouSport and can generate revenue through views and engagement."
                  : "This video will only be accessible to registered agents and clubs. You can earn revenue from private views and analysis."
                }
              </p>
            </div>
          )}

          {/* Video Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Video File
            </label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {watch('video') ? watch('video').name : "Upload video file"}
              </p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files?.[0] && handleVideoUpload(e.target.files[0])}
                className="hidden"
                id="video-upload"
              />
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('video-upload')?.click()}>
                Choose Video
              </Button>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Thumbnail Image
            </label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {watch('thumbnail') ? watch('thumbnail').name : "Upload thumbnail image"}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleThumbnailUpload(e.target.files[0])}
                className="hidden"
                id="thumbnail-upload"
              />
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('thumbnail-upload')?.click()}>
                Choose Thumbnail
              </Button>
            </div>
          </div>

          {/* Revenue Information */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Revenue Potential</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Public videos can generate revenue through views, likes, and engagement. 
              Private videos earn revenue from agent and club access fees.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                'Upload Video'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

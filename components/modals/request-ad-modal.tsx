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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Upload, Image, Video, FileText, DollarSign, Eye, Target } from "lucide-react"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"

const adFormSchema = z.object({
  type: z.string().min(1, "Please select ad type"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  targetAudience: z.string().min(1, "Please select target audience"),
  duration: z.string().min(1, "Please select duration"),
  budget: z.string().min(1, "Please enter budget"),
  media: z.any().optional(),
  website: z.string().url("Please enter valid website URL").optional().or(z.literal("")),
  contactEmail: z.string().email("Please enter valid email")
})

type AdFormData = z.infer<typeof adFormSchema>

interface RequestAdModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RequestAdModal({ open, onOpenChange }: RequestAdModalProps) {
  const { locale } = useLanguage()
  const t = getClientTranslation(locale as any)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AdFormData>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      type: "",
      title: "",
      description: "",
      targetAudience: "",
      duration: "",
      budget: "",
      media: null,
      website: "",
      contactEmail: ""
    }
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form

  const onSubmit = async (data: AdFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Ad request submitted:', data)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMediaUpload = (file: File) => {
    setValue('media', file)
  }

  const adType = watch('type')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Request Advertisement
          </DialogTitle>
          <DialogDescription>
            Submit an advertisement request to reach your target audience on our platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select value={watch('type')} onValueChange={(value) => setValue('type', value)}>
              <SelectTrigger 
                error={!!errors.type} 
                required
                label="Advertisement Type"
                errorMessage={errors.type?.message}
              >
                <SelectValue placeholder="Select ad type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="banner">Banner Advertisement</SelectItem>
                <SelectItem value="video">Video Advertisement</SelectItem>
                <SelectItem value="social">Social Media Post</SelectItem>
                <SelectItem value="sponsored">Sponsored Content</SelectItem>
              </SelectContent>
            </Select>

            <Select value={watch('targetAudience')} onValueChange={(value) => setValue('targetAudience', value)}>
              <SelectTrigger 
                error={!!errors.targetAudience} 
                required
                label="Target Audience"
                errorMessage={errors.targetAudience?.message}
              >
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="players">Players Only</SelectItem>
                <SelectItem value="academies">Academies Only</SelectItem>
                <SelectItem value="agents">Agents & Clubs</SelectItem>
                <SelectItem value="parents">Parents & Families</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('title')}
              placeholder="Enter advertisement title"
              label="Advertisement Title"
              error={!!errors.title}
              errorMessage={errors.title?.message}
              required
            />
            
            <Input
              {...register('budget')}
              type="number"
              placeholder="Enter budget"
              label="Budget ($)"
              error={!!errors.budget}
              errorMessage={errors.budget?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select value={watch('duration')} onValueChange={(value) => setValue('duration', value)}>
              <SelectTrigger 
                error={!!errors.duration} 
                required
                label="Campaign Duration"
                errorMessage={errors.duration?.message}
              >
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-week">1 Week</SelectItem>
                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="3-months">3 Months</SelectItem>
                <SelectItem value="6-months">6 Months</SelectItem>
              </SelectContent>
            </Select>

            <Input
              {...register('contactEmail')}
              type="email"
              placeholder="Enter contact email"
              label="Contact Email"
              error={!!errors.contactEmail}
              errorMessage={errors.contactEmail?.message}
              required
            />
          </div>

          <Input
            {...register('website')}
            placeholder="Enter website URL (optional)"
            label="Website URL"
            error={!!errors.website}
            errorMessage={errors.website?.message}
          />

          <Textarea
            {...register('description')}
            placeholder="Describe your advertisement content and objectives"
            label="Description"
            error={!!errors.description}
            errorMessage={errors.description?.message}
            rows={4}
            required
          />

          {/* Media Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Advertisement Media
            </label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {watch('media') ? watch('media').name : "Upload advertisement media"}
              </p>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => e.target.files?.[0] && handleMediaUpload(e.target.files[0])}
                className="hidden"
                id="media-upload"
              />
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('media-upload')?.click()}>
                Choose Media
              </Button>
            </div>
          </div>

          {/* Ad Type Information */}
          {adType && (
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                {adType === 'banner' && <Image className="h-4 w-4 text-blue-600" />}
                {adType === 'video' && <Video className="h-4 w-4 text-purple-600" />}
                {adType === 'social' && <FileText className="h-4 w-4 text-green-600" />}
                {adType === 'sponsored' && <Target className="h-4 w-4 text-orange-600" />}
                <span className="font-medium capitalize">{adType} Advertisement</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {adType === 'banner' && "Static image advertisements displayed on platform pages"}
                {adType === 'video' && "Video advertisements for maximum engagement"}
                {adType === 'social' && "Social media style posts integrated into feeds"}
                {adType === 'sponsored' && "Sponsored content that appears as regular platform content"}
              </p>
            </div>
          )}

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Pricing Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="font-semibold">Banner Ads</div>
                  <div className="text-sm text-muted-foreground">$50-200/week</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="font-semibold">Video Ads</div>
                  <div className="text-sm text-muted-foreground">$100-500/week</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="font-semibold">Sponsored Content</div>
                  <div className="text-sm text-muted-foreground">$200-1000/week</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Request...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

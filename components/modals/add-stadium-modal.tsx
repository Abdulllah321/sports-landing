"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, MapPin, Users, Clock, DollarSign } from "lucide-react"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"

const stadiumFormSchema = z.object({
  name: z.string().min(2, "Stadium name must be at least 2 characters"),
  location: z.string().min(5, "Please enter valid location"),
  capacity: z.string().min(1, "Please enter capacity"),
  hourlyRate: z.string().min(1, "Please enter hourly rate"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  amenities: z.string().optional(),
  photos: z.array(z.any()).optional()
})

type StadiumFormData = z.infer<typeof stadiumFormSchema>

interface AddStadiumModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStadiumModal({ open, onOpenChange }: AddStadiumModalProps) {
  const { locale } = useLanguage()
  const t = getClientTranslation(locale as any)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<StadiumFormData>({
    resolver: zodResolver(stadiumFormSchema),
    defaultValues: {
      name: "",
      location: "",
      capacity: "",
      hourlyRate: "",
      description: "",
      amenities: "",
      photos: []
    }
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form

  const onSubmit = async (data: StadiumFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Stadium added:', data)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (files: FileList) => {
    const fileArray = Array.from(files)
    setValue('photos', fileArray)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Add New Stadium
          </DialogTitle>
          <DialogDescription>
            Add a new stadium or pitch to your academy. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('name')}
              placeholder="Enter stadium name"
              label="Stadium Name"
              error={!!errors.name}
              errorMessage={errors.name?.message}
              required
            />
            
            <Input
              {...register('location')}
              placeholder="Enter location"
              label="Location"
              error={!!errors.location}
              errorMessage={errors.location?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('capacity')}
              type="number"
              placeholder="Enter capacity"
              label="Capacity"
              error={!!errors.capacity}
              errorMessage={errors.capacity?.message}
              required
            />
            
            <Input
              {...register('hourlyRate')}
              type="number"
              placeholder="Enter hourly rate"
              label="Hourly Rate ($)"
              error={!!errors.hourlyRate}
              errorMessage={errors.hourlyRate?.message}
              required
            />
          </div>

          <Textarea
            {...register('description')}
            placeholder="Describe the stadium, its features, and playing conditions"
            label="Description"
            error={!!errors.description}
            errorMessage={errors.description?.message}
            rows={4}
            required
          />

          <Textarea
            {...register('amenities')}
            placeholder="List available amenities (parking, changing rooms, lighting, etc.)"
            label="Amenities"
            error={!!errors.amenities}
            errorMessage={errors.amenities?.message}
            rows={3}
          />

          {/* Photos Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Stadium Photos
            </label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {(() => {
                  const photos = watch('photos') || []
                  return photos.length > 0 
                    ? `${photos.length} files selected`
                    : "Upload stadium photos"
                })()}
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
                id="photos-upload"
              />
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('photos-upload')?.click()}>
                Choose Files
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Stadium...
                </>
              ) : (
                'Add Stadium'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

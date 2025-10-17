"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, User, Calendar, MapPin, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"

const playerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.string().min(1, "Please enter age"),
  position: z.string().min(1, "Please select a position"),
  contact: z.string().min(10, "Please enter valid contact"),
  email: z.string().email("Please enter valid email").optional().or(z.literal("")),
  address: z.string().min(5, "Please enter valid address"),
  emergencyContact: z.string().min(10, "Please enter emergency contact"),
  medicalInfo: z.string().optional(),
  photo: z.any().optional()
})

type PlayerFormData = z.infer<typeof playerFormSchema>

interface AddPlayerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddPlayerModal({ open, onOpenChange }: AddPlayerModalProps) {
  const { locale } = useLanguage()
  const t = getClientTranslation(locale as any)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PlayerFormData>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: "",
      age: "",
      position: "",
      contact: "",
      email: "",
      address: "",
      emergencyContact: "",
      medicalInfo: "",
      photo: null
    }
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form

  const onSubmit = async (data: PlayerFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Player registered:', data)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (file: File) => {
    setValue('photo', file)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Register New Player
          </DialogTitle>
          <DialogDescription>
            Add a new player to your academy. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('name')}
              placeholder="Enter player name"
              label="Full Name"
              error={!!errors.name}
              errorMessage={errors.name?.message}
              required
            />
            
            <Input
              {...register('age')}
              type="number"
              placeholder="Enter age"
              label="Age"
              error={!!errors.age}
              errorMessage={errors.age?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select value={watch('position')} onValueChange={(value) => setValue('position', value)}>
              <SelectTrigger 
                error={!!errors.position} 
                required
                label="Position"
                errorMessage={errors.position?.message}
              >
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="defender">Defender</SelectItem>
                <SelectItem value="midfielder">Midfielder</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
                <SelectItem value="wing">Wing</SelectItem>
              </SelectContent>
            </Select>

            <Input
              {...register('contact')}
              placeholder="Enter phone number"
              label="Contact Number"
              error={!!errors.contact}
              errorMessage={errors.contact?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter email (optional)"
              label="Email"
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />

            <Input
              {...register('emergencyContact')}
              placeholder="Enter emergency contact"
              label="Emergency Contact"
              error={!!errors.emergencyContact}
              errorMessage={errors.emergencyContact?.message}
              required
            />
          </div>

          <Input
            {...register('address')}
            placeholder="Enter full address"
            label="Address"
            error={!!errors.address}
            errorMessage={errors.address?.message}
            required
          />

          <Textarea
            {...register('medicalInfo')}
            placeholder="Enter any medical information or allergies"
            label="Medical Information"
            error={!!errors.medicalInfo}
            errorMessage={errors.medicalInfo?.message}
            rows={3}
          />

          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Player Photo
            </label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {watch('photo') ? watch('photo').name : "Upload player photo"}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
                id="photo-upload"
              />
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('photo-upload')?.click()}>
                Choose File
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
                  Registering...
                </>
              ) : (
                'Register Player'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

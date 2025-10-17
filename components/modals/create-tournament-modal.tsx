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
import { Checkbox } from "@/components/ui/checkbox"
import { Trophy, Calendar, Users, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"

const tournamentFormSchema = z.object({
  name: z.string().min(2, "Tournament name must be at least 2 characters"),
  type: z.string().min(1, "Please select tournament type"),
  startDate: z.string().min(1, "Please select start date"),
  endDate: z.string().min(1, "Please select end date"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  maxTeams: z.string().min(1, "Please enter maximum teams"),
  entryFee: z.string().optional(),
  location: z.string().min(5, "Please enter location"),
  rules: z.string().optional(),
  prizes: z.string().optional()
})

type TournamentFormData = z.infer<typeof tournamentFormSchema>

interface CreateTournamentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTournamentModal({ open, onOpenChange }: CreateTournamentModalProps) {
  const { locale } = useLanguage()
  const t = getClientTranslation(locale as any)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TournamentFormData>({
    resolver: zodResolver(tournamentFormSchema),
    defaultValues: {
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      description: "",
      maxTeams: "",
      entryFee: "",
      location: "",
      rules: "",
      prizes: ""
    }
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form

  const onSubmit = async (data: TournamentFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Tournament created:', data)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error('Creation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Create Tournament
          </DialogTitle>
          <DialogDescription>
            Create a new tournament for your academy. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('name')}
              placeholder="Enter tournament name"
              label="Tournament Name"
              error={!!errors.name}
              errorMessage={errors.name?.message}
              required
            />
            
            <Select value={watch('type')} onValueChange={(value) => setValue('type', value)}>
              <SelectTrigger 
                error={!!errors.type} 
                required
                label="Tournament Type"
                errorMessage={errors.type?.message}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="swimming">Swimming</SelectItem>
                <SelectItem value="athletics">Athletics</SelectItem>
                <SelectItem value="martial-arts">Martial Arts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('startDate')}
              type="date"
              label="Start Date"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              required
            />
            
            <Input
              {...register('endDate')}
              type="date"
              label="End Date"
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('maxTeams')}
              type="number"
              placeholder="Enter maximum teams"
              label="Maximum Teams"
              error={!!errors.maxTeams}
              errorMessage={errors.maxTeams?.message}
              required
            />
            
            <Input
              {...register('entryFee')}
              type="number"
              placeholder="Enter entry fee (optional)"
              label="Entry Fee ($)"
              error={!!errors.entryFee}
              errorMessage={errors.entryFee?.message}
            />
          </div>

          <Input
            {...register('location')}
            placeholder="Enter tournament location"
            label="Location"
            error={!!errors.location}
            errorMessage={errors.location?.message}
            required
          />

          <Textarea
            {...register('description')}
            placeholder="Describe the tournament, its format, and objectives"
            label="Description"
            error={!!errors.description}
            errorMessage={errors.description?.message}
            rows={4}
            required
          />

          <Textarea
            {...register('rules')}
            placeholder="Enter tournament rules and regulations"
            label="Rules & Regulations"
            error={!!errors.rules}
            errorMessage={errors.rules?.message}
            rows={3}
          />

          <Textarea
            {...register('prizes')}
            placeholder="Describe prizes and awards"
            label="Prizes & Awards"
            error={!!errors.prizes}
            errorMessage={errors.prizes?.message}
            rows={3}
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Tournament...
                </>
              ) : (
                'Create Tournament'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, ArrowRight, ArrowLeft, Building2, User, FileImage, CreditCard, Users, HardDrive, Shield, Star } from "lucide-react"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Zod Schema for form validation
const academyFormSchema = z.object({
  // Step 1: Basic Information
  academyName: z.string().min(2, "Academy name must be at least 2 characters"),
  academyType: z.string().min(1, "Please select an academy type"),
  establishedYear: z.string().min(4, "Please enter a valid year"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  
  // Step 2: Contact Information
  contactPerson: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  country: z.string().min(2, "Please enter a valid country"),
  
  // Step 3: Sports & Facilities
  sports: z.array(z.string()).min(1, "Please select at least one sport"),
  facilities: z.array(z.string()).min(1, "Please select at least one facility"),
  capacity: z.string().min(1, "Please enter capacity"),
  operatingHours: z.string().min(1, "Please select operating hours").refine((val) => {
    // Validate datetime-local format (YYYY-MM-DDTHH:MM)
    const datetimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
    return datetimeRegex.test(val)
  }, "Please select a valid date and time"),
  
  // Step 4: Documents
  documents: z.object({
    license: z.any().optional(),
    certificate: z.any().optional(),
    insurance: z.any().optional(),
    photos: z.array(z.any()).optional()
  }),
  
  // Step 5: Package Selection
  packageType: z.string().min(1, "Please select a package"),
  paymentMethod: z.string().min(1, "Please select a payment method")
})

type AcademyFormData = z.infer<typeof academyFormSchema>

const steps = [
  { id: 1, title: "Basic Information", icon: Building2 },
  { id: 2, title: "Contact Details", icon: User },
  { id: 3, title: "Sports & Facilities", icon: FileText },
  { id: 4, title: "Documents", icon: FileImage },
  { id: 5, title: "Choose Package", icon: CreditCard },
  { id: 6, title: "Payment", icon: CreditCard }
]

// Package definitions with all required features
const packages = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: '$99',
    period: 'month',
    players: 50,
    admins: 2,
    storage: '10GB',
    crmLevel: 'Basic',
    features: [
      'Up to 50 players',
      '2 admin accounts',
      '10GB storage',
      'Basic CRM integration',
      'Email support',
      'Basic analytics'
    ],
    popular: false
  },
  {
    id: 'silver',
    name: 'Silver Package',
    price: '$199',
    period: 'month',
    players: 200,
    admins: 5,
    storage: '50GB',
    crmLevel: 'Standard',
    features: [
      'Up to 200 players',
      '5 admin accounts',
      '50GB storage',
      'Standard CRM integration',
      'Priority support',
      'Advanced analytics',
      'Custom branding'
    ],
    popular: true
  },
  {
    id: 'gold',
    name: 'Gold Package',
    price: '$399',
    period: 'month',
    players: 500,
    admins: 10,
    storage: '100GB',
    crmLevel: 'Advanced',
    features: [
      'Up to 500 players',
      '10 admin accounts',
      '100GB storage',
      'Advanced CRM integration',
      '24/7 support',
      'Premium analytics',
      'Custom branding',
      'API access'
    ],
    popular: false
  },
  {
    id: 'platinum',
    name: 'Platinum Package',
    price: '$799',
    period: 'month',
    players: 1000,
    admins: 20,
    storage: '500GB',
    crmLevel: 'Enterprise',
    features: [
      'Up to 1000 players',
      '20 admin accounts',
      '500GB storage',
      'Enterprise CRM integration',
      'Dedicated support',
      'Custom analytics',
      'White-label solution',
      'Full API access',
      'Custom integrations'
    ],
    popular: false
  }
]


export function RegisterAcademyClient({ locale }: { locale: string }) {
  const t = getClientTranslation(locale as any)
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AcademyFormData>({
    resolver: zodResolver(academyFormSchema),
    defaultValues: {
      academyName: "",
      academyType: "",
      establishedYear: "",
      description: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      country: "",
      sports: [],
      facilities: [],
      capacity: "",
      operatingHours: "",
      documents: {
        license: null,
        certificate: null,
        insurance: null,
        photos: []
      },
      packageType: "",
      paymentMethod: ""
    }
  })

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = form

  const nextStep = async () => {
    // Validate current step before proceeding
    const currentStepFields = getCurrentStepFields(currentStep)
    const isValid = await trigger(currentStepFields)
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const getCurrentStepFields = (step: number): (keyof AcademyFormData)[] => {
    switch (step) {
      case 1:
        return ['academyName', 'academyType', 'establishedYear', 'description']
      case 2:
        return ['contactPerson', 'email', 'phone', 'address', 'city', 'country']
      case 3:
        return ['sports', 'facilities', 'capacity', 'operatingHours']
      case 4:
        return [] // Documents are optional
      case 5:
        return ['packageType']
      case 6:
        return ['paymentMethod']
      default:
        return []
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (type: keyof AcademyFormData['documents'], file: File) => {
    if (type === 'photos') {
      const currentPhotos = watch('documents.photos') || []
      setValue('documents.photos', [...currentPhotos, file])
    } else {
      setValue(`documents.${type}`, file)
    }
  }

  const onSubmit = async (data: AcademyFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Form submitted:', data)
      
      // Generate a username from academy name
      const username = data.academyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      
      // Redirect to dashboard
      router.push(`/academies/${username}/dashboard`)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="academyName"
                {...register('academyName')}
                placeholder={t('register.academy.form.academyNamePlaceholder')}
                label={t('register.academy.form.academyName')}
                error={!!errors.academyName}
                errorMessage={errors.academyName?.message}
                required
              />
              <Select value={watch('academyType')} onValueChange={(value) => setValue('academyType', value)}>
                <SelectTrigger 
                  error={!!errors.academyType} 
                  required
                  label={t('register.academy.form.academyType')}
                  errorMessage={errors.academyType?.message}
                >
                  <SelectValue placeholder={t('register.academy.form.academyTypePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sports">Sports Academy</SelectItem>
                  <SelectItem value="football">Football Academy</SelectItem>
                  <SelectItem value="basketball">Basketball Academy</SelectItem>
                  <SelectItem value="tennis">Tennis Academy</SelectItem>
                  <SelectItem value="swimming">Swimming Academy</SelectItem>
                  <SelectItem value="martial-arts">Martial Arts Academy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Input
              id="establishedYear"
              type="number"
              {...register('establishedYear')}
              placeholder="2020"
              label={t('register.academy.form.establishedYear')}
              error={!!errors.establishedYear}
              errorMessage={errors.establishedYear?.message}
              required
            />
            
            <Textarea
              id="description"
              {...register('description')}
              placeholder={t('register.academy.form.descriptionPlaceholder')}
              rows={4}
              label={t('register.academy.form.description')}
              error={!!errors.description}
              errorMessage={errors.description?.message}
              required
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="contactPerson"
                {...register('contactPerson')}
                placeholder={t('register.academy.form.contactPersonPlaceholder')}
                label={t('register.academy.form.contactPerson')}
                error={!!errors.contactPerson}
                errorMessage={errors.contactPerson?.message}
                required
              />
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder={t('register.academy.form.emailPlaceholder')}
                label={t('register.academy.form.email')}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="phone"
                {...register('phone')}
                placeholder={t('register.academy.form.phonePlaceholder')}
                label={t('register.academy.form.phone')}
                error={!!errors.phone}
                errorMessage={errors.phone?.message}
                required
              />
              <Input
                id="website"
                {...register('website')}
                placeholder={t('register.academy.form.websitePlaceholder')}
                label={t('register.academy.form.website')}
                error={!!errors.website}
                errorMessage={errors.website?.message}
              />
            </div>
            
            <Input
              id="address"
              {...register('address')}
              placeholder={t('register.academy.form.addressPlaceholder')}
              label={t('register.academy.form.address')}
              error={!!errors.address}
              errorMessage={errors.address?.message}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="city"
                {...register('city')}
                placeholder={t('register.academy.form.cityPlaceholder')}
                label={t('register.academy.form.city')}
                error={!!errors.city}
                errorMessage={errors.city?.message}
                required
              />
              <Input
                id="country"
                {...register('country')}
                placeholder={t('register.academy.form.countryPlaceholder')}
                label={t('register.academy.form.country')}
                error={!!errors.country}
                errorMessage={errors.country?.message}
                required
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('register.academy.form.sports')}
                  <span className="text-destructive ml-1">*</span>
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Football', 'Basketball', 'Tennis', 'Swimming', 'Martial Arts', 'Athletics'].map((sport) => (
                  <Button
                    key={sport}
                    type="button"
                    variant={watch('sports')?.includes(sport) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const currentSports = watch('sports') || []
                      const newSports = currentSports.includes(sport)
                        ? currentSports.filter(s => s !== sport)
                        : [...currentSports, sport]
                      setValue('sports', newSports)
                    }}
                    className="justify-start"
                  >
                    {sport}
                  </Button>
                ))}
              </div>
              {errors.sports && (
                <p className="text-sm text-red-500">{errors.sports.message}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('register.academy.form.facilities')}
                  <span className="text-destructive ml-1">*</span>
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Indoor Courts', 'Outdoor Fields', 'Swimming Pool', 'Gym', 'Locker Rooms', 'Parking'].map((facility) => (
                  <Button
                    key={facility}
                    type="button"
                    variant={watch('facilities')?.includes(facility) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const currentFacilities = watch('facilities') || []
                      const newFacilities = currentFacilities.includes(facility)
                        ? currentFacilities.filter(f => f !== facility)
                        : [...currentFacilities, facility]
                      setValue('facilities', newFacilities)
                    }}
                    className="justify-start"
                  >
                    {facility}
                  </Button>
                ))}
              </div>
              {errors.facilities && (
                <p className="text-sm text-red-500">{errors.facilities.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="capacity"
                {...register('capacity')}
                placeholder={t('register.academy.form.capacityPlaceholder')}
                label={t('register.academy.form.capacity')}
                error={!!errors.capacity}
                errorMessage={errors.capacity?.message}
                required
              />
              <Input
                id="operatingHours"
                type="datetime-local"
                {...register('operatingHours')}
                placeholder={t('register.academy.form.operatingHoursPlaceholder')}
                label={t('register.academy.form.operatingHours')}
                error={!!errors.operatingHours}
                errorMessage={errors.operatingHours?.message}
                required
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('register.academy.form.license')}
              </label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {watch('documents.license') ? watch('documents.license').name : t('register.academy.form.uploadLicense')}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('license', e.target.files[0])}
                      className="hidden"
                      id="license-upload"
                    />
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('license-upload')?.click()}>
                      {t('register.academy.form.chooseFile')}
                    </Button>
                  </div>
                </div>
                
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('register.academy.form.certificate')}
              </label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {watch('documents.certificate') ? watch('documents.certificate').name : t('register.academy.form.uploadCertificate')}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('certificate', e.target.files[0])}
                      className="hidden"
                      id="certificate-upload"
                    />
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('certificate-upload')?.click()}>
                      {t('register.academy.form.chooseFile')}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('register.academy.form.insurance')}
              </label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {watch('documents.insurance') ? watch('documents.insurance').name : t('register.academy.form.uploadInsurance')}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('insurance', e.target.files[0])}
                      className="hidden"
                      id="insurance-upload"
                    />
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('insurance-upload')?.click()}>
                      {t('register.academy.form.chooseFile')}
                    </Button>
                  </div>
                </div>
                
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('register.academy.form.photos')}
              </label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {(() => {
                        const photos = watch('documents.photos') || []
                        return photos.length > 0 
                          ? `${photos.length} ${t('register.academy.form.filesSelected')}`
                          : t('register.academy.form.uploadPhotos')
                      })()}
                    </p>
                    <input
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          Array.from(e.target.files).forEach(file => handleFileUpload('photos', file))
                        }
                      }}
                      className="hidden"
                      id="photos-upload"
                    />
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('photos-upload')?.click()}>
                      {t('register.academy.form.chooseFiles')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('register.academy.form.packageType')}
                  <span className="text-destructive ml-1">*</span>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {packages.map((pkg) => (
                  <Card 
                    key={pkg.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 relative",
                      watch('packageType') === pkg.id 
                        ? "ring-2 ring-primary bg-primary/5" 
                        : "hover:shadow-md",
                      pkg.popular && "border-primary/20"
                    )}
                    onClick={() => setValue('packageType', pkg.id)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-3 py-1">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription className="text-2xl font-bold text-primary">
                        {pkg.price}<span className="text-sm text-muted-foreground">/{pkg.period}</span>
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{pkg.players} players</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span>{pkg.admins} admins</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-primary" />
                            <span>{pkg.storage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <span>{pkg.crmLevel} CRM</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-2 text-sm">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {errors.packageType && (
                <p className="text-sm text-red-500">{errors.packageType.message}</p>
              )}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <Select value={watch('paymentMethod')} onValueChange={(value) => setValue('paymentMethod', value)}>
              <SelectTrigger 
                error={!!errors.paymentMethod} 
                required
                label={t('register.academy.form.paymentMethod')}
                errorMessage={errors.paymentMethod?.message}
              >
                <SelectValue placeholder={t('register.academy.form.paymentMethodPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Package Summary */}
            {watch('packageType') && (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Package Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const selectedPackage = packages.find(pkg => pkg.id === watch('packageType'))
                    if (!selectedPackage) return null
                    
                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{selectedPackage.name}</span>
                          <span className="text-2xl font-bold text-primary">
                            {selectedPackage.price}<span className="text-sm text-muted-foreground">/{selectedPackage.period}</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Up to {selectedPackage.players} players</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span>{selectedPackage.admins} admin accounts</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-primary" />
                            <span>{selectedPackage.storage} storage</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <span>{selectedPackage.crmLevel} CRM integration</span>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  isCompleted && "border-green-500 bg-green-500 text-white",
                  !isActive && !isCompleted && "border-muted-foreground text-muted-foreground"
                )}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-2 text-center",
                  isActive && "text-primary font-medium",
                  isCompleted && "text-green-600 font-medium",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            {t(`register.academy.steps.step${currentStep}Description`)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('register.academy.form.previous')}
        </Button>
        
        {currentStep === steps.length ? (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {t('register.academy.form.submitting')}
              </>
            ) : (
              <>
                {t('register.academy.form.submit')}
                <CheckCircle className="h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2"
          >
            {t('register.academy.form.next')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  )
}

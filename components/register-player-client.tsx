"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cropper from "react-easy-crop";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Camera,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
  Trophy,
  Users,
  Activity,
  X,
  ZoomIn,
  Move
} from "lucide-react";
import { Locale } from "@/lib/i18n";

const playerFormSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  dateOfBirth: z.string().min(1, "Please enter your date of birth"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  nationality: z.string().min(1, "Please select nationality"),
  
  // Step 2: Profile Details
  profilePhoto: z.any().optional(),
  bio: z.string().optional(),
  sport: z.string().min(1, "Please select your primary sport"),
  position: z.string().min(1, "Please select your position"),
  
  // Step 3: Physical Stats
  height: z.string().min(1, "Please enter height"),
  weight: z.string().min(1, "Please enter weight"),
  
  // Step 4: Address & Emergency Contact
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter city"),
  country: z.string().min(2, "Please enter country"),
  emergencyContact: z.string().min(2, "Please enter emergency contact name"),
  emergencyPhone: z.string().min(10, "Please enter emergency contact phone"),
  
  // Step 5: Additional Info
  experience: z.string().min(1, "Please select your experience level"),
  achievements: z.string().optional(),
  medicalInfo: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PlayerFormData = z.infer<typeof playerFormSchema>;

const steps = [
  { id: 1, title: "Personal Info", icon: User, description: "Basic information" },
  { id: 2, title: "Profile", icon: User, description: "Profile details" },
  { id: 3, title: "Physical Stats", icon: Activity, description: "Your stats" },
  { id: 4, title: "Contact & Address", icon: MapPin, description: "Location info" },
  { id: 5, title: "Additional Info", icon: Shield, description: "Final details" },
];

export function RegisterPlayerClient({ locale }: { locale: string }) {
  const { setLocale } = useLanguage();
  const t = getClientTranslation(locale as Locale);
  const isArabic = locale === 'ar';
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Image cropper state
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const form = useForm<PlayerFormData>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      phone: "",
      nationality: "",
      profilePhoto: null,
      bio: "",
      sport: "",
      position: "",
      height: "",
      weight: "",
      address: "",
      city: "",
      country: "",
      emergencyContact: "",
      emergencyPhone: "",
      experience: "",
      achievements: "",
      medicalInfo: "",
      termsAccepted: false,
    },
  });

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = form;

  const getCurrentStepFields = (step: number): (keyof PlayerFormData)[] => {
    switch (step) {
      case 1:
        return ["fullName", "email", "password", "confirmPassword", "dateOfBirth", "phone", "nationality"];
      case 2:
        return ["sport", "position", "bio"];
      case 3:
        return ["height", "weight"];
      case 4:
        return ["address", "city", "country", "emergencyContact", "emergencyPhone"];
      case 5:
        return ["experience", "achievements", "medicalInfo", "termsAccepted"];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const currentStepFields = getCurrentStepFields(currentStep);
    const isValid = await trigger(currentStepFields);

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', reject);
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const maxSize = 128;
    canvas.width = maxSize;
    canvas.height = maxSize;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      maxSize,
      maxSize
    );

    return new Promise<string | null>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve(url);
        } else {
          resolve(null);
        }
      }, 'image/jpeg');
    });
  };

  const handleCropComplete = async () => {
    if (!selectedImage || !croppedAreaPixels) return;
    
    try {
      const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels);
      if (croppedImageUrl && croppedImageUrl !== null) {
        setAvatarPreview(croppedImageUrl);
        setShowCropper(false);
        
        // Create a blob from the cropped image
        const response = await fetch(croppedImageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
        setValue("profilePhoto", file);
      }
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const onSubmit = async (data: PlayerFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: isArabic ? "تم التسجيل بنجاح!" : "Registration Successful!",
        description: isArabic 
          ? "تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول."
          : "Your account has been created successfully. You can now log in.",
        variant: "default",
      });

      // Redirect to player dashboard after a short delay
      setTimeout(() => {
        router.push("/player/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: isArabic ? "خطأ في التسجيل" : "Registration Error",
        description: isArabic 
          ? "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى."
          : "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={cn(
            "text-4xl font-bold mb-2",
            isArabic && "font-arabic-heading"
          )}>
            {isArabic ? "انضم كلاعب" : "Join as Player"}
          </h1>
          <p className={cn("text-muted-foreground", isArabic && "font-arabic-body")}>
            {isArabic 
              ? "أكمل التسجيل لبدء رحلتك في عالم الرياضة"
              : "Complete your registration to start your journey in the world of sports"
            }
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                      isActive && "bg-primary text-primary-foreground scale-110",
                      isCompleted && "bg-green-500 text-white",
                      !isActive && !isCompleted && "bg-muted text-muted-foreground"
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-6 w-6" />
                      )}
                    </div>
                    <p className={cn(
                      "text-xs mt-2 text-center",
                      isActive && "font-semibold text-primary",
                      isArabic && "font-arabic-body"
                    )}>
                      {isArabic ? step.title : step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-1 mx-2 mt-6",
                      isCompleted ? "bg-green-500" : "bg-muted"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card>
           <CardHeader>
             <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
               <div className="h-5 w-5">
                 {(() => {
                   const StepIcon = steps[currentStep - 1].icon;
                   return <StepIcon className="h-5 w-5" />;
                 })()}
               </div>
               {isArabic 
                 ? `الخطوة ${currentStep} من ${steps.length}: ${steps[currentStep - 1].description}`
                 : `Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1].description}`
               }
             </CardTitle>
             <CardDescription className={cn(isArabic && "font-arabic-body")}>
               {steps[currentStep - 1].description}
             </CardDescription>
           </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "الاسم الكامل" : "Full Name"} *
                        </Label>
                        <Input
                          {...register("fullName")}
                          placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">{errors.fullName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "البريد الإلكتروني" : "Email"} *
                        </Label>
                        <Input
                          type="email"
                          {...register("email")}
                          placeholder={isArabic ? "example@email.com" : "example@email.com"}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "كلمة المرور" : "Password"} *
                        </Label>
                        <Input
                          type="password"
                          {...register("password")}
                          placeholder={isArabic ? "كلمة المرور" : "Password"}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                        {errors.password && (
                          <p className="text-sm text-destructive">{errors.password.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "تأكيد كلمة المرور" : "Confirm Password"} *
                        </Label>
                        <Input
                          type="password"
                          {...register("confirmPassword")}
                          placeholder={isArabic ? "تأكيد كلمة المرور" : "Confirm password"}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                        {errors.confirmPassword && (
                          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "تاريخ الميلاد" : "Date of Birth"} *
                        </Label>
                        <Input
                          type="date"
                          {...register("dateOfBirth")}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                        {errors.dateOfBirth && (
                          <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "رقم الهاتف" : "Phone"} *
                        </Label>
                        <Input
                          {...register("phone")}
                          placeholder={isArabic ? "+971 XXXXXXXX" : "+971 XXXXXXXX"}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "الجنسية" : "Nationality"} *
                        </Label>
                        <Select onValueChange={(value) => setValue("nationality", value)}>
                          <SelectTrigger className={cn(isArabic && "font-arabic-body")}>
                            <SelectValue placeholder={isArabic ? "اختر الجنسية" : "Select nationality"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UAE">UAE</SelectItem>
                            <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                            <SelectItem value="Egypt">Egypt</SelectItem>
                            <SelectItem value="Jordan">Jordan</SelectItem>
                            <SelectItem value="Lebanon">Lebanon</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.nationality && (
                          <p className="text-sm text-destructive">{errors.nationality.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Profile Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <label htmlFor="avatar-upload" className="cursor-pointer">
                          <Avatar className="w-32 h-32 border-2 border-primary">
                            <AvatarImage src={avatarPreview || undefined} />
                            <AvatarFallback>
                              <User className="h-8 w-8" />
                            </AvatarFallback>
                          </Avatar>
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                          </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "الرياضة الأساسية" : "Primary Sport"} *
                        </Label>
                        <Select onValueChange={(value) => setValue("sport", value)}>
                          <SelectTrigger className={cn(isArabic && "font-arabic-body")}>
                            <SelectValue placeholder={isArabic ? "اختر الرياضة" : "Select sport"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="football">Football</SelectItem>
                            <SelectItem value="basketball">Basketball</SelectItem>
                            <SelectItem value="tennis">Tennis</SelectItem>
                            <SelectItem value="swimming">Swimming</SelectItem>
                            <SelectItem value="running">Running</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.sport && (
                          <p className="text-sm text-destructive">{errors.sport.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "المركز" : "Position"} *
                        </Label>
                        <Select onValueChange={(value) => setValue("position", value)}>
                          <SelectTrigger className={cn(isArabic && "font-arabic-body")}>
                            <SelectValue placeholder={isArabic ? "اختر المركز" : "Select position"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                            <SelectItem value="defender">Defender</SelectItem>
                            <SelectItem value="midfielder">Midfielder</SelectItem>
                            <SelectItem value="forward">Forward</SelectItem>
                            <SelectItem value="all-rounder">All-Rounder</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.position && (
                          <p className="text-sm text-destructive">{errors.position.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "نبذة" : "Bio"}
                        </Label>
                        <Textarea
                          {...register("bio")}
                          placeholder={isArabic ? "أخبرنا عن نفسك..." : "Tell us about yourself..."}
                          rows={4}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Physical Stats */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "الطول" : "Height"} *
                        </Label>
                        <Input
                          {...register("height")}
                          placeholder={isArabic ? "بالسنتيمتر" : "in cm"}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                        {errors.height && (
                          <p className="text-sm text-destructive">{errors.height.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "الوزن" : "Weight"} *
                        </Label>
                        <Input
                          {...register("weight")}
                          placeholder={isArabic ? "بالكيلوجرام" : "in kg"}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                        {errors.weight && (
                          <p className="text-sm text-destructive">{errors.weight.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Address & Emergency Contact */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <h3 className={cn("text-lg font-semibold", isArabic && "font-arabic-heading")}>
                        {isArabic ? "العنوان" : "Address"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className={cn(isArabic && "font-arabic-body")}>
                            {isArabic ? "العنوان" : "Address"} *
                          </Label>
                          <Input
                            {...register("address")}
                            placeholder={isArabic ? "العنوان الكامل" : "Full address"}
                            className={cn(isArabic && "font-arabic-body")}
                          />
                          {errors.address && (
                            <p className="text-sm text-destructive">{errors.address.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className={cn(isArabic && "font-arabic-body")}>
                            {isArabic ? "المدينة" : "City"} *
                          </Label>
                          <Input
                            {...register("city")}
                            placeholder={isArabic ? "المدينة" : "City"}
                            className={cn(isArabic && "font-arabic-body")}
                          />
                          {errors.city && (
                            <p className="text-sm text-destructive">{errors.city.message}</p>
                          )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label className={cn(isArabic && "font-arabic-body")}>
                            {isArabic ? "البلد" : "Country"} *
                          </Label>
                          <Select onValueChange={(value) => setValue("country", value)}>
                            <SelectTrigger className={cn(isArabic && "font-arabic-body")}>
                              <SelectValue placeholder={isArabic ? "اختر البلد" : "Select country"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UAE">UAE</SelectItem>
                              <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                              <SelectItem value="Egypt">Egypt</SelectItem>
                              <SelectItem value="Jordan">Jordan</SelectItem>
                              <SelectItem value="Lebanon">Lebanon</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.country && (
                            <p className="text-sm text-destructive">{errors.country.message}</p>
                          )}
                        </div>
                      </div>

                      <h3 className={cn("text-lg font-semibold mt-6", isArabic && "font-arabic-heading")}>
                        {isArabic ? "جهة اتصال الطوارئ" : "Emergency Contact"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className={cn(isArabic && "font-arabic-body")}>
                            {isArabic ? "اسم جهة الاتصال" : "Contact Name"} *
                          </Label>
                          <Input
                            {...register("emergencyContact")}
                            placeholder={isArabic ? "الاسم" : "Name"}
                            className={cn(isArabic && "font-arabic-body")}
                          />
                          {errors.emergencyContact && (
                            <p className="text-sm text-destructive">{errors.emergencyContact.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className={cn(isArabic && "font-arabic-body")}>
                            {isArabic ? "رقم الهاتف" : "Phone"} *
                          </Label>
                          <Input
                            {...register("emergencyPhone")}
                            placeholder={isArabic ? "+971 XXXXXXXX" : "+971 XXXXXXXX"}
                            className={cn(isArabic && "font-arabic-body")}
                          />
                          {errors.emergencyPhone && (
                            <p className="text-sm text-destructive">{errors.emergencyPhone.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Additional Info */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "المستوى" : "Experience Level"} *
                        </Label>
                        <Select onValueChange={(value) => setValue("experience", value)}>
                          <SelectTrigger className={cn(isArabic && "font-arabic-body")}>
                            <SelectValue placeholder={isArabic ? "اختر المستوى" : "Select level"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.experience && (
                          <p className="text-sm text-destructive">{errors.experience.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "الإنجازات" : "Achievements"}
                        </Label>
                        <Textarea
                          {...register("achievements")}
                          placeholder={isArabic ? "اذكر إنجازاتك..." : "Mention your achievements..."}
                          rows={3}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(isArabic && "font-arabic-body")}>
                          {isArabic ? "معلومات طبية" : "Medical Information"}
                        </Label>
                        <Textarea
                          {...register("medicalInfo")}
                          placeholder={isArabic ? "معلومات طبية مهمة..." : "Important medical information..."}
                          rows={3}
                          className={cn(isArabic && "font-arabic-body")}
                        />
                      </div>

                      <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox
                          checked={watch("termsAccepted")}
                          onCheckedChange={(checked) => setValue("termsAccepted", checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label 
                            htmlFor="terms"
                            className={cn("text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", isArabic && "font-arabic-body")}
                          >
                            {isArabic 
                              ? "أوافق على الشروط والأحكام وسياسة الخصوصية"
                              : "I agree to the Terms and Conditions and Privacy Policy"
                            }
                          </Label>
                          <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                            {isArabic 
                              ? "بمتابعة التسجيل، فإنك توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بنا."
                              : "By continuing, you agree to our Terms of Service and Privacy Policy."
                            }
                          </p>
                        </div>
                      </div>
                      {errors.termsAccepted && (
                        <p className="text-sm text-destructive">{errors.termsAccepted.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {isArabic ? "السابق" : "Previous"}
                </Button>

                {currentStep < steps.length ? (
                  <Button type="button" onClick={nextStep}>
                    {isArabic ? "التالي" : "Next"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        {isArabic ? "جاري التسجيل..." : "Registering..."}
                      </>
                    ) : (
                      <>
                        {isArabic ? "إتمام التسجيل" : "Complete Registration"}
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Image Cropper Dialog */}
      <Dialog open={showCropper} onOpenChange={setShowCropper}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className={cn(isArabic && "font-arabic-heading")}>
              {isArabic ? "قص الصورة" : "Crop Image"}
            </DialogTitle>
            <DialogDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic 
                ? "عدل وضع وقرب الصورة للتأكد من أن وجهك في المنتصف"
                : "Adjust the position and zoom to ensure your face is centered"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
            {selectedImage && (
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className={cn("flex items-center gap-2", isArabic && "font-arabic-body")}>
                  <ZoomIn className="h-4 w-4" />
                  {isArabic ? "التكبير" : "Zoom"}
                </Label>
                <span className={cn("text-sm font-medium", isArabic && "font-arabic-body")}>
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
                className="w-full"
              />
            </div>

            <div className="text-center">
              <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                {isArabic 
                  ? "💡 نصيحة: استخدم السحب لتحديد الجزء المرغوب من الصورة"
                  : "💡 Tip: Drag to select the desired part of the image"
                }
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCropper(false)}>
              <X className="h-4 w-4 mr-2" />
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleCropComplete}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {isArabic ? "حفظ الصورة" : "Save Image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


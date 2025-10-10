"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, MapPin, Trophy } from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";

interface PlayerRegisterClientProps {
  locale: Locale;
}

export function PlayerRegisterClient({ locale }: PlayerRegisterClientProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [playerType, setPlayerType] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);

  const isArabic = locale === 'ar';

  const playerTypes = [
    { value: "player", label: isArabic ? "لاعب" : "Player" },
    { value: "parent", label: isArabic ? "والد/والدة" : "Parent" },
    { value: "teacher", label: isArabic ? "معلم تربية بدنية" : "PE Teacher" },
    { value: "referee", label: isArabic ? "حكم" : "Referee" },
    { value: "commentator", label: isArabic ? "معلق" : "Commentator" },
    { value: "journalist", label: isArabic ? "صحفي" : "Journalist" },
  ];

  const sports = [
    { value: "football", label: isArabic ? "كرة القدم" : "Football" },
    { value: "basketball", label: isArabic ? "كرة السلة" : "Basketball" },
    { value: "tennis", label: isArabic ? "التنس" : "Tennis" },
    { value: "swimming", label: isArabic ? "السباحة" : "Swimming" },
    { value: "athletics", label: isArabic ? "ألعاب القوى" : "Athletics" },
    { value: "other", label: isArabic ? "أخرى" : "Other" },
  ];

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <Card className="w-full shadow-xl border-border/40">
      <CardHeader className="text-center space-y-2">
        <CardTitle className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
          {isArabic ? 'إنشاء حساب جديد' : 'Create New Account'}
        </CardTitle>
        <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
          {isArabic ? 'املأ المعلومات التالية للانضمام إلى المنصة' : 'Fill in the following information to join the platform'}
        </CardDescription>
        
        {/* Progress Steps */}
        <div className="flex justify-center space-x-4 mt-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isArabic ? 'font-arabic-heading' : ''}`}>
                {isArabic ? 'المعلومات الأساسية' : 'Basic Information'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الاسم الأول' : 'First Name'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder={isArabic ? 'أدخل اسمك الأول' : 'Enter your first name'}
                      className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الاسم الأخير' : 'Last Name'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      placeholder={isArabic ? 'أدخل اسمك الأخير' : 'Enter your last name'}
                      className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                    className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={isArabic ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                    className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="playerType" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'نوع العضوية' : 'Membership Type'}
                </Label>
                <Select value={playerType} onValueChange={setPlayerType}>
                  <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                    <SelectValue placeholder={isArabic ? 'اختر نوع العضوية' : 'Select membership type'} />
                  </SelectTrigger>
                  <SelectContent>
                    {playerTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Sports & Location */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isArabic ? 'font-arabic-heading' : ''}`}>
                {isArabic ? 'الرياضة والموقع' : 'Sports & Location'}
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="sport" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'الرياضة المفضلة' : 'Preferred Sport'}
                </Label>
                <Select>
                  <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                    <SelectValue placeholder={isArabic ? 'اختر رياضتك المفضلة' : 'Select your preferred sport'} />
                  </SelectTrigger>
                  <SelectContent>
                    {sports.map((sport) => (
                      <SelectItem key={sport.value} value={sport.value}>
                        {sport.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'المدينة' : 'City'}
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="city"
                    placeholder={isArabic ? 'أدخل مدينتك' : 'Enter your city'}
                    className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'البلد' : 'Country'}
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="country"
                    placeholder={isArabic ? 'أدخل بلدك' : 'Enter your country'}
                    className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'تاريخ الميلاد' : 'Date of Birth'}
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Security */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isArabic ? 'font-arabic-heading' : ''}`}>
                {isArabic ? 'الأمان' : 'Security'}
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
                    className={`pl-10 pr-10 ${isArabic ? 'font-arabic-body' : ''}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={isArabic ? 'أكد كلمة المرور' : 'Confirm your password'}
                    className={`pl-10 pr-10 ${isArabic ? 'font-arabic-body' : ''}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'أوافق على الشروط والأحكام' : 'I agree to the terms and conditions'}
                </Label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                {isArabic ? 'السابق' : 'Previous'}
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                {isArabic ? 'التالي' : 'Next'}
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                {isArabic ? 'إنشاء الحساب' : 'Create Account'}
              </Button>
            )}
          </div>
        </form>

        <Separator />

        <div className={`text-center text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
          {isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
          <Link href="/player/login" className="text-primary hover:underline">
            {isArabic ? 'سجل الدخول' : 'Sign in'}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

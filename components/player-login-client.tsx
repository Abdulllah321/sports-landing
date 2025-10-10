"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";

interface PlayerLoginClientProps {
  locale: Locale;
}

export function PlayerLoginClient({ locale }: PlayerLoginClientProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  const isArabic = locale === 'ar';

  return (
    <Card className="w-full shadow-xl border-border/40">
      <CardHeader className="text-center space-y-2">
        <CardTitle className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
          {isArabic ? 'تسجيل الدخول' : 'Sign In'}
        </CardTitle>
        <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
          {isArabic ? 'ادخل إلى حسابك للوصول إلى المنصة' : 'Enter your credentials to access the platform'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Login Method Toggle */}
        <div className="flex space-x-2 p-1 bg-muted rounded-lg">
          <Button
            variant={loginMethod === 'email' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setLoginMethod('email')}
          >
            <Mail className="h-4 w-4 mr-2" />
            {isArabic ? 'بريد إلكتروني' : 'Email'}
          </Button>
          <Button
            variant={loginMethod === 'phone' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setLoginMethod('phone')}
          >
            <Phone className="h-4 w-4 mr-2" />
            {isArabic ? 'هاتف' : 'Phone'}
          </Button>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={loginMethod} className={isArabic ? 'font-arabic-body' : ''}>
              {loginMethod === 'email' 
                ? (isArabic ? 'البريد الإلكتروني' : 'Email Address')
                : (isArabic ? 'رقم الهاتف' : 'Phone Number')
              }
            </Label>
            <div className="relative">
              {loginMethod === 'email' ? (
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                id={loginMethod}
                type={loginMethod === 'email' ? 'email' : 'tel'}
                placeholder={loginMethod === 'email' 
                  ? (isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email')
                  : (isArabic ? 'أدخل رقم هاتفك' : 'Enter your phone number')
                }
                className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                required
              />
            </div>
          </div>

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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                {isArabic ? 'تذكرني' : 'Remember me'}
              </Label>
            </div>
            <Link
              href="/player/forgot-password"
              className={`text-sm text-primary hover:underline ${isArabic ? 'font-arabic-body' : ''}`}
            >
              {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </Link>
          </div>

          <Button type="submit" className="w-full" size="lg">
            {isArabic ? 'تسجيل الدخول' : 'Sign In'}
          </Button>
        </form>

        <Separator />

        {/* Social Login */}
        <div className="space-y-3">
          <p className={`text-center text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
            {isArabic ? 'أو سجل الدخول باستخدام' : 'Or sign in with'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Facebook
            </Button>
          </div>
        </div>

        <div className={`text-center text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
          {isArabic ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
          <Link href="/player/register" className="text-primary hover:underline">
            {isArabic ? 'سجل الآن' : 'Sign up'}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

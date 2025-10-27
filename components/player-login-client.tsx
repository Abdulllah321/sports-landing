"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";

export function PlayerLoginClient({ locale }: { locale: string }) {
  const { locale: currentLocale } = useLanguage();
  const t = getClientTranslation(currentLocale as any);
  const isArabic = currentLocale === 'ar';
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: isArabic ? "تم تسجيل الدخول بنجاح!" : "Login Successful!",
      description: isArabic
        ? "مرحباً بعودتك!"
        : "Welcome back!",
      variant: "default",
    });

    // Redirect to player dashboard
    setTimeout(() => {
      router.push('/player/dashboard');
    }, 1000);

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className={cn("text-3xl font-bold", isArabic && "font-arabic-heading")}>
              {isArabic ? "تسجيل الدخول" : "Login"}
            </CardTitle>
            <CardDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic
                ? "أدخل بياناتك للوصول إلى حسابك"
                : "Enter your credentials to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className={cn(isArabic && "font-arabic-body")}>
                    {isArabic ? "البريد الإلكتروني" : "Email"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={isArabic ? "name@example.com" : "name@example.com"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={cn("pl-10", isArabic && "font-arabic-body")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className={cn(isArabic && "font-arabic-body")}>
                    {isArabic ? "كلمة المرور" : "Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isArabic ? "كلمة المرور" : "Password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className={cn("pl-10 pr-10", isArabic && "font-arabic-body")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label
                      htmlFor="remember"
                      className={cn("text-sm cursor-pointer", isArabic && "font-arabic-body")}
                    >
                      {isArabic ? "تذكرني" : "Remember me"}
                    </Label>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className={cn("text-sm text-primary hover:underline", isArabic && "font-arabic-body")}
                  >
                    {isArabic ? "نسيت كلمة المرور؟" : "Forgot password?"}
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {isArabic ? "جارٍ تسجيل الدخول..." : "Logging in..."}
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    {isArabic ? "تسجيل الدخول" : "Login"}
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className={cn("bg-background px-2 text-muted-foreground", isArabic && "font-arabic-body")}>
                    {isArabic ? "أو" : "Or"}
                  </span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
                  <Link href="/auth/register" className="text-primary hover:underline font-medium">
                    {isArabic ? "سجل الآن" : "Sign up now"}
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


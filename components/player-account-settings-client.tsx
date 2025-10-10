"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield,
  Bell,
  Globe,
  Palette,
  Trash2,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { Locale } from "@/lib/i18n";

interface PlayerAccountSettingsClientProps {
  locale: Locale;
}

export function PlayerAccountSettingsClient({ locale }: PlayerAccountSettingsClientProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const isArabic = locale === 'ar';

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">
          {isArabic ? 'الملف الشخصي' : 'Profile'}
        </TabsTrigger>
        <TabsTrigger value="security">
          {isArabic ? 'الأمان' : 'Security'}
        </TabsTrigger>
        <TabsTrigger value="notifications">
          {isArabic ? 'الإشعارات' : 'Notifications'}
        </TabsTrigger>
        <TabsTrigger value="preferences">
          {isArabic ? 'التفضيلات' : 'Preferences'}
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
              {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
            </CardTitle>
            <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
              {isArabic ? 'تحديث معلوماتك الشخصية' : 'Update your personal information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'الاسم الأول' : 'First Name'}
                </Label>
                <Input
                  id="firstName"
                  placeholder={isArabic ? 'أدخل اسمك الأول' : 'Enter your first name'}
                  className={isArabic ? 'font-arabic-body' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'الاسم الأخير' : 'Last Name'}
                </Label>
                <Input
                  id="lastName"
                  placeholder={isArabic ? 'أدخل اسمك الأخير' : 'Enter your last name'}
                  className={isArabic ? 'font-arabic-body' : ''}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                className={isArabic ? 'font-arabic-body' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'رقم الهاتف' : 'Phone Number'}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={isArabic ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                className={isArabic ? 'font-arabic-body' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'نبذة شخصية' : 'Bio'}
              </Label>
              <Textarea
                id="bio"
                placeholder={isArabic ? 'اكتب نبذة عن نفسك...' : 'Write about yourself...'}
                className={`min-h-32 ${isArabic ? 'font-arabic-body' : ''}`}
              />
            </div>

            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {isArabic ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
              {isArabic ? 'الأمان' : 'Security'}
            </CardTitle>
            <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
              {isArabic ? 'إدارة أمان حسابك' : 'Manage your account security'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'كلمة المرور الحالية' : 'Current Password'}
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isArabic ? 'أدخل كلمة المرور الحالية' : 'Enter current password'}
                  className={`pr-10 ${isArabic ? 'font-arabic-body' : ''}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'كلمة المرور الجديدة' : 'New Password'}
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder={isArabic ? 'أدخل كلمة المرور الجديدة' : 'Enter new password'}
                className={isArabic ? 'font-arabic-body' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={isArabic ? 'أكد كلمة المرور الجديدة' : 'Confirm new password'}
                className={isArabic ? 'font-arabic-body' : ''}
              />
            </div>

            <Button className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              {isArabic ? 'تحديث كلمة المرور' : 'Update Password'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
              {isArabic ? 'الإشعارات' : 'Notifications'}
            </CardTitle>
            <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
              {isArabic ? 'إدارة إشعاراتك' : 'Manage your notifications'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
                  </h4>
                  <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'تلقي إشعارات عبر البريد الإلكتروني' : 'Receive notifications via email'}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إشعارات التطبيق' : 'App Notifications'}
                  </h4>
                  <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'تلقي إشعارات في التطبيق' : 'Receive in-app notifications'}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إشعارات البطولات' : 'Tournament Notifications'}
                  </h4>
                  <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إشعارات حول البطولات والمسابقات' : 'Notifications about tournaments and competitions'}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إشعارات الأكاديمية' : 'Academy Notifications'}
                  </h4>
                  <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إشعارات من الأكاديمية' : 'Notifications from your academy'}
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Preferences Tab */}
      <TabsContent value="preferences" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
              {isArabic ? 'التفضيلات' : 'Preferences'}
            </CardTitle>
            <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
              {isArabic ? 'تخصيص تجربتك' : 'Customize your experience'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'الوضع المظلم' : 'Dark Mode'}
                  </h4>
                  <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'استخدام الوضع المظلم' : 'Use dark mode'}
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'اللغة' : 'Language'}
                  </h4>
                  <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'اختر لغة الواجهة' : 'Choose interface language'}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {isArabic ? 'العربية' : 'English'}
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'المنطقة الزمنية' : 'Timezone'}
                  </h4>
                  <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'اختر منطقتك الزمنية' : 'Choose your timezone'}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {isArabic ? 'GMT+3' : 'GMT+3'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className={`text-destructive ${isArabic ? 'font-arabic-heading' : ''}`}>
              {isArabic ? 'منطقة الخطر' : 'Danger Zone'}
            </CardTitle>
            <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
              {isArabic ? 'إجراءات لا يمكن التراجع عنها' : 'Irreversible actions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              {isArabic ? 'حذف الحساب' : 'Delete Account'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

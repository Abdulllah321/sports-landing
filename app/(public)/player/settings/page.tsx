"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Bell,
  Shield,
  Lock,
  Trash2,
  Mail,
  Key,
  Eye,
  EyeOff,
  Globe,
  Download,
  AlertTriangle,
  CheckCircle,
  User,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PlayerSettingsPage() {
  const { locale, setLocale } = useLanguage();
  const t = getClientTranslation(locale);
  const isArabic = locale === 'ar';
  const { toast } = useToast();

  // Email and password change states
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
  const [showChangeEmailDialog, setShowChangeEmailDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    currentPassword: '',
    showPassword: false,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    team: true,
    tournament: true,
    sponsorship: true,
    system: true,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    performanceStats: true,
    showEmail: false,
    showPhone: false,
  });

  const handleChangePassword = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: isArabic ? "الرجاء ملء جميع الحقول" : "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: isArabic ? "كلمات المرور غير متطابقة" : "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isArabic ? "تم تغيير كلمة المرور" : "Password changed",
      description: isArabic ? "تم تحديث كلمة المرور بنجاح" : "Your password has been updated successfully",
      variant: "default",
    });

    setShowChangePasswordDialog(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    });
  };

  const handleChangeEmail = () => {
    if (!emailForm.newEmail || !emailForm.currentPassword) {
      toast({
        title: isArabic ? "الرجاء ملء جميع الحقول" : "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isArabic ? "تم تغيير البريد الإلكتروني" : "Email changed",
      description: isArabic ? "تم تحديث البريد الإلكتروني بنجاح" : "Your email has been updated successfully",
      variant: "default",
    });

    setShowChangeEmailDialog(false);
    setEmailForm({
      newEmail: '',
      currentPassword: '',
      showPassword: false,
    });
  };

  const handleDeactivate = () => {
    toast({
      title: isArabic ? "تم تعطيل الحساب" : "Account deactivated",
      description: isArabic ? "تم تعطيل حسابك بنجاح" : "Your account has been deactivated",
      variant: "default",
    });
    setShowDeactivateDialog(false);
  };

  const handleDelete = () => {
    toast({
      title: isArabic ? "تم حذف الحساب" : "Account deleted",
      description: isArabic ? "تم حذف حسابك نهائياً" : "Your account has been permanently deleted",
      variant: "default",
    });
    setShowDeleteDialog(false);
  };

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={cn("text-3xl font-bold", isArabic && "font-arabic-heading")}>
          {isArabic ? 'الإعدادات' : 'Settings'}
        </h1>
        <p className={cn("text-muted-foreground", isArabic && "font-arabic-body")}>
          {isArabic ? 'إدارة إعدادات حسابك وتفضيلاتك' : 'Manage your account settings and preferences'}
        </p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className={cn("flex items-center gap-2", isArabic && 'font-arabic-heading')}>
            <User className="h-5 w-5" />
            {isArabic ? 'معلومات الحساب' : 'Account Information'}
          </CardTitle>
          <CardDescription className={cn(isArabic && 'font-arabic-body')}>
            {isArabic ? 'إدارة معلومات حسابك الأساسية' : 'Manage your basic account information'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className={cn(isArabic && 'font-arabic-body')}>
              {isArabic ? 'البريد الإلكتروني الحالي' : 'Current Email'}
            </Label>
            <Input 
              type="email" 
              placeholder={isArabic ? "example@email.com" : "example@email.com"}
              defaultValue="player@example.com"
              disabled
              className={cn(isArabic && 'font-arabic-body')}
            />
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowChangeEmailDialog(true)}
            >
              <Mail className="h-4 w-4 mr-2" />
              {isArabic ? 'تغيير البريد الإلكتروني' : 'Change Email'}
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className={cn(isArabic && 'font-arabic-body')}>
              {isArabic ? 'كلمة المرور' : 'Password'}
            </Label>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowChangePasswordDialog(true)}
            >
              <Key className="h-4 w-4 mr-2" />
              {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className={cn(isArabic && 'font-arabic-body')}>
              {isArabic ? 'لغة الواجهة' : 'Interface Language'}
            </Label>
            <div className="flex gap-2">
              <Button 
                variant={locale === 'en' ? 'default' : 'outline'} 
                size="sm" 
                className="flex-1"
                onClick={() => setLocale('en')}
              >
                English
              </Button>
              <Button 
                variant={locale === 'ar' ? 'default' : 'outline'} 
                size="sm" 
                className="flex-1"
                onClick={() => setLocale('ar')}
              >
                العربية
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className={cn("flex items-center gap-2", isArabic && 'font-arabic-heading')}>
            <Bell className="h-5 w-5" />
            {isArabic ? 'الإشعارات' : 'Notifications'}
          </CardTitle>
          <CardDescription className={cn(isArabic && 'font-arabic-body')}>
            {isArabic ? 'إدارة إعدادات الإشعارات' : 'Manage notification settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'تلقي تحديثات عبر البريد الإلكتروني' : 'Receive updates via email'}
              </p>
            </div>
            <Switch 
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'إشعارات الفريق' : 'Team Notifications'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'تحديثات من فرقك' : 'Updates from your teams'}
              </p>
            </div>
            <Switch 
              checked={notifications.team}
              onCheckedChange={(checked) => setNotifications({ ...notifications, team: checked })}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'إشعارات البطولات' : 'Tournament Notifications'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'تحديثات البطولات' : 'Tournament updates'}
              </p>
            </div>
            <Switch 
              checked={notifications.tournament}
              onCheckedChange={(checked) => setNotifications({ ...notifications, tournament: checked })}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'إشعارات الرعاية' : 'Sponsorship Notifications'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'عروض الرعاية والفرص' : 'Sponsorship offers and opportunities'}
              </p>
            </div>
            <Switch 
              checked={notifications.sponsorship}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sponsorship: checked })}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'إشعارات النظام' : 'System Notifications'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'تحديثات النظام والصيانة' : 'System updates and maintenance'}
              </p>
            </div>
            <Switch 
              checked={notifications.system}
              onCheckedChange={(checked) => setNotifications({ ...notifications, system: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className={cn("flex items-center gap-2", isArabic && 'font-arabic-heading')}>
            <Shield className="h-5 w-5" />
            {isArabic ? 'الخصوصية والأمان' : 'Privacy & Security'}
          </CardTitle>
          <CardDescription className={cn(isArabic && 'font-arabic-body')}>
            {isArabic ? 'إعدادات الخصوصية والأمان' : 'Privacy and security settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'الملف الشخصي العام' : 'Public Profile'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'إظهار ملفك للمستخدمين الآخرين' : 'Show your profile to other users'}
              </p>
            </div>
            <Switch 
              checked={privacy.publicProfile}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, publicProfile: checked })}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'إحصائيات الأداء' : 'Performance Stats'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'مشاركة إحصائياتك' : 'Share your statistics'}
              </p>
            </div>
            <Switch 
              checked={privacy.performanceStats}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, performanceStats: checked })}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'إظهار البريد الإلكتروني' : 'Show Email'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'إظهار بريدك الإلكتروني في الملف الشخصي' : 'Show your email in profile'}
              </p>
            </div>
            <Switch 
              checked={privacy.showEmail}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className={cn(isArabic && 'font-arabic-body')}>
                {isArabic ? 'إظهار رقم الهاتف' : 'Show Phone'}
              </Label>
              <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                {isArabic ? 'إظهار رقم هاتفك في الملف الشخصي' : 'Show your phone in profile'}
              </p>
            </div>
            <Switch 
              checked={privacy.showPhone}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
            />
          </div>

          <Separator />

          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            {isArabic ? 'تنزيل بياناتك' : 'Download Your Data'}
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <CardTitle className={cn("flex items-center gap-2 text-destructive", isArabic && 'font-arabic-heading')}>
            <AlertTriangle className="h-5 w-5" />
            {isArabic ? 'منطقة الخطر' : 'Danger Zone'}
          </CardTitle>
          <CardDescription className={cn(isArabic && 'font-arabic-body')}>
            {isArabic ? 'إجراءات دائمة لا يمكن التراجع عنها' : 'Irreversible actions'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className={cn(isArabic && 'font-arabic-body')}>
              {isArabic 
                ? 'هذه الإجراءات لا يمكن التراجع عنها. يرجى الحذر.' 
                : 'These actions cannot be undone. Please proceed with caution.'}
            </AlertDescription>
          </Alert>

          <Button 
            variant="outline" 
            className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-500/10"
            onClick={() => setShowDeactivateDialog(true)}
          >
            <User className="h-4 w-4 mr-2" />
            {isArabic ? 'تعطيل الحساب' : 'Deactivate Account'}
          </Button>

          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isArabic ? 'حذف الحساب نهائياً' : 'Delete Account Permanently'}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={showChangePasswordDialog} onOpenChange={setShowChangePasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={cn(isArabic && "font-arabic-heading")}>
              {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
            </DialogTitle>
            <DialogDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'أدخل كلمة المرور الحالية والجديدة' : 'Enter your current and new password'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'كلمة المرور الحالية' : 'Current Password'}
              </Label>
              <div className="relative">
                <Input
                  type={passwordForm.showCurrentPassword ? "text" : "password"}
                  placeholder={isArabic ? "كلمة المرور الحالية" : "Current password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className={cn("pr-10", isArabic && "font-arabic-body")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setPasswordForm({ ...passwordForm, showCurrentPassword: !passwordForm.showCurrentPassword })}
                >
                  {passwordForm.showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'كلمة المرور الجديدة' : 'New Password'}
              </Label>
              <div className="relative">
                <Input
                  type={passwordForm.showNewPassword ? "text" : "password"}
                  placeholder={isArabic ? "كلمة المرور الجديدة" : "New password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className={cn("pr-10", isArabic && "font-arabic-body")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setPasswordForm({ ...passwordForm, showNewPassword: !passwordForm.showNewPassword })}
                >
                  {passwordForm.showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'تأكيد كلمة المرور' : 'Confirm New Password'}
              </Label>
              <div className="relative">
                <Input
                  type={passwordForm.showConfirmPassword ? "text" : "password"}
                  placeholder={isArabic ? "تأكيد كلمة المرور" : "Confirm new password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className={cn("pr-10", isArabic && "font-arabic-body")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setPasswordForm({ ...passwordForm, showConfirmPassword: !passwordForm.showConfirmPassword })}
                >
                  {passwordForm.showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePasswordDialog(false)}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleChangePassword}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Email Dialog */}
      <Dialog open={showChangeEmailDialog} onOpenChange={setShowChangeEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={cn(isArabic && "font-arabic-heading")}>
              {isArabic ? 'تغيير البريد الإلكتروني' : 'Change Email'}
            </DialogTitle>
            <DialogDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'أدخل بريدك الإلكتروني الجديد' : 'Enter your new email address'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'البريد الإلكتروني الجديد' : 'New Email'}
              </Label>
              <Input
                type="email"
                placeholder={isArabic ? "example@email.com" : "example@email.com"}
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                className={cn(isArabic && "font-arabic-body")}
              />
            </div>

            <div className="space-y-2">
              <Label className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'كلمة المرور للتأكيد' : 'Confirm Password'}
              </Label>
              <div className="relative">
                <Input
                  type={emailForm.showPassword ? "text" : "password"}
                  placeholder={isArabic ? "كلمة المرور" : "Password"}
                  value={emailForm.currentPassword}
                  onChange={(e) => setEmailForm({ ...emailForm, currentPassword: e.target.value })}
                  className={cn("pr-10", isArabic && "font-arabic-body")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setEmailForm({ ...emailForm, showPassword: !emailForm.showPassword })}
                >
                  {emailForm.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangeEmailDialog(false)}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleChangeEmail}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {isArabic ? 'تغيير البريد الإلكتروني' : 'Change Email'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Account Dialog */}
      <AlertDialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={cn(isArabic && "font-arabic-heading")}>
              {isArabic ? 'تعطيل الحساب' : 'Deactivate Account'}
            </AlertDialogTitle>
            <AlertDialogDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic 
                ? 'هل أنت متأكد من رغبتك في تعطيل حسابك؟ سيتم إخفاء ملفك الشخصي وستفقد الوصول إلى جميع الميزات.'
                : 'Are you sure you want to deactivate your account? Your profile will be hidden and you will lose access to all features.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeactivate}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isArabic ? 'تعطيل الحساب' : 'Deactivate Account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={cn("text-destructive", isArabic && "font-arabic-heading")}>
              {isArabic ? 'حذف الحساب نهائياً' : 'Delete Account Permanently'}
            </AlertDialogTitle>
            <AlertDialogDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic
                ? 'هل أنت متأكد تماماً؟ سيتم حذف حسابك وبياناتك بشكل دائم وغير قابل للاسترداد. لا يمكن التراجع عن هذا الإجراء.'
                : 'Are you absolutely sure? Your account and data will be permanently deleted and cannot be recovered. This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isArabic ? 'حذف نهائياً' : 'Delete Permanently'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

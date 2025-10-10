"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, 
  Calendar, 
  Trophy, 
  Mail, 
  Wallet, 
  CreditCard, 
  Settings,
  Bell,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail as MailIcon,
  MessageSquare,
  Download,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Building,
  Users,
  BarChart3,
  TrendingUp,
  DollarSign,
  ArrowRight,
  LogOut,
  Edit,
  Save,
  X,
  Plus,
  Filter,
  Search
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Image from "next/image";

interface AccountPageClientProps {
  locale: Locale;
}

export function AccountPageClient({ locale }: AccountPageClientProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDemoOption, setShowDemoOption] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isArabic = locale === 'ar';

  // Demo user data
  const [userData, setUserData] = useState({
    name: isArabic ? 'أحمد محمد' : 'Ahmed Mohamed',
    email: 'ahmed.mohamed@demo.com',
    phone: '+971 50 123 4567',
    location: isArabic ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE',
    bio: isArabic ? 'لاعب كرة قدم محترف مع 8 سنوات من الخبرة' : 'Professional football player with 8 years of experience',
    avatar: '/images/player-avatar.png',
    level: 15,
    xp: 1250,
    nextLevelXp: 1500,
    joinDate: '2023-01-15',
    verified: true
  });

  // Sample bookings data
  const [bookings] = useState([
    {
      id: 'BK001',
      facility: isArabic ? 'ملعب دبي الرياضي' : 'Dubai Sports Stadium',
      date: '2024-10-28',
      time: '18:00 - 20:00',
      type: isArabic ? 'كرة القدم' : 'Football',
      status: 'confirmed',
      price: 'AED 200'
    },
    {
      id: 'BK002',
      facility: isArabic ? 'مركز التدريب الأولمبي' : 'Olympic Training Center',
      date: '2024-11-02',
      time: '16:00 - 18:00',
      type: isArabic ? 'التدريب الشخصي' : 'Personal Training',
      status: 'pending',
      price: 'AED 150'
    },
    {
      id: 'BK003',
      facility: isArabic ? 'ملعب النخبة' : 'Elite Stadium',
      date: '2024-11-05',
      time: '19:00 - 21:00',
      type: isArabic ? 'كرة القدم' : 'Football',
      status: 'completed',
      price: 'AED 180'
    }
  ]);

  // Sample tournament registrations
  const [tournaments] = useState([
    {
      id: 'TR001',
      name: isArabic ? 'كأس دبي المفتوح' : 'Dubai Open Cup',
      date: '2024-11-15',
      location: isArabic ? 'دبي، الإمارات' : 'Dubai, UAE',
      status: 'registered',
      team: isArabic ? 'فريق النخبة' : 'Elite Team',
      category: isArabic ? 'مفتوح' : 'Open'
    },
    {
      id: 'TR002',
      name: isArabic ? 'بطولة الخليج لكرة القدم' : 'Gulf Football Championship',
      date: '2024-12-01',
      location: isArabic ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
      status: 'pending',
      team: isArabic ? 'فريق النخبة' : 'Elite Team',
      category: isArabic ? 'محترف' : 'Professional'
    },
    {
      id: 'TR003',
      name: isArabic ? 'دوري الشتاء' : 'Winter League',
      date: '2024-12-20',
      location: isArabic ? 'أبوظبي، الإمارات' : 'Abu Dhabi, UAE',
      status: 'completed',
      team: isArabic ? 'فريق النخبة' : 'Elite Team',
      category: isArabic ? 'شباب' : 'Youth'
    }
  ]);

  // Sample inbox messages
  const [messages] = useState([
    {
      id: 'MSG001',
      from: isArabic ? 'فريق فيكرو' : 'Ficro Team',
      subject: isArabic ? 'مرحباً بك في منصة فيكرو!' : 'Welcome to Ficro Platform!',
      preview: isArabic ? 'نحن سعداء لانضمامك إلى مجتمعنا الرياضي...' : 'We\'re excited to have you join our sports community...',
      date: '2024-10-25',
      unread: true,
      type: 'welcome'
    },
    {
      id: 'MSG002',
      from: isArabic ? 'أكاديمية النخبة' : 'Elite Academy',
      subject: isArabic ? 'تحديث جدول التدريب' : 'Training Schedule Update',
      preview: isArabic ? 'تم تحديث جدول التدريب الأسبوعي...' : 'The weekly training schedule has been updated...',
      date: '2024-10-24',
      unread: true,
      type: 'academy'
    },
    {
      id: 'MSG003',
      from: isArabic ? 'بطولة دبي المفتوحة' : 'Dubai Open Tournament',
      subject: isArabic ? 'تأكيد التسجيل' : 'Registration Confirmation',
      preview: isArabic ? 'تم تأكيد تسجيلك في بطولة دبي المفتوحة...' : 'Your registration for Dubai Open Tournament has been confirmed...',
      date: '2024-10-23',
      unread: false,
      type: 'tournament'
    }
  ]);

  const handleDemoLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowDemoOption(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('profile');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'registered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      confirmed: isArabic ? 'مؤكد' : 'Confirmed',
      pending: isArabic ? 'في الانتظار' : 'Pending',
      completed: isArabic ? 'مكتمل' : 'Completed',
      cancelled: isArabic ? 'ملغي' : 'Cancelled',
      registered: isArabic ? 'مسجل' : 'Registered'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className={`text-3xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {isArabic ? 'حسابي' : 'My Account'}
            </CardTitle>
            <CardDescription className={`${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'سجل الدخول للوصول إلى لوحة التحكم الخاصة بك' : 'Sign in to access your dashboard'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic-heading' : ''}`}>
                {isArabic ? 'مرحباً بك في فيكرو' : 'Welcome to Ficro'}
              </h3>
              <p className={`text-muted-foreground mb-6 ${isArabic ? 'font-arabic-body' : ''}`}>
                {isArabic ? 'اختر طريقة تسجيل الدخول' : 'Choose your sign-in method'}
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => setShowDemoOption(true)}
                className="w-full"
                size="lg"
              >
                <User className="h-5 w-5 mr-2" />
                {isArabic ? 'تسجيل دخول تجريبي' : 'Demo Sign-In'}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                size="lg"
                onClick={() => setShowLoginModal(true)}
              >
                <Settings className="h-5 w-5 mr-2" />
                {isArabic ? 'طلب حساب حقيقي' : 'Request Real Account'}
              </Button>
            </div>

            <div className="text-center">
              <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                {isArabic ? 'الحساب التجريبي يعرض بيانات وهمية للعرض التوضيحي' : 'Demo account shows sample data for demonstration'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Option Modal */}
        <Dialog open={showDemoOption} onOpenChange={setShowDemoOption}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'تسجيل الدخول التجريبي' : 'Demo Sign-In'}
              </DialogTitle>
              <DialogDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'هذا حساب تجريبي يعرض بيانات وهمية للعرض التوضيحي' : 'This is a demo account showing sample data for demonstration'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className={`font-semibold mb-2 ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'بيانات الحساب التجريبي:' : 'Demo Account Details:'}
                </h4>
                <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'الاسم: أحمد محمد' : 'Name: Ahmed Mohamed'}
                </p>
                <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'البريد: ahmed.mohamed@demo.com' : 'Email: ahmed.mohamed@demo.com'}
                </p>
                <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'المستوى: 15' : 'Level: 15'}
                </p>
              </div>
              <Button onClick={handleDemoLogin} className="w-full">
                {isArabic ? 'متابعة كحساب تجريبي' : 'Continue as Demo Account'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Real Account Request Modal */}
        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'طلب حساب حقيقي' : 'Request Real Account'}
              </DialogTitle>
              <DialogDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'املأ النموذج لطلب حساب حقيقي' : 'Fill out the form to request a real account'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'الاسم الكامل' : 'Full Name'}
                </Label>
                <Input id="name" placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </Label>
                <Input id="email" type="email" placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </Label>
                <Input id="phone" placeholder={isArabic ? 'أدخل رقم هاتفك' : 'Enter your phone number'} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason" className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'سبب الطلب' : 'Reason for Request'}
                </Label>
                <Textarea 
                  id="reason" 
                  placeholder={isArabic ? 'اشرح سبب طلبك للحساب...' : 'Explain your reason for requesting an account...'}
                  className={isArabic ? 'font-arabic-body' : ''}
                />
              </div>
              <Button className="w-full">
                {isArabic ? 'إرسال الطلب' : 'Submit Request'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {isArabic ? 'لوحة التحكم' : 'Dashboard'}
            </h1>
            <p className={`text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'مرحباً بعودتك، ' : 'Welcome back, '}{userData.name}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            {isArabic ? 'تسجيل الخروج' : 'Logout'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            {isArabic ? 'الملف الشخصي' : 'Profile'}
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="h-4 w-4 mr-2" />
            {isArabic ? 'الحجوزات' : 'Bookings'}
          </TabsTrigger>
          <TabsTrigger value="tournaments">
            <Trophy className="h-4 w-4 mr-2" />
            {isArabic ? 'البطولات' : 'Tournaments'}
          </TabsTrigger>
          <TabsTrigger value="inbox">
            <Mail className="h-4 w-4 mr-2" />
            {isArabic ? 'صندوق الوارد' : 'Inbox'}
          </TabsTrigger>
          <TabsTrigger value="wallet">
            <Wallet className="h-4 w-4 mr-2" />
            {isArabic ? 'المحفظة' : 'Wallet'}
          </TabsTrigger>
          <TabsTrigger value="crm">
            <BarChart3 className="h-4 w-4 mr-2" />
            {isArabic ? 'إدارة العملاء' : 'CRM'}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={userData.avatar}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-primary"
                  />
                  {userData.verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className={`text-2xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {userData.name}
                </CardTitle>
                <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'لاعب محترف' : 'Professional Player'}
                </CardDescription>
                <Badge variant="secondary" className="mt-2">
                  {isArabic ? 'المستوى' : 'Level'} {userData.level}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'نقاط الخبرة' : 'Experience Points'}
                    </span>
                    <span className={`text-sm font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                      {userData.xp} / {userData.nextLevelXp}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(userData.xp / userData.nextLevelXp) * 100}%` }}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isArabic ? 'تعديل الملف الشخصي' : 'Edit Profile'}
                </Button>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'تفاصيل الملف الشخصي' : 'Profile Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </Label>
                    {isEditing ? (
                      <Input 
                        value={userData.name} 
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        className={isArabic ? 'font-arabic-body' : ''}
                      />
                    ) : (
                      <p className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>{userData.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    {isEditing ? (
                      <Input 
                        value={userData.email} 
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        type="email"
                      />
                    ) : (
                      <p className="text-sm">{userData.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'رقم الهاتف' : 'Phone'}
                    </Label>
                    {isEditing ? (
                      <Input 
                        value={userData.phone} 
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm">{userData.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'الموقع' : 'Location'}
                    </Label>
                    {isEditing ? (
                      <Input 
                        value={userData.location} 
                        onChange={(e) => setUserData({...userData, location: e.target.value})}
                        className={isArabic ? 'font-arabic-body' : ''}
                      />
                    ) : (
                      <p className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>{userData.location}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'نبذة شخصية' : 'Bio'}
                  </Label>
                  {isEditing ? (
                    <Textarea 
                      value={userData.bio} 
                      onChange={(e) => setUserData({...userData, bio: e.target.value})}
                      className={`min-h-20 ${isArabic ? 'font-arabic-body' : ''}`}
                    />
                  ) : (
                    <p className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>{userData.bio}</p>
                  )}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(false)}>
                      <Save className="h-4 w-4 mr-2" />
                      {isArabic ? 'حفظ' : 'Save'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" />
                      {isArabic ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'حجوزاتي' : 'My Bookings'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'إدارة حجوزات المرافق والتدريب' : 'Manage your facility and training bookings'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                          {booking.facility}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {booking.date} • {booking.time} • {booking.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusText(booking.status)}
                      </Badge>
                      <p className={`text-sm font-semibold mt-1 ${isArabic ? 'font-arabic-body' : ''}`}>
                        {booking.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tournaments Tab */}
        <TabsContent value="tournaments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'بطولاتي' : 'My Tournaments'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'البطولات المسجلة والمشاركة فيها' : 'Tournaments you\'re registered for and participating in'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tournaments.map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                          {tournament.name}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {tournament.date} • {tournament.location} • {tournament.team}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(tournament.status)}>
                        {getStatusText(tournament.status)}
                      </Badge>
                      <p className={`text-sm text-muted-foreground mt-1 ${isArabic ? 'font-arabic-body' : ''}`}>
                        {tournament.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inbox Tab */}
        <TabsContent value="inbox" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'صندوق الوارد' : 'Inbox'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'الرسائل والإشعارات' : 'Messages and notifications'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-4 p-4 border rounded-lg ${message.unread ? 'bg-primary/5 border-primary/20' : ''}`}>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MailIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                          {message.from}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                            {message.date}
                          </span>
                          {message.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                        {message.subject}
                      </p>
                      <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {message.preview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="space-y-6">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className={`text-orange-800 ${isArabic ? 'font-arabic-heading' : ''}`}>
                <AlertCircle className="h-5 w-5 inline mr-2" />
                {isArabic ? 'قريباً - يتطلب تكامل الدفع' : 'Coming Soon — Requires Payment Integration'}
              </CardTitle>
              <CardDescription className={`text-orange-700 ${isArabic ? 'font-arabic-body' : ''}`}>
                {isArabic ? 'ميزات المحفظة والسحب ستكون متاحة قريباً' : 'Wallet and withdrawal features will be available soon'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
                  <Wallet className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h4 className={`font-semibold text-orange-800 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'المحفظة' : 'Wallet'}
                  </h4>
                  <p className={`text-sm text-orange-600 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إدارة الأموال' : 'Manage funds'}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
                  <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h4 className={`font-semibold text-orange-800 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'السحب' : 'Withdraw'}
                  </h4>
                  <p className={`text-sm text-orange-600 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'سحب الأموال' : 'Withdraw funds'}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
                  <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h4 className={`font-semibold text-orange-800 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'التحليلات' : 'Analytics'}
                  </h4>
                  <p className={`text-sm text-orange-600 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'تتبع المعاملات' : 'Track transactions'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CRM Tab */}
        <TabsContent value="crm" className="space-y-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className={`text-blue-800 ${isArabic ? 'font-arabic-heading' : ''}`}>
                <AlertCircle className="h-5 w-5 inline mr-2" />
                {isArabic ? 'قريباً - يتطلب تكامل CRM' : 'Coming Soon — Requires CRM Integration'}
              </CardTitle>
              <CardDescription className={`text-blue-700 ${isArabic ? 'font-arabic-body' : ''}`}>
                {isArabic ? 'ميزات إدارة العملاء المتقدمة ستكون متاحة قريباً' : 'Advanced customer relationship management features will be available soon'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className={`font-semibold text-blue-800 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إدارة العملاء' : 'Customer Management'}
                  </h4>
                  <p className={`text-sm text-blue-600 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'تتبع العملاء' : 'Track customers'}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className={`font-semibold text-blue-800 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'التقارير' : 'Reports'}
                  </h4>
                  <p className={`text-sm text-blue-600 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'تقارير مفصلة' : 'Detailed reports'}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className={`font-semibold text-blue-800 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'التحليلات' : 'Analytics'}
                  </h4>
                  <p className={`text-sm text-blue-600 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'تحليل الأداء' : 'Performance analysis'}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <Settings className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className={`font-semibold text-blue-800 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'الإعدادات' : 'Settings'}
                  </h4>
                  <p className={`text-sm text-blue-600 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'تخصيص النظام' : 'System customization'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

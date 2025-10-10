"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Trophy, 
  Calendar, 
  MapPin, 
  Star, 
  Users, 
  ShoppingCart, 
  Vote, 
  BarChart3,
  Settings,
  Bell,
  Camera,
  Video,
  MessageSquare,
  Heart,
  Share2,
  Award,
  Target,
  Clock,
  TrendingUp
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

interface PlayerDashboardClientProps {
  locale: Locale;
}

export function PlayerDashboardClient({ locale }: PlayerDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const isArabic = locale === 'ar';

  // Mock data for demonstration
  const playerStats = {
    level: 15,
    xp: 1250,
    nextLevelXp: 1500,
    tournaments: 8,
    wins: 5,
    academy: "Elite Football Academy",
    points: 2450,
    rank: 12
  };

  const recentActivities = [
    {
      id: 1,
      type: "tournament",
      title: isArabic ? "فاز ببطولة كرة القدم المحلية" : "Won Local Football Tournament",
      time: "2 hours ago",
      icon: Trophy,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "academy",
      title: isArabic ? "انضم إلى أكاديمية النخبة" : "Joined Elite Academy",
      time: "1 day ago",
      icon: Users,
      color: "text-blue-500"
    },
    {
      id: 3,
      type: "facility",
      title: isArabic ? "حجز ملعب كرة القدم" : "Booked Football Pitch",
      time: "3 days ago",
      icon: MapPin,
      color: "text-purple-500"
    },
    {
      id: 4,
      type: "competition",
      title: isArabic ? "شارك في مسابقة التغذية الرياضية" : "Participated in Sports Nutrition Quiz",
      time: "1 week ago",
      icon: Award,
      color: "text-orange-500"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: isArabic ? "بطولة الربيع" : "Spring Tournament",
      date: "2024-03-15",
      time: "10:00 AM",
      location: isArabic ? "ملعب المدينة الرياضي" : "City Sports Stadium",
      type: "tournament"
    },
    {
      id: 2,
      title: isArabic ? "دورة التغذية الرياضية" : "Sports Nutrition Course",
      date: "2024-03-20",
      time: "2:00 PM",
      location: isArabic ? "أكاديمية النخبة" : "Elite Academy",
      type: "course"
    },
    {
      id: 3,
      title: isArabic ? "مباراة ودية" : "Friendly Match",
      date: "2024-03-25",
      time: "4:00 PM",
      location: isArabic ? "ملعب الحي" : "Neighborhood Stadium",
      type: "match"
    }
  ];

  const quickActions = [
    {
      title: isArabic ? "البحث عن أكاديمية" : "Find Academy",
      description: isArabic ? "انضم إلى أكاديمية مناسبة" : "Join a suitable academy",
      icon: Users,
      href: "/player/academies",
      color: "bg-blue-500"
    },
    {
      title: isArabic ? "حجز مرفق" : "Book Facility",
      description: isArabic ? "احجز ملعب أو مرفق" : "Book a pitch or facility",
      icon: MapPin,
      href: "/player/facilities",
      color: "bg-green-500"
    },
    {
      title: isArabic ? "المسابقات" : "Competitions",
      description: isArabic ? "شارك في المسابقات" : "Participate in competitions",
      icon: Trophy,
      href: "/player/competitions",
      color: "bg-purple-500"
    },
    {
      title: isArabic ? "المتجر" : "Store",
      description: isArabic ? "تسوق للمعدات الرياضية" : "Shop for sports equipment",
      icon: ShoppingCart,
      href: "/player/store",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Player Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'المستوى' : 'Level'}
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {playerStats.level}
            </div>
            <p className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'نقاط الخبرة' : 'Experience Points'}: {playerStats.xp}/{playerStats.nextLevelXp}
            </p>
            <Progress value={(playerStats.xp / playerStats.nextLevelXp) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'البطولات' : 'Tournaments'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {playerStats.tournaments}
            </div>
            <p className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'الفوز' : 'Wins'}: {playerStats.wins}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'النقاط' : 'Points'}
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {playerStats.points.toLocaleString()}
            </div>
            <p className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'الترتيب' : 'Rank'}: #{playerStats.rank}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'الأكاديمية' : 'Academy'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {playerStats.academy}
            </div>
            <Badge variant="secondary" className="mt-1">
              {isArabic ? 'عضو نشط' : 'Active Member'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {isArabic ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="activities">
            {isArabic ? 'الأنشطة' : 'Activities'}
          </TabsTrigger>
          <TabsTrigger value="events">
            {isArabic ? 'الأحداث' : 'Events'}
          </TabsTrigger>
          <TabsTrigger value="social">
            {isArabic ? 'الاجتماعي' : 'Social'}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {isArabic ? 'الإعدادات' : 'Settings'}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'الإجراءات السريعة' : 'Quick Actions'}
                </CardTitle>
                <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'ابدأ نشاطك الرياضي' : 'Start your sports activity'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {action.title}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'الأنشطة الأخيرة' : 'Recent Activities'}
                </CardTitle>
                <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'آخر أنشطتك على المنصة' : 'Your latest platform activities'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                        {activity.title}
                      </p>
                      <p className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'سجل الأنشطة' : 'Activity Log'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'جميع أنشطتك على المنصة' : 'All your platform activities'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {activity.title}
                        </p>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'الأحداث القادمة' : 'Upcoming Events'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'الأحداث والبطولات القادمة' : 'Upcoming events and tournaments'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {event.title}
                        </p>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {event.date} • {event.time}
                        </p>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {event.location}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Social Feed */}
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'المنشورات الاجتماعية' : 'Social Feed'}
                </CardTitle>
                <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'تفاعل مع المجتمع الرياضي' : 'Engage with the sports community'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic ? 'أحمد محمد' : 'Ahmed Mohamed'}
                      </p>
                      <p className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'فزت ببطولة كرة القدم المحلية اليوم! 🏆' : 'Won the local football tournament today! 🏆'}
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      12
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      3
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Stats */}
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'الإحصائيات الاجتماعية' : 'Social Stats'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'المتابعون' : 'Followers'}
                  </span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'المتابعون' : 'Following'}
                  </span>
                  <span className="font-bold">567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'المنشورات' : 'Posts'}
                  </span>
                  <span className="font-bold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الإعجابات' : 'Likes'}
                  </span>
                  <span className="font-bold">2,456</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'إعدادات الحساب' : 'Account Settings'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'إدارة إعداداتك وتفضيلاتك' : 'Manage your settings and preferences'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link href="/player/profile">
                    <User className="h-6 w-6 mb-2" />
                    <span className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'الملف الشخصي' : 'Profile'}
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link href="/player/account-settings">
                    <Settings className="h-6 w-6 mb-2" />
                    <span className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'إعدادات الحساب' : 'Account Settings'}
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link href="/academies">
                    <Users className="h-6 w-6 mb-2" />
                    <span className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'الأكاديميات' : 'Academies'}
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link href="/events">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'الأحداث' : 'Events'}
                    </span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

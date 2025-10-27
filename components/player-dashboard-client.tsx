"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Calendar,
  Users,
  Mail,
  Bell,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  Briefcase,
  Target,
  Activity,
  ArrowRight,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export function PlayerDashboardClient({ locale }: { locale: string }) {
  const { locale: currentLocale } = useLanguage();
  const t = getClientTranslation(currentLocale as any);
  const isArabic = currentLocale === 'ar';
  const { toast } = useToast();

  // Mock data
  const playerStats = {
    level: 15,
    xp: 1250,
    maxXp: 1500,
    tournaments: 8,
    wins: 5,
    teams: 3,
    matchesPlayed: 42,
    totalEarnings: 7500
  };

  const achievements = [
    {
      id: 1,
      title: isArabic ? "لاعب الشهر" : "Player of the Month",
      description: isArabic ? "تم الاعتراف بك كأفضل لاعب" : "Recognized as top performer",
      icon: Award,
      date: "2024-03-15",
      color: "bg-yellow-500/10 text-yellow-600"
    },
    {
      id: 2,
      title: isArabic ? "فخر الفريق" : "Team Pride",
      description: isArabic ? "مساهماتك المتميزة في الفريق" : "Outstanding team contributions",
      icon: Trophy,
      date: "2024-02-28",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      id: 3,
      title: isArabic ? "ريادة الأداء" : "Performance Leader",
      description: isArabic ? "أداء استثنائي في آخر 10 مباريات" : "Exceptional performance in last 10 matches",
      icon: TrendingUp,
      date: "2024-01-20",
      color: "bg-green-500/10 text-green-600"
    }
  ];

  const upcomingMatches = [
    {
      id: 1,
      opponent: "FC Dragons",
      date: "2024-03-20",
      time: "18:00",
      type: "Friendly",
      status: "confirmed"
    },
    {
      id: 2,
      opponent: "City United",
      date: "2024-03-25",
      time: "19:30",
      type: "Tournament",
      status: "pending"
    },
    {
      id: 3,
      opponent: "Elite FC",
      date: "2024-03-30",
      time: "20:00",
      type: "League",
      status: "confirmed"
    }
  ];

  const recentTournaments = [
    {
      id: 1,
      name: isArabic ? "بطولة الربيع الكبرى" : "Grand Spring Tournament",
      status: "joined",
      startDate: "2024-04-01",
      position: "Semi-finals",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      id: 2,
      name: isArabic ? "كأس المدينة" : "City Cup",
      status: "invited",
      startDate: "2024-04-15",
      position: isArabic ? "دعوة" : "Invitation",
      color: "bg-orange-500/10 text-orange-600"
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      type: "team",
      title: isArabic ? "طلب انضمام لفريق" : "Team Join Request",
      description: isArabic ? "FC Stars يريد إضافتك" : "FC Stars wants to add you",
      date: "2 days ago"
    },
    {
      id: 2,
      type: "facility",
      title: isArabic ? "تأكيد حجز" : "Booking Confirmation",
      description: isArabic ? "ملعب الرياضة - يحتاج تأكيد" : "Sports Arena - needs confirmation",
      date: "3 days ago"
    },
    {
      id: 3,
      type: "academy",
      title: isArabic ? "قبول أكاديمية" : "Academy Acceptance",
      description: isArabic ? "تم قبولك في Elite Academy" : "You're accepted to Elite Academy",
      date: "1 week ago"
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "message",
      title: isArabic ? "رسالة جديدة" : "New Message",
      description: isArabic ? "منظمة البطولة" : "Tournament organizer",
      icon: Mail,
      count: 3,
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      id: 2,
      type: "sponsorship",
      title: isArabic ? "عرض رعاية" : "Sponsorship Offer",
      description: isArabic ? "Elite Sportswear" : "Elite Sportswear",
      icon: Briefcase,
      count: 1,
      color: "bg-green-500/10 text-green-600"
    },
    {
      id: 3,
      type: "team",
      title: isArabic ? "دعوة فريق" : "Team Invitation",
      description: isArabic ? "FC Stars" : "FC Stars",
      icon: Users,
      count: 2,
      color: "bg-purple-500/10 text-purple-600"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: isArabic ? "انتهت المباراة" : "Match Completed",
      description: isArabic ? "الفوز 3-1 ضد City United" : "Won 3-1 against City United",
      time: "2 hours ago",
      icon: Trophy,
      color: "text-green-600"
    },
    {
      id: 2,
      action: isArabic ? "انضمت لفريق" : "Joined Team",
      description: isArabic ? "FC Champions" : "FC Champions",
      time: "1 day ago",
      icon: Users,
      color: "text-blue-600"
    },
    {
      id: 3,
      action: isArabic ? "تم التسجيل" : "Registered",
      description: isArabic ? "بطولة الربيع الكبرى" : "Grand Spring Tournament",
      time: "3 days ago",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="h-full p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className={cn("text-3xl font-bold", isArabic && "font-arabic-heading")}>
          {isArabic ? "مرحباً بعودتك، أحمد!" : "Welcome back, Ahmed!"}
        </h1>
        <p className={cn("text-muted-foreground", isArabic && "font-arabic-body")}>
          {isArabic 
            ? "إليك نظرة عامة على نشاطك الرياضي اليوم"
            : "Here's an overview of your sports activity today"
          }
        </p>
      </div>

      {/* Player Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'المستوى' : 'Level'}
                </p>
                <p className={cn("text-3xl font-bold text-blue-600", isArabic && "font-arabic-heading")}>
                  {playerStats.level}
                </p>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(playerStats.xp / playerStats.maxXp) * 100}%` }}
                  />
                </div>
                <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                  {playerStats.xp}/{playerStats.maxXp} {isArabic ? 'نقطة' : 'XP'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'إجمالي المباريات' : 'Total Matches'}
                </p>
                <p className={cn("text-3xl font-bold text-green-600", isArabic && "font-arabic-heading")}>
                  {playerStats.matchesPlayed}
                </p>
                <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                  {playerStats.wins} {isArabic ? 'فوز' : 'wins'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'البطولات' : 'Tournaments'}
                </p>
                <p className={cn("text-3xl font-bold text-purple-600", isArabic && "font-arabic-heading")}>
                  {playerStats.tournaments}
                </p>
                <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                  {playerStats.wins} {isArabic ? 'فوز' : 'wins'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'الأرباح' : 'Total Earnings'}
                </p>
                <p className={cn("text-3xl font-bold text-orange-600", isArabic && "font-arabic-heading")}>
                  ${playerStats.totalEarnings.toLocaleString()}
                </p>
                <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                  {isArabic ? 'من البطولات والرعاية' : 'from tournaments & sponsorships'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                  {isArabic ? 'المباريات القادمة' : 'Upcoming Matches'}
                </CardTitle>
              </div>
              <Badge variant="secondary">{upcomingMatches.length}</Badge>
            </div>
            <CardDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'إدارة مبارياتك القادمة' : 'Manage your upcoming matches'}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-600" />
                <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                  {isArabic ? 'البطولات المسجلة' : 'Tournaments Joined'}
                </CardTitle>
              </div>
              <Badge variant="secondary">{recentTournaments.length}</Badge>
            </div>
            <CardDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'متابعة بطولاتك' : 'Track your tournaments'}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-orange-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                  {isArabic ? 'الطلبات المعلقة' : 'Pending Requests'}
                </CardTitle>
              </div>
              <Badge variant="secondary">{pendingRequests.length}</Badge>
            </div>
            <CardDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'الطلبات التي تحتاج رد' : 'Requests awaiting your response'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Matches */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between border-b">
            <div>
              <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
                <Calendar className="h-5 w-5" />
                {isArabic ? 'المباريات القادمة' : 'Upcoming Matches'}
              </CardTitle>
              <CardDescription className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'جدول مبارياتك القادمة' : 'Your upcoming match schedule'}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/player/tournaments">
                {isArabic ? 'عرض الكل' : 'View All'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      match.status === 'confirmed' && "bg-green-500/10 text-green-600",
                      match.status === 'pending' && "bg-yellow-500/10 text-yellow-600"
                    )}>
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className={cn("font-semibold", isArabic && "font-arabic-heading")}>
                        {match.opponent}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {match.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {match.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {match.type}
                    </Badge>
                    <Badge 
                      variant={match.status === 'confirmed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {match.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Summary */}
        <Card>
          <CardHeader className="flex items-center justify-between border-b">
            <div>
              <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
                <Bell className="h-5 w-5" />
                {isArabic ? 'الإشعارات' : 'Notifications'}
              </CardTitle>
              <CardDescription className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'ملخص الإشعارات الجديدة' : 'New notifications summary'}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className={cn("p-2 rounded-lg", notification.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-semibold", isArabic && "font-arabic-heading")}>
                        {notification.title}
                      </p>
                      <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                        {notification.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="min-w-[24px] justify-center">
                      {notification.count}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/player/messages">
                {isArabic ? 'عرض جميع الإشعارات' : 'View All Notifications'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
                <Award className="h-5 w-5" />
                {isArabic ? 'الإنجازات الأخيرة' : 'Recent Achievements'}
              </CardTitle>
              <CardDescription className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'إنجازاتك ومكافآتك الأخيرة' : 'Your recent achievements and rewards'}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              {isArabic ? 'عرض الكل' : 'View All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer",
                    achievement.color
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn("p-2 rounded-lg", achievement.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className={cn("font-semibold", isArabic && "font-arabic-heading")}>
                        {achievement.title}
                      </p>
                      <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                  <p className={cn("text-sm", isArabic && "font-arabic-body")}>
                    {achievement.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
              <Activity className="h-5 w-5" />
              {isArabic ? 'النشاط الأخير' : 'Recent Activity'}
            </CardTitle>
            <CardDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'آخر التحديثات والإجراءات' : 'Your latest updates and actions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className={cn("p-2 rounded-lg bg-muted", activity.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={cn("font-semibold", isArabic && "font-arabic-heading")}>
                        {activity.action}
                      </p>
                      <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                        {activity.description}
                      </p>
                      <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
              <AlertCircle className="h-5 w-5" />
              {isArabic ? 'الطلبات المعلقة' : 'Pending Requests'}
            </CardTitle>
            <CardDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic ? 'يتطلب ردك وموافقتك' : 'Requires your response and approval'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className={cn("font-semibold", isArabic && "font-arabic-heading")}>
                        {request.title}
                      </p>
                      <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                        {request.description}
                      </p>
                      <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                        {request.date}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {isArabic ? 'عرض' : 'View'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

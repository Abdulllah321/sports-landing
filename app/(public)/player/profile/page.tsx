"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  Camera,
  Trophy,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PlayerProfilePage() {
  const { locale } = useLanguage();
  const isArabic = locale === 'ar';
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Ahmed",
    lastName: "Mohamed",
    email: "ahmed.mohamed@example.com",
    phone: "+20 123 456 7890",
    dateOfBirth: "2000-05-15",
    gender: "Male",
    city: "Cairo",
    country: "Egypt",
    bio: "Passionate football player with 10+ years of experience. Currently training with Elite Football Academy and actively participating in local tournaments.",
    favoriteSport: "Football",
    level: "Professional",
    position: "Forward"
  });

  const stats = {
    level: 15,
    xp: 1250,
    nextLevelXp: 1500,
    tournaments: 12,
    wins: 8,
    winsRate: 67,
    rank: 45,
    totalPoints: 5450,
    streak: 15
  };

  const achievements = [
    { id: 1, title: isArabic ? 'أول بطولة' : 'First Tournament', description: isArabic ? 'شارك في أول بطولة' : 'Participated in first tournament', icon: Trophy, color: 'bg-yellow-500' },
    { id: 2, title: isArabic ? 'لاعب الشهر' : 'Player of the Month', description: isArabic ? 'حصل على لقب لاعب الشهر' : 'Achieved Player of the Month', icon: Award, color: 'bg-blue-500' },
    { id: 3, title: isArabic ? '10 فوز' : '10 Wins', description: isArabic ? 'حققت 10 انتصارات' : 'Achieved 10 wins', icon: Target, color: 'bg-green-500' },
    { id: 4, title: isArabic ? 'لاعب ذهبي' : 'Golden Player', description: isArabic ? 'وصل للمستوى الذهبي' : 'Reached golden level', icon: Star, color: 'bg-amber-500' }
  ];

  const recentActivity = [
    { id: 1, title: isArabic ? 'فاز ببطولة كرة القدم المحلية' : 'Won Local Football Tournament', date: '2 days ago', type: 'tournament' },
    { id: 2, title: isArabic ? 'انضم إلى أكاديمية النخبة' : 'Joined Elite Academy', date: '1 week ago', type: 'academy' },
    { id: 3, title: isArabic ? 'اكتمل التمرين اليومي' : 'Completed Daily Training', date: '3 days ago', type: 'training' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  return (
    <div className="h-full">
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={cn(
                "text-3xl font-bold text-foreground",
                isArabic ? 'font-arabic-heading' : 'font-mono tracking-wider'
              )}>
                {isArabic ? 'الملف الشخصي' : 'Profile'}
              </h1>
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                isArabic ? 'font-arabic-body' : ''
              )}>
                {isArabic ? 'إدارة معلوماتك الشخصية' : 'Manage your personal information'}
              </p>
            </div>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isArabic ? 'حفظ' : 'Save'}
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  {isArabic ? 'تعديل' : 'Edit'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">
              {isArabic ? 'المعلومات' : 'Information'}
            </TabsTrigger>
            <TabsTrigger value="stats">
              {isArabic ? 'الإحصائيات' : 'Statistics'}
            </TabsTrigger>
            <TabsTrigger value="achievements">
              {isArabic ? 'الإنجازات' : 'Achievements'}
            </TabsTrigger>
            <TabsTrigger value="activity">
              {isArabic ? 'النشاط' : 'Activity'}
            </TabsTrigger>
          </TabsList>

          {/* Information Tab */}
          <TabsContent value="info" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Profile Photo */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                    {isArabic ? 'الصورة الشخصية' : 'Profile Photo'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="text-2xl">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        {isArabic ? 'تغيير الصورة' : 'Change Photo'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                    {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                  </CardTitle>
                  <CardDescription className={cn(isArabic && 'font-arabic-body')}>
                    {isArabic ? 'تحديث معلوماتك الأساسية' : 'Update your basic information'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className={cn(isArabic && 'font-arabic-body')}>
                        {isArabic ? 'الاسم الأول' : 'First Name'}
                      </Label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className={cn(isArabic && 'font-arabic-body')}>
                        {isArabic ? 'اسم العائلة' : 'Last Name'}
                      </Label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isArabic && 'font-arabic-body')}>
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isArabic && 'font-arabic-body')}>
                      {isArabic ? 'رقم الهاتف' : 'Phone'}
                    </Label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className={cn(isArabic && 'font-arabic-body')}>
                        {isArabic ? 'تاريخ الميلاد' : 'Date of Birth'}
                      </Label>
                      <Input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className={cn(isArabic && 'font-arabic-body')}>
                        {isArabic ? 'الجنس' : 'Gender'}
                      </Label>
                      <Input
                        value={profileData.gender}
                        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isArabic && 'font-arabic-body')}>
                      {isArabic ? 'نبذة' : 'Bio'}
                    </Label>
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sports Information */}
            <Card>
              <CardHeader>
                <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                  {isArabic ? 'المعلومات الرياضية' : 'Sports Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className={cn(isArabic && 'font-arabic-body')}>
                    {isArabic ? 'الرياضة المفضلة' : 'Favorite Sport'}
                  </Label>
                  <Input
                    value={profileData.favoriteSport}
                    onChange={(e) => setProfileData({ ...profileData, favoriteSport: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={cn(isArabic && 'font-arabic-body')}>
                    {isArabic ? 'المستوى' : 'Level'}
                  </Label>
                  <Input
                    value={profileData.level}
                    onChange={(e) => setProfileData({ ...profileData, level: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={cn(isArabic && 'font-arabic-body')}>
                    {isArabic ? 'المركز' : 'Position'}
                  </Label>
                  <Input
                    value={profileData.position}
                    onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                    {isArabic ? 'المستوى والتقدم' : 'Level & Progress'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn("text-sm", isArabic && 'font-arabic-body')}>
                        {isArabic ? 'المستوى الحالي' : 'Current Level'}
                      </span>
                      <span className="text-2xl font-bold">{stats.level}</span>
                    </div>
                    <Progress value={(stats.xp / stats.nextLevelXp) * 100} />
                    <p className={cn("text-xs text-muted-foreground mt-2", isArabic && 'font-arabic-body')}>
                      {stats.xp} / {stats.nextLevelXp} {isArabic ? 'نقاط خبرة' : 'XP'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                    {isArabic ? 'البطولات' : 'Tournaments'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={cn("text-sm text-muted-foreground", isArabic && 'font-arabic-body')}>
                        {isArabic ? 'إجمالي' : 'Total'}
                      </p>
                      <p className="text-2xl font-bold">{stats.tournaments}</p>
                    </div>
                    <div>
                      <p className={cn("text-sm text-muted-foreground", isArabic && 'font-arabic-body')}>
                        {isArabic ? 'الفوز' : 'Wins'}
                      </p>
                      <p className="text-2xl font-bold text-green-600">{stats.wins}</p>
                    </div>
                  </div>
                  <div>
                    <p className={cn("text-sm text-muted-foreground", isArabic && 'font-arabic-body')}>
                      {isArabic ? 'نسبة الفوز' : 'Win Rate'}
                    </p>
                    <Progress value={stats.winsRate} className="mt-2" />
                    <p className={cn("text-xs text-muted-foreground mt-1", isArabic && 'font-arabic-body')}>
                      {stats.winsRate}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                    {isArabic ? 'الترتيب' : 'Ranking'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn("text-sm text-muted-foreground", isArabic && 'font-arabic-body')}>
                        {isArabic ? 'الترتيب العام' : 'Overall Rank'}
                      </p>
                      <p className="text-3xl font-bold">#{stats.rank}</p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                    {isArabic ? 'النقاط' : 'Points'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className={cn("text-sm text-muted-foreground", isArabic && 'font-arabic-body')}>
                      {isArabic ? 'إجمالي النقاط' : 'Total Points'}
                    </p>
                    <p className="text-3xl font-bold">{stats.totalPoints.toLocaleString()}</p>
                    <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                      {isArabic ? 'متتالية' : 'Streak'}: {stats.streak} {isArabic ? 'أيام' : 'days'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                  {isArabic ? 'الإنجازات' : 'Achievements'}
                </CardTitle>
                <CardDescription className={cn(isArabic && 'font-arabic-body')}>
                  {isArabic ? 'إنجازاتك وأوسمة الحصول عليها' : 'Your achievements and earned badges'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className={`p-3 rounded-lg ${achievement.color} text-white`}>
                        <achievement.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className={cn("font-semibold", isArabic && 'font-arabic-heading')}>
                          {achievement.title}
                        </h3>
                        <p className={cn("text-sm text-muted-foreground", isArabic && 'font-arabic-body')}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                  {isArabic ? 'النشاط الأخير' : 'Recent Activity'}
                </CardTitle>
                <CardDescription className={cn(isArabic && 'font-arabic-body')}>
                  {isArabic ? 'آخر أنشطتك على المنصة' : 'Your recent platform activities'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1 space-y-1">
                        <p className={cn("font-medium", isArabic && 'font-arabic-body')}>
                          {activity.title}
                        </p>
                        <p className={cn("text-sm text-muted-foreground", isArabic && 'font-arabic-body')}>
                          {activity.date}
                        </p>
                      </div>
                    </div>
                    {index < recentActivity.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

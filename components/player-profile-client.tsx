"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Trophy, 
  Star,
  Edit,
  Save,
  Camera,
  Settings,
  Shield,
  Bell,
  Globe,
  Heart,
  MessageSquare,
  Share2
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Image from "next/image";

interface PlayerProfileClientProps {
  locale: Locale;
}

export function PlayerProfileClient({ locale }: PlayerProfileClientProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const isArabic = locale === 'ar';

  // Mock data for player profile
  const playerData = {
    name: isArabic ? "أحمد محمد علي" : "Ahmed Mohamed Ali",
    email: "ahmed.mohamed@example.com",
    phone: "+20 123 456 7890",
    location: isArabic ? "القاهرة، مصر" : "Cairo, Egypt",
    dateOfBirth: "1995-03-15",
    sport: isArabic ? "كرة القدم" : "Football",
    position: isArabic ? "مهاجم" : "Forward",
    level: "Professional",
    academy: isArabic ? "أكاديمية النخبة" : "Elite Academy",
    joinDate: "2023-01-15",
    bio: isArabic ? "لاعب كرة قدم محترف مع خبرة 8 سنوات في اللعب على المستوى المحلي والدولي" : "Professional football player with 8 years of experience playing at local and international levels",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=300&fit=crop",
    stats: {
      matches: 45,
      goals: 23,
      assists: 12,
      rating: 4.8
    },
    achievements: [
      { id: 1, title: isArabic ? "أفضل لاعب في الموسم" : "Player of the Season", year: "2023" },
      { id: 2, title: isArabic ? "هداف البطولة" : "Tournament Top Scorer", year: "2023" },
      { id: 3, title: isArabic ? "كأس البطولة" : "Championship Cup", year: "2022" }
    ],
    socialStats: {
      followers: 1250,
      following: 340,
      posts: 89,
      likes: 2340
    }
  };

  const recentPosts = [
    {
      id: 1,
      content: isArabic ? "فزت ببطولة كرة القدم المحلية اليوم! 🏆" : "Won the local football tournament today! 🏆",
      time: "2 hours ago",
      likes: 45,
      comments: 12,
      shares: 8
    },
    {
      id: 2,
      content: isArabic ? "تدريب صباحي رائع مع الفريق" : "Great morning training with the team",
      time: "1 day ago",
      likes: 23,
      comments: 5,
      shares: 3
    }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="relative h-64">
          <Image
            src={playerData.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end space-x-4">
              <div className="relative">
                <Image
                  src={playerData.avatar}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white"
                />
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 text-white">
                <h1 className={`text-3xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {playerData.name}
                </h1>
                <p className={`text-lg ${isArabic ? 'font-arabic-body' : ''}`}>
                  {playerData.sport} • {playerData.position}
                </p>
                <p className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                  {playerData.academy}
                </p>
              </div>
              <div className="text-right text-white">
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Edit className="h-4 w-4 mr-2" />
                  {isArabic ? 'تعديل' : 'Edit'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">
            {isArabic ? 'الملف الشخصي' : 'Profile'}
          </TabsTrigger>
          <TabsTrigger value="stats">
            {isArabic ? 'الإحصائيات' : 'Stats'}
          </TabsTrigger>
          <TabsTrigger value="posts">
            {isArabic ? 'المنشورات' : 'Posts'}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {isArabic ? 'الإعدادات' : 'Settings'}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'المعلومات الأساسية' : 'Basic Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
                  </Label>
                  <Input
                    value={playerData.name}
                    disabled={!isEditing}
                    className={isArabic ? 'font-arabic-body' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </Label>
                  <Input
                    value={playerData.email}
                    disabled={!isEditing}
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'رقم الهاتف' : 'Phone'}
                  </Label>
                  <Input
                    value={playerData.phone}
                    disabled={!isEditing}
                    type="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الموقع' : 'Location'}
                  </Label>
                  <Input
                    value={playerData.location}
                    disabled={!isEditing}
                    className={isArabic ? 'font-arabic-body' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'تاريخ الميلاد' : 'Date of Birth'}
                  </Label>
                  <Input
                    value={playerData.dateOfBirth}
                    disabled={!isEditing}
                    type="date"
                  />
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <Button onClick={() => setIsEditing(false)} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {isArabic ? 'حفظ' : 'Save'}
                    </Button>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      {isArabic ? 'تعديل' : 'Edit'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sports Info */}
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'المعلومات الرياضية' : 'Sports Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الرياضة' : 'Sport'}
                  </Label>
                  <Input
                    value={playerData.sport}
                    disabled={!isEditing}
                    className={isArabic ? 'font-arabic-body' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'المركز' : 'Position'}
                  </Label>
                  <Input
                    value={playerData.position}
                    disabled={!isEditing}
                    className={isArabic ? 'font-arabic-body' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'المستوى' : 'Level'}
                  </Label>
                  <Input
                    value={playerData.level}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الأكاديمية' : 'Academy'}
                  </Label>
                  <Input
                    value={playerData.academy}
                    disabled={!isEditing}
                    className={isArabic ? 'font-arabic-body' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'تاريخ الانضمام' : 'Join Date'}
                  </Label>
                  <Input
                    value={playerData.joinDate}
                    disabled={!isEditing}
                    type="date"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'نبذة شخصية' : 'Bio'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={playerData.bio}
                  disabled={!isEditing}
                  className={`min-h-32 ${isArabic ? 'font-arabic-body' : ''}`}
                  placeholder={isArabic ? 'اكتب نبذة عن نفسك...' : 'Write about yourself...'}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'المباريات' : 'Matches'}
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {playerData.stats.matches}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'الأهداف' : 'Goals'}
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {playerData.stats.goals}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'المساعدات' : 'Assists'}
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {playerData.stats.assists}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'التقييم' : 'Rating'}
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {playerData.stats.rating}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'الإنجازات' : 'Achievements'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerData.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-yellow-500/10">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {achievement.year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Posts Tab */}
        <TabsContent value="posts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'المنشورات الأخيرة' : 'Recent Posts'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-lg border">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={playerData.avatar}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                            {playerData.name}
                          </h4>
                          <span className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                            {post.time}
                          </span>
                        </div>
                        <p className={`mt-2 ${isArabic ? 'font-arabic-body' : ''}`}>
                          {post.content}
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            {post.shares}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'إعدادات الحساب' : 'Account Settings'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
                    </h4>
                    <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'تحديث كلمة المرور لحسابك' : 'Update your account password'}
                    </p>
                  </div>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    {isArabic ? 'تغيير' : 'Change'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'إعدادات الإشعارات' : 'Notification Settings'}
                    </h4>
                    <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'إدارة إشعاراتك' : 'Manage your notifications'}
                    </p>
                  </div>
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    {isArabic ? 'إعدادات' : 'Settings'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'الخصوصية' : 'Privacy'}
                    </h4>
                    <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'إعدادات الخصوصية والأمان' : 'Privacy and security settings'}
                    </p>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    {isArabic ? 'إعدادات' : 'Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>

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
                  <span className="font-bold">{playerData.socialStats.followers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'المتابعون' : 'Following'}
                  </span>
                  <span className="font-bold">{playerData.socialStats.following.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'المنشورات' : 'Posts'}
                  </span>
                  <span className="font-bold">{playerData.socialStats.posts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الإعجابات' : 'Likes'}
                  </span>
                  <span className="font-bold">{playerData.socialStats.likes.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

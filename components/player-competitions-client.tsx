"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Award, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  XCircle,
  Play,
  BarChart3,
  Target,
  Calendar
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";

interface PlayerCompetitionsClientProps {
  locale: Locale;
}

export function PlayerCompetitionsClient({ locale }: PlayerCompetitionsClientProps) {
  const [activeTab, setActiveTab] = useState("available");
  const isArabic = locale === 'ar';

  // Mock data for competitions
  const competitions = [
    {
      id: 1,
      title: isArabic ? "مسابقة قوانين كرة القدم" : "Football Rules Quiz",
      category: isArabic ? "قوانين الرياضة" : "Sports Rules",
      difficulty: "medium",
      questions: 20,
      timeLimit: 30,
      participants: 1250,
      prize: 500,
      endDate: "2024-03-20",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      description: isArabic ? "اختبر معرفتك بقوانين كرة القدم" : "Test your knowledge of football rules",
      isCompleted: false,
      score: null,
      maxScore: 20
    },
    {
      id: 2,
      title: isArabic ? "التغذية الرياضية" : "Sports Nutrition",
      category: isArabic ? "التغذية" : "Nutrition",
      difficulty: "hard",
      questions: 25,
      timeLimit: 45,
      participants: 890,
      prize: 750,
      endDate: "2024-03-25",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      description: isArabic ? "تعرف على أساسيات التغذية الرياضية" : "Learn the basics of sports nutrition",
      isCompleted: true,
      score: 18,
      maxScore: 25
    },
    {
      id: 3,
      title: isArabic ? "تاريخ الرياضة" : "Sports History",
      category: isArabic ? "التاريخ" : "History",
      difficulty: "easy",
      questions: 15,
      timeLimit: 20,
      participants: 2100,
      prize: 300,
      endDate: "2024-03-30",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: isArabic ? "اكتشف تاريخ الرياضة العالمية" : "Discover the history of world sports",
      isCompleted: false,
      score: null,
      maxScore: 15
    }
  ];

  const myStats = {
    totalCompetitions: 12,
    completedCompetitions: 8,
    averageScore: 85,
    totalPoints: 2450,
    rank: 15
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            {isArabic ? 'سهل' : 'Easy'}
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            {isArabic ? 'متوسط' : 'Medium'}
          </Badge>
        );
      case "hard":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            {isArabic ? 'صعب' : 'Hard'}
          </Badge>
        );
      default:
        return null;
    }
  };

  const availableCompetitions = competitions.filter(c => !c.isCompleted);
  const completedCompetitions = competitions.filter(c => c.isCompleted);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'المسابقات المكتملة' : 'Completed'}
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {myStats.completedCompetitions}
            </div>
            <p className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'من أصل' : 'out of'} {myStats.totalCompetitions}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'متوسط النقاط' : 'Average Score'}
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {myStats.averageScore}%
            </div>
            <Progress value={myStats.averageScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'إجمالي النقاط' : 'Total Points'}
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {myStats.totalPoints.toLocaleString()}
            </div>
            <p className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'الترتيب' : 'Rank'}: #{myStats.rank}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'المسابقات النشطة' : 'Active'}
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
              {availableCompetitions.length}
            </div>
            <p className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'متاحة للمشاركة' : 'available to join'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">
            {isArabic ? 'المتاحة' : 'Available'}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {isArabic ? 'المكتملة' : 'Completed'}
          </TabsTrigger>
          <TabsTrigger value="leaderboard">
            {isArabic ? 'لوحة المتصدرين' : 'Leaderboard'}
          </TabsTrigger>
        </TabsList>

        {/* Available Competitions Tab */}
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCompetitions.map((competition) => (
              <Card key={competition.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={competition.image}
                    alt={competition.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {getDifficultyBadge(competition.difficulty)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                      <Trophy className="h-3 w-3 text-yellow-400" />
                      <span className="text-white text-xs font-medium">
                        ${competition.prize}
                      </span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className={`text-xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {competition.title}
                    </CardTitle>
                    <CardDescription className={`mt-1 ${isArabic ? 'font-arabic-body' : ''}`}>
                      {competition.description}
                    </CardDescription>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'الأسئلة' : 'Questions'}
                      </span>
                      <span className="font-bold">{competition.questions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'الوقت المحدد' : 'Time Limit'}
                      </span>
                      <span className="font-bold">{competition.timeLimit} {isArabic ? 'دقيقة' : 'min'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'المشاركون' : 'Participants'}
                      </span>
                      <span className="font-bold">{competition.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'ينتهي في' : 'Ends on'}
                      </span>
                      <span className="font-bold">{competition.endDate}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    {isArabic ? 'ابدأ المسابقة' : 'Start Competition'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Competitions Tab */}
        <TabsContent value="completed" className="space-y-6">
          <div className="space-y-4">
            {completedCompetitions.map((competition) => (
              <Card key={competition.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={competition.image}
                          alt={competition.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {competition.title}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {competition.category} • {competition.questions} {isArabic ? 'سؤال' : 'questions'}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getDifficultyBadge(competition.difficulty)}
                          <Badge variant="secondary">
                            {isArabic ? 'مكتمل' : 'Completed'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold text-green-500 ${isArabic ? 'font-arabic-heading' : ''}`}>
                        {competition.score}/{competition.maxScore}
                      </div>
                      <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {Math.round((competition.score! / competition.maxScore) * 100)}%
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        {isArabic ? 'عرض النتائج' : 'View Results'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'لوحة المتصدرين' : 'Leaderboard'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'أفضل اللاعبين في المسابقات' : 'Top players in competitions'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: isArabic ? 'أحمد محمد' : 'Ahmed Mohamed', points: 3450, competitions: 15 },
                  { rank: 2, name: isArabic ? 'سارة أحمد' : 'Sara Ahmed', points: 3200, competitions: 12 },
                  { rank: 3, name: isArabic ? 'محمد علي' : 'Mohamed Ali', points: 3100, competitions: 14 },
                  { rank: 4, name: isArabic ? 'فاطمة حسن' : 'Fatima Hassan', points: 2950, competitions: 11 },
                  { rank: 5, name: isArabic ? 'علي محمود' : 'Ali Mahmoud', points: 2800, competitions: 13 }
                ].map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        player.rank <= 3 ? 'bg-yellow-500 text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {player.rank}
                      </div>
                      <div>
                        <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {player.name}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {player.competitions} {isArabic ? 'مسابقة' : 'competitions'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                        {player.points.toLocaleString()}
                      </div>
                      <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic ? 'نقطة' : 'points'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

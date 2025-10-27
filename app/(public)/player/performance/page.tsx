"use client";

import { useLanguage } from "@/lib/translation-context";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp, Activity } from "lucide-react";

export default function PlayerPerformancePage() {
  const { locale } = useLanguage();
  const isArabic = locale === 'ar';

  const matchStats = {
    totalMatches: 45,
    wins: 32,
    losses: 10,
    draws: 3,
    winRate: 71,
    goals: 28,
    assists: 12,
    goalsPerMatch: 0.62,
    assistsPerMatch: 0.27
  };

  const skillProgress = {
    shooting: 85,
    passing: 78,
    dribbling: 82,
    defending: 70,
    speed: 88,
    stamina: 75
  };

  const trainingLogs = [
    { date: "2024-03-15", duration: "90 min", type: "Shooting Training", completed: true },
    { date: "2024-03-14", duration: "120 min", type: "Tactical Session", completed: true },
    { date: "2024-03-13", duration: "60 min", type: "Strength & Conditioning", completed: true },
    { date: "2024-03-12", duration: "90 min", type: "Match Practice", completed: true }
  ];

  return (
    <div className="h-full">
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-6">
          <h1 className={cn(
            "text-3xl font-bold text-foreground",
            isArabic ? 'font-arabic-heading' : 'font-mono tracking-wider'
          )}>
            {isArabic ? 'الأداء' : 'Performance'}
          </h1>
          <p className={cn(
            "text-sm text-muted-foreground mt-1",
            isArabic ? 'font-arabic-body' : ''
          )}>
            {isArabic ? 'تحليل أدائك وتطوير مهاراتك' : 'Analyze your performance and develop your skills'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="matches">
              {isArabic ? 'إحصائيات المباريات' : 'Match Stats'}
            </TabsTrigger>
            <TabsTrigger value="skills">
              {isArabic ? 'تقدم المهارات' : 'Skill Progress'}
            </TabsTrigger>
            <TabsTrigger value="training">
              {isArabic ? 'سجل التدريب' : 'Training Log'}
            </TabsTrigger>
          </TabsList>

          {/* Match Stats */}
          <TabsContent value="matches" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={cn("text-sm font-medium", isArabic && 'font-arabic-body')}>
                    {isArabic ? 'إجمالي المباريات' : 'Total Matches'}
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={cn("text-2xl font-bold", isArabic && 'font-arabic-heading')}>
                    {matchStats.totalMatches}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={cn("text-sm font-medium", isArabic && 'font-arabic-body')}>
                    {isArabic ? 'الفوز' : 'Wins'}
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={cn("text-2xl font-bold", isArabic && 'font-arabic-heading')}>
                    {matchStats.wins}
                  </div>
                  <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                    {matchStats.winRate}% {isArabic ? 'نسبة الفوز' : 'Win Rate'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={cn("text-sm font-medium", isArabic && 'font-arabic-body')}>
                    {isArabic ? 'الأهداف' : 'Goals'}
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={cn("text-2xl font-bold", isArabic && 'font-arabic-heading')}>
                    {matchStats.goals}
                  </div>
                  <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                    {matchStats.goalsPerMatch.toFixed(2)} {isArabic ? 'لكل مباراة' : 'Per Match'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={cn("text-sm font-medium", isArabic && 'font-arabic-body')}>
                    {isArabic ? 'المساعدات' : 'Assists'}
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={cn("text-2xl font-bold", isArabic && 'font-arabic-heading')}>
                    {matchStats.assists}
                  </div>
                  <p className={cn("text-xs text-muted-foreground", isArabic && 'font-arabic-body')}>
                    {matchStats.assistsPerMatch.toFixed(2)} {isArabic ? 'لكل مباراة' : 'Per Match'}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                  {isArabic ? 'سجل المباريات' : 'Match Record'}
                </CardTitle>
                <CardDescription className={cn(isArabic && 'font-arabic-body')}>
                  {isArabic ? 'تخطيط أدائك في المباريات' : 'Overview of your match performance'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("text-sm", isArabic && 'font-arabic-body')}>
                      {isArabic ? 'الفوز' : 'Wins'}
                    </span>
                    <span className={cn("text-sm font-medium", isArabic && 'font-arabic-body')}>
                      {matchStats.wins} ({matchStats.winRate}%)
                    </span>
                  </div>
                  <Progress value={matchStats.winRate} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("text-sm", isArabic && 'font-arabic-body')}>
                      {isArabic ? 'الخسارة' : 'Losses'}
                    </span>
                    <span className={cn("text-sm font-medium", isArabic && 'font-arabic-body')}>
                      {matchStats.losses}
                    </span>
                  </div>
                  <Progress value={(matchStats.losses / matchStats.totalMatches) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("text-sm", isArabic && 'font-arabic-body')}>
                      {isArabic ? 'التعادل' : 'Draws'}
                    </span>
                    <span className={cn("text-sm font-medium", isArabic && 'font-arabic-body')}>
                      {matchStats.draws}
                    </span>
                  </div>
                  <Progress value={(matchStats.draws / matchStats.totalMatches) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skill Progress */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                  {isArabic ? 'تقدم المهارات' : 'Skill Progress'}
                </CardTitle>
                <CardDescription className={cn(isArabic && 'font-arabic-body')}>
                  {isArabic ? 'تتبع تطوير مهاراتك' : 'Track your skill development'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(skillProgress).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn("text-sm font-medium capitalize", isArabic && 'font-arabic-body')}>
                        {skill}
                      </span>
                      <span className={cn("text-sm font-medium", isArabic && 'font-arabic-body')}>
                        {value}%
                      </span>
                    </div>
                    <Progress value={value} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Log */}
          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className={cn(isArabic && 'font-arabic-heading')}>
                  {isArabic ? 'سجل التدريب' : 'Training Log'}
                </CardTitle>
                <CardDescription className={cn(isArabic && 'font-arabic-body')}>
                  {isArabic ? 'آخر جلسات التدريب' : 'Recent training sessions'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <p className={cn("font-medium", isArabic && 'font-arabic-body')}>
                          {log.type}
                        </p>
                        <p className={cn("text-sm text-muted-foreground", isArabic && 'font-arabic-body')}>
                          {log.date} • {log.duration}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {isArabic ? 'مكتمل' : 'Completed'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


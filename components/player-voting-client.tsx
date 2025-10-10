"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Vote, 
  BarChart3, 
  Clock, 
  Users, 
  CheckCircle,
  Calendar,
  TrendingUp
} from "lucide-react";
import { Locale } from "@/lib/i18n";

interface PlayerVotingClientProps {
  locale: Locale;
}

export function PlayerVotingClient({ locale }: PlayerVotingClientProps) {
  const [activeTab, setActiveTab] = useState("active");
  const isArabic = locale === 'ar';

  // Mock data for polls
  const polls = [
    {
      id: 1,
      title: isArabic ? "أفضل لاعب في الموسم الحالي" : "Best Player of Current Season",
      description: isArabic ? "من هو أفضل لاعب كرة قدم في الموسم الحالي؟" : "Who is the best football player this season?",
      options: [
        { id: 1, text: isArabic ? "محمد صلاح" : "Mohamed Salah", votes: 45, percentage: 45 },
        { id: 2, text: isArabic ? "كريستيانو رونالدو" : "Cristiano Ronaldo", votes: 30, percentage: 30 },
        { id: 3, text: isArabic ? "ليونيل ميسي" : "Lionel Messi", votes: 25, percentage: 25 }
      ],
      totalVotes: 100,
      endDate: "2024-03-25",
      status: "active",
      category: isArabic ? "كرة القدم" : "Football"
    },
    {
      id: 2,
      title: isArabic ? "أفضل أكاديمية رياضية" : "Best Sports Academy",
      description: isArabic ? "أي أكاديمية تقدم أفضل برامج تدريبية؟" : "Which academy offers the best training programs?",
      options: [
        { id: 1, text: isArabic ? "أكاديمية النخبة" : "Elite Academy", votes: 60, percentage: 60 },
        { id: 2, text: isArabic ? "أكاديمية النجوم" : "Stars Academy", votes: 25, percentage: 25 },
        { id: 3, text: isArabic ? "أكاديمية الأبطال" : "Champions Academy", votes: 15, percentage: 15 }
      ],
      totalVotes: 80,
      endDate: "2024-03-20",
      status: "active",
      category: isArabic ? "الأكاديميات" : "Academies"
    },
    {
      id: 3,
      title: isArabic ? "أفضل مرفق رياضي" : "Best Sports Facility",
      description: isArabic ? "أي مرفق رياضي تفضل للتدريب؟" : "Which sports facility do you prefer for training?",
      options: [
        { id: 1, text: isArabic ? "الملعب الرئيسي" : "Main Stadium", votes: 40, percentage: 40 },
        { id: 2, text: isArabic ? "صالة الألعاب" : "Sports Hall", votes: 35, percentage: 35 },
        { id: 3, text: isArabic ? "الملعب الخارجي" : "Outdoor Field", votes: 25, percentage: 25 }
      ],
      totalVotes: 120,
      endDate: "2024-03-15",
      status: "completed",
      category: isArabic ? "المرافق" : "Facilities"
    }
  ];

  const activePolls = polls.filter(p => p.status === "active");
  const completedPolls = polls.filter(p => p.status === "completed");

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            {isArabic ? 'نشط' : 'Active'}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {isArabic ? 'مكتمل' : 'Completed'}
          </TabsTrigger>
        </TabsList>

        {/* Active Polls Tab */}
        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activePolls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {poll.title}
                    </CardTitle>
                    <Badge variant="secondary">
                      {poll.category}
                    </Badge>
                  </div>
                  <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                    {poll.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {poll.options.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                            {option.text}
                          </span>
                          <span className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                            {option.percentage}%
                          </span>
                        </div>
                        <Progress value={option.percentage} className="h-2" />
                        <div className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {option.votes} {isArabic ? 'صوت' : 'votes'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {poll.totalVotes} {isArabic ? 'إجمالي الأصوات' : 'total votes'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'ينتهي في' : 'Ends'} {poll.endDate}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Vote className="h-4 w-4 mr-2" />
                    {isArabic ? 'تصويت' : 'Vote'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Polls Tab */}
        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedPolls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {poll.title}
                    </CardTitle>
                    <Badge variant="outline">
                      {isArabic ? 'مكتمل' : 'Completed'}
                    </Badge>
                  </div>
                  <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                    {poll.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {poll.options.map((option, index) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                            {option.text}
                          </span>
                          <span className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                            {option.percentage}%
                          </span>
                        </div>
                        <Progress value={option.percentage} className="h-2" />
                        <div className={`text-xs text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {option.votes} {isArabic ? 'صوت' : 'votes'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {poll.totalVotes} {isArabic ? 'إجمالي الأصوات' : 'total votes'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'مكتمل' : 'Completed'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

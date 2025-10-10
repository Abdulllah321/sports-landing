"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Clock, 
  Users, 
  CheckCircle,
  Calendar,
  Star,
  Award
} from "lucide-react";
import { Locale } from "@/lib/i18n";

interface PlayerSurveysClientProps {
  locale: Locale;
}

export function PlayerSurveysClient({ locale }: PlayerSurveysClientProps) {
  const [activeTab, setActiveTab] = useState("available");
  const isArabic = locale === 'ar';

  // Mock data for surveys
  const surveys = [
    {
      id: 1,
      title: isArabic ? "تقييم تجربة المستخدم" : "User Experience Evaluation",
      description: isArabic ? "ساعدنا في تحسين تجربة المستخدم على المنصة" : "Help us improve the user experience on the platform",
      questions: 15,
      estimatedTime: 10,
      participants: 450,
      reward: 100,
      endDate: "2024-03-30",
      status: "active",
      category: isArabic ? "التطوير" : "Development"
    },
    {
      id: 2,
      title: isArabic ? "رأيك في الأكاديميات الرياضية" : "Your Opinion on Sports Academies",
      description: isArabic ? "شاركنا رأيك حول الأكاديميات الرياضية" : "Share your opinion about sports academies",
      questions: 20,
      estimatedTime: 15,
      participants: 320,
      reward: 150,
      endDate: "2024-03-25",
      status: "active",
      category: isArabic ? "الأكاديميات" : "Academies"
    },
    {
      id: 3,
      title: isArabic ? "تقييم المرافق الرياضية" : "Sports Facilities Evaluation",
      description: isArabic ? "قيم المرافق الرياضية التي استخدمتها" : "Evaluate the sports facilities you've used",
      questions: 12,
      estimatedTime: 8,
      participants: 280,
      reward: 80,
      endDate: "2024-03-20",
      status: "completed",
      category: isArabic ? "المرافق" : "Facilities"
    }
  ];

  const availableSurveys = surveys.filter(s => s.status === "active");
  const completedSurveys = surveys.filter(s => s.status === "completed");

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">
            {isArabic ? 'متاح' : 'Available'}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {isArabic ? 'مكتمل' : 'Completed'}
          </TabsTrigger>
        </TabsList>

        {/* Available Surveys Tab */}
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableSurveys.map((survey) => (
              <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {survey.title}
                    </CardTitle>
                    <Badge variant="secondary">
                      {survey.category}
                    </Badge>
                  </div>
                  <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                    {survey.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold text-primary ${isArabic ? 'font-arabic-heading' : ''}`}>
                        {survey.questions}
                      </div>
                      <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic ? 'أسئلة' : 'Questions'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold text-primary ${isArabic ? 'font-arabic-heading' : ''}`}>
                        {survey.estimatedTime}
                      </div>
                      <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic ? 'دقائق' : 'Minutes'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'المشاركون' : 'Participants'}
                      </span>
                      <span className="font-bold">{survey.participants}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'المكافأة' : 'Reward'}
                      </span>
                      <span className="font-bold text-green-500">{survey.reward} {isArabic ? 'نقطة' : 'points'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'ينتهي في' : 'Ends on'}
                      </span>
                      <span className="font-bold">{survey.endDate}</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    {isArabic ? 'ابدأ الاستطلاع' : 'Start Survey'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Surveys Tab */}
        <TabsContent value="completed" className="space-y-6">
          <div className="space-y-4">
            {completedSurveys.map((survey) => (
              <Card key={survey.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-green-500/10">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {survey.title}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {survey.category} • {survey.questions} {isArabic ? 'أسئلة' : 'questions'}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">
                            {isArabic ? 'مكتمل' : 'Completed'}
                          </Badge>
                          <span className={`text-sm text-green-500 ${isArabic ? 'font-arabic-body' : ''}`}>
                            +{survey.reward} {isArabic ? 'نقطة' : 'points'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold text-green-500 ${isArabic ? 'font-arabic-heading' : ''}`}>
                        {survey.reward}
                      </div>
                      <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic ? 'نقطة مكتسبة' : 'points earned'}
                      </div>
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

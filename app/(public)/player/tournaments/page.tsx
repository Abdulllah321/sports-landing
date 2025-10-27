"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/translation-context";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy,
  Calendar,
  MapPin,
  Users,
  Award,
  Clock,
  Star,
  ArrowRight,
  Target,
  CheckCircle
} from "lucide-react";

export default function PlayerTournamentsPage() {
  const { locale } = useLanguage();
  const isArabic = locale === 'ar';
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock tournament data for the player
  const tournaments = {
    upcoming: [
      {
        id: 1,
        name: isArabic ? "بطولة كأس الربيع 2024" : "Spring Cup 2024",
        sport: "Football",
        location: isArabic ? "الملعب الدولي" : "International Stadium",
        date: "2024-04-15",
        participants: 24,
        status: "registered",
        type: "Tournament",
        prize: "$5,000",
        description: isArabic 
          ? "بطولة إقليمية لكرة القدم - ابدأ تحضيراتك!" 
          : "Regional football tournament - Start your preparations!",
        registeredDate: "2024-02-10"
      },
      {
        id: 2,
        name: isArabic ? "بطولة الشباب الدولية" : "International Youth Championship",
        sport: "Football",
        location: isArabic ? "أكاديمية النخبة" : "Elite Academy",
        date: "2024-05-20",
        participants: 16,
        status: "registered",
        type: "Championship",
        prize: "$3,000",
        description: isArabic 
          ? "بطولة دولية للشباب تحت 21 سنة" 
          : "International youth tournament for under 21",
        registeredDate: "2024-01-15"
      }
    ],
    active: [
      {
        id: 3,
        name: isArabic ? "دوري المحترفين الأسبوعي" : "Weekly Pro League",
        sport: "Football",
        location: isArabic ? "مركز المدينة الرياضي" : "City Sports Center",
        date: "2024-03-25",
        participants: 8,
        status: "ongoing",
        type: "League",
        prize: "$1,500",
        description: isArabic 
          ? "دوري أسبوعي للمحترفين - الجولة الثانية" 
          : "Weekly professional league - Round 2",
        currentRound: 2,
        totalRounds: 4,
        yourTeam: "FC Stars"
      }
    ],
    past: [
      {
        id: 4,
        name: isArabic ? "بطولة كأس المدينة الشتوية" : "Winter City Cup 2023",
        sport: "Football",
        location: isArabic ? "الملعب الوطني" : "National Stadium",
        date: "2023-12-20",
        participants: 32,
        status: "completed",
        type: "Cup",
        prize: "$10,000",
        description: isArabic 
          ? "بطولة شتوية كبيرة" 
          : "Major winter tournament",
        yourPosition: 1,
        totalPositions: 32,
        matchesPlayed: 5,
        goalsScored: 8,
        trophies: ["🏆 Winner", "⚽ Top Scorer"]
      },
      {
        id: 5,
        name: isArabic ? "بطولة الصيف الخيرية" : "Summer Charity Tournament",
        sport: "Football",
        location: isArabic ? "ملعب النادي" : "Club Stadium",
        date: "2023-08-15",
        participants: 20,
        status: "completed",
        type: "Charity Tournament",
        prize: "$2,000",
        description: isArabic 
          ? "بطولة خيرية صيفية" 
          : "Summer charity tournament",
        yourPosition: 5,
        totalPositions: 20,
        matchesPlayed: 4,
        goalsScored: 3,
        trophies: []
      },
      {
        id: 6,
        name: isArabic ? "بطولة النخبة السنوية" : "Elite Annual Tournament",
        sport: "Football",
        location: isArabic ? "أكاديمية النخبة" : "Elite Academy",
        date: "2023-06-10",
        participants: 12,
        status: "completed",
        type: "Championship",
        prize: "$4,000",
        description: isArabic 
          ? "بطولة الأكاديمية السنوية" 
          : "Annual academy championship",
        yourPosition: 3,
        totalPositions: 12,
        matchesPlayed: 3,
        goalsScored: 5,
        trophies: ["🥉 Third Place"]
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registered":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{isArabic ? 'مسجل' : 'Registered'}</Badge>;
      case "ongoing":
        return <Badge className="bg-green-500 hover:bg-green-600">{isArabic ? 'جاري' : 'Ongoing'}</Badge>;
      case "completed":
        return <Badge className="bg-gray-500 hover:bg-gray-600">{isArabic ? 'منتهية' : 'Completed'}</Badge>;
      default:
        return null;
    }
  };

  const getSportIcon = (sport: string) => {
    return <Trophy className="h-5 w-5 text-primary" />;
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
                {isArabic ? 'البطولات' : 'My Tournaments'}
              </h1>
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                isArabic ? 'font-arabic-body' : ''
              )}>
                {isArabic ? 'إدارة مشاركاتك في البطولات' : 'Manage your tournament participations'}
              </p>
            </div>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              {isArabic ? 'تصفح البطولات' : 'Browse Tournaments'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">
              {isArabic ? 'القادمة' : 'Upcoming'} ({tournaments.upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              {isArabic ? 'الجارية' : 'Active'} ({tournaments.active.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              {isArabic ? 'المنتهية' : 'Past'} ({tournaments.past.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Tournaments */}
          <TabsContent value="upcoming" className="space-y-4">
            {tournaments.upcoming.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 rounded-lg bg-primary/10">
                        {getSportIcon(tournament.sport)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className={cn(
                            "text-lg font-semibold",
                            isArabic ? 'font-arabic-heading' : ''
                          )}>
                            {tournament.name}
                          </h3>
                          {getStatusBadge(tournament.status)}
                        </div>
                        <p className={cn(
                          "text-sm text-muted-foreground",
                          isArabic ? 'font-arabic-body' : ''
                        )}>
                          {tournament.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{tournament.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{tournament.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{tournament.participants} {isArabic ? 'مشارك' : 'participants'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4" />
                            <span>{tournament.prize}</span>
                          </div>
                        </div>
                        <p className={cn(
                          "text-xs text-muted-foreground",
                          isArabic ? 'font-arabic-body' : ''
                        )}>
                          {isArabic ? 'تاريخ التسجيل' : 'Registered on'} {tournament.registeredDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Active Tournaments */}
          <TabsContent value="active" className="space-y-4">
            {tournaments.active.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-md transition-shadow border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 rounded-lg bg-green-500/10">
                        {getSportIcon(tournament.sport)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className={cn(
                            "text-lg font-semibold",
                            isArabic ? 'font-arabic-heading' : ''
                          )}>
                            {tournament.name}
                          </h3>
                          {getStatusBadge(tournament.status)}
                        </div>
                        <p className={cn(
                          "text-sm text-muted-foreground",
                          isArabic ? 'font-arabic-body' : ''
                        )}>
                          {tournament.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{tournament.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{tournament.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{tournament.yourTeam}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className={cn(
                            "text-sm font-medium text-green-600",
                            isArabic ? 'font-arabic-body' : ''
                          )}>
                            {isArabic ? 'الجولة' : 'Round'} {tournament.currentRound} / {tournament.totalRounds}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <Button variant="outline" size="sm" className="border-green-200">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {isArabic ? 'متابعة' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Past Tournaments */}
          <TabsContent value="past" className="space-y-4">
            {tournaments.past.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 rounded-lg bg-gray-500/10">
                        {getSportIcon(tournament.sport)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className={cn(
                            "text-lg font-semibold",
                            isArabic ? 'font-arabic-heading' : ''
                          )}>
                            {tournament.name}
                          </h3>
                          {getStatusBadge(tournament.status)}
                          {tournament.yourPosition === 1 && (
                            <Badge className="bg-yellow-500 hover:bg-yellow-600">
                              🏆 {isArabic ? 'الفائز' : 'Winner'}
                            </Badge>
                          )}
                        </div>
                        <p className={cn(
                          "text-sm text-muted-foreground",
                          isArabic ? 'font-arabic-body' : ''
                        )}>
                          {tournament.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{tournament.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{tournament.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{tournament.participants} {isArabic ? 'مشارك' : 'participants'}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                          <div>
                            <p className={cn(
                              "text-xs text-muted-foreground",
                              isArabic ? 'font-arabic-body' : ''
                            )}>
                              {isArabic ? 'الترتيب' : 'Position'}
                            </p>
                            <p className={cn(
                              "text-lg font-bold",
                              tournament.yourPosition === 1 ? 'text-yellow-600' : '',
                              isArabic ? 'font-arabic-heading' : ''
                            )}>
                              #{tournament.yourPosition} / {tournament.totalPositions}
                            </p>
                          </div>
                          <div>
                            <p className={cn(
                              "text-xs text-muted-foreground",
                              isArabic ? 'font-arabic-body' : ''
                            )}>
                              {isArabic ? 'المباريات' : 'Matches'}
                            </p>
                            <p className={cn(
                              "text-lg font-bold",
                              isArabic ? 'font-arabic-heading' : ''
                            )}>
                              {tournament.matchesPlayed}
                            </p>
                          </div>
                          <div>
                            <p className={cn(
                              "text-xs text-muted-foreground",
                              isArabic ? 'font-arabic-body' : ''
                            )}>
                              {isArabic ? 'الأهداف' : 'Goals'}
                            </p>
                            <p className={cn(
                              "text-lg font-bold",
                              isArabic ? 'font-arabic-heading' : ''
                            )}>
                              {tournament.goalsScored}
                            </p>
                          </div>
                          <div>
                            <p className={cn(
                              "text-xs text-muted-foreground",
                              isArabic ? 'font-arabic-body' : ''
                            )}>
                              {isArabic ? 'الجوائز' : 'Prize'}
                            </p>
                            <p className={cn(
                              "text-lg font-bold",
                              isArabic ? 'font-arabic-heading' : ''
                            )}>
                              {tournament.prize}
                            </p>
                          </div>
                        </div>
                        {tournament.trophies.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {tournament.trophies.map((trophy, idx) => (
                              <Badge key={idx} variant="secondary" className="text-sm">
                                {trophy}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

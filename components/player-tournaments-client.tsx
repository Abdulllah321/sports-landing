"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Trophy, 
  Clock,
  Star,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

interface PlayerTournamentsClientProps {
  locale: Locale;
}

export function PlayerTournamentsClient({ locale }: PlayerTournamentsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("participate");

  const isArabic = locale === 'ar';

  // Mock data for tournaments
  const tournaments = [
    {
      id: 1,
      name: isArabic ? "بطولة الربيع لكرة القدم" : "Spring Football Tournament",
      sport: isArabic ? "كرة القدم" : "Football",
      status: "upcoming",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      location: isArabic ? "ملعب المدينة الرياضي" : "City Sports Stadium",
      participants: 16,
      maxParticipants: 32,
      entryFee: 50,
      prize: 1000,
      organizer: isArabic ? "أكاديمية النخبة" : "Elite Academy",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      description: isArabic ? "بطولة كرة القدم السنوية للفرق المحلية" : "Annual football tournament for local teams",
      isRegistered: false,
      isOrganizer: false
    },
    {
      id: 2,
      name: isArabic ? "مسابقة كرة السلة الصيفية" : "Summer Basketball Competition",
      sport: isArabic ? "كرة السلة" : "Basketball",
      status: "ongoing",
      startDate: "2024-03-01",
      endDate: "2024-03-10",
      location: isArabic ? "صالة الألعاب الرياضية" : "Sports Hall",
      participants: 8,
      maxParticipants: 16,
      entryFee: 30,
      prize: 500,
      organizer: isArabic ? "نادي كرة السلة" : "Basketball Club",
      image: "https://images.unsplash.com/photo-1519867829-ab650c25687f?w=400&h=300&fit=crop",
      description: isArabic ? "مسابقة كرة السلة للشباب" : "Youth basketball competition",
      isRegistered: true,
      isOrganizer: false
    },
    {
      id: 3,
      name: isArabic ? "دوري التنس الشتوي" : "Winter Tennis League",
      sport: isArabic ? "التنس" : "Tennis",
      status: "completed",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      location: isArabic ? "نادي التنس" : "Tennis Club",
      participants: 24,
      maxParticipants: 24,
      entryFee: 40,
      prize: 800,
      organizer: isArabic ? "أكاديمية التنس" : "Tennis Academy",
      image: "https://images.unsplash.com/photo-1580074282730-a71761b81924?w=400&h=300&fit=crop",
      description: isArabic ? "دوري التنس الفردي" : "Individual tennis league",
      isRegistered: false,
      isOrganizer: true
    }
  ];

  const myTournaments = tournaments.filter(t => t.isRegistered || t.isOrganizer);
  const availableTournaments = tournaments.filter(t => !t.isRegistered && !t.isOrganizer);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Clock className="h-3 w-3 mr-1" />
            {isArabic ? 'قادم' : 'Upcoming'}
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            {isArabic ? 'جاري' : 'Ongoing'}
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            {isArabic ? 'مكتمل' : 'Completed'}
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredTournaments = availableTournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === "all" || tournament.sport === sportFilter;
    const matchesStatus = statusFilter === "all" || tournament.status === statusFilter;
    
    return matchesSearch && matchesSport && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="participate">
            {isArabic ? 'المشاركة' : 'Participate'}
          </TabsTrigger>
          <TabsTrigger value="my-tournaments">
            {isArabic ? 'بطولاتي' : 'My Tournaments'}
          </TabsTrigger>
          <TabsTrigger value="organize">
            {isArabic ? 'تنظيم' : 'Organize'}
          </TabsTrigger>
        </TabsList>

        {/* Participate Tab */}
        <TabsContent value="participate" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'البحث في البطولات' : 'Search Tournaments'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isArabic ? 'البحث عن بطولة...' : 'Search tournament...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                  />
                </div>
                
                <Select value={sportFilter} onValueChange={setSportFilter}>
                  <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                    <SelectValue placeholder={isArabic ? 'جميع الرياضات' : 'All Sports'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isArabic ? 'جميع الرياضات' : 'All Sports'}</SelectItem>
                    <SelectItem value={isArabic ? 'كرة القدم' : 'Football'}>{isArabic ? 'كرة القدم' : 'Football'}</SelectItem>
                    <SelectItem value={isArabic ? 'كرة السلة' : 'Basketball'}>{isArabic ? 'كرة السلة' : 'Basketball'}</SelectItem>
                    <SelectItem value={isArabic ? 'التنس' : 'Tennis'}>{isArabic ? 'التنس' : 'Tennis'}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                    <SelectValue placeholder={isArabic ? 'جميع الحالات' : 'All Status'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isArabic ? 'جميع الحالات' : 'All Status'}</SelectItem>
                    <SelectItem value="upcoming">{isArabic ? 'قادم' : 'Upcoming'}</SelectItem>
                    <SelectItem value="ongoing">{isArabic ? 'جاري' : 'Ongoing'}</SelectItem>
                    <SelectItem value="completed">{isArabic ? 'مكتمل' : 'Completed'}</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>{isArabic ? 'تصفية متقدمة' : 'Advanced Filter'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tournaments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={tournament.image}
                    alt={tournament.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(tournament.status)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                      <Trophy className="h-3 w-3 text-yellow-400" />
                      <span className="text-white text-xs font-medium">
                        {isArabic ? 'جائزة' : 'Prize'}: ${tournament.prize}
                      </span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className={`text-xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {tournament.name}
                    </CardTitle>
                    <CardDescription className={`mt-1 ${isArabic ? 'font-arabic-body' : ''}`}>
                      {tournament.description}
                    </CardDescription>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {tournament.startDate} - {tournament.endDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>{tournament.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {tournament.participants}/{tournament.maxParticipants} {isArabic ? 'مشارك' : 'participants'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'رسوم المشاركة' : 'Entry Fee'}: ${tournament.entryFee}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/tournaments/${tournament.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      {isArabic ? 'سجل الآن' : 'Register Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Tournaments Tab */}
        <TabsContent value="my-tournaments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'بطولاتي' : 'My Tournaments'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'البطولات التي أشارك فيها أو أنظمها' : 'Tournaments I participate in or organize'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTournaments.map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={tournament.image}
                          alt={tournament.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {tournament.name}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {tournament.location} • {tournament.sport}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusBadge(tournament.status)}
                          {tournament.isOrganizer && (
                            <Badge variant="secondary">
                              {isArabic ? 'منظم' : 'Organizer'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/tournaments/${tournament.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          {isArabic ? 'عرض' : 'View'}
                        </Link>
                      </Button>
                      {tournament.isOrganizer && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          {isArabic ? 'تعديل' : 'Edit'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organize Tab */}
        <TabsContent value="organize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'تنظيم بطولة جديدة' : 'Organize New Tournament'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'أنشئ بطولة جديدة وادع اللاعبين للمشاركة' : 'Create a new tournament and invite players to participate'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {isArabic ? 'ابدأ في تنظيم بطولتك' : 'Start Organizing Your Tournament'}
                </h3>
                <p className={`text-muted-foreground mb-6 ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'أنشئ بطولة جديدة وادع اللاعبين من جميع أنحاء العالم للمشاركة' : 'Create a new tournament and invite players from around the world to participate'}
                </p>
                <Button size="lg" className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>{isArabic ? 'إنشاء بطولة جديدة' : 'Create New Tournament'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

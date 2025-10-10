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
  Star, 
  Users, 
  Trophy, 
  Crown,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

interface PlayerAcademiesClientProps {
  locale: Locale;
}

export function PlayerAcademiesClient({ locale }: PlayerAcademiesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("browse");

  const isArabic = locale === 'ar';

  // Mock data for academies
  const academies = [
    {
      id: 1,
      name: isArabic ? "أكاديمية النخبة لكرة القدم" : "Elite Football Academy",
      sport: isArabic ? "كرة القدم" : "Football",
      packageLevel: "gold",
      location: isArabic ? "القاهرة، مصر" : "Cairo, Egypt",
      rating: 4.9,
      students: 450,
      coaches: 25,
      established: "2015",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      description: isArabic ? "أكاديمية متخصصة في تطوير مهارات كرة القدم للاعبين من جميع المستويات" : "Academy specialized in developing football skills for players of all levels",
      features: [
        isArabic ? "تدريب فردي وجماعي" : "Individual and group training",
        isArabic ? "تحليل الأداء بالفيديو" : "Video performance analysis",
        isArabic ? "إرشاد التغذية" : "Nutrition guidance",
        isArabic ? "مرافق حديثة" : "Modern facilities"
      ],
      isJoined: false,
      isPending: false
    },
    {
      id: 2,
      name: isArabic ? "أكاديمية كرة السلة المحترفة" : "Pro Basketball Academy",
      sport: isArabic ? "كرة السلة" : "Basketball",
      packageLevel: "silver",
      location: isArabic ? "الإسكندرية، مصر" : "Alexandria, Egypt",
      rating: 4.7,
      students: 300,
      coaches: 18,
      established: "2018",
      image: "https://images.unsplash.com/photo-1519867829-ab650c25687f?w=400&h=300&fit=crop",
      description: isArabic ? "تطوير مهارات كرة السلة مع مدربين محترفين" : "Developing basketball skills with professional coaches",
      features: [
        isArabic ? "تدريب تقني متقدم" : "Advanced technical training",
        isArabic ? "برامج اللياقة البدنية" : "Fitness programs",
        isArabic ? "منافسات دورية" : "Regular competitions",
        isArabic ? "تطوير المهارات العقلية" : "Mental skills development"
      ],
      isJoined: true,
      isPending: false
    },
    {
      id: 3,
      name: isArabic ? "أكاديمية التنس المتقدمة" : "Advanced Tennis Academy",
      sport: isArabic ? "التنس" : "Tennis",
      packageLevel: "bronze",
      location: isArabic ? "الجيزة، مصر" : "Giza, Egypt",
      rating: 4.5,
      students: 200,
      coaches: 12,
      established: "2020",
      image: "https://images.unsplash.com/photo-1580074282730-a71761b81924?w=400&h=300&fit=crop",
      description: isArabic ? "تعلم التنس من الأساسيات إلى المستوى المتقدم" : "Learn tennis from basics to advanced level",
      features: [
        isArabic ? "دروس فردية" : "Private lessons",
        isArabic ? "ملاعب خارجية وداخلية" : "Outdoor and indoor courts",
        isArabic ? "معدات حديثة" : "Modern equipment",
        isArabic ? "برامج الصيف" : "Summer programs"
      ],
      isJoined: false,
      isPending: true
    }
  ];

  const currentAcademy = academies.find(academy => academy.isJoined);
  const pendingAcademy = academies.find(academy => academy.isPending);

  const getPackageBadge = (level: string) => {
    switch (level) {
      case "bronze":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Trophy className="h-3 w-3 mr-1" />
            {isArabic ? 'برونزي' : 'Bronze'}
          </Badge>
        );
      case "silver":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            <Award className="h-3 w-3 mr-1" />
            {isArabic ? 'فضي' : 'Silver'}
          </Badge>
        );
      case "gold":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Crown className="h-3 w-3 mr-1" />
            {isArabic ? 'ذهبي' : 'Gold'}
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredAcademies = academies.filter(academy => {
    const matchesSearch = academy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         academy.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === "all" || academy.sport === sportFilter;
    const matchesPackage = packageFilter === "all" || academy.packageLevel === packageFilter;
    const matchesLocation = locationFilter === "all" || academy.location.includes(locationFilter);
    
    return matchesSearch && matchesSport && matchesPackage && matchesLocation;
  });

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">
            {isArabic ? 'تصفح الأكاديميات' : 'Browse Academies'}
          </TabsTrigger>
          <TabsTrigger value="current">
            {isArabic ? 'أكاديميتي الحالية' : 'My Academy'}
          </TabsTrigger>
          <TabsTrigger value="history">
            {isArabic ? 'السجل' : 'History'}
          </TabsTrigger>
        </TabsList>

        {/* Browse Academies Tab */}
        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'البحث والتصفية' : 'Search & Filter'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isArabic ? 'البحث عن أكاديمية...' : 'Search academy...'}
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

                <Select value={packageFilter} onValueChange={setPackageFilter}>
                  <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                    <SelectValue placeholder={isArabic ? 'جميع الباقات' : 'All Packages'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isArabic ? 'جميع الباقات' : 'All Packages'}</SelectItem>
                    <SelectItem value="bronze">{isArabic ? 'برونزي' : 'Bronze'}</SelectItem>
                    <SelectItem value="silver">{isArabic ? 'فضي' : 'Silver'}</SelectItem>
                    <SelectItem value="gold">{isArabic ? 'ذهبي' : 'Gold'}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                    <SelectValue placeholder={isArabic ? 'جميع المواقع' : 'All Locations'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isArabic ? 'جميع المواقع' : 'All Locations'}</SelectItem>
                    <SelectItem value={isArabic ? 'القاهرة' : 'Cairo'}>{isArabic ? 'القاهرة' : 'Cairo'}</SelectItem>
                    <SelectItem value={isArabic ? 'الإسكندرية' : 'Alexandria'}>{isArabic ? 'الإسكندرية' : 'Alexandria'}</SelectItem>
                    <SelectItem value={isArabic ? 'الجيزة' : 'Giza'}>{isArabic ? 'الجيزة' : 'Giza'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Academies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAcademies.map((academy) => (
              <Card key={academy.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={academy.image}
                    alt={academy.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {getPackageBadge(academy.packageLevel)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-xs font-medium">{academy.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className={`text-xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {academy.name}
                    </CardTitle>
                    <CardDescription className={`mt-1 ${isArabic ? 'font-arabic-body' : ''}`}>
                      {academy.description}
                    </CardDescription>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>{academy.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {academy.students} {isArabic ? 'طالب' : 'students'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {academy.coaches} {isArabic ? 'مدرب' : 'coaches'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'المميزات:' : 'Features:'}
                    </h4>
                    <ul className="space-y-1">
                      {academy.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className={isArabic ? 'font-arabic-body' : ''}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/academies/${academy.id}`}>
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      {isArabic ? 'انضم الآن' : 'Join Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Current Academy Tab */}
        <TabsContent value="current" className="space-y-6">
          {currentAcademy ? (
            <Card>
              <CardHeader>
                <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                  {isArabic ? 'أكاديميتي الحالية' : 'My Current Academy'}
                </CardTitle>
                <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                  {isArabic ? 'تفاصيل الأكاديمية التي أنتمي إليها حالياً' : 'Details of the academy I currently belong to'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={currentAcademy.image}
                      alt={currentAcademy.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                        {currentAcademy.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        {getPackageBadge(currentAcademy.packageLevel)}
                        <Badge variant="secondary">
                          {isArabic ? 'عضو نشط' : 'Active Member'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{currentAcademy.rating}</div>
                        <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {isArabic ? 'التقييم' : 'Rating'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{currentAcademy.students}</div>
                        <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {isArabic ? 'الطلاب' : 'Students'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{currentAcademy.coaches}</div>
                        <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {isArabic ? 'المدربين' : 'Coaches'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{currentAcademy.established}</div>
                        <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {isArabic ? 'تأسست' : 'Established'}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button asChild>
                        <Link href={`/academies/${currentAcademy.id}`}>
                          {isArabic ? 'عرض الأكاديمية' : 'View Academy'}
                        </Link>
                      </Button>
                      <Button variant="outline">
                        {isArabic ? 'إدارة العضوية' : 'Manage Membership'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {isArabic ? 'لا توجد أكاديمية حالية' : 'No Current Academy'}
                </h3>
                <p className={`text-muted-foreground mb-4 ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'لم تنضم إلى أي أكاديمية بعد. ابدأ بالبحث عن أكاديمية مناسبة لك.' : "You haven't joined any academy yet. Start by searching for a suitable academy."}
                </p>
                <Button onClick={() => setActiveTab("browse")}>
                  {isArabic ? 'تصفح الأكاديميات' : 'Browse Academies'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'سجل الأكاديميات' : 'Academy History'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'جميع الأكاديميات التي انضممت إليها سابقاً' : 'All academies you have joined previously'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academies.filter(academy => !academy.isJoined && !academy.isPending).map((academy) => (
                  <div key={academy.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={academy.image}
                          alt={academy.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {academy.name}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {academy.location} • {academy.sport}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {isArabic ? 'مكتمل' : 'Completed'}
                      </Badge>
                      <p className={`text-sm text-muted-foreground mt-1 ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic ? 'يناير 2023 - ديسمبر 2023' : 'Jan 2023 - Dec 2023'}
                      </p>
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

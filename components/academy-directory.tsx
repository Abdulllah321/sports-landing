"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Users, Calendar, Trophy, Award, Crown } from "lucide-react";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Academy {
  id: string;
  name: string;
  description: string;
  sport: string;
  packageLevel: "bronze" | "silver" | "gold";
  location: string;
  rating: number;
  students: number;
  coaches: number;
  established: string;
  image: string;
  facilities: string[];
  featured: boolean;
}

const mockAcademies: Academy[] = [
  {
    id: "1",
    name: "Elite Football Academy",
    description: "Premier football training academy with world-class facilities and professional coaching staff.",
    sport: "Football",
    packageLevel: "gold",
    location: "London, UK",
    rating: 4.9,
    students: 450,
    coaches: 25,
    established: "2015",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
    facilities: ["Full-size pitches", "Gym", "Recovery center", "Cafeteria"],
    featured: true
  },
  {
    id: "2",
    name: "Metro Basketball Academy",
    description: "Comprehensive basketball training with focus on skill development and team play.",
    sport: "Basketball",
    packageLevel: "silver",
    location: "New York, USA",
    rating: 4.7,
    students: 320,
    coaches: 18,
    established: "2018",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    facilities: ["Indoor courts", "Weight room", "Video analysis room"],
    featured: false
  },
  {
    id: "3",
    name: "Coastal Tennis Academy",
    description: "Professional tennis academy with clay and hard courts, perfect for all skill levels.",
    sport: "Tennis",
    packageLevel: "gold",
    location: "Barcelona, Spain",
    rating: 4.8,
    students: 280,
    coaches: 15,
    established: "2012",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    facilities: ["Clay courts", "Hard courts", "Fitness center", "Pro shop"],
    featured: true
  },
  {
    id: "4",
    name: "Aqua Swimming Academy",
    description: "Olympic-standard swimming facility with certified coaches and modern equipment.",
    sport: "Swimming",
    packageLevel: "silver",
    location: "Sydney, Australia",
    rating: 4.6,
    students: 200,
    coaches: 12,
    established: "2019",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=400&fit=crop",
    facilities: ["Olympic pool", "Training pool", "Sauna", "Locker rooms"],
    featured: false
  },
  {
    id: "5",
    name: "Mountain Climbing Academy",
    description: "Adventure sports academy specializing in rock climbing and mountaineering.",
    sport: "Climbing",
    packageLevel: "bronze",
    location: "Denver, USA",
    rating: 4.5,
    students: 150,
    coaches: 8,
    established: "2020",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    facilities: ["Indoor climbing wall", "Outdoor routes", "Equipment rental"],
    featured: false
  },
  {
    id: "6",
    name: "Urban Martial Arts Academy",
    description: "Traditional and modern martial arts training with experienced instructors.",
    sport: "Martial Arts",
    packageLevel: "bronze",
    location: "Tokyo, Japan",
    rating: 4.7,
    students: 180,
    coaches: 10,
    established: "2017",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    facilities: ["Training mats", "Weights", "Meditation room"],
    featured: false
  }
];

export function AcademyDirectory() {
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const sports = Array.from(new Set(mockAcademies.map(academy => academy.sport)));
  const locations = Array.from(new Set(mockAcademies.map(academy => academy.location)));

  const filteredAcademies = useMemo(() => {
    return mockAcademies.filter(academy => {
      const matchesSearch = academy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           academy.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSport = sportFilter === "all" || academy.sport === sportFilter;
      const matchesPackage = packageFilter === "all" || academy.packageLevel === packageFilter;
      const matchesLocation = locationFilter === "all" || academy.location === locationFilter;
      
      return matchesSearch && matchesSport && matchesPackage && matchesLocation;
    });
  }, [searchQuery, sportFilter, packageFilter, locationFilter]);

  const getPackageBadge = (level: string) => {
    switch (level) {
      case "bronze":
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <Trophy className="h-3 w-3 mr-1" />
            Bronze
          </Badge>
        );
      case "silver":
        return (
          <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
            <Award className="h-3 w-3 mr-1" />
            Silver
          </Badge>
        );
      case "gold":
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <Crown className="h-3 w-3 mr-1" />
            Gold
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPackageColor = (level: string) => {
    switch (level) {
      case "bronze": return "border-amber-200 dark:border-amber-800";
      case "silver": return "border-gray-200 dark:border-gray-800";
      case "gold": return "border-yellow-200 dark:border-yellow-800";
      default: return "border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder={t('academies.directory.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            "bg-background/80 backdrop-blur border-border/60",
            locale === 'ar' && "font-arabic-body"
          )}
        />
        <Select value={sportFilter} onValueChange={setSportFilter}>
          <SelectTrigger className={cn(
            "bg-background/80 backdrop-blur border-border/60",
            locale === 'ar' && "font-arabic-body"
          )}>
            <SelectValue placeholder={t('academies.directory.sportPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('academies.directory.sportPlaceholder')}</SelectItem>
            {sports.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={packageFilter} onValueChange={setPackageFilter}>
          <SelectTrigger className={cn(
            "bg-background/80 backdrop-blur border-border/60",
            locale === 'ar' && "font-arabic-body"
          )}>
            <SelectValue placeholder={t('academies.directory.packagePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('academies.directory.packagePlaceholder')}</SelectItem>
            <SelectItem value="bronze">Bronze</SelectItem>
            <SelectItem value="silver">Silver</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className={cn(
            "bg-background/80 backdrop-blur border-border/60",
            locale === 'ar' && "font-arabic-body"
          )}>
            <SelectValue placeholder={t('academies.directory.locationPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('academies.directory.locationPlaceholder')}</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Academies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAcademies.map((academy) => (
          <Card key={academy.id} className={cn(
            "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
            getPackageColor(academy.packageLevel),
            academy.featured && "ring-2 ring-primary/20"
          )}>
            <div className="relative h-48 overflow-hidden">
              <img
                src={academy.image}
                alt={academy.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {getPackageBadge(academy.packageLevel)}
                {academy.featured && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                  {academy.sport}
                </Badge>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="flex items-center gap-1 bg-background/90 backdrop-blur rounded-full px-2 py-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{academy.rating}</span>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className={cn(
                "text-xl font-bold group-hover:text-primary transition-colors",
                locale === 'ar' && "font-arabic-heading"
              )}>
                {academy.name}
              </CardTitle>
              <p className={cn(
                "text-muted-foreground text-sm line-clamp-2",
                locale === 'ar' && "font-arabic-body"
              )}>
                {academy.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>{academy.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                    {t('academies.directory.established')} {academy.established}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                    {academy.students} {t('academies.directory.students')}, {academy.coaches} {t('academies.directory.coaches')}
                  </span>
                </div>
              </div>
              
              {/* Facilities */}
              <div className="space-y-2">
                <div className={cn(
                  "text-sm font-medium text-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  Facilities:
                </div>
                <div className="flex flex-wrap gap-1">
                  {academy.facilities.slice(0, 3).map((facility, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                  {academy.facilities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{academy.facilities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/academies/detail/${academy.id}`}>
                    {t('academies.directory.viewDetails')}
                  </Link>
                </Button>
                <Button size="sm" className="flex-1">
                  {t('academies.directory.joinAcademy')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAcademies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {locale === 'ar' ? 'لا توجد أكاديميات مطابقة للبحث' : 'No academies found matching your search'}
          </div>
        </div>
      )}
    </div>
  );
}

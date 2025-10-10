"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, Trophy } from "lucide-react";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "upcoming" | "live" | "ended";
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  prize: string;
  image: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Basketball Championship",
    description: "Join the biggest basketball tournament of the summer with amazing prizes and professional referees.",
    category: "Basketball",
    status: "upcoming",
    date: "2024-07-15",
    time: "09:00",
    location: "Sports Complex Arena",
    participants: 24,
    maxParticipants: 32,
    prize: "$5,000",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop"
  },
  {
    id: "2",
    title: "Football Skills Challenge",
    description: "Test your football skills in various challenges including dribbling, shooting, and passing.",
    category: "Football",
    status: "live",
    date: "2024-06-20",
    time: "14:00",
    location: "Central Park Field",
    participants: 18,
    maxParticipants: 20,
    prize: "$2,500",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop"
  },
  {
    id: "3",
    title: "Tennis Doubles Tournament",
    description: "Partner up for an exciting doubles tennis tournament with professional coaching sessions.",
    category: "Tennis",
    status: "upcoming",
    date: "2024-08-10",
    time: "10:00",
    location: "Tennis Club Courts",
    participants: 8,
    maxParticipants: 16,
    prize: "$3,000",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop"
  },
  {
    id: "4",
    title: "Swimming Relay Race",
    description: "Team up for an exciting swimming relay competition with different stroke categories.",
    category: "Swimming",
    status: "ended",
    date: "2024-05-25",
    time: "16:00",
    location: "Olympic Pool",
    participants: 12,
    maxParticipants: 16,
    prize: "$1,500",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=400&fit=crop"
  }
];

export function EventList() {
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = Array.from(new Set(mockEvents.map(event => event.category)));

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || event.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "live": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "ended": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming": return <Clock className="h-4 w-4" />;
      case "live": return <Trophy className="h-4 w-4" />;
      case "ended": return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder={t('events.eventList.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            "bg-background/80 backdrop-blur border-border/60",
            locale === 'ar' && "font-arabic-body"
          )}
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className={cn(
            "bg-background/80 backdrop-blur border-border/60",
            locale === 'ar' && "font-arabic-body"
          )}>
            <SelectValue placeholder={t('events.eventList.categoryPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('events.eventList.categoryPlaceholder')}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className={cn(
            "bg-background/80 backdrop-blur border-border/60",
            locale === 'ar' && "font-arabic-body"
          )}>
            <SelectValue placeholder={t('events.eventList.statusPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('events.eventList.statusPlaceholder')}</SelectItem>
            <SelectItem value="upcoming">{t('events.eventList.upcoming')}</SelectItem>
            <SelectItem value="live">{t('events.eventList.live')}</SelectItem>
            <SelectItem value="ended">{t('events.eventList.ended')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <Badge className={cn("flex items-center gap-1", getStatusColor(event.status))}>
                  {getStatusIcon(event.status)}
                  {t(`events.eventList.${event.status}`)}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                  {event.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className={cn(
                "text-xl font-bold group-hover:text-primary transition-colors",
                locale === 'ar' && "font-arabic-heading"
              )}>
                {event.title}
              </CardTitle>
              <p className={cn(
                "text-muted-foreground text-sm line-clamp-2",
                locale === 'ar' && "font-arabic-body"
              )}>
                {event.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                    {event.date} at {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                    {event.participants}/{event.maxParticipants} participants
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary">
                  {event.prize}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {t('events.eventList.viewDetails')}
                  </Button>
                  {event.status !== "ended" && (
                    <Button size="sm">
                      {t('events.eventList.register')}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {locale === 'ar' ? 'لا توجد أحداث مطابقة للبحث' : 'No events found matching your search'}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { StadiumCards } from "@/components/stadium-cards";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Building2,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import { facilities } from "@/data/facilities";

export default function FacilitiesIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDate, setSelectedDate] = useState("any");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("all");

  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) => {
      const matchesSearch =
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        selectedCity === "all" || facility.city === selectedCity;
      const matchesType =
        selectedType === "all" || facility.type === selectedType;

      let matchesDate = true;
      let matchesTimeSlot = true;

      if (selectedDate && selectedDate !== "any") {
        matchesDate = facility.availableSlots.some(
          (slot) => slot.date === selectedDate
        );
      }

      if (
        selectedTimeSlot !== "all" &&
        selectedDate &&
        selectedDate !== "any"
      ) {
        const selectedSlot = facility.availableSlots.find(
          (slot) => slot.date === selectedDate
        );
        matchesTimeSlot =
          selectedSlot?.timeSlots.includes(selectedTimeSlot) || false;
      }

      return (
        matchesSearch &&
        matchesCity &&
        matchesType &&
        matchesDate &&
        matchesTimeSlot
      );
    });
  }, [searchQuery, selectedCity, selectedType, selectedDate, selectedTimeSlot]);

  const cities = Array.from(new Set(facilities.map((f) => f.city)));
  const types = Array.from(new Set(facilities.map((f) => f.type)));

  // Get available dates from all facilities
  const availableDates = Array.from(
    new Set(
      facilities.flatMap((f) => f.availableSlots.map((slot) => slot.date))
    )
  ).sort();

  // Get available time slots for selected date
  const availableTimeSlots =
    selectedDate && selectedDate !== "any"
      ? Array.from(
          new Set(
            facilities
              .filter((f) =>
                f.availableSlots.some((slot) => slot.date === selectedDate)
              )
              .flatMap(
                (f) =>
                  f.availableSlots.find((slot) => slot.date === selectedDate)
                    ?.timeSlots || []
              )
          )
        ).sort()
      : [];

  const stats = {
    total: facilities.length,
    available: filteredFacilities.length,
    cities: cities.length,
    avgRating: (
      facilities.reduce((sum, f) => sum + f.rating, 0) / facilities.length
    ).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/section-pattern.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-mono tracking-wide font-extralight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Facilities & Stadiums
            </h1>
            <p className="mt-6 text-xl font-serif text-muted-foreground max-w-2xl mx-auto">
              Discover premium sports facilities across the region. Book your
              perfect venue for training, tournaments, and events.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">
                  {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Facilities
                </div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">
                  {stats.available}
                </div>
                <div className="text-sm text-muted-foreground">
                  Available Now
                </div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">
                  {stats.cities}
                </div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">
                  {stats.avgRating}
                </div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Search & Filters */}
      <section className="py-4 border-y border-border/50 sticky top-[64.5px] z-40 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search facilities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/80 backdrop-blur border-border/60"
                />
              </div>

              {/* City Filter */}
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-background/80 backdrop-blur border-border/60">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select City" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-background/80 backdrop-blur border-border/60">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="bg-background/80 backdrop-blur border-border/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select Date" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Date</SelectItem>
                  {availableDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Time Slot Filter */}
              <Select
                value={selectedTimeSlot}
                onValueChange={setSelectedTimeSlot}
              >
                <SelectTrigger className="bg-background/80 backdrop-blur border-border/60">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select Time" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  {availableTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCity !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-secondary/10 text-secondary border-secondary/20"
                >
                  City: {selectedCity}
                  <button
                    onClick={() => setSelectedCity("all")}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-secondary/10 text-secondary border-secondary/20"
                >
                  Type: {selectedType}
                  <button
                    onClick={() => setSelectedType("all")}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedDate && selectedDate !== "any" && (
                <Badge
                  variant="secondary"
                  className="bg-secondary/10 text-secondary border-secondary/20"
                >
                  Date: {new Date(selectedDate).toLocaleDateString()}
                  <button
                    onClick={() => setSelectedDate("any")}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedTimeSlot !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-secondary/10 text-secondary border-secondary/20"
                >
                  Time: {selectedTimeSlot}
                  <button
                    onClick={() => setSelectedTimeSlot("all")}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {(selectedCity !== "all" ||
                selectedType !== "all" ||
                (selectedDate && selectedDate !== "any") ||
                selectedTimeSlot !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCity("all");
                    setSelectedType("all");
                    setSelectedDate("any");
                    setSelectedTimeSlot("all");
                    setSearchQuery("");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-mono tracking-wide font-extralight">
                Available Facilities
              </h2>
              <p className="font-serif text-muted-foreground">
                {filteredFacilities.length} facility
                {filteredFacilities.length !== 1 ? "ies" : "y"} found
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>Sorted by rating</span>
            </div>
          </div>

          {filteredFacilities.length > 0 ? (
            <StadiumCards facilities={filteredFacilities} />
          ) : (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-mono tracking-wide font-extralight mb-2">
                  No facilities found
                </h3>
                <p className="font-serif text-muted-foreground mb-6">
                  Try adjusting your search criteria or filters to find more
                  facilities.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCity("all");
                    setSelectedType("all");
                    setSelectedDate("any");
                    setSelectedTimeSlot("all");
                    setSearchQuery("");
                  }}
                  className="bg-primary text-primary-foreground"
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

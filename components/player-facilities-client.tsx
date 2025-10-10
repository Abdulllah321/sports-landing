"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  CalendarDays
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

interface PlayerFacilitiesClientProps {
  locale: Locale;
}

export function PlayerFacilitiesClient({ locale }: PlayerFacilitiesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("search");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const isArabic = locale === 'ar';

  // Mock data for facilities
  const facilities = [
    {
      id: 1,
      name: isArabic ? "ملعب كرة القدم الرئيسي" : "Main Football Pitch",
      sport: isArabic ? "كرة القدم" : "Football",
      location: isArabic ? "الحي الرياضي، القاهرة" : "Sports District, Cairo",
      rating: 4.8,
      price: 200,
      capacity: 22,
      amenities: [
        isArabic ? "إضاءة ليلية" : "Night lighting",
        isArabic ? "مقاعد للمتفرجين" : "Spectator seats",
        isArabic ? "غرف تبديل" : "Changing rooms",
        isArabic ? "موقف سيارات" : "Parking"
      ],
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      isAvailable: true,
      nextAvailable: "2024-03-15 10:00"
    },
    {
      id: 2,
      name: isArabic ? "صالة كرة السلة" : "Basketball Court",
      sport: isArabic ? "كرة السلة" : "Basketball",
      location: isArabic ? "النادي الرياضي، الإسكندرية" : "Sports Club, Alexandria",
      rating: 4.6,
      price: 150,
      capacity: 10,
      amenities: [
        isArabic ? "تكييف هواء" : "Air conditioning",
        isArabic ? "أرضية خشبية" : "Wooden floor",
        isArabic ? "ساعة توقيت" : "Scoreboard",
        isArabic ? "معدات تدريب" : "Training equipment"
      ],
      image: "https://images.unsplash.com/photo-1519867829-ab650c25687f?w=400&h=300&fit=crop",
      isAvailable: false,
      nextAvailable: "2024-03-16 14:00"
    },
    {
      id: 3,
      name: isArabic ? "ملعب التنس" : "Tennis Court",
      sport: isArabic ? "التنس" : "Tennis",
      location: isArabic ? "نادي التنس، الجيزة" : "Tennis Club, Giza",
      rating: 4.7,
      price: 100,
      capacity: 4,
      amenities: [
        isArabic ? "سطح طيني" : "Clay surface",
        isArabic ? "شبكة احترافية" : "Professional net",
        isArabic ? "مقاعد" : "Benches",
        isArabic ? "مظلة" : "Shade"
      ],
      image: "https://images.unsplash.com/photo-1580074282730-a71761b81924?w=400&h=300&fit=crop",
      isAvailable: true,
      nextAvailable: "2024-03-15 16:00"
    }
  ];

  const myBookings = [
    {
      id: 1,
      facility: facilities[0],
      date: "2024-03-15",
      time: "10:00 - 12:00",
      status: "confirmed",
      totalPrice: 400
    },
    {
      id: 2,
      facility: facilities[2],
      date: "2024-03-20",
      time: "14:00 - 16:00",
      status: "pending",
      totalPrice: 200
    }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            {isArabic ? 'مؤكد' : 'Confirmed'}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="h-3 w-3 mr-1" />
            {isArabic ? 'في الانتظار' : 'Pending'}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            {isArabic ? 'ملغي' : 'Cancelled'}
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === "all" || facility.sport === sportFilter;
    const matchesLocation = locationFilter === "all" || facility.location.includes(locationFilter);
    
    return matchesSearch && matchesSport && matchesLocation;
  });

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">
            {isArabic ? 'البحث' : 'Search'}
          </TabsTrigger>
          <TabsTrigger value="bookings">
            {isArabic ? 'حجوزاتي' : 'My Bookings'}
          </TabsTrigger>
          <TabsTrigger value="favorites">
            {isArabic ? 'المفضلة' : 'Favorites'}
          </TabsTrigger>
        </TabsList>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'البحث في المرافق' : 'Search Facilities'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isArabic ? 'البحث عن مرفق...' : 'Search facility...'}
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

                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>{isArabic ? 'تصفية متقدمة' : 'Advanced Filter'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Date and Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'اختر التاريخ والوقت' : 'Select Date & Time'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-medium mb-4 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'التاريخ' : 'Date'}
                  </h4>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <h4 className={`font-medium mb-4 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'الوقت' : 'Time'}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <Card key={facility.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={facility.isAvailable ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
                      {facility.isAvailable ? (isArabic ? 'متاح' : 'Available') : (isArabic ? 'غير متاح' : 'Unavailable')}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-xs font-medium">{facility.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className={`text-xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {facility.name}
                    </CardTitle>
                    <CardDescription className={`mt-1 ${isArabic ? 'font-arabic-body' : ''}`}>
                      {facility.location}
                    </CardDescription>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'السعر/ساعة' : 'Price/hour'}
                      </span>
                      <span className="font-bold">${facility.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'السعة' : 'Capacity'}
                      </span>
                      <span className="font-bold">{facility.capacity} {isArabic ? 'شخص' : 'people'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'الرياضة' : 'Sport'}
                      </span>
                      <span className="font-bold">{facility.sport}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'المرافق:' : 'Amenities:'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {facility.amenities.slice(0, 2).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {facility.amenities.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{facility.amenities.length - 2} {isArabic ? 'أخرى' : 'more'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/facilities/${facility.id}`}>
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      disabled={!facility.isAvailable}
                    >
                      {isArabic ? 'احجز الآن' : 'Book Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'حجوزاتي' : 'My Bookings'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'جميع حجوزاتك للمرافق الرياضية' : 'All your sports facility bookings'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={booking.facility.image}
                          alt={booking.facility.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                          {booking.facility.name}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {booking.date} • {booking.time}
                        </p>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {booking.facility.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(booking.status)}
                        <span className="font-bold">${booking.totalPrice}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          {isArabic ? 'عرض' : 'View'}
                        </Button>
                        {booking.status === "pending" && (
                          <Button variant="outline" size="sm">
                            {isArabic ? 'إلغاء' : 'Cancel'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic-heading' : ''}`}>
                {isArabic ? 'لا توجد مرافق مفضلة' : 'No Favorite Facilities'}
              </h3>
              <p className={`text-muted-foreground mb-4 ${isArabic ? 'font-arabic-body' : ''}`}>
                {isArabic ? 'أضف المرافق المفضلة لديك لتسهيل الوصول إليها' : 'Add your favorite facilities for easy access'}
              </p>
              <Button onClick={() => setActiveTab("search")}>
                {isArabic ? 'تصفح المرافق' : 'Browse Facilities'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import { notFound } from "next/navigation";
import { facilities } from "@/data/facilities";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Car,
  Wifi,
  Shirt,
  ShoppingBag,
  Utensils,
  Shield,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Custom Swiper styles
const swiperStyles = `
  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5) !important;
    opacity: 1 !important;
    width: 8px !important;
    height: 8px !important;
    margin: 0 4px !important;
  }
  
  .swiper-pagination-bullet-active {
    background: hsl(var(--primary)) !important;
    transform: scale(1.2) !important;
  }
  
  .swiper-pagination {
    bottom: 8px !important;
  }
`;

export default function FacilityDetail({ params }: { params: { id: string } }) {
  const f = facilities.find((x) => x.id === params.id);
  const [booking, setBooking] = useState<{
    name: string;
    email: string;
    phone: string;
    date: string;
    timeSlot: string;
    duration: string;
    notes: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);

  if (!f) return notFound();

  const availableTimeSlots = selectedDate
    ? f.availableSlots.find((slot) => slot.date === selectedDate)?.timeSlots ||
      []
    : [];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a stable booking ID using timestamp and facility ID
    const id = `DEMO-${Date.now().toString().slice(-6)}-${f.id.toUpperCase()}`;
    setBookingId(id);
    setSubmitted(true);
  };

  const resetBooking = () => {
    setBooking(null);
    setSubmitted(false);
    setSelectedDate("");
    setBookingId(null);
  };

  return (
    <>
      <style jsx>{swiperStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/facilities">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Facilities
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Facility Details
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
                <div className="relative h-96">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                      dynamicMainBullets: 1,
                    }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    className="h-full w-full"
                  >
                    {f.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                          <Image
                            src={image}
                            alt={`${f.name} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl backdrop-blur-md px-3 py-1.5 text-sm font-bold">
                      {f.type}
                    </Badge>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-background/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-xl">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-foreground">
                          {f.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Facility Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl font-mono tracking-wide font-extralight">
                        {f.name}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{f.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{f.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{f.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {f.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per hour
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                    {f.description}
                  </p>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="amenities" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="calendar">Availability</TabsTrigger>
                  <TabsTrigger value="rules">Rules</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="amenities" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-mono tracking-wide font-extralight">
                        Facilities & Amenities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-mono tracking-wide font-extralight text-lg">
                            Basic Amenities
                          </h4>
                          <div className="space-y-2">
                            {f.amenities.map((amenity, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-mono tracking-wide font-extralight text-lg">
                            Additional Features
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(f.features).map(
                              ([feature, available]) => (
                                <div
                                  key={feature}
                                  className="flex items-center gap-2"
                                >
                                  {available ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                  <span className="capitalize">
                                    {feature.replace(/([A-Z])/g, " $1").trim()}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calendar" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-mono tracking-wide font-extralight">
                        Availability Calendar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {f.availableSlots.map((slot, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="font-semibold">
                                {new Date(slot.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {slot.timeSlots.map((time, timeIndex) => (
                                <Badge
                                  key={timeIndex}
                                  variant="outline"
                                  className="px-3 py-1"
                                >
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rules" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-mono tracking-wide font-extralight">
                        Facility Rules & Guidelines
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {f.rules.map((rule, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {rule}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-mono tracking-wide font-extralight">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <span>{f.contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <span>{f.contact.email}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-1" />
                          <span className="text-muted-foreground">
                            {f.location.address}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono tracking-wide font-extralight">
                    <Clock className="h-5 w-5 text-primary" />
                    Booking Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      {f.price}
                    </div>
                    <div className="text-muted-foreground">per hour</div>
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground hover:opacity-95"
                    onClick={() =>
                      setBooking({
                        name: "",
                        email: "",
                        phone: "",
                        date: "",
                        timeSlot: "",
                        duration: "1",
                        notes: "",
                      })
                    }
                  >
                    Book This Facility
                  </Button>

                  <div className="text-sm font-serif text-muted-foreground text-center">
                    <p>✓ Instant confirmation</p>
                    <p>✓ Free cancellation up to 24h</p>
                    <p>✓ Secure payment</p>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Form */}
              {booking && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono tracking-wide font-extralight">
                      Booking Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!submitted ? (
                      <form
                        onSubmit={handleBookingSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Full Name
                          </label>
                          <Input
                            placeholder="Your full name"
                            required
                            value={booking.name}
                            onChange={(e) =>
                              setBooking({ ...booking, name: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Email
                          </label>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={booking.email}
                            onChange={(e) =>
                              setBooking({ ...booking, email: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Phone
                          </label>
                          <Input
                            placeholder="+971 50 123 4567"
                            required
                            value={booking.phone}
                            onChange={(e) =>
                              setBooking({ ...booking, phone: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Date
                          </label>
                          <Select
                            value={selectedDate}
                            onValueChange={setSelectedDate}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                              {f.availableSlots.map((slot, index) => (
                                <SelectItem key={index} value={slot.date}>
                                  {new Date(slot.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedDate && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Time Slot
                            </label>
                            <Select
                              value={booking.timeSlot}
                              onValueChange={(value) =>
                                setBooking({ ...booking, timeSlot: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableTimeSlots.map((time, index) => (
                                  <SelectItem key={index} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Duration (hours)
                          </label>
                          <Select
                            value={booking.duration}
                            onValueChange={(value) =>
                              setBooking({ ...booking, duration: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 hour</SelectItem>
                              <SelectItem value="2">2 hours</SelectItem>
                              <SelectItem value="3">3 hours</SelectItem>
                              <SelectItem value="4">4 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Special Notes (Optional)
                          </label>
                          <Input
                            placeholder="Any special requirements..."
                            value={booking.notes}
                            onChange={(e) =>
                              setBooking({ ...booking, notes: e.target.value })
                            }
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="submit"
                            className="flex-1 bg-primary text-primary-foreground"
                          >
                            Submit Booking
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={resetBooking}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-mono tracking-wide font-extralight">
                            Booking Submitted!
                          </h3>
                          <p className="font-serif text-muted-foreground">
                            Your booking request has been received.
                          </p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm font-medium">
                            Booking ID: {bookingId}
                          </p>
                          <p className="text-xs font-serif text-muted-foreground mt-1">
                            To complete your booking, please login or integrate
                            payments.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Button
                            className="w-full bg-primary text-primary-foreground"
                            onClick={() =>
                              alert("Mock payment success! Booking confirmed.")
                            }
                          >
                            Complete Payment (Mock)
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={resetBooking}
                          >
                            Make Another Booking
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

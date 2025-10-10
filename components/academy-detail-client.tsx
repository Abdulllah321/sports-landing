"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Users, Calendar, Trophy, Award, Crown, Phone, Mail, Globe, Clock, User, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  about: string;
  services: string[];
  courses: Array<{
    name: string;
    duration: string;
    ageGroup: string;
    description: string;
  }>;
  timetable: Record<string, Array<{
    time: string;
    activity: string;
    group: string;
  }>>;
  coachesList: Array<{
    name: string;
    role: string;
    experience: string;
    image: string;
    bio: string;
  }>;
  testimonials: Array<{
    name: string;
    age: number;
    program: string;
    text: string;
    rating: number;
  }>;
  gallery: string[];
  contact: {
    phone: string;
    email: string;
    address: string;
    website: string;
  };
}

interface AcademyDetailClientProps {
  academy: Academy;
}

export function AcademyDetailClient({ academy }: AcademyDetailClientProps) {
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false);
  const [joinFormData, setJoinFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    experience: "",
    package: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleJoinFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log("Join form submitted:", joinFormData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsJoinFormOpen(false);
      setIsSubmitted(false);
      setJoinFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        experience: "",
        package: "",
        message: ""
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-96 md:h-[500px]">
          <Image
            src={academy.image}
            alt={academy.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {getPackageBadge(academy.packageLevel)}
                <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                  {academy.sport}
                </Badge>
                {academy.featured && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className={`text-3xl md:text-5xl font-bold text-white mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                {academy.name}
              </h1>
              <p className={`text-lg text-white/90 max-w-3xl ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {academy.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{academy.rating}</div>
              <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {t('academies.directory.rating')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{academy.students}</div>
              <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {t('academies.directory.students')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{academy.coaches}</div>
              <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {t('academies.directory.coaches')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{academy.established}</div>
              <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {t('academies.directory.established')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="about">{t('academies.detail.about')}</TabsTrigger>
                <TabsTrigger value="services">{t('academies.detail.services')}</TabsTrigger>
                <TabsTrigger value="courses">{t('academies.detail.courses')}</TabsTrigger>
                <TabsTrigger value="timetable">{t('academies.detail.timetable')}</TabsTrigger>
                <TabsTrigger value="coaches">{t('academies.detail.coaches')}</TabsTrigger>
                <TabsTrigger value="testimonials">{t('academies.detail.testimonials')}</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                      {t('academies.detail.about')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-muted-foreground leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {academy.about}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                      {t('academies.detail.facilities')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {academy.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className={`text-sm ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                            {facility}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                      {t('academies.detail.services')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {academy.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className={`${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {academy.courses.map((course, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className={`text-lg ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                          {course.name}
                        </CardTitle>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                            {course.duration}
                          </span>
                          <span>•</span>
                          <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                            {course.ageGroup}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                          {course.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timetable" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                      {t('academies.detail.timetable')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(academy.timetable).map(([day, sessions]) => (
                        <div key={day} className="border rounded-lg p-4">
                          <h4 className={`font-semibold mb-3 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                            {day}
                          </h4>
                          <div className="space-y-2">
                            {sessions.map((session, index) => (
                              <div key={index} className="flex items-center gap-4 p-2 bg-muted/50 rounded">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[100px]">
                                  <Clock className="h-4 w-4" />
                                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                                    {session.time}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className={`font-medium ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                                    {session.activity}
                                  </div>
                                  <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                                    {session.group}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="coaches" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                      {t('academies.detail.coaches')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {academy.coachesList.map((coach, index) => (
                        <div key={index} className="text-center space-y-4">
                          <div className="relative w-24 h-24 mx-auto">
                            <Image
                              src={coach.image}
                              alt={coach.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className={`font-semibold text-lg ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                              {coach.name}
                            </h4>
                            <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                              {coach.role}
                            </p>
                            <p className={`text-xs text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                              {coach.experience} experience
                            </p>
                          </div>
                          <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                            {coach.bio}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                      {t('academies.detail.testimonials')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {academy.testimonials.map((testimonial, index) => (
                        <div key={index} className="space-y-4 p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                            "{testimonial.text}"
                          </p>
                          <div className="pt-2 border-t">
                            <div className={`font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                              {testimonial.name}
                            </div>
                            <div className={`text-xs text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                              {testimonial.age} years old • {testimonial.program}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                      {t('academies.detail.gallery')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {academy.gallery.map((image, index) => (
                        <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Academy Card */}
            <Card>
              <CardHeader>
                <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                  {t('academies.detail.joinForm')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {academy.packageLevel === 'bronze' ? '$99' : 
                     academy.packageLevel === 'silver' ? '$199' : '$399'}
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {academy.packageLevel.charAt(0).toUpperCase() + academy.packageLevel.slice(1)} Package
                  </div>
                </div>
                
                <Dialog open={isJoinFormOpen} onOpenChange={setIsJoinFormOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      {t('academies.detail.joinForm')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                        {t('academies.detail.joinForm')}
                      </DialogTitle>
                    </DialogHeader>
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className={`text-lg font-semibold mb-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                          Application Submitted!
                        </h3>
                        <p className={`text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                          We'll contact you soon with more information.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleJoinFormSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={joinFormData.name}
                            onChange={(e) => setJoinFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={joinFormData.email}
                            onChange={(e) => setJoinFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={joinFormData.phone}
                            onChange={(e) => setJoinFormData(prev => ({ ...prev, phone: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={joinFormData.age}
                            onChange={(e) => setJoinFormData(prev => ({ ...prev, age: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="experience">Experience Level</Label>
                          <Select value={joinFormData.experience} onValueChange={(value) => setJoinFormData(prev => ({ ...prev, experience: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="package">Package Interest</Label>
                          <Select value={joinFormData.package} onValueChange={(value) => setJoinFormData(prev => ({ ...prev, package: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select package" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bronze">Bronze - $99/month</SelectItem>
                              <SelectItem value="silver">Silver - $199/month</SelectItem>
                              <SelectItem value="gold">Gold - $399/month</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="message">Additional Message</Label>
                          <Textarea
                            id="message"
                            value={joinFormData.message}
                            onChange={(e) => setJoinFormData(prev => ({ ...prev, message: e.target.value }))}
                            rows={3}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Submit Application
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                  {t('academies.detail.contact')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>{academy.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>{academy.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>{academy.contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className={locale === 'ar' ? 'font-arabic-body' : ''}>{academy.contact.website}</span>
                </div>
              </CardContent>
            </Card>

            {/* Store Link */}
            <Card>
              <CardHeader>
                <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>
                  {t('academies.detail.store')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm text-muted-foreground mb-4 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  Get academy merchandise and equipment from our official store.
                </p>
                <Button variant="outline" className="w-full">
                  Visit Store
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Trophy, 
  ShoppingCart, 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  Vote, 
  BarChart3, 
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Heart,
  MessageSquare,
  Share2
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";

interface PlayerLandingClientProps {
  locale: Locale;
}

export function PlayerLandingClient({ locale }: PlayerLandingClientProps) {
  const isArabic = locale === 'ar';

  const features = [
    {
      icon: User,
      title: isArabic ? 'الملف الشخصي' : 'Player Profile',
      description: isArabic ? 'إدارة شاملة للملف الشخصي والإحصائيات' : 'Complete profile and stats management',
      href: '/player/profile',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Users,
      title: isArabic ? 'الأكاديميات' : 'Academies',
      description: isArabic ? 'انضم إلى أكاديمية مناسبة لتطوير مهاراتك' : 'Join suitable academies to develop your skills',
      href: '/player/academies',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      icon: Trophy,
      title: isArabic ? 'البطولات' : 'Tournaments',
      description: isArabic ? 'شارك في البطولات والمسابقات' : 'Participate in tournaments and competitions',
      href: '/player/tournaments',
      color: 'bg-green-500/10 text-green-500'
    },
    {
      icon: MapPin,
      title: isArabic ? 'حجز المرافق' : 'Facility Booking',
      description: isArabic ? 'احجز الملاعب والمرافق الرياضية' : 'Book sports facilities and pitches',
      href: '/player/facilities',
      color: 'bg-purple-500/10 text-purple-500'
    },
    {
      icon: Award,
      title: isArabic ? 'المسابقات' : 'Competitions',
      description: isArabic ? 'شارك في المسابقات والاختبارات' : 'Join competitions and quizzes',
      href: '/player/competitions',
      color: 'bg-orange-500/10 text-orange-500'
    },
    {
      icon: Vote,
      title: isArabic ? 'التصويت' : 'Voting',
      description: isArabic ? 'شارك في التصويت والاستطلاعات' : 'Participate in voting and polls',
      href: '/player/voting',
      color: 'bg-pink-500/10 text-pink-500'
    },
    {
      icon: BarChart3,
      title: isArabic ? 'الاستطلاعات' : 'Surveys',
      description: isArabic ? 'شارك في الاستطلاعات وساعد في التطوير' : 'Participate in surveys and help development',
      href: '/player/surveys',
      color: 'bg-indigo-500/10 text-indigo-500'
    },
    {
      icon: ShoppingCart,
      title: isArabic ? 'المتجر' : 'Store',
      description: isArabic ? 'تسوق للمعدات الرياضية' : 'Shop for sports equipment',
      href: '/player/store',
      color: 'bg-rose-500/10 text-rose-500'
    }
  ];

  const stats = [
    { label: isArabic ? 'لاعب نشط' : 'Active Players', value: '48,930' },
    { label: isArabic ? 'بطولة' : 'Tournaments', value: '1,245' },
    { label: isArabic ? 'أكاديمية' : 'Academies', value: '312' },
    { label: isArabic ? 'مرفق' : 'Facilities', value: '612' }
  ];

  const testimonials = [
    {
      name: isArabic ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: isArabic ? 'لاعب كرة قدم' : 'Football Player',
      content: isArabic ? 'منصة رائعة ساعدتني في تطوير مهاراتي والانضمام إلى أكاديمية ممتازة' : 'Amazing platform that helped me develop my skills and join an excellent academy',
      rating: 5
    },
    {
      name: isArabic ? 'سارة أحمد' : 'Sara Ahmed',
      role: isArabic ? 'لاعبة تنس' : 'Tennis Player',
      content: isArabic ? 'سهولة حجز الملاعب والمشاركة في البطولات جعلت تجربتي ممتازة' : 'Easy facility booking and tournament participation made my experience excellent',
      rating: 5
    },
    {
      name: isArabic ? 'محمد علي' : 'Mohamed Ali',
      role: isArabic ? 'لاعب كرة سلة' : 'Basketball Player',
      content: isArabic ? 'المجتمع الرياضي هنا رائع والمسابقات متنوعة ومثيرة' : 'The sports community here is great and competitions are diverse and exciting',
      rating: 5
    }
  ];

  return (
    <div className="space-y-16">
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className={`text-3xl font-bold text-primary ${isArabic ? 'font-arabic-heading' : ''}`}>
                {stat.value}
              </div>
              <div className={`text-sm text-muted-foreground mt-2 ${isArabic ? 'font-arabic-body' : ''}`}>
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
            {isArabic ? 'ميزات المنصة' : 'Platform Features'}
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
            {isArabic ? 'اكتشف جميع الميزات المتاحة للاعبين' : 'Discover all features available for players'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className={`text-lg ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {feature.title}
                </CardTitle>
                <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={feature.href}>
                    {isArabic ? 'استكشف' : 'Explore'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
            {isArabic ? 'آراء اللاعبين' : 'Player Testimonials'}
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
            {isArabic ? 'ما يقوله اللاعبون عن تجربتهم مع المنصة' : 'What players say about their experience with the platform'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`text-muted-foreground mb-4 ${isArabic ? 'font-arabic-body' : ''}`}>
                  "{testimonial.content}"
                </p>
                <div>
                  <div className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                    {testimonial.name}
                  </div>
                  <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-primary/20">
          <CardContent className="pt-8 pb-8">
            <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
              {isArabic ? 'ابدأ رحلتك الرياضية اليوم' : 'Start Your Sports Journey Today'}
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'انضم إلى آلاف اللاعبين واستمتع بتجربة رياضية شاملة ومتكاملة' : 'Join thousands of players and enjoy a comprehensive and integrated sports experience'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/register">
                  <User className="h-5 w-5 mr-2" />
                  {isArabic ? 'انضم الآن' : 'Join Now'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">
                  <User className="h-5 w-5 mr-2" />
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
              </Button>
            </div>
            <p className={`mt-4 text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic ? 'أو تصفح لوحة التحكم للاعبين' : 'Or explore the player dashboard'}
              <Link href="/player/dashboard" className="text-primary hover:underline ml-1">
                {isArabic ? 'هنا' : 'here'}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

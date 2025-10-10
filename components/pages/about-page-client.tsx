"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Target, 
  Users, 
  Trophy, 
  Building2, 
  PlayCircle, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Lightbulb,
  Shield,
  Zap
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";

interface AboutPageClientProps {
  locale: Locale;
}

export function AboutPageClient({ locale }: AboutPageClientProps) {
  const [activeTab, setActiveTab] = useState("vision");
  const [investorEmail, setInvestorEmail] = useState("");
  const [investorSent, setInvestorSent] = useState(false);

  const isArabic = locale === 'ar';

  function handleInvestorSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInvestorSent(true);
  }

  const stats = [
    {
      number: "50,000+",
      label: isArabic ? 'رياضي مسجل' : 'Registered Athletes',
      icon: Users
    },
    {
      number: "1,200+",
      label: isArabic ? 'بطولة منظمة' : 'Tournaments Organized',
      icon: Trophy
    },
    {
      number: "500+",
      label: isArabic ? 'مرفق شريك' : 'Partner Facilities',
      icon: Building2
    },
    {
      number: "25+",
      label: isArabic ? 'دولة' : 'Countries',
      icon: Globe
    }
  ];

  const values = [
    {
      icon: Heart,
      title: isArabic ? 'الشغف' : 'Passion',
      description: isArabic ? 'نحن متحمسون للرياضة ونؤمن بقدرتها على تغيير الحياة' : 'We are passionate about sports and believe in its power to transform lives'
    },
    {
      icon: Lightbulb,
      title: isArabic ? 'الابتكار' : 'Innovation',
      description: isArabic ? 'نستخدم أحدث التقنيات لإنشاء حلول مبتكرة للرياضيين' : 'We leverage cutting-edge technology to create innovative solutions for athletes'
    },
    {
      icon: Shield,
      title: isArabic ? 'الموثوقية' : 'Trust',
      description: isArabic ? 'نحن ملتزمون ببناء منصة آمنة وموثوقة للجميع' : 'We are committed to building a secure and trustworthy platform for everyone'
    },
    {
      icon: Zap,
      title: isArabic ? 'التميز' : 'Excellence',
      description: isArabic ? 'نسعى دائماً لتقديم أفضل تجربة ممكنة للمستخدمين' : 'We constantly strive to deliver the best possible experience for our users'
    }
  ];

  const team = [
    {
      name: isArabic ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: isArabic ? 'الرئيس التنفيذي والمؤسس' : 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: isArabic ? 'لاعب محترف سابق مع 15+ سنة في تقنية الرياضة وتطوير الأعمال' : 'Former professional athlete with 15+ years in sports technology and business development'
    },
    {
      name: isArabic ? 'فاطمة العلي' : 'Fatima Al-Ali',
      role: isArabic ? 'الرئيس التقني' : 'CTO',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: isArabic ? 'قائدة تقنية مع خبرة في المنصات القابلة للتوسع وأنظمة تحليلات الرياضة' : 'Technology leader with expertise in scalable platforms and sports analytics systems'
    },
    {
      name: isArabic ? 'خالد المنصوري' : 'Khalid Al-Mansoori',
      role: isArabic ? 'رئيس العمليات' : 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: isArabic ? 'خبير عمليات مع خبرة عميقة في إدارة المرافق الرياضية وتنظيم البطولات' : 'Operations expert with deep experience in sports facility management and tournament organization'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Stats Section */}
      <section className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className={`text-3xl font-bold text-primary mb-2 ${isArabic ? 'font-arabic-heading' : ''}`}>
                {stat.number}
              </div>
              <div className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vision">
            {isArabic ? 'الرؤية' : 'Vision'}
          </TabsTrigger>
          <TabsTrigger value="mission">
            {isArabic ? 'المهمة' : 'Mission'}
          </TabsTrigger>
          <TabsTrigger value="team">
            {isArabic ? 'الفريق' : 'Team'}
          </TabsTrigger>
          <TabsTrigger value="investors">
            {isArabic ? 'المستثمرون' : 'Investors'}
          </TabsTrigger>
        </TabsList>

        {/* Vision Tab */}
        <TabsContent value="vision" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className={`text-3xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'رؤيتنا' : 'Our Vision'}
                  </h2>
                </div>
                <p className={`text-lg text-muted-foreground leading-relaxed ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic 
                    ? 'أن نجعل الرياضة متاحة للجميع من خلال إنشاء منصة موحدة تربط الرياضيين والمرافق والمجتمعات. نحن نتخيل عالماً حيث كل رياضي لديه فرصة متساوية للتدريب والتنافس والتفوق.'
                    : 'To make sports accessible to everyone by creating a unified platform that connects athletes, facilities, and communities. We envision a world where every athlete has equal opportunity to train, compete, and excel.'
                  }
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className={`text-xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'قيمنا الأساسية' : 'Our Core Values'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                          {value.title}
                        </h4>
                        <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Mission Tab */}
        <TabsContent value="mission" className="space-y-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
              {isArabic ? 'مهمتنا' : 'Our Mission'}
            </h2>
            <p className={`text-lg text-muted-foreground max-w-3xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic 
                ? 'توحيد البطولات والمرافق والأكاديميات والوسائط تحت نظام بيئي شامل واحد يُمكّن الرياضيين من الوصول إلى إمكاناتهم الكاملة مع بناء تدفقات إيرادات مستدامة للمنظمات الرياضية.'
                : 'To unify tournaments, facilities, academies, and media under one comprehensive ecosystem that empowers athletes to reach their full potential while building sustainable revenue streams for sports organizations.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                      {isArabic ? 'نمو اللاعبين' : 'Player Growth'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic 
                      ? 'توسيع مشاركة اللاعبين وتسجيل الأكاديميات من خلال برامج تدريبية متاحة وفرص تنافسية تجذب الرياضيين في كل مستوى مهارة.'
                      : 'Expand player participation and academy enrollments through accessible training programs and competitive opportunities that engage athletes at every skill level.'
                    }
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                      {isArabic ? 'تحسين المرافق' : 'Venue Optimization'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic 
                      ? 'زيادة استخدام المرافق مع أنظمة حجز شفافة ورؤى مدفوعة بالبيانات تساعد المرافق على تعظيم إمكاناتها وخدمة المزيد من الرياضيين.'
                      : 'Increase venue utilization with transparent booking systems and data-driven insights that help facilities maximize their potential and serve more athletes.'
                    }
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <PlayCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                      {isArabic ? 'ابتكار الوسائط' : 'Media Innovation'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic 
                      ? 'تمكين مشاركة الإيرادات من الوسائط من خلال منصة يوسبورت، مما يخلق فرصاً جديدة لمنشئي المحتوى والرياضيين لاستثمار محتوى الرياضة.'
                      : 'Enable revenue-sharing media through YouSport platform, creating new opportunities for content creators and athletes to monetize their sports content.'
                    }
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
              {isArabic ? 'فريقنا' : 'Our Team'}
            </h2>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic 
                ? 'محترفون متحمسون مكرسون لتحويل صناعة الرياضة من خلال التكنولوجيا والابتكار.'
                : 'Passionate professionals dedicated to transforming the sports industry through technology and innovation.'
              }
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className={`text-xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {member.name}
                    </CardTitle>
                    <CardDescription className={`text-primary font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm text-muted-foreground text-center ${isArabic ? 'font-arabic-body' : ''}`}>
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Investors Tab */}
        <TabsContent value="investors" className="space-y-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
              {isArabic ? 'معلومات المستثمرين' : 'Investor Information'}
            </h2>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic 
                ? 'انضم إلينا في إحداث ثورة في صناعة الرياضة. حمل حزمة المستثمرين وتواصل مع فريقنا.'
                : 'Join us in revolutionizing the sports industry. Download our investor pack and connect with our team.'
              }
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Investor Pack Download */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                      {isArabic ? 'حزمة المستثمرين' : 'Investor Pack'}
                    </CardTitle>
                  </div>
                  <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic 
                      ? 'نظرة شاملة على نموذج أعمالنا وتوقعاتنا المالية واستراتيجية النمو.'
                      : 'Comprehensive overview of our business model, financial projections, and growth strategy.'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-primary text-primary-foreground hover:opacity-95"
                  >
                    <a href="/investor-pack-pdf.jpg" download>
                      <Download className="mr-2 h-4 w-4" />
                      {isArabic ? 'تحميل حزمة المستثمرين (PDF)' : 'Download Investor Pack (PDF)'}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                      {isArabic ? 'طلب المعلومات' : 'Request Information'}
                    </CardTitle>
                  </div>
                  <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic 
                      ? 'تواصل مع فريقنا لمناقشة مفصلة حول فرص الاستثمار.'
                      : 'Get in touch with our team for detailed discussions about investment opportunities.'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {investorSent ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                        <Mail className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic-heading' : ''}`}>
                        {isArabic ? 'شكراً لك!' : 'Thank You!'}
                      </h3>
                      <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic 
                          ? 'تم استلام طلبك. سنتابع معك خلال يومي عمل.'
                          : 'Your request has been received. We\'ll follow up within 2 business days.'
                        }
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInvestorSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder={isArabic ? 'عنوان بريدك الإلكتروني' : 'Your email address'}
                          value={investorEmail}
                          onChange={(e) => setInvestorEmail(e.target.value)}
                          required
                          className={isArabic ? 'font-arabic-body' : ''}
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder={isArabic ? 'اسم الشركة' : 'Company name'}
                          required
                          className={isArabic ? 'font-arabic-body' : ''}
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder={isArabic ? 'أخبرنا عن اهتماماتك الاستثمارية...' : 'Tell us about your investment interests...'}
                          rows={3}
                          className={isArabic ? 'font-arabic-body' : ''}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:opacity-95"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        {isArabic ? 'إرسال الطلب' : 'Send Request'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                      investors@ficro.com
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                      +971 4 123 4567
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
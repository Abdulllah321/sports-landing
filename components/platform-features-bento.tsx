"use client"

import { motion } from "framer-motion"
import { Trophy, School, Users, PlayCircle, TrendingUp, Calendar } from "lucide-react"
import { Locale } from "@/lib/i18n"
import { getClientTranslation } from "@/lib/client-translations"
import { useLanguage } from "@/lib/translation-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PlatformFeaturesBentoProps {
  locale: Locale
}

export function PlatformFeaturesBento({ locale: initialLocale }: PlatformFeaturesBentoProps) {
  const { locale } = useLanguage()
  const t = getClientTranslation(locale as any)
  const isArabic = locale === 'ar'

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isArabic ? 'font-arabic-heading' : ''}`}>
              {isArabic ? 'منصة فيكرو الرياضية الشاملة' : 'The Complete Sports Platform'}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${isArabic ? 'font-arabic-body' : ''}`}>
              {isArabic 
                ? 'منصة شاملة تربط الرياضيين، الأكاديميات، النوادي والصحفيين في نظام بيئي رقمي متكامل'
                : 'A comprehensive platform connecting athletes, academies, clubs, and journalists in an integrated digital sports ecosystem'
              }
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {/* Large Card - Tournaments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="md:col-span-2 md:row-span-2"
            >
              <Card className="h-full group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Trophy className="h-8 w-8 text-primary" />
                    </motion.div>
                    <Badge variant="secondary">{isArabic ? '500+ بطولة' : '500+ Events'}</Badge>
                  </div>
                  <CardTitle className={`text-3xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'البطولات والفعاليات' : 'Tournaments & Events'}
                  </CardTitle>
                  <CardDescription className={`text-base ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic 
                      ? 'انضم إلى البطولات التنافسية، الدوريات والفعاليات الرياضية عبر تخصصات متعددة'
                      : 'Join competitive tournaments, leagues, and sporting events across multiple disciplines'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Animated Illustration */}
                  <div className="relative h-48 mb-6">
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                        <Trophy className="h-16 w-16 text-primary" />
                      </div>
                    </motion.div>
                    {/* Orbiting particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2"
                        animate={{
                          rotate: [0 + i * 120, 360 + i * 120]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.3
                        }}
                        style={{ transformOrigin: "0 0" }}
                      >
                        <div 
                          className="w-3 h-3 rounded-full bg-primary/40"
                          style={{ transform: `translateX(80px) translateY(-1.5px)` }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/tournaments">{isArabic ? 'استعرض البطولات' : 'Browse Events'}</Link>
                  </Button>
                </CardContent>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>

            {/* Medium Card - Academies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="md:row-span-2"
            >
              <Card className="h-full group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <motion.div 
                    className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <School className="h-7 w-7 text-primary" />
                  </motion.div>
                  <Badge variant="outline" className="w-fit mb-2">{isArabic ? '200+ أكاديمية' : '200+ Academies'}</Badge>
                  <CardTitle className={`text-2xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'الأكاديميات الرياضية' : 'Sports Academies'}
                  </CardTitle>
                  <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic 
                      ? 'برامج تدريبية احترافية مع مدربين معتمدين'
                      : 'Professional training programs with certified coaches'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  {/* Stacked illustration */}
                  <div className="relative h-32 mb-6">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{ top: `${i * 30}px`, zIndex: 3 - i }}
                        animate={{
                          y: [0, -8, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-20 h-20 rounded-lg bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                          <School className="h-10 w-10 text-primary" style={{ opacity: 1 - i * 0.2 }} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/academies">{isArabic ? 'اكتشف الأكاديميات' : 'Explore Academies'}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Small Card - Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
                    whileHover={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="h-6 w-6 text-primary" />
                  </motion.div>
                  <CardTitle className={`text-xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'المجتمع' : 'Community'}
                  </CardTitle>
                  <CardDescription className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? '50K+ عضو نشط' : '50K+ Active Members'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Pulsing circles */}
                  <div className="relative h-20 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1.5, 2],
                          opacity: [1, 0.5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.6,
                          ease: "easeOut"
                        }}
                      >
                        <div className="w-16 h-16 rounded-full border-2 border-primary" />
                      </motion.div>
                    ))}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/community">{isArabic ? 'انضم' : 'Join'}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Small Card - YouSport */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <PlayCircle className="h-6 w-6 text-primary" />
                  </motion.div>
                  <CardTitle className={`text-xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'قناة يوسبورت' : 'YouSport'}
                  </CardTitle>
                  <CardDescription className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'بث مباشر' : 'Live Streaming'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Play button animation */}
                  <div className="relative h-20 mb-4">
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(var(--primary), 0.7)",
                            "0 0 0 10px rgba(var(--primary), 0)",
                            "0 0 0 20px rgba(var(--primary), 0)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      >
                        <PlayCircle className="h-8 w-8 text-primary-foreground" />
                      </motion.div>
                    </motion.div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/yousport">{isArabic ? 'شاهد الآن' : 'Watch Now'}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Medium Card - Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="md:col-span-2"
            >
              <Card className="h-full group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <TrendingUp className="h-7 w-7 text-primary" />
                    </motion.div>
                    <Badge variant="secondary">{isArabic ? 'مدعوم بالذكاء الاصطناعي' : 'AI Powered'}</Badge>
                  </div>
                  <CardTitle className={`text-2xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'تحليلات الأداء' : 'Performance Analytics'}
                  </CardTitle>
                  <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic 
                      ? 'تتبع تقدمك مع إحصائيات ورؤى تفصيلية'
                      : 'Track your progress with detailed stats and insights'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Animated chart bars */}
                  <div className="flex items-end justify-around h-24 mb-6">
                    {[60, 80, 45, 90, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                        className="w-8 bg-primary rounded-t origin-bottom"
                        style={{ height: `${height}%` }}
                        whileHover={{ scaleY: 1.1 }}
                      />
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/analytics">{isArabic ? 'عرض الإحصائيات' : 'View Stats'}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Small Card - Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
                    animate={{ 
                      rotateY: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Calendar className="h-6 w-6 text-primary" />
                  </motion.div>
                  <CardTitle className={`text-xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'إدارة الفعاليات' : 'Event Management'}
                  </CardTitle>
                  <CardDescription className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'إعداد سهل' : 'Easy Setup'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Calendar grid animation */}
                  <div className="grid grid-cols-5 gap-1 h-20 mb-4">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + i * 0.02 }}
                        className={`rounded ${i % 5 === 2 ? 'bg-primary' : 'bg-muted'}`}
                        whileHover={{ scale: 1.2, backgroundColor: "var(--primary)" }}
                      />
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/events">{isArabic ? 'إنشاء فعالية' : 'Create Event'}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


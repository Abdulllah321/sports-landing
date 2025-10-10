import { Hero } from "@/components/hero"
import { FeatureGrid } from "@/components/feature-grid"
import { NewsCards } from "@/components/news-cards"
import { TournamentCardsServer } from "@/components/tournament-cards-server"
import { StadiumCardsServer } from "@/components/stadium-cards-server"
import { YouSportVideoServer } from "@/components/yousport-video-server"
import { InvestorCta } from "@/components/investor-cta"
import { getServerTranslationWithLocale } from "./locale-provider-server"
import Link from "next/link"
import { ArrowRight, User, Trophy, ShoppingCart, Calendar, MapPin, Users, Award, Vote, BarChart3, Star } from "lucide-react"

export async function HomePageServer() {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <>
      <Hero locale={locale} />

      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight text-foreground ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono'}`}>
              {t('home.hero.title')}
            </h2>
            <p className={`mt-4 text-lg text-muted-foreground max-w-3xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}> 
              {t('home.hero.description')}
            </p>
          </div>
          <div className="mt-12">
            <FeatureGrid locale={locale} />
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-t from-foreground/10 via-primary-foreground/5 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-secondary/20" />
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight text-foreground ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono'}`}>
              {t('home.news.title')}
            </h2>
            <p className={`mt-4 text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('home.news.description')}
            </p>
          </div>
          <NewsCards limit={3} locale={locale} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-foreground/10 via-background to-secondary/10"> 
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight text-foreground ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono'}`}>
              {t('home.tournaments.title')}
            </h2>
            <p className={`mt-4 text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('home.tournaments.description')}
            </p>
          </div>
          {await TournamentCardsServer({ limit: 6 })}
        </div>
      </section>

      <section className="px-4 py-12 md:py-16 bg-gradient-to-t from-foreground/10 to-secondary/10">
        <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight text-foreground ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono'}`}>
              {t('home.stadiums.title')}
            </h2>
            <p className={`mt-4 text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('home.stadiums.description')}
            </p>
          </div>
        <StadiumCardsServer limit={2} />
        <div className="text-center mt-8">
          <Link href="/facilities" className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
            {t('home.stadiums.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <YouSportVideoServer locale={locale} />

      {/* Player System Showcase */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-accent/10" />
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight text-foreground mb-4 ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono'}`}>
                {locale === 'ar' ? 'نظام اللاعبين المتكامل' : 'Complete Player System'}
              </h2>
              <p className={`text-lg text-muted-foreground max-w-3xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {locale === 'ar' ? 'انضم إلى آلاف اللاعبين واستمتع بتجربة رياضية شاملة' : 'Join thousands of players and enjoy a comprehensive sports experience'}
              </p>
            </div>

            {/* Player Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="group p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                      {locale === 'ar' ? 'الملف الشخصي' : 'Player Profile'}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {locale === 'ar' ? 'إدارة شاملة للملف الشخصي' : 'Complete profile management'}
                    </p>
                  </div>
                </div>
                <Link 
                  href="/player/profile" 
                  className={`inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors ${locale === 'ar' ? 'font-arabic-body' : ''}`}
                >
                  {locale === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'} 
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Link>
              </div>

              <div className="group p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                      {locale === 'ar' ? 'الأكاديميات' : 'Academies'}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {locale === 'ar' ? 'انضم إلى أكاديمية مناسبة' : 'Join suitable academies'}
                    </p>
                  </div>
                </div>
                <Link 
                  href="/player/academies" 
                  className={`inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors ${locale === 'ar' ? 'font-arabic-body' : ''}`}
                >
                  {locale === 'ar' ? 'تصفح الأكاديميات' : 'Browse Academies'} 
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Link>
              </div>

              <div className="group p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <Trophy className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                      {locale === 'ar' ? 'البطولات' : 'Tournaments'}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {locale === 'ar' ? 'شارك في البطولات والمسابقات' : 'Participate in tournaments'}
                    </p>
                  </div>
                </div>
                <Link 
                  href="/player/tournaments" 
                  className={`inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors ${locale === 'ar' ? 'font-arabic-body' : ''}`}
                >
                  {locale === 'ar' ? 'عرض البطولات' : 'View Tournaments'} 
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Link>
              </div>

              <div className="group p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <MapPin className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                      {locale === 'ar' ? 'حجز المرافق' : 'Facility Booking'}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {locale === 'ar' ? 'احجز الملاعب والمرافق' : 'Book pitches and facilities'}
                    </p>
                  </div>
                </div>
                <Link 
                  href="/player/facilities" 
                  className={`inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors ${locale === 'ar' ? 'font-arabic-body' : ''}`}
                >
                  {locale === 'ar' ? 'حجز الآن' : 'Book Now'} 
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Link>
              </div>

              <div className="group p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                    <Award className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                      {locale === 'ar' ? 'المسابقات' : 'Competitions'}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {locale === 'ar' ? 'شارك في المسابقات والاختبارات' : 'Join competitions and quizzes'}
                    </p>
                  </div>
                </div>
                <Link 
                  href="/player/competitions" 
                  className={`inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors ${locale === 'ar' ? 'font-arabic-body' : ''}`}
                >
                  {locale === 'ar' ? 'ابدأ المسابقة' : 'Start Competition'} 
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Link>
              </div>

              <div className="group p-6 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors">
                    <ShoppingCart className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                      {locale === 'ar' ? 'المتجر' : 'Store'}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {locale === 'ar' ? 'تسوق للمعدات الرياضية' : 'Shop for sports equipment'}
                    </p>
                  </div>
                </div>
                <Link 
                  href="/player/store" 
                  className={`inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors ${locale === 'ar' ? 'font-arabic-body' : ''}`}
                >
                  {locale === 'ar' ? 'تسوق الآن' : 'Shop Now'} 
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Link>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/auth/register" 
                  className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl ${locale === 'ar' ? 'font-arabic-body' : ''}`}
                >
                  <User className="h-5 w-5" />
                  {locale === 'ar' ? 'انضم كلاعب' : 'Join as Player'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/auth/login" 
                  className={`inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${locale === 'ar' ? 'font-arabic-body' : ''}`}
                >
                  <User className="h-5 w-5" />
                  {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
              </div>
              <p className={`mt-4 text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {locale === 'ar' ? 'أو تصفح لوحة التحكم للاعبين' : 'Or explore the player dashboard'}
                <Link href="/player/dashboard" className="text-primary hover:underline ml-1">
                  {locale === 'ar' ? 'هنا' : 'here'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <InvestorCta />
        </div>
      </section>
    </>
  )
}

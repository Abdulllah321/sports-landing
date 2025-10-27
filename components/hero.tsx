import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getServerTranslation } from "@/lib/server-translations"
import { Locale } from "@/lib/i18n"
import { HeroAnimated } from "./hero-animated"
import { CalendarRange, MapPin, Play, ArrowRight } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  locale: Locale
}

export function Hero({ locale }: HeroProps) {
  const t = getServerTranslation(locale)
  return (<>
    <section className="relative min-h-[80vh] flex flex-col  " aria-label="Hero">
      {/* Full-bleed background */}
      <div
        className="absolute inset-0  bg-cover bg-[center_5%]"
        style={{ backgroundImage: 'url("/images/hero.jpeg")' }}
        role="img"
        aria-label="Athletes in a stadium background"
      />
      {/* Light/Dark readability gradient */}
      <div className={` absolute inset-0  from-black/60 via-transparent to-black/10 dark:from-black/60 dark:via-transparent dark:to-black/10  ${locale === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'}`} />

      {/* Content */}
      <div className="container mx-auto px-4 py-14 md:py-24 text-center h-full justify-between flex flex-col items-center z-20 relative">
        <div>
        <p className={`text-sm tracking-wide text-white/90 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
          {t('hero.tagline')}
        </p>
        
        <h1 className={`mt-2 text-balance text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono tracking-wider'}`}>
          {t('hero.title')}
        </h1>
        <p className={`mt-4 max-w-3xl text-base md:text-lg text-white/90 mb-8 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
          {t('hero.description')}
        </p>
        </div>
         {/* Primary CTA Badges */}
         <div className="flex flex-col sm:flex-row gap-4 mb-8">
           <Link 
             href="/tournaments" 
             className="inline-flex items-center gap-3 bg-primary/90 hover:bg-primary text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-primary/20"
           >
             <CalendarRange className="h-5 w-5" />
             {locale === 'ar' ? 'استكشف البطولات' : 'Explore Tournaments'}
             {/* <ArrowRight className="h-4 w-4" /> */}
           </Link>
           
           <Link 
             href="/facilities" 
             className="inline-flex items-center gap-3 bg-secondary/90 hover:bg-secondary text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-secondary/20"
           >
             <MapPin className="h-5 w-5" />
             {locale === 'ar' ? 'احجز مرفق' : 'Book Facility'}
           </Link>
         </div>

         {/* Secondary CTA Badges */}
         <div className="flex items-center gap-4">
           <Link 
             href="/yousport" 
             className="inline-flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
           >
             <Play className="h-4 w-4" />
             {locale === 'ar' ? 'شاهد YouSport' : 'Watch YouSport'}
           </Link>
           
           <div className="text-white/60 text-sm">
             {locale === 'ar' ? 'أو' : 'or'}
           </div>
           
           <Link 
             href="/academies" 
             className="inline-flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
           >
             {locale === 'ar' ? 'انضم إلى أكاديمية' : 'Join Academy'}
           </Link>
         </div>
      </div>

   
    </section>
      {/* KPI Strip */}
       {/* <div className="absolute z-10 py-8 -top-1/2">
       
       <div className="container mx-auto px-4">
         <div className="grid gap-4 sm:grid-cols-3">
           <KpiCard label={t('hero.stats.players')} value="48,930" locale={locale} />
           <KpiCard label={t('hero.stats.tournaments')} value="1,245" locale={locale} />
           <KpiCard label={t('hero.stats.stadiums')} value="612" locale={locale} />
         </div>
       </div>
     </div> */}
     </>
  )
}

function KpiCard({ label, value, locale }: { label: string; value: string; locale: Locale }) {
  return (
    <Card className="text-card-foreground bg-white/95 dark:bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-white/95 dark:supports-[backdrop-filter]:bg-card/70 shadow-xl border-white/30 dark:border-border/60">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-mono tracking-tight text-foreground">{value}</CardTitle>
        <CardDescription className={`mt-1 text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>{label}</CardDescription>
      </CardHeader>
    </Card>
  )
}


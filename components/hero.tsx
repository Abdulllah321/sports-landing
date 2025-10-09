import Link from "next/link"
import { CalendarRange, MapPin, Play } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getServerTranslation } from "@/lib/server-translations"
import { Locale } from "@/lib/i18n"
import { HeroAnimated } from "./hero-animated"

interface HeroProps {
  locale: Locale
}

export function Hero({ locale }: HeroProps) {
  const t = getServerTranslation(locale)
  return (
    <section className="relative dark" aria-label="Hero">
      {/* Full-bleed background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/hero-legends.jpg")' }}
        role="img"
        aria-label="Athletes in a stadium background"
      />
      {/* Light/Dark readability gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/40 to-white/10 dark:from-black/60 dark:via-black/40 dark:to-black/10" />

      {/* Content */}
      <div className="container mx-auto px-4 py-14 md:py-24">
        <HeroAnimated locale={locale}>
          <p className={`text-sm tracking-wide text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
            {t('hero.tagline')}
          </p>
          <h1 className={`mt-2 text-4xl md:text-6xl leading-[1.05] font-mono text-foreground ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
            {t('hero.title')}
          </h1>
          <p className={`mt-4 max-w-3xl text-base md:text-lg text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
            {t('hero.description')}
          </p>

          {/* CTA Card Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <CtaCard
              href="/tournaments"
              title={t('hero.tournaments.title')}
              description={t('hero.tournaments.description')}
              Icon={CalendarRange}
              locale={locale}
            />
            <CtaCard
              href="/facilities"
              title={t('hero.facilities.title')}
              description={t('hero.facilities.description')}
              Icon={MapPin}
              locale={locale}
            />
            <CtaCard
              href="/yousport"
              title={t('hero.yousport.title')}
              description={t('hero.yousport.description')}
              Icon={Play}
              locale={locale}
            />
          </div>
        </HeroAnimated>
      </div>

      {/* KPI Strip */}
      <div className="relative py-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background/40 to-background dark:from-black/0 dark:via-black/40 dark:to-black" />
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <KpiCard label={t('hero.stats.players')} value="48,930" locale={locale} />
            <KpiCard label={t('hero.stats.tournaments')} value="1,245" locale={locale} />
            <KpiCard label={t('hero.stats.stadiums')} value="612" locale={locale} />
          </div>
        </div>
      </div>
    </section>
  )
}

function KpiCard({ label, value, locale }: { label: string; value: string; locale: Locale }) {
  return (
    <Card className="text-card-foreground bg-primary/20 backdrop-blur supports-[backdrop-filter]:bg-card/70 shadow-lg border-border/60">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-mono tracking-tight">{value}</CardTitle>
        <CardDescription className={`mt-1 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>{label}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function CtaCard({
  href,
  title,
  description,
  Icon,
  locale,
}: {
  href: string
  title: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
  locale: Locale
}) {
  return (
    <Card className="transition hover:shadow-md bg-white/80 dark:bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-card/40">
      <Link href={href} className="block p-5">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-foreground shadow-sm">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className={`text-base ${locale === 'ar' ? 'font-arabic-body' : ''}`}>{title}</CardTitle>
            <CardDescription className={`mt-1 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>{description}</CardDescription>
            <span className={`mt-3 inline-block text-xs font-medium text-muted-foreground hover:text-secondary ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {locale === 'ar' ? 'ابدأ الآن ←' : 'Get started →'}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  )
}

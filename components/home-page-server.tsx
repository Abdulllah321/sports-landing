import { Hero } from "@/components/hero"
import { FeatureGrid } from "@/components/feature-grid"
import { NewsCards } from "@/components/news-cards"
import { TournamentCardsServer } from "@/components/tournament-cards-server"
import { StadiumCardsServer } from "@/components/stadium-cards-server"
import { YouSportVideoServer } from "@/components/yousport-video-server"
import { InvestorCta } from "@/components/investor-cta"
import { getServerTranslationWithLocale } from "./locale-provider-server"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export async function HomePageServer() {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <>
      <Hero locale={locale} />

      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
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
            <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
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
            <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {t('home.tournaments.title')}
            </h2>
            <p className={`mt-4 text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('home.tournaments.description')}
            </p>
          </div>
          <TournamentCardsServer limit={6} locale={locale} />
        </div>
      </section>

      <section className="px-4 py-12 md:py-16 bg-gradient-to-t from-foreground/10 to-secondary/10">
        <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className={`text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {t('home.stadiums.title')}
            </h2>
            <p className={`mt-4 text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('home.stadiums.description')}
            </p>
          </div>
        <StadiumCardsServer limit={2} locale={locale} />
        <div className="text-center mt-8">
          <Link href="/facilities" className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
            {t('home.stadiums.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <YouSportVideoServer locale={locale} />

      <section>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <InvestorCta />
        </div>
      </section>
    </>
  )
}

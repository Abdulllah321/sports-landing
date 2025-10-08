import { Hero } from "@/components/hero"
import { FeatureGrid } from "@/components/feature-grid"
import { SectionHeader } from "@/components/section-header"
import { NewsCards } from "@/components/news-cards"
import { TournamentCards } from "@/components/tournament-cards"
import { StadiumCards } from "@/components/stadium-cards"
import { YouSportVideo } from "@/components/yousport-video"
import { InvestorCta } from "@/components/investor-cta"
import { SponsorsStrip } from "@/components/sponsors-strip"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* <SponsorsStrip /> */}

      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground">
              Personal Overview Panel
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"> 
              Browse tournaments and events, discover academies, book facilities, and explore our YouSport channel. Built
              for the investor demo — fully responsive UI with clear stubs where deeper integrations are required.
            </p>
          </div>
          <div className="mt-12">
            <FeatureGrid />
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-t from-foreground/10 via-primary-foreground/5 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-secondary/20" />
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground">
              Latest News
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Updates on programs, results, and features.
            </p>
          </div>
          <NewsCards limit={3} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-foreground/10 via-background to-secondary/10"> 
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground">
              Upcoming Tournaments
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find competitions across regions.
            </p>
          </div>
          <TournamentCards limit={6} />
        </div>
      </section>

      <section className="px-4 py-12 md:py-16 bg-gradient-to-t from-foreground/10 to-secondary/10">
        <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground">
              Featured Stadiums
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore high-quality facilities with amenities.
            </p>
          </div>
        <StadiumCards limit={2} />
        <div className="text-center mt-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Stadiums
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <YouSportVideo />

      <section>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <InvestorCta />
        </div>
      </section>
    </>
  )
}

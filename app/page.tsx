import { Hero } from "@/components/hero"
import { KpiStrip } from "@/components/kpi-strip"
import { FeatureGrid } from "@/components/feature-grid"
import { SectionHeader } from "@/components/section-header"
import { NewsCards } from "@/components/news-cards"
import { TournamentCards } from "@/components/tournament-cards"
import { StadiumCards } from "@/components/stadium-cards"
import { YouSportEmbed } from "@/components/yousport-embed"
import { InvestorCta } from "@/components/investor-cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <KpiStrip />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-balance text-2xl md:text-3xl font-semibold tracking-tight">Personal Overview Panel</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Browse tournaments and events, discover academies, book facilities, and explore our YouSport channel. Built
          for the investor demo — fully responsive UI with clear stubs where deeper integrations are required.
        </p>
        <div className="mt-10">
          <FeatureGrid />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeader title="Latest News" subtitle="Updates on programs, results, and features." />
        <NewsCards limit={3} />
      </section>

      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <SectionHeader title="Upcoming Tournaments" subtitle="Find competitions across regions." />
          <TournamentCards limit={6} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeader title="Featured Stadiums" subtitle="Explore high-quality facilities with amenities." />
        <StadiumCards limit={6} />
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeader title="Latest YouSport Clip" subtitle="Watch public highlights from the community." />
        <YouSportEmbed />
      </section>

      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <InvestorCta />
        </div>
      </section>
    </>
  )
}

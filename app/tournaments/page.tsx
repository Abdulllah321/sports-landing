import { TournamentCards } from "@/components/tournament-cards"

export default function TournamentsIndex() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Tournaments</h1>
      <p className="mt-2 text-muted-foreground">Browse competitions and events. Client-side filters only.</p>
      <div className="mt-8">
        <TournamentCards />
      </div>
    </section>
  )
}

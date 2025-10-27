import { notFound } from "next/navigation"
import { getTournamentsByLocale } from "@/data/tournaments-translations"
import { TournamentDetailClient } from "@/components/tournament-detail-client"
import { getServerTranslationWithLocale } from "@/components/locale-provider-server"

export default async function TournamentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { locale } = await getServerTranslationWithLocale()
  const { id } = await params
  
  const tournaments = getTournamentsByLocale(locale)
  const tournament = tournaments.find((x) => x.id === id)
  
  if (!tournament) return notFound()

  return <TournamentDetailClient tournament={tournament} locale={locale} />
}

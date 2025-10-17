import { notFound } from "next/navigation"
import { tournaments } from "@/data/tournaments"
import { TournamentDetailClient } from "@/components/tournament-detail-client"

export default async function TournamentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tournament = tournaments.find((x) => x.id === id)
  
  if (!tournament) return notFound()

  return <TournamentDetailClient tournament={tournament} />
}

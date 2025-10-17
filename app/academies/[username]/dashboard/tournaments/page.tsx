import { TournamentManagementServer } from "@/components/pages/tournament-management-server"

interface TournamentManagementPageProps {
  params: {
    username: string
  }
}

export default function TournamentManagementPage({ params }: TournamentManagementPageProps) {
  return <TournamentManagementServer username={params.username} />
}

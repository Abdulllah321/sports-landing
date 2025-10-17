import { PlayersPageServer } from "@/components/pages/players-page-server"

interface PlayersPageProps {
  params: {
    username: string
  }
}

export default function PlayersPage({ params }: PlayersPageProps) {
  return <PlayersPageServer username={params.username} />
}

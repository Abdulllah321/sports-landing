import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { TournamentManagementClient } from "./tournament-management-client"
import { DashboardLayout } from "../layouts/dashboard-layout"

interface TournamentManagementServerProps {
  username: string
}

export async function TournamentManagementServer({ username }: TournamentManagementServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <DashboardLayout username={username}>
      <TournamentManagementClient locale={locale} username={username} />
    </DashboardLayout>
  )
}

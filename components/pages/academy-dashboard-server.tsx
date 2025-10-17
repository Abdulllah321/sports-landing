import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { AcademyDashboardClient } from "@/components/pages/academy-dashboard-client"

interface AcademyDashboardServerProps {
  username: string
}

export async function AcademyDashboardServer({ username }: AcademyDashboardServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <AcademyDashboardClient locale={locale} username={username} />
  )
}

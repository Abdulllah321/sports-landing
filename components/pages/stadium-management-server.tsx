import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { StadiumManagementClient } from "./stadium-management-client"
import { DashboardLayout } from "../layouts/dashboard-layout"

interface StadiumManagementServerProps {
  username: string
}

export async function StadiumManagementServer({ username }: StadiumManagementServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <DashboardLayout username={username}>

    <StadiumManagementClient locale={locale} username={username} />
    </DashboardLayout>
  )
}

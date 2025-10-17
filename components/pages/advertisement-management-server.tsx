import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { AdvertisementManagementClient } from "./advertisement-management-client"
import { DashboardLayout } from "../layouts/dashboard-layout"

interface AdvertisementManagementServerProps {
  username: string
}

export async function AdvertisementManagementServer({ username }: AdvertisementManagementServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <DashboardLayout username={username}>
      <AdvertisementManagementClient locale={locale} username={username} />
    </DashboardLayout>
  )
}

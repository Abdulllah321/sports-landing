import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { VideoManagementClient } from "./video-management-client"
import { DashboardLayout } from "../layouts/dashboard-layout"

interface VideoManagementServerProps {
  username: string
}

export async function VideoManagementServer({ username }: VideoManagementServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <DashboardLayout username={username}>
      <VideoManagementClient locale={locale} username={username} />
    </DashboardLayout>
  )
}

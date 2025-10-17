import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { CrmManagementClient } from "./crm-management-client"
import { DashboardLayout } from "../layouts/dashboard-layout"

interface CrmManagementServerProps {
  username: string
}

export async function CrmManagementServer({ username }: CrmManagementServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <DashboardLayout username={username}>
      <CrmManagementClient locale={locale} username={username} />
    </DashboardLayout>
  )
}

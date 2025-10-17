import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { CRMDashboardClient } from "./crm-dashboard-client"

export async function CRMDashboardServer() {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <div className="min-h-screen bg-background">
      <CRMDashboardClient locale={locale} />
    </div>
  )
}

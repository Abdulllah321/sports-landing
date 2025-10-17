import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { BookingManagementClient } from "./booking-management-client"
import { DashboardLayout } from "../layouts/dashboard-layout"

interface BookingManagementServerProps {
  username: string
}

export async function BookingManagementServer({ username }: BookingManagementServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <DashboardLayout username={username}>
      <BookingManagementClient locale={locale} username={username} />
    </DashboardLayout>
  )
}

"use client"

import React from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { DashboardOverview } from "@/components/pages/dashboard-overview"

export function AcademyDashboardClient({ locale, username }: { locale: string; username: string }) {
  return (
    <DashboardLayout username={username}>
      <DashboardOverview />
    </DashboardLayout>
  )
}

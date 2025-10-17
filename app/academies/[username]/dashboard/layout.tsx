import { ReactNode } from "react"

interface AcademyDashboardLayoutProps {
  children: ReactNode
}

export default function AcademyDashboardLayout({ children }: AcademyDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}

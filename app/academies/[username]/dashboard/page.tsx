import { AcademyDashboardServer } from "@/components/pages/academy-dashboard-server"

interface AcademyDashboardPageProps {
  params: {
    username: string
  }
}

export default function AcademyDashboardPage({ params }: AcademyDashboardPageProps) {
  return <AcademyDashboardServer username={params.username} />
}

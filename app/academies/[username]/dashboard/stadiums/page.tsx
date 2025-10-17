import { StadiumManagementServer } from "@/components/pages/stadium-management-server"

interface StadiumManagementPageProps {
  params: {
    username: string
  }
}

export default function StadiumManagementPage({ params }: StadiumManagementPageProps) {
  return <StadiumManagementServer username={params.username} />
}

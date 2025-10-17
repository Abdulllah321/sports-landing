import { CrmManagementServer } from "@/components/pages/crm-management-server"

interface CrmManagementPageProps {
  params: {
    username: string
  }
}

export default function CrmManagementPage({ params }: CrmManagementPageProps) {
  return <CrmManagementServer username={params.username} />
}

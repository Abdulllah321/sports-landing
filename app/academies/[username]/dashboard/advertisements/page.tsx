import { AdvertisementManagementServer } from "@/components/pages/advertisement-management-server"

interface AdvertisementManagementPageProps {
  params: {
    username: string
  }
}

export default function AdvertisementManagementPage({ params }: AdvertisementManagementPageProps) {
  return <AdvertisementManagementServer username={params.username} />
}

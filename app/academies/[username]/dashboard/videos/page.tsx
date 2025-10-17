import { VideoManagementServer } from "@/components/pages/video-management-server"

interface VideoManagementPageProps {
  params: {
    username: string
  }
}

export default function VideoManagementPage({ params }: VideoManagementPageProps) {
  return <VideoManagementServer username={params.username} />
}

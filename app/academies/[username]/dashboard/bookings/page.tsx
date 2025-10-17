import { BookingManagementServer } from "@/components/pages/booking-management-server"

interface BookingManagementPageProps {
  params: {
    username: string
  }
}

export default function BookingManagementPage({ params }: BookingManagementPageProps) {
  return <BookingManagementServer username={params.username} />
}

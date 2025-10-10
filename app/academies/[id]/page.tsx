import { AcademyDetailServer } from "@/components/academy-detail-server";

interface AcademyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AcademyDetailPage({ params }: AcademyDetailPageProps) {
  const { id } = await params;
  return <AcademyDetailServer academyId={id} />;
}

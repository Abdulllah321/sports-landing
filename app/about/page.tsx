import { AboutPageClient } from "./about-page-client";
import { Locale } from "@/lib/i18n";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  
  return <AboutPageClient locale={locale as Locale} />;
}

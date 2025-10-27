import { getServerTranslationWithLocale } from "@/components/locale-provider-server";
import { TeamsPageClient } from "@/components/pages/teams-page-client";

export default async function TeamsPage() {
  const { t, locale } = await getServerTranslationWithLocale();
  
  return <TeamsPageClient locale={locale} />;
}


import { getServerTranslationWithLocale } from "@/components/locale-provider-server";
import { SupportPageClient } from "./support-page-client";

export async function SupportPageServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return <SupportPageClient locale={locale} />;
}


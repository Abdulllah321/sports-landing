import { getServerTranslationWithLocale } from "./locale-provider-server";
import { OnboardingPageClient } from "./onboarding-page-client";

export async function OnboardingPageServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return <OnboardingPageClient locale={locale} />;
}


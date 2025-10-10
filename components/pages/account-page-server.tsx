import { getServerTranslationWithLocale } from "../locale-provider-server";
import { AccountPageClient } from "./account-page-client";

export async function AccountPageServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <AccountPageClient locale={locale} />
    </div>
  );
}

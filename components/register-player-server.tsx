import { getServerTranslationWithLocale } from "@/components/locale-provider-server";
import { RegisterPlayerClient } from "./register-player-client";

export async function RegisterPlayerServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return <RegisterPlayerClient locale={locale} />;
}


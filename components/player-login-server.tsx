import { getServerTranslationWithLocale } from "@/components/locale-provider-server";
import { PlayerLoginClient } from "@/components/player-login-client";

export async function PlayerLoginServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return <PlayerLoginClient locale={locale} />;
}
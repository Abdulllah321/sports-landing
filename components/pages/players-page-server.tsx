import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { PlayersPageClient } from "./players-page-client"

interface PlayersPageServerProps {
  username: string
}

export async function PlayersPageServer({ username }: PlayersPageServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <PlayersPageClient locale={locale} username={username} />
  )
}

import { TournamentCardsClient } from "./tournament-cards"
import { getServerTranslation } from "@/lib/server-translations"
import { Locale } from "@/lib/i18n"

interface TournamentCardsServerProps {
  limit?: number
  locale: Locale
}

export function TournamentCardsServer({ limit, locale }: TournamentCardsServerProps) {
  const t = getServerTranslation(locale)
  
  return (
    <TournamentCardsClient 
      limit={limit} 
      locale={locale}
      translations={{
        searchPlaceholder: t('tournaments.searchPlaceholder'),
        countryPlaceholder: t('tournaments.countryPlaceholder'),
        allCountries: t('tournaments.allCountries'),
        viewDetails: t('tournaments.viewDetails')
      }}
    />
  )
}

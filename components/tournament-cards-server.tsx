import { TournamentCardsClient } from "./tournament-cards"
import { getServerTranslationWithLocale } from "./locale-provider-server"

interface TournamentCardsServerProps {
  limit?: number
}

export async function TournamentCardsServer({ limit }: TournamentCardsServerProps) {
  const { t, locale } = await getServerTranslationWithLocale()
  
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

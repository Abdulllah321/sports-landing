import { StadiumCardsClient } from "./stadium-cards"
import { getServerTranslation } from "@/lib/server-translations"
import { Locale } from "@/lib/i18n"

interface StadiumCardsServerProps {
  limit?: number
  locale: Locale
}

export function StadiumCardsServer({ limit, locale }: StadiumCardsServerProps) {
  const t = getServerTranslation(locale)
  
  return (
    <StadiumCardsClient 
      limit={limit} 
      locale={locale}
      translations={{
        searchPlaceholder: t('stadiums.searchPlaceholder'),
        cityPlaceholder: t('stadiums.cityPlaceholder'),
        allCities: t('stadiums.allCities'),
        rating: t('stadiums.rating'),
        capacity: t('stadiums.capacity'),
        amenities: t('stadiums.amenities'),
        startingFrom: t('stadiums.startingFrom'),
        viewStadium: t('stadiums.viewStadium')
      }}
    />
  )
}

import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { TournamentsPageClient } from "./tournaments-page-client"
import { getTournamentsByLocale } from "@/data/tournaments-translations"

export async function TournamentsPageServer() {
  const { t, locale } = await getServerTranslationWithLocale()
  const tournaments = getTournamentsByLocale(locale)

  // Get unique values for filters
  const countries = ["All", ...Array.from(new Set(tournaments.map((t) => t.country)))]
  const types = ["All", ...Array.from(new Set(tournaments.map((t) => t.type)))]
  const sports = ["All", ...Array.from(new Set(tournaments.map((t) => t.sport)))].filter(Boolean)
  const ageGroups = ["All", ...Array.from(new Set(tournaments.map((t) => t.ageGroup)))].filter(Boolean)
  const statuses = ["All", "Open", "Registration Closed", "Upcoming", "Completed"]

  return (
    <TournamentsPageClient
      tournaments={tournaments}
      locale={locale}
      filterOptions={{
        countries,
        types,
        sports,
        ageGroups,
        statuses
      }}
      translations={{
        searchPlaceholder: t('tournaments.searchPlaceholder'),
        countryPlaceholder: t('tournaments.countryPlaceholder'),
        allCountries: t('tournaments.allCountries'),
        sportPlaceholder: t('tournaments.sportPlaceholder'),
        allSports: t('tournaments.allSports'),
        ageGroupPlaceholder: t('tournaments.ageGroupPlaceholder'),
        allAgeGroups: t('tournaments.allAgeGroups'),
        viewDetails: t('tournaments.viewDetails')
      }}
    />
  )
}


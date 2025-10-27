import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { FacilitiesPageClient } from "./facilities-page-client"
import { getFacilitiesByLocale } from "@/data/facilities-translations"
import { Locale } from "@/lib/i18n"

export async function FacilitiesPageServer() {
  const { t, locale } = await getServerTranslationWithLocale()
  const facilities = getFacilitiesByLocale(locale)

  return (
    <FacilitiesPageClient
      locale={locale}
      facilities={facilities}
      translations={{
        title: t('facilities.title'),
        description: t('facilities.description'),
        totalFacilities: t('facilities.totalFacilities'),
        availableNow: t('facilities.availableNow'),
        avgRating: t('facilities.avgRating'),
        searchPlaceholder: t('facilities.searchPlaceholder'),
        selectCity: t('facilities.selectCity'),
        allCities: t('facilities.allCities'),
        selectType: t('facilities.selectType'),
        allTypes: t('facilities.allTypes'),
        selectDate: t('facilities.selectDate'),
        anyDate: t('facilities.anyDate'),
        selectTime: t('facilities.selectTime'),
        anyTime: t('facilities.anyTime'),
        availableFacilities: t('facilities.availableFacilities'),
        facilityFound: t('facilities.facilityFound'),
        facilitiesFound: t('facilities.facilitiesFound'),
        sortedByRating: t('facilities.sortedByRating'),
        noFacilitiesFound: t('facilities.noFacilitiesFound'),
        tryAdjusting: t('facilities.tryAdjusting'),
        clearFilters: t('facilities.clearFilters'),
        gridView: t('facilities.gridView'),
        comparePrices: t('facilities.comparePrices'),
        pricingComparison: t('facilities.pricingComparison'),
        perHour: t('facilities.perHour'),
        viewDetails: t('facilities.viewDetails')
      }}
    />
  )
}


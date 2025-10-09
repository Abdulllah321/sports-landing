import { YouSportVideo } from "./yousport-video"
import { getServerTranslation } from "@/lib/server-translations"
import { Locale } from "@/lib/i18n"

interface YouSportVideoServerProps {
  locale: Locale
}

export function YouSportVideoServer({ locale }: YouSportVideoServerProps) {
  const t = getServerTranslation(locale)
  
  return (
    <YouSportVideo 
      locale={locale}
      translations={{
        title: t('yousport.title'),
        description: t('yousport.description'),
        live: t('yousport.live'),
        views: t('yousport.views'),
        watchMore: t('yousport.watchMore'),
        uploadClip: t('yousport.uploadClip')
      }}
    />
  )
}

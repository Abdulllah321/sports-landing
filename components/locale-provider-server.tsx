import { cookies } from 'next/headers'
import { Locale, defaultLocale, isValidLocale } from '@/lib/i18n'
import { getServerTranslation } from '@/lib/server-translations'

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')?.value
  return (localeCookie as Locale) || defaultLocale
}

export async function getServerTranslationWithLocale() {
  const locale = await getServerLocale()
  return {
    t: getServerTranslation(locale),
    locale
  }
}

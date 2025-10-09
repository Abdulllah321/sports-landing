import { Locale, defaultLocale, isValidLocale } from './i18n'

// Import translations statically for server-side rendering
import enTranslations from './translations/en.json'
import arTranslations from './translations/ar.json'

const translations = {
  en: enTranslations,
  ar: arTranslations,
} as const

export function getTranslations(locale: Locale = defaultLocale) {
  if (!isValidLocale(locale)) {
    return translations[defaultLocale]
  }
  return translations[locale]
}

export function getServerTranslation(locale: Locale = defaultLocale) {
  const t = getTranslations(locale)
  
  return function tFunction(key: string): string {
    const keys = key.split('.')
    let value: any = t
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }
}

export function getLocaleFromRequest(request: Request): Locale {
  // Try to get locale from URL pathname first
  const url = new URL(request.url)
  const pathname = url.pathname
  
  // Check if pathname starts with a locale
  const pathSegments = pathname.split('/').filter(Boolean)
  if (pathSegments.length > 0) {
    const potentialLocale = pathSegments[0]
    if (isValidLocale(potentialLocale)) {
      return potentialLocale as Locale
    }
  }
  
  // Fallback to Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
    
    for (const lang of languages) {
      if (lang.startsWith('ar')) return 'ar'
      if (lang.startsWith('en')) return 'en'
    }
  }
  
  return defaultLocale
}

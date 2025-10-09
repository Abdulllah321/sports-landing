import { Locale, defaultLocale } from './i18n'

// Import translations statically for client-side rendering
import enTranslations from './translations/en.json'
import arTranslations from './translations/ar.json'

const translations = {
  en: enTranslations,
  ar: arTranslations,
} as const

export function getClientTranslation(locale: Locale = defaultLocale) {
  const t = translations[locale] || translations[defaultLocale]
  
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

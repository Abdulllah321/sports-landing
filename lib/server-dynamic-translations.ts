import 'server-only'
import { Locale, defaultLocale, isValidLocale } from './i18n'

// Re-export the dynamic translations for server components
export * from './dynamic-translations'

// Server-only functions that can use 'server-only'
export function getServerNewsByLocale(locale: Locale) {
  const { getNewsByLocale } = require('./dynamic-translations')
  const news = getNewsByLocale(locale)
  // Ensure all fields are strings, not TranslatableContent objects
  return news.map(item => ({
    ...item,
    title: typeof item.title === 'string' ? item.title : item.title[locale] || item.title.en || '',
    excerpt: typeof item.excerpt === 'string' ? item.excerpt : item.excerpt[locale] || item.excerpt.en || '',
    category: typeof item.category === 'string' ? item.category : item.category[locale] || item.category.en || ''
  }))
}

export function getServerTournamentsByLocale(locale: Locale) {
  const { getTournamentsByLocale } = require('./dynamic-translations')
  return getTournamentsByLocale(locale)
}

export function getServerFacilitiesByLocale(locale: Locale) {
  const { getFacilitiesByLocale } = require('./dynamic-translations')
  return getFacilitiesByLocale(locale)
}

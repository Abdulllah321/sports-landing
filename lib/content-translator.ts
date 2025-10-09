import 'server-only'
import { Locale, defaultLocale, isValidLocale } from './i18n'

// Generic content translator that can work with any data source
export class ContentTranslator {
  private translationMap: Map<string, Map<string, Record<Locale, string>>> = new Map()

  constructor(initialTranslations?: Record<string, Record<string, Record<Locale, string>>>) {
    if (initialTranslations) {
      this.loadTranslations(initialTranslations)
    }
  }

  // Load translations from any source (CMS, database, API, etc.)
  loadTranslations(translations: Record<string, Record<string, Record<Locale, string>>>) {
    for (const [contentId, fields] of Object.entries(translations)) {
      const fieldMap = new Map()
      for (const [field, localeTranslations] of Object.entries(fields)) {
        fieldMap.set(field, localeTranslations)
      }
      this.translationMap.set(contentId, fieldMap)
    }
  }

  // Add translation for a specific content item and field
  addTranslation(contentId: string, field: string, translations: Record<Locale, string>) {
    if (!this.translationMap.has(contentId)) {
      this.translationMap.set(contentId, new Map())
    }
    this.translationMap.get(contentId)!.set(field, translations)
  }

  // Get translated value for a specific field
  getTranslatedField(contentId: string, field: string, locale: Locale, fallback?: string): string {
    if (!isValidLocale(locale)) {
      locale = defaultLocale
    }

    const fieldTranslations = this.translationMap.get(contentId)?.get(field)
    return fieldTranslations?.[locale] || fallback || field
  }

  // Translate a single content item
  translateItem<T extends Record<string, any>>(item: T, locale: Locale): T {
    if (!isValidLocale(locale)) {
      locale = defaultLocale
    }

    const translated = { ...item }
    const itemTranslations = this.translationMap.get(item.id)

    if (itemTranslations) {
      for (const [field, translations] of itemTranslations) {
        if (translations[locale]) {
          translated[field] = translations[locale]
        }
      }
    }

    return translated
  }

  // Translate an array of content items
  translateItems<T extends Record<string, any>>(items: T[], locale: Locale): T[] {
    return items.map(item => this.translateItem(item, locale))
  }

  // Get all available locales for a specific field
  getAvailableLocales(contentId: string, field: string): Locale[] {
    const fieldTranslations = this.translationMap.get(contentId)?.get(field)
    return fieldTranslations ? Object.keys(fieldTranslations) as Locale[] : []
  }

  // Check if a field has translation for a specific locale
  hasTranslation(contentId: string, field: string, locale: Locale): boolean {
    const fieldTranslations = this.translationMap.get(contentId)?.get(field)
    return !!(fieldTranslations && fieldTranslations[locale])
  }

  // Get all content IDs that have translations
  getTranslatedContentIds(): string[] {
    return Array.from(this.translationMap.keys())
  }

  // Get all fields that have translations for a content ID
  getTranslatedFields(contentId: string): string[] {
    const fieldMap = this.translationMap.get(contentId)
    return fieldMap ? Array.from(fieldMap.keys()) : []
  }
}

// Example usage with different data sources
export class NewsTranslator extends ContentTranslator {
  constructor() {
    super({
      'n1': {
        title: {
          en: "Academy Updates & Summer Programs",
          ar: "تحديثات الأكاديمية وبرامج الصيف"
        },
        excerpt: {
          en: "Enrollments open for summer training blocks across partner academies.",
          ar: "فتح التسجيل لكتل التدريب الصيفية عبر الأكاديميات الشريكة."
        },
        category: {
          en: "Academies",
          ar: "الأكاديميات"
        }
      }
    })
  }

  // Method to load translations from CMS API
  async loadFromCMS(apiUrl: string) {
    try {
      const response = await fetch(apiUrl)
      const translations = await response.json()
      this.loadTranslations(translations)
    } catch (error) {
      console.error('Failed to load translations from CMS:', error)
    }
  }
}

// Factory function to create translators for different content types
export function createTranslator(contentType: 'news' | 'tournaments' | 'facilities'): ContentTranslator {
  const translators = {
    news: new NewsTranslator(),
    tournaments: new ContentTranslator(),
    facilities: new ContentTranslator()
  }
  return translators[contentType]
}

// Utility function to translate content from any source
export async function translateContentFromSource<T extends Record<string, any>>(
  content: T[],
  locale: Locale,
  translationSource: 'cms' | 'database' | 'api' | 'static',
  sourceConfig?: any
): Promise<T[]> {
  const translator = new ContentTranslator()

  switch (translationSource) {
    case 'cms':
      // Load from CMS API
      if (sourceConfig?.apiUrl) {
        await translator.loadFromCMS?.(sourceConfig.apiUrl)
      }
      break
    case 'database':
      // Load from database
      if (sourceConfig?.dbQuery) {
        // Implementation would depend on your database setup
        console.log('Loading translations from database...')
      }
      break
    case 'api':
      // Load from external API
      if (sourceConfig?.apiEndpoint) {
        // Implementation would depend on your API setup
        console.log('Loading translations from API...')
      }
      break
    case 'static':
      // Use static translations (already loaded)
      break
  }

  return translator.translateItems(content, locale)
}

import 'server-only'
import { Locale } from './i18n'
import { ContentTranslator, createTranslator } from './content-translator'

// Example 1: Using with static data
export function translateStaticNews(newsData: any[], locale: Locale) {
  const translator = createTranslator('news')
  return translator.translateItems(newsData, locale)
}

// Example 2: Using with CMS data
export async function translateCMSContent(contentType: string, locale: Locale) {
  const translator = new ContentTranslator()
  
  // Simulate loading from CMS
  const cmsData = await fetch(`/api/cms/${contentType}`)
  const content = await cmsData.json()
  
  // Load translations from CMS
  const translations = await fetch(`/api/translations/${contentType}`)
  const translationData = await translations.json()
  translator.loadTranslations(translationData)
  
  return translator.translateItems(content, locale)
}

// Example 3: Using with database data
export async function translateDatabaseContent(
  tableName: string, 
  locale: Locale,
  dbConnection: any
) {
  const translator = new ContentTranslator()
  
  // Fetch content from database
  const content = await dbConnection.query(`SELECT * FROM ${tableName}`)
  
  // Fetch translations from database
  const translations = await dbConnection.query(`
    SELECT content_id, field_name, locale, translation 
    FROM translations 
    WHERE content_type = ? AND locale IN (?, ?)
  `, [tableName, 'en', 'ar'])
  
  // Process translations into the expected format
  const translationMap: Record<string, Record<string, Record<Locale, string>>> = {}
  translations.forEach((row: any) => {
    if (!translationMap[row.content_id]) {
      translationMap[row.content_id] = {}
    }
    if (!translationMap[row.content_id][row.field_name]) {
      translationMap[row.content_id][row.field_name] = {}
    }
    translationMap[row.content_id][row.field_name][row.locale as Locale] = row.translation
  })
  
  translator.loadTranslations(translationMap)
  return translator.translateItems(content, locale)
}

// Example 4: Using with API data
export async function translateAPIContent(apiEndpoint: string, locale: Locale) {
  const translator = new ContentTranslator()
  
  try {
    // Fetch content and translations in parallel
    const [contentResponse, translationsResponse] = await Promise.all([
      fetch(apiEndpoint),
      fetch(`${apiEndpoint}/translations`)
    ])
    
    const content = await contentResponse.json()
    const translations = await translationsResponse.json()
    
    translator.loadTranslations(translations)
    return translator.translateItems(content, locale)
  } catch (error) {
    console.error('Failed to fetch content:', error)
    return []
  }
}

// Example 5: Hybrid approach - static fallback with dynamic loading
export async function translateWithFallback(
  content: any[],
  locale: Locale,
  dynamicSource?: 'cms' | 'api' | 'database'
) {
  const translator = new ContentTranslator()
  
  // Load static translations as fallback
  const staticTranslations = {
    'n1': {
      title: {
        en: "Academy Updates & Summer Programs",
        ar: "تحديثات الأكاديمية وبرامج الصيف"
      }
    }
  }
  translator.loadTranslations(staticTranslations)
  
  // Try to load dynamic translations
  if (dynamicSource) {
    try {
      switch (dynamicSource) {
        case 'cms':
          await translator.loadFromCMS?.('/api/cms/translations')
          break
        case 'api':
          const response = await fetch('/api/translations')
          const dynamicTranslations = await response.json()
          translator.loadTranslations(dynamicTranslations)
          break
        case 'database':
          // Database loading would be implemented here
          break
      }
    } catch (error) {
      console.warn('Failed to load dynamic translations, using static fallback:', error)
    }
  }
  
  return translator.translateItems(content, locale)
}

// Example 6: Real-time translation updates
export class RealtimeTranslator extends ContentTranslator {
  private updateCallbacks: Set<(contentId: string, field: string, translations: Record<Locale, string>) => void> = new Set()

  constructor() {
    super()
    this.setupRealtimeUpdates()
  }

  private setupRealtimeUpdates() {
    // Example: WebSocket connection for real-time updates
    if (typeof window !== 'undefined') {
      const ws = new WebSocket('ws://localhost:3001/translations')
      
      ws.onmessage = (event) => {
        const update = JSON.parse(event.data)
        this.addTranslation(update.contentId, update.field, update.translations)
        
        // Notify all callbacks
        this.updateCallbacks.forEach(callback => {
          callback(update.contentId, update.field, update.translations)
        })
      }
    }
  }

  onTranslationUpdate(callback: (contentId: string, field: string, translations: Record<Locale, string>) => void) {
    this.updateCallbacks.add(callback)
  }

  offTranslationUpdate(callback: (contentId: string, field: string, translations: Record<Locale, string>) => void) {
    this.updateCallbacks.delete(callback)
  }
}

// Example 7: Translation caching
export class CachedTranslator extends ContentTranslator {
  private cache = new Map<string, any>()
  private cacheTimeout = 5 * 60 * 1000 // 5 minutes

  async translateItemsWithCache<T extends Record<string, any>>(
    items: T[], 
    locale: Locale,
    cacheKey?: string
  ): Promise<T[]> {
    const key = cacheKey || `translate_${items.length}_${locale}`
    
    if (this.cache.has(key)) {
      const cached = this.cache.get(key)
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data
      }
    }
    
    const translated = this.translateItems(items, locale)
    this.cache.set(key, {
      data: translated,
      timestamp: Date.now()
    })
    
    return translated
  }

  clearCache() {
    this.cache.clear()
  }
}

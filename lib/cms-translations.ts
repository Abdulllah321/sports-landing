import 'server-only'
import { Locale, defaultLocale, isValidLocale } from './i18n'

// Generic translatable content interface
export interface TranslatableField {
  [locale: string]: string
}

// Content item interface that can be extended for any content type
export interface TranslatableContentItem {
  id: string
  [key: string]: any
}

// Translation mapping for dynamic content
export interface TranslationMap {
  [contentId: string]: {
    [field: string]: TranslatableField
  }
}

// Example translation map (this could come from a CMS or database)
export const translationMap: TranslationMap = {
  // News translations
  'n1': {
    title: {
      en: "Academy Updates & Summer Programs",
      ar: "تحديثات الأكاديمية وبرامج الصيف"
    },
    excerpt: {
      en: "Enrollments open for summer training blocks across partner academies. Bronze/Silver/Gold packages available.",
      ar: "فتح التسجيل لكتل التدريب الصيفية عبر الأكاديميات الشريكة. حزم برونزية/فضية/ذهبية متاحة."
    },
    category: {
      en: "Academies",
      ar: "الأكاديميات"
    }
  },
  'n2': {
    title: {
      en: "New Stadium Partnerships",
      ar: "شراكات ملاعب جديدة"
    },
    excerpt: {
      en: "We've added 25+ facilities with improved booking windows, lights, and locker amenities.",
      ar: "أضفنا أكثر من 25 منشأة مع نوافذ حجز محسنة وإضاءة ومرافق خلع الملابس."
    },
    category: {
      en: "Facilities",
      ar: "المرافق"
    }
  },
  // Tournament translations
  't1': {
    name: {
      en: "City Cup 7v7",
      ar: "كأس المدينة 7 ضد 7"
    },
    country: {
      en: "UAE",
      ar: "الإمارات"
    },
    city: {
      en: "Dubai",
      ar: "دبي"
    },
    type: {
      en: "7v7",
      ar: "7 ضد 7"
    }
  },
  't2': {
    name: {
      en: "Community League 5v5",
      ar: "دوري المجتمع 5 ضد 5"
    },
    country: {
      en: "UAE",
      ar: "الإمارات"
    },
    city: {
      en: "Abu Dhabi",
      ar: "أبو ظبي"
    },
    type: {
      en: "5v5",
      ar: "5 ضد 5"
    }
  },
  // Facility translations
  's1': {
    name: {
      en: "Marina Sports Complex",
      ar: "مجمع مارينا الرياضي"
    },
    city: {
      en: "Dubai",
      ar: "دبي"
    },
    type: {
      en: "Outdoor",
      ar: "خارجي"
    },
    capacity: {
      en: "500 people",
      ar: "500 شخص"
    }
  }
}

// Generic function to translate any content item
export function translateContentItem<T extends TranslatableContentItem>(
  item: T,
  locale: Locale,
  translationMap?: TranslationMap
): T {
  if (!isValidLocale(locale)) {
    locale = defaultLocale
  }

  const translated = { ...item }
  const itemTranslations = translationMap?.[item.id]

  if (itemTranslations) {
    // Apply translations for this specific item
    for (const field in itemTranslations) {
      const fieldTranslations = itemTranslations[field]
      if (fieldTranslations && fieldTranslations[locale]) {
        translated[field] = fieldTranslations[locale]
      }
    }
  }

  return translated
}

// Function to translate an array of content items
export function translateContentArray<T extends TranslatableContentItem>(
  items: T[],
  locale: Locale,
  translationMap?: TranslationMap
): T[] {
  return items.map(item => translateContentItem(item, locale, translationMap))
}

// Specific functions for different content types
export function translateNewsItems(items: any[], locale: Locale) {
  return translateContentArray(items, locale, translationMap)
}

export function translateTournamentItems(items: any[], locale: Locale) {
  return translateContentArray(items, locale, translationMap)
}

export function translateFacilityItems(items: any[], locale: Locale) {
  return translateContentArray(items, locale, translationMap)
}

// Function to get translation for a specific field
export function getTranslatedField(
  contentId: string,
  field: string,
  locale: Locale,
  fallback?: string
): string {
  const translations = translationMap[contentId]?.[field]
  return translations?.[locale] || fallback || field
}

// Function to add new translations dynamically
export function addTranslation(
  contentId: string,
  field: string,
  translations: TranslatableField
) {
  if (!translationMap[contentId]) {
    translationMap[contentId] = {}
  }
  translationMap[contentId][field] = translations
}

// Function to get all available locales for a field
export function getAvailableLocales(contentId: string, field: string): string[] {
  const translations = translationMap[contentId]?.[field]
  return translations ? Object.keys(translations) : []
}

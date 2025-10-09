'use client'
import { Locale, defaultLocale, isValidLocale } from './i18n'

// Client-safe dynamic content structure
export interface TranslatableContent {
  [key: string]: {
    [locale in Locale]: string
  }
}

// Content type definitions
export interface NewsContent {
  id: string
  slug: string
  image: string
  date: string
  category: TranslatableContent
  title: TranslatableContent
  excerpt: TranslatableContent
}

export interface TournamentContent {
  id: string
  name: TranslatableContent
  country: TranslatableContent
  city: TranslatableContent
  date: string
  type: TranslatableContent
  image?: string
  prize?: string
}

export interface FacilityContent {
  id: string
  name: TranslatableContent
  city: TranslatableContent
  type: TranslatableContent
  amenities: TranslatableContent[]
  price: string
  images: string[]
  rating: number
  capacity: TranslatableContent
}

// Client-safe content data (no server-only dependencies)
export const clientDynamicContent = {
  news: [
    {
      id: "n1",
      slug: "academy-updates",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
      date: "2024-01-15",
      category: {
        en: "Academies",
        ar: "الأكاديميات"
      },
      title: {
        en: "Academy Updates & Summer Programs",
        ar: "تحديثات الأكاديمية وبرامج الصيف"
      },
      excerpt: {
        en: "Enrollments open for summer training blocks across partner academies. Bronze/Silver/Gold packages available.",
        ar: "فتح التسجيل لكتل التدريب الصيفية عبر الأكاديميات الشريكة. حزم برونزية/فضية/ذهبية متاحة."
      }
    },
    {
      id: "n2",
      slug: "stadium-partnerships",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
      date: "2024-01-12",
      category: {
        en: "Facilities",
        ar: "المرافق"
      },
      title: {
        en: "New Stadium Partnerships",
        ar: "شراكات ملاعب جديدة"
      },
      excerpt: {
        en: "We've added 25+ facilities with improved booking windows, lights, and locker amenities.",
        ar: "أضفنا أكثر من 25 منشأة مع نوافذ حجز محسنة وإضاءة ومرافق خلع الملابس."
      }
    },
    {
      id: "n3",
      slug: "tournament-calendar",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop&crop=center",
      date: "2024-01-10",
      category: {
        en: "Tournaments",
        ar: "البطولات"
      },
      title: {
        en: "Tournament Calendar 2025",
        ar: "تقويم البطولات 2025"
      },
      excerpt: {
        en: "Regional knockout, 7v7 community leagues, and college qualifiers now published.",
        ar: "تم نشر خروج المغلوب الإقليمي ودوريات المجتمع 7 ضد 7 وتصفيات الكلية."
      }
    },
    {
      id: "n4",
      slug: "yousport-highlights",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
      date: "2024-01-08",
      category: {
        en: "YouSport",
        ar: "YouSport"
      },
      title: {
        en: "YouSport Highlights",
        ar: "أبرز أحداث YouSport"
      },
      excerpt: {
        en: "Weekly highlights and public clips are now available with revenue-share program details.",
        ar: "الأبرز الأسبوعية والمقاطع العامة متاحة الآن مع تفاصيل برنامج تقاسم الإيرادات."
      }
    }
  ] as NewsContent[],

  tournaments: [
    {
      id: "t1",
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
      date: "2025-11-02",
      type: {
        en: "7v7",
        ar: "7 ضد 7"
      },
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
      prize: "$5,000"
    },
    {
      id: "t2",
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
      date: "2025-11-10",
      type: {
        en: "5v5",
        ar: "5 ضد 5"
      },
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
      prize: "$3,000"
    },
    {
      id: "t3",
      name: {
        en: "GCC Knockout",
        ar: "خروج المغلوب الخليجي"
      },
      country: {
        en: "KSA",
        ar: "السعودية"
      },
      city: {
        en: "Riyadh",
        ar: "الرياض"
      },
      date: "2025-12-01",
      type: {
        en: "Knockout",
        ar: "خروج المغلوب"
      },
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop&crop=center",
      prize: "$10,000"
    }
  ] as TournamentContent[],

  facilities: [
    {
      id: "s1",
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
      amenities: [
        { en: "Lights", ar: "إضاءة" },
        { en: "Lockers", ar: "خزائن" }
      ],
      price: "AED 250/hr",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80"
      ],
      rating: 4.8,
      capacity: {
        en: "500 people",
        ar: "500 شخص"
      }
    },
    {
      id: "s2",
      name: {
        en: "Downtown Arena",
        ar: "ساحة وسط المدينة"
      },
      city: {
        en: "Abu Dhabi",
        ar: "أبو ظبي"
      },
      type: {
        en: "Indoor",
        ar: "داخلي"
      },
      amenities: [
        { en: "AC", ar: "تكييف" },
        { en: "Showers", ar: "دشات" }
      ],
      price: "AED 350/hr",
      images: [
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80"
      ],
      rating: 4.9,
      capacity: {
        en: "300 people",
        ar: "300 شخص"
      }
    }
  ] as FacilityContent[]
}

// Generic function to get translated content (client-safe)
export function getTranslatedContent<T extends Record<string, any>>(
  content: T,
  locale: Locale
): T {
  if (!isValidLocale(locale)) {
    locale = defaultLocale
  }

  const translated = { ...content }
  
  // Recursively translate all TranslatableContent fields
  for (const key in translated) {
    const value = translated[key]
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Check if it's a TranslatableContent object
      if (value.en !== undefined && value.ar !== undefined) {
        translated[key] = value[locale]
      } else {
        // Recursively translate nested objects
        translated[key] = getTranslatedContent(value, locale)
      }
    } else if (Array.isArray(value)) {
      // Handle arrays of TranslatableContent
      translated[key] = value.map(item => 
        typeof item === 'object' && item !== null && item.en !== undefined && item.ar !== undefined
          ? item[locale]
          : item
      )
    }
  }
  
  return translated
}

// Client-safe getters for each content type
export function getNewsByLocale(locale: Locale) {
  return clientDynamicContent.news.map(item => {
    const translated = getTranslatedContent(item, locale)
    return {
      ...translated,
      title: typeof translated.title === 'string' ? translated.title : translated.title[locale] || translated.title.en || '',
      excerpt: typeof translated.excerpt === 'string' ? translated.excerpt : translated.excerpt[locale] || translated.excerpt.en || '',
      category: typeof translated.category === 'string' ? translated.category : translated.category[locale] || translated.category.en || ''
    }
  })
}

export function getTournamentsByLocale(locale: Locale) {
  return clientDynamicContent.tournaments.map(item => {
    const translated = getTranslatedContent(item, locale)
    return {
      ...translated,
      name: typeof translated.name === 'string' ? translated.name : translated.name[locale] || translated.name.en || '',
      country: typeof translated.country === 'string' ? translated.country : translated.country[locale] || translated.country.en || '',
      city: typeof translated.city === 'string' ? translated.city : translated.city[locale] || translated.city.en || '',
      type: typeof translated.type === 'string' ? translated.type : translated.type[locale] || translated.type.en || ''
    }
  })
}

export function getFacilitiesByLocale(locale: Locale) {
  return clientDynamicContent.facilities.map(item => {
    const translated = getTranslatedContent(item, locale)
    return {
      ...translated,
      name: typeof translated.name === 'string' ? translated.name : translated.name[locale] || translated.name.en || '',
      city: typeof translated.city === 'string' ? translated.city : translated.city[locale] || translated.city.en || '',
      type: typeof translated.type === 'string' ? translated.type : translated.type[locale] || translated.type.en || '',
      capacity: typeof translated.capacity === 'string' ? translated.capacity : translated.capacity[locale] || translated.capacity.en || '',
      amenities: Array.isArray(translated.amenities) ? translated.amenities.map(amenity => 
        typeof amenity === 'string' ? amenity : amenity[locale] || amenity.en || ''
      ) : []
    }
  })
}

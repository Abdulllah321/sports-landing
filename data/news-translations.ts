import { Locale } from "@/lib/i18n"

export interface NewsItem {
  slug: string
  image: string
  date: string
  category: {
    en: string
    ar: string
  }
  title: {
    en: string
    ar: string
  }
  excerpt: {
    en: string
    ar: string
  }
}

export const newsData: NewsItem[] = [
  {
    slug: "academy-updates",
    title: {
      en: "Academy Updates & Summer Programs",
      ar: "تحديثات الأكاديمية وبرامج الصيف"
    },
    excerpt: {
      en: "Enrollments open for summer training blocks across partner academies. Bronze/Silver/Gold packages available.",
      ar: "فتح التسجيل لكتل التدريب الصيفية عبر الأكاديميات الشريكة. حزم برونزية/فضية/ذهبية متاحة."
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
    date: "2024-01-15",
    category: {
      en: "Academies",
      ar: "الأكاديميات"
    }
  },
  {
    slug: "stadium-partnerships",
    title: {
      en: "New Stadium Partnerships",
      ar: "شراكات ملاعب جديدة"
    },
    excerpt: {
      en: "We've added 25+ facilities with improved booking windows, lights, and locker amenities.",
      ar: "أضفنا أكثر من 25 منشأة مع نوافذ حجز محسنة وإضاءة ومرافق خلع الملابس."
    },
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
    date: "2024-01-12",
    category: {
      en: "Facilities",
      ar: "المرافق"
    }
  },
  {
    slug: "tournament-calendar",
    title: {
      en: "Tournament Calendar 2025",
      ar: "تقويم البطولات 2025"
    },
    excerpt: {
      en: "Regional knockout, 7v7 community leagues, and college qualifiers now published.",
      ar: "تم نشر خروج المغلوب الإقليمي ودوريات المجتمع 7 ضد 7 وتصفيات الكلية."
    },
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop&crop=center",
    date: "2024-01-10",
    category: {
      en: "Tournaments",
      ar: "البطولات"
    }
  },
  {
    slug: "yousport-highlights",
    title: {
      en: "YouSport Highlights",
      ar: "أبرز أحداث YouSport"
    },
    excerpt: {
      en: "Weekly highlights and public clips are now available with revenue-share program details.",
      ar: "الأبرز الأسبوعية والمقاطع العامة متاحة الآن مع تفاصيل برنامج تقاسم الإيرادات."
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
    date: "2024-01-08",
    category: {
      en: "YouSport",
      ar: "YouSport"
    }
  },
]

export function getNewsByLocale(locale: Locale) {
  return newsData.map(item => ({
    slug: item.slug,
    title: item.title[locale],
    excerpt: item.excerpt[locale],
    image: item.image,
    date: item.date,
    category: item.category[locale]
  }))
}

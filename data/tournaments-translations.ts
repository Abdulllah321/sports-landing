import { Locale } from "@/lib/i18n"

export interface TournamentItem {
  id: string
  name: {
    en: string
    ar: string
  }
  country: {
    en: string
    ar: string
  }
  city: {
    en: string
    ar: string
  }
  date: string
  type: {
    en: "7v7" | "5v5" | "Knockout"
    ar: "7 ضد 7" | "5 ضد 5" | "خروج المغلوب"
  }
  image?: string
  prize?: string
}

export const tournamentData: TournamentItem[] = [
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
  },
  { 
    id: "t4", 
    name: {
      en: "Seaside 7s",
      ar: "السبعات الساحلية"
    },
    country: {
      en: "UAE",
      ar: "الإمارات"
    },
    city: {
      en: "Sharjah",
      ar: "الشارقة"
    },
    date: "2025-12-20", 
    type: {
      en: "7v7",
      ar: "7 ضد 7"
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
    prize: "$4,500"
  },
  { 
    id: "t5", 
    name: {
      en: "Qatar Quick 5s",
      ar: "الخمسات السريعة القطرية"
    },
    country: {
      en: "Qatar",
      ar: "قطر"
    },
    city: {
      en: "Doha",
      ar: "الدوحة"
    },
    date: "2025-12-28", 
    type: {
      en: "5v5",
      ar: "5 ضد 5"
    },
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
    prize: "$2,500"
  },
]

export function getTournamentsByLocale(locale: Locale) {
  return tournamentData.map(item => ({
    id: item.id,
    name: item.name[locale],
    country: item.country[locale],
    city: item.city[locale],
    date: item.date,
    type: item.type[locale],
    image: item.image,
    prize: item.prize
  }))
}

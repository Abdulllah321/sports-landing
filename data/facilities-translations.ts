import { Locale } from "@/lib/i18n"
import { facilities } from "@/data/facilities"

export interface FacilityItem {
  id: string
  name: {
    en: string
    ar: string
  }
  city: {
    en: string
    ar: string
  }
  type: {
    en: "Outdoor" | "Indoor"
    ar: "خارجي" | "داخلي"
  }
  amenities: {
    en: string[]
    ar: string[]
  }
  price: string
  images: string[]
  rating: number
  capacity: {
    en: string
    ar: string
  }
}

export const facilityData: FacilityItem[] = [
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
    amenities: {
      en: ["Lights", "Lockers"],
      ar: ["إضاءة", "خزائن"]
    },
    price: "AED 250/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80"
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
    amenities: {
      en: ["AC", "Showers"],
      ar: ["تكييف", "دشات"]
    },
    price: "AED 350/hr",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.9,
    capacity: {
      en: "300 people",
      ar: "300 شخص"
    }
  },
  { 
    id: "s3", 
    name: {
      en: "Corniche Field",
      ar: "ملعب الكورنيش"
    },
    city: {
      en: "Abu Dhabi",
      ar: "أبو ظبي"
    },
    type: {
      en: "Outdoor",
      ar: "خارجي"
    },
    amenities: {
      en: ["Lights"],
      ar: ["إضاءة"]
    },
    price: "AED 200/hr",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.6,
    capacity: {
      en: "400 people",
      ar: "400 شخص"
    }
  },
  { 
    id: "s4", 
    name: {
      en: "Riyadh Dome",
      ar: "قبة الرياض"
    },
    city: {
      en: "Riyadh",
      ar: "الرياض"
    },
    type: {
      en: "Indoor",
      ar: "داخلي"
    },
    amenities: {
      en: ["AC", "Lockers"],
      ar: ["تكييف", "خزائن"]
    },
    price: "SAR 300/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.7,
    capacity: {
      en: "600 people",
      ar: "600 شخص"
    }
  },
  {
    id: "s5",
    name: {
      en: "Doha Sports Park",
      ar: "حديقة الدوحة الرياضية"
    },
    city: {
      en: "Doha",
      ar: "الدوحة"
    },
    type: {
      en: "Outdoor",
      ar: "خارجي"
    },
    amenities: {
      en: ["Lights", "Café"],
      ar: ["إضاءة", "مقهى"]
    },
    price: "QAR 220/hr",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.5,
    capacity: {
      en: "350 people",
      ar: "350 شخص"
    }
  },
  {
    id: "s6",
    name: {
      en: "Khalifa Sports Center",
      ar: "مركز خليفة الرياضي"
    },
    city: {
      en: "Dubai",
      ar: "دبي"
    },
    type: {
      en: "Indoor",
      ar: "داخلي"
    },
    amenities: {
      en: ["AC", "Lights", "Parking", "WiFi", "Changing Rooms", "Equipment Rental"],
      ar: ["تكييف", "إضاءة", "موقف سيارات", "واي فاي", "غرف تبديل", "تأجير معدات"]
    },
    price: "AED 280/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.7,
    capacity: {
      en: "250 people",
      ar: "250 شخص"
    }
  },
  {
    id: "s7",
    name: {
      en: "Sharjah Sports Complex",
      ar: "مجمع الشارقة الرياضي"
    },
    city: {
      en: "Sharjah",
      ar: "الشارقة"
    },
    type: {
      en: "Outdoor",
      ar: "خارجي"
    },
    amenities: {
      en: ["Lights", "Parking", "Changing Rooms"],
      ar: ["إضاءة", "موقف سيارات", "غرف تبديل"]
    },
    price: "AED 180/hr",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.4,
    capacity: {
      en: "450 people",
      ar: "450 شخص"
    }
  },
  {
    id: "s8",
    name: {
      en: "King Fahd Stadium",
      ar: "ملعب الملك فهد"
    },
    city: {
      en: "Riyadh",
      ar: "الرياض"
    },
    type: {
      en: "Outdoor",
      ar: "خارجي"
    },
    amenities: {
      en: ["Lights", "Parking", "WiFi", "Changing Rooms", "Food Service"],
      ar: ["إضاءة", "موقف سيارات", "واي فاي", "غرف تبديل", "خدمة الطعام"]
    },
    price: "SAR 400/hr",
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.9,
    capacity: {
      en: "800 people",
      ar: "800 شخص"
    }
  },
  {
    id: "s9",
    name: {
      en: "Al-Ahli Sports Club",
      ar: "نادي الأهلي الرياضي"
    },
    city: {
      en: "Doha",
      ar: "الدوحة"
    },
    type: {
      en: "Indoor",
      ar: "داخلي"
    },
    amenities: {
      en: ["AC", "Lockers", "Parking", "WiFi", "Changing Rooms", "Equipment Rental", "Food Service"],
      ar: ["تكييف", "خزائن", "موقف سيارات", "واي فاي", "غرف تبديل", "تأجير معدات", "خدمة الطعام"]
    },
    price: "QAR 380/hr",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.8,
    capacity: {
      en: "400 people",
      ar: "400 شخص"
    }
  },
  {
    id: "s10",
    name: {
      en: "Sports City Arena",
      ar: "ساحة المدينة الرياضية"
    },
    city: {
      en: "Abu Dhabi",
      ar: "أبو ظبي"
    },
    type: {
      en: "Indoor",
      ar: "داخلي"
    },
    amenities: {
      en: ["AC", "Showers", "Parking", "WiFi", "Changing Rooms", "Equipment Rental"],
      ar: ["تكييف", "دشات", "موقف سيارات", "واي فاي", "غرف تبديل", "تأجير معدات"]
    },
    price: "AED 420/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.95,
    capacity: {
      en: "550 people",
      ar: "550 شخص"
    }
  },
]

export function getFacilitiesByLocale(locale: Locale) {
  return facilityData.map(item => {
    // Use the facilities from facilities.ts to get full data
    const fullFacility = facilities.find(f => f.id === item.id) || {
      description: "",
      rules: [],
      availableSlots: [],
      location: { address: "", coordinates: { lat: 0, lng: 0 } },
      contact: { phone: "", email: "" },
      features: {
        parking: false,
        wifi: false,
        changingRooms: false,
        equipmentRental: false,
        foodService: false,
        security: false
      }
    }
    
    return {
      id: item.id,
      name: item.name[locale],
      city: item.city[locale],
      type: item.type[locale],
      amenities: item.amenities[locale],
      price: item.price,
      images: item.images,
      rating: item.rating,
      capacity: item.capacity[locale],
      description: fullFacility.description || `${item.name[locale]} is a ${item.type[locale]} facility with excellent amenities.`,
      rules: fullFacility.rules || [],
      availableSlots: fullFacility.availableSlots || [],
      location: fullFacility.location,
      contact: fullFacility.contact,
      features: fullFacility.features
    }
  })
}

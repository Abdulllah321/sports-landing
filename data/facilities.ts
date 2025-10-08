export type Facility = {
  id: string
  name: string
  city: string
  type: "Outdoor" | "Indoor"
  amenities: string[]
  price: string
  images: string[]
  rating: number
  capacity: string
}

export const facilities: Facility[] = [
  {
    id: "s1",
    name: "Marina Sports Complex",
    city: "Dubai",
    type: "Outdoor",
    amenities: ["Lights", "Lockers"],
    price: "AED 250/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.8,
    capacity: "500 people"
  },
  {
    id: "s2",
    name: "Downtown Arena",
    city: "Abu Dhabi",
    type: "Indoor",
    amenities: ["AC", "Showers"],
    price: "AED 350/hr",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.9,
    capacity: "300 people"
  },
  { 
    id: "s3", 
    name: "Corniche Field", 
    city: "Abu Dhabi", 
    type: "Outdoor", 
    amenities: ["Lights"], 
    price: "AED 200/hr",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.6,
    capacity: "400 people"
  },
  { 
    id: "s4", 
    name: "Riyadh Dome", 
    city: "Riyadh", 
    type: "Indoor", 
    amenities: ["AC", "Lockers"], 
    price: "SAR 300/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.7,
    capacity: "600 people"
  },
  {
    id: "s5",
    name: "Doha Sports Park",
    city: "Doha",
    type: "Outdoor",
    amenities: ["Lights", "Café"],
    price: "QAR 220/hr",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80"
    ],
    rating: 4.5,
    capacity: "350 people"
  },
]

export const FACILITIES = facilities

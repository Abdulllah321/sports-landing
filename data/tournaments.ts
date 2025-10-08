export type Tournament = {
  id: string
  name: string
  country: string
  city: string
  date: string
  type: "7v7" | "5v5" | "Knockout"
  image?: string
  prize?: string
}

export const tournaments: Tournament[] = [
  { 
    id: "t1", 
    name: "City Cup 7v7", 
    country: "UAE", 
    city: "Dubai", 
    date: "2025-11-02", 
    type: "7v7",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
    prize: "$5,000"
  },
  { 
    id: "t2", 
    name: "Community League 5v5", 
    country: "UAE", 
    city: "Abu Dhabi", 
    date: "2025-11-10", 
    type: "5v5",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
    prize: "$3,000"
  },
  { 
    id: "t3", 
    name: "GCC Knockout", 
    country: "KSA", 
    city: "Riyadh", 
    date: "2025-12-01", 
    type: "Knockout",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop&crop=center",
    prize: "$10,000"
  },
  { 
    id: "t4", 
    name: "Seaside 7s", 
    country: "UAE", 
    city: "Sharjah", 
    date: "2025-12-20", 
    type: "7v7",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
    prize: "$4,500"
  },
  { 
    id: "t5", 
    name: "Qatar Quick 5s", 
    country: "Qatar", 
    city: "Doha", 
    date: "2025-12-28", 
    type: "5v5",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
    prize: "$2,500"
  },
]

export const TOURNAMENTS = tournaments

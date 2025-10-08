export type Facility = {
  id: string
  name: string
  city: string
  type: "Outdoor" | "Indoor"
  amenities: string[]
  price: string
}

export const facilities: Facility[] = [
  {
    id: "s1",
    name: "Marina Sports Complex",
    city: "Dubai",
    type: "Outdoor",
    amenities: ["Lights", "Lockers"],
    price: "AED 250/hr",
  },
  {
    id: "s2",
    name: "Downtown Arena",
    city: "Abu Dhabi",
    type: "Indoor",
    amenities: ["AC", "Showers"],
    price: "AED 350/hr",
  },
  { id: "s3", name: "Corniche Field", city: "Abu Dhabi", type: "Outdoor", amenities: ["Lights"], price: "AED 200/hr" },
  { id: "s4", name: "Riyadh Dome", city: "Riyadh", type: "Indoor", amenities: ["AC", "Lockers"], price: "SAR 300/hr" },
  {
    id: "s5",
    name: "Doha Sports Park",
    city: "Doha",
    type: "Outdoor",
    amenities: ["Lights", "Café"],
    price: "QAR 220/hr",
  },
]

export const FACILITIES = facilities

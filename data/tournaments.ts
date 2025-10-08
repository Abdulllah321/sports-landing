export type Tournament = {
  id: string
  name: string
  country: string
  city: string
  date: string
  type: "7v7" | "5v5" | "Knockout"
}

export const tournaments: Tournament[] = [
  { id: "t1", name: "City Cup 7v7", country: "UAE", city: "Dubai", date: "2025-11-02", type: "7v7" },
  { id: "t2", name: "Community League 5v5", country: "UAE", city: "Abu Dhabi", date: "2025-11-10", type: "5v5" },
  { id: "t3", name: "GCC Knockout", country: "KSA", city: "Riyadh", date: "2025-12-01", type: "Knockout" },
  { id: "t4", name: "Seaside 7s", country: "UAE", city: "Sharjah", date: "2025-12-20", type: "7v7" },
  { id: "t5", name: "Qatar Quick 5s", country: "Qatar", city: "Doha", date: "2025-12-28", type: "5v5" },
]

export const TOURNAMENTS = tournaments

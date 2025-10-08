export type Opportunity = {
  slug: string
  title: string
  summary: string
  details: string
  image: string
}

export const OPPORTUNITIES: Opportunity[] = [
  {
    slug: "content-creator",
    title: "Content Creator",
    summary: "Create highlights and behind-the-scenes for YouSport.",
    details:
      "We are looking for creators to cover regional events and academies. Submit your portfolio and availability. Stipend and gear included.",
    image: "/opportunity-content-creator.jpg",
  },
  {
    slug: "junior-coach",
    title: "Junior Coach",
    summary: "Assist academy clinics and camps.",
    details:
      "Support daily sessions, drills, and athlete feedback. Ideal for former players seeking coaching experience. Stipends available.",
    image: "/placeholder.svg?height=260&width=420",
  },
]

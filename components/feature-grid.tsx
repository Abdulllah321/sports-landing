"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trophy, School, Building2, Store, LayoutDashboard, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: Trophy,
    title: "Tournaments & Events",
    desc: "Browse and register for competitions and events.",
    cta: "Browse",
    href: "/tournaments",
  },
  {
    icon: School,
    title: "Sports Academies",
    desc: "Discover training programs and coaching opportunities.",
    cta: "Explore",
    href: "/academies",
  },
  {
    icon: Building2,
    title: "Facility Booking",
    desc: "Find and reserve fields and training venues.",
    cta: "Search",
    href: "/facilities",
  },
  {
    icon: Store,
    title: "Sports Store",
    desc: "Shop equipment and merch (demo cart).",
    cta: "Shop",
    href: "/store",
  },
  {
    icon: LayoutDashboard,
    title: "Player Dashboard",
    desc: "Manage bookings, registrations, and inbox (demo).",
    cta: "Open",
    href: "/account",
  },
  {
    icon: HeadphonesIcon,
    title: "Support Center",
    desc: "Submit tickets and get help (lead capture).",
    cta: "Submit",
    href: "/support",
  },
]

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <Card className="group h-full border-border/50 bg-card/80 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader className="items-center text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <f.icon className="h-5 w-5 text-primary" aria-hidden />
              </span>
              <div className="mt-2 flex w-full items-center justify-center">
                <Badge variant="secondary" className="mr-2">Demo</Badge>
              </div>
              <CardTitle className="mt-1 text-lg font-mono tracking-wide">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">{f.desc}</p>
              <Button asChild variant="secondary" className="rounded-full px-6">
                <Link href={f.href}>Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

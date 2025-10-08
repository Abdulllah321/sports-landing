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
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <Card className="group h-full border-border/70 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-2 hover:ring-primary/40">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 ring-1 ring-accent">
                  <f.icon className="h-4 w-4 text-accent" aria-hidden />
                </span>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </div>
              <Badge className="bg-primary text-primary-foreground">Demo</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{f.desc}</p>
              <Button asChild className="bg-accent text-accent-foreground hover:opacity-90">
                <Link href={f.href}>{f.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

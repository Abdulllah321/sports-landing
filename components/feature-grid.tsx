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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Card className="group relative h-full bg-card border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 py-2">
            <CardHeader className="items-center text-center pb-2 pt-4">
              <div className="relative mb-4">
                <f.icon className="h-16 w-16 text-primary mx-auto stroke-1" aria-hidden />
                <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs">
                  Demo
                </Badge>
              </div>
              <CardTitle className="text-base font-semibold text-foreground">
                {f.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3 text-center pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <Button asChild className="w-full">
                <Link href={f.href}>Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

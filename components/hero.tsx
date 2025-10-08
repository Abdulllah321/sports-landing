"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CalendarRange, MapPin, Play } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function Hero() {
  return (
    <section className="relative dark" aria-label="Hero">
      {/* Full-bleed background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/hero-legends.jpg")' }}
        role="img"
        aria-label="Athletes in a stadium background"
      />
      {/* Light/Dark readability gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/40 to-white/10 dark:from-black/60 dark:via-black/40 dark:to-black/10" />

      {/* Content */}
      <div className="container mx-auto px-4 py-14 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-5xl"
        >
          <Card className="border-border/60 bg-white/50 dark:bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-background/30 shadow-xl">
            <div className="p-6 md:p-8">
              <p className="text-sm tracking-wide text-muted-foreground">Play harder with Ficro</p>
              <h1 className="mt-2 text-4xl md:text-6xl leading-[1.05] font-mono text-foreground">
                Train. Book. Compete.
              </h1>
              <p className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground">
                Reserve fields, explore tournaments, and watch curated highlights on YouSport — all in one platform.
              </p>

              {/* CTA Card Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <CtaCard
                  href="/tournaments"
                  title="Explore Tournaments"
                  description="Find upcoming events and register in seconds."
                  Icon={CalendarRange}
                />
                <CtaCard
                  href="/facilities"
                  title="Book Facility"
                  description="Reserve courts and fields at verified venues."
                  Icon={MapPin}
                />
                <CtaCard
                  href="/yousport"
                  title="Watch YouSport"
                  description="Catch highlights and athlete spotlights."
                  Icon={Play}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* KPI Strip */}
      <div className="relative py-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background/40 to-background dark:from-black/0 dark:via-black/40 dark:to-black" />
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <KpiCard label="Players Registered" value="48,930" />
            <KpiCard label="Tournaments Run" value="1,245" />
            <KpiCard label="Stadiums Listed" value="612" />
          </div>
        </div>
      </div>
    </section>
  )
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="text-card-foreground bg-primary/20 backdrop-blur supports-[backdrop-filter]:bg-card/70 shadow-lg border-border/60">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-mono tracking-tight">{value}</CardTitle>
        <CardDescription className="mt-1">{label}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function CtaCard({
  href,
  title,
  description,
  Icon,
}: {
  href: string
  title: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card className="transition hover:shadow-md bg-white/80 dark:bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-card/40">
      <Link href={href} className="block p-5">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-foreground shadow-sm">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
            <span className="mt-3 inline-block text-xs font-medium text-muted-foreground hover:text-secondary">Get started →</span>
          </div>
        </div>
      </Link>
    </Card>
  )
}

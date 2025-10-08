"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarRange, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      {/* Background illustration from the user's Source URL (as requested) */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/hero-brand.jpg")' }}
        role="img"
        aria-label="Athletes at a night arena in blue and orange brand palette"
      />
      {/* Solid overlays for accessible contrast without gradients */}
      <div className="absolute inset-0 -z-0 bg-background/75 dark:bg-black/60" />
      {/* Geometric SVG accent to echo the poster vibe (no gradient) */}
      <svg
        className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-60 md:-right-16 md:-top-16"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <g fill="var(--color-primary)">
          <rect x="12" y="12" width="20" height="20" rx="4" />
          <rect x="48" y="12" width="20" height="20" rx="4" />
          <rect x="84" y="12" width="20" height="20" rx="4" />
          <rect x="120" y="12" width="20" height="20" rx="4" />
        </g>
      </svg>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium text-accent">Play harder with Ficro</p>
          <h1 className="text-pretty mt-3 font-serif tracking-tight text-4xl md:text-6xl">Train. Book. Compete.</h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Reserve fields, join tournaments, and discover top academies — all in one modern sports platform.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-primary text-primary-foreground hover:opacity-95">
              <Link href="/facilities">
                <MapPin className="mr-2 h-4 w-4" />
                Book Facilities
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/tournaments">
                <CalendarRange className="mr-2 h-4 w-4" />
                View Tournaments
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

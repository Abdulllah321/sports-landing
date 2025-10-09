"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Locale } from "@/lib/i18n"

interface HeroAnimatedProps {
  children: React.ReactNode
  locale: Locale
}

export function HeroAnimated({ children, locale }: HeroAnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-5xl"
    >
      <Card className="border-border/60 bg-white/50 dark:bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-background/30 shadow-xl">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </Card>
    </motion.div>
  )
}

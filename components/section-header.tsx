"use client"

import { motion } from "framer-motion"

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl"
    >
      <h2 className="text-balance font-serif uppercase tracking-wide text-2xl md:text-3xl">{title}</h2>
      <div className="mt-2 h-1 w-16 rounded bg-primary" aria-hidden />
      {subtitle ? <p className="mt-3 text-muted-foreground">{subtitle}</p> : null}
    </motion.div>
  )
}

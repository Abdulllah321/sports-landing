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
      <h2 className="text-balance font-serif tracking-tight text-2xl md:text-3xl">{title}</h2>
      <div className="mt-3 h-px w-16 bg-border" aria-hidden />
      {subtitle ? <p className="mt-3 text-muted-foreground">{subtitle}</p> : null}
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"

const kpis = [
  { label: "Players Registered", value: "48,930" },
  { label: "Tournaments Run", value: "1,245" },
  { label: "Stadiums Listed", value: "612" },
]

export function KpiStrip() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-lg border bg-card p-4 text-center shadow-sm"
          >
            <div className="text-2xl font-semibold">{k.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{k.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

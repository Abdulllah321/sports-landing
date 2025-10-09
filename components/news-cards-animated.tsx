"use client"

import { motion } from "framer-motion"
import { Locale } from "@/lib/i18n"

interface NewsCardsAnimatedProps {
  children: React.ReactNode
  locale: Locale
}

export function NewsCardsAnimated({ children, locale }: NewsCardsAnimatedProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.isArray(children) ? children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          {child}
        </motion.div>
      )) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

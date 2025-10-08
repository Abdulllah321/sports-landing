"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { news } from "@/data/news"

export function NewsCards({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? news.slice(0, limit) : news
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {items.map((n, i) => (
        <motion.div
          key={n.slug}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: i * 0.03 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{n.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3">{n.excerpt}</p>
              <Link className="text-sm text-accent underline underline-offset-4" href={`/news/${n.slug}`}>
                Read article
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

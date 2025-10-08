"use client"

import { useMemo, useState } from "react"
import { news } from "@/data/news"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function NewsIndex() {
  const [q, setQ] = useState("")
  const items = useMemo(() => {
    if (!q) return news
    return news.filter((n) => n.title.toLowerCase().includes(q.toLowerCase()))
  }, [q])

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">News & Programs</h1>
      <p className="mt-2 text-muted-foreground">Articles, updates, and programs.</p>
      <div className="mt-6 max-w-sm">
        <Input placeholder="Search articles" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((n) => (
          <Card key={n.slug}>
            <CardHeader>
              <CardTitle className="text-base">{n.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{n.excerpt}</p>
              <Link className="text-sm text-accent underline underline-offset-4" href={`/news/${n.slug}`}>
                Read
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

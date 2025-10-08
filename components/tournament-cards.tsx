"use client"

import { useMemo, useState } from "react"
import { tournaments } from "@/data/tournaments"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export function TournamentCards({ limit }: { limit?: number }) {
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState("all")

  const items = useMemo(() => {
    let list = tournaments
    if (country !== "all") list = list.filter((t) => t.country === country)
    if (query) list = list.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
    return typeof limit === "number" ? list.slice(0, limit) : list
  }, [query, country, limit])

  const countries = Array.from(new Set(tournaments.map((t) => t.country)))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Input placeholder="Search tournaments" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((t) => (
          <Link key={t.id} href={`/tournaments/${t.id}`} className="group block">
            <Card className="h-full transition hover:shadow-lg group-hover:border-primary/40">
              <CardHeader>
                <CardTitle className="text-base group-hover:text-foreground/90">{t.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t.city}, {t.country} — {t.date}
                </p>
                <span className="text-sm text-primary underline-offset-4 group-hover:underline">View details</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

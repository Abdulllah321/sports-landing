"use client"

import { useMemo, useState } from "react"
import { facilities } from "@/data/facilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export function StadiumCards({ limit }: { limit?: number }) {
  const [city, setCity] = useState("all")
  const [query, setQuery] = useState("")
  const items = useMemo(() => {
    let list = facilities
    if (city !== "all") list = list.filter((f) => f.city === city)
    if (query) list = list.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    return typeof limit === "number" ? list.slice(0, limit) : list
  }, [city, query, limit])

  const cities = Array.from(new Set(facilities.map((f) => f.city)))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Input placeholder="Search stadiums" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger>
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((f) => (
          <Link key={f.id} href={`/facilities/${f.id}`} className="group block">
            <Card className="h-full transition hover:shadow-lg group-hover:border-primary/40">
              <CardHeader>
                <CardTitle className="text-base group-hover:text-foreground/90">{f.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {f.city} — {f.type}
                </p>
                <span className="text-sm text-primary underline-offset-4 group-hover:underline">View stadium</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

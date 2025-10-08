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
          <Card key={f.id} className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{f.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {f.city} — {f.type}
              </p>
              <Link className="text-sm text-accent underline underline-offset-4" href={`/facilities/${f.id}`}>
                View stadium
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

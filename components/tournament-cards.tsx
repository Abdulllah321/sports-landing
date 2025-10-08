"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { tournaments } from "@/data/tournaments"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar, MapPin, Trophy, ArrowRight } from "lucide-react"

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-2xl mx-auto">
        <Input 
          placeholder="Search tournaments" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          className="bg-background/80 backdrop-blur border-border/60"
        />
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="bg-background/80 backdrop-blur border-border/60">
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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Link key={t.id} href={`/tournaments/${t.id}`} className="group block">
            <Card className="h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group-hover:border-primary/80 bg-gradient-to-br from-card/95 via-card/90 to-card/85 backdrop-blur-md border-border/60 shadow-lg py-0">
              {t.image && (
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Badge className="bg-primary text-primary-foreground shadow-xl backdrop-blur-md px-3 py-1.5 text-sm font-semibold">
                      {t.type}
                    </Badge>
                  </div>
                  
                  {/* Prize Badge */}
                  {t.prize && (
                    <div className="absolute top-4 right-4 ">
                      <Badge variant="secondary" className="bg-background/95 text-foreground shadow-xl backdrop-blur-md px-3 py-1.5">
                        <Trophy className="h-4 w-4 mr-1.5" />
                        <span className="font-semibold">{t.prize}</span>
                      </Badge>
                    </div>
                  )}
                  
                  {/* Title with sliding effect */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="relative overflow-hidden">
                      <h3 className="text-2xl font-bold text-white mb-3 transition-transform duration-500 group-hover:-translate-y-8">
                        {t.name}
                      </h3>
                      
                      {/* Location and Date - slides up on hover */}
                      <div className="absolute bottom-0 left-0 right-0 transform translate-y-8 transition-transform duration-500 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-4 text-sm text-white/90 mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">{t.city}, {t.country}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-medium">{new Date(t.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Arrow from right */}
                  <div className="absolute bottom-4 right-4 transform translate-x-8 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    <div className="bg-primary/90 backdrop-blur-md rounded-full p-3 shadow-xl">
                      <ArrowRight className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


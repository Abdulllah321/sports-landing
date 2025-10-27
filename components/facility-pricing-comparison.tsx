"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, MapPin, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Facility } from "@/data/facilities"

interface FacilityPricingComparisonProps {
  facilities: Facility[]
}

export function FacilityPricingComparison({ facilities }: FacilityPricingComparisonProps) {
  const [compareCount, setCompareCount] = useState(3)
  const [sortBy, setSortBy] = useState<"price" | "rating" | "capacity">("price")

  // Sort facilities
  const sortedFacilities = [...facilities].sort((a, b) => {
    if (sortBy === "price") {
      const priceA = parseFloat(a.price.match(/\d+/)?.[0] || "0")
      const priceB = parseFloat(b.price.match(/\d+/)?.[0] || "0")
      return priceA - priceB
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else {
      const capA = parseFloat(a.capacity.match(/\d+/)?.[0] || "0")
      const capB = parseFloat(b.capacity.match(/\d+/)?.[0] || "0")
      return capB - capA
    }
  })

  const facilitiesToCompare = sortedFacilities.slice(0, compareCount)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Compare</label>
          <select
            value={compareCount}
            onChange={(e) => setCompareCount(Number(e.target.value))}
            className="rounded-lg border px-3 py-1"
          >
            <option value={2}>2 facilities</option>
            <option value={3}>3 facilities</option>
            <option value={4}>4 facilities</option>
            <option value={5}>5 facilities</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border px-3 py-1"
          >
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="capacity">Capacity</option>
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className={`grid gap-4 ${compareCount === 2 ? 'md:grid-cols-2' : compareCount === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
        {facilitiesToCompare.map((facility) => {
          const price = parseFloat(facility.price.match(/\d+/)?.[0] || "0")
          const cheapestPrice = Math.min(...facilities.map(f => parseFloat(f.price.match(/\d+/)?.[0] || "0")))
          const mostExpensivePrice = Math.max(...facilities.map(f => parseFloat(f.price.match(/\d+/)?.[0] || "0")))
          const isCheapest = price === cheapestPrice
          const isExpensive = price === mostExpensivePrice
          const priceRank = [...facilities]
            .map(f => parseFloat(f.price.match(/\d+/)?.[0] || "0"))
            .sort((a, b) => a - b)
            .indexOf(price) + 1
          const totalFacilities = facilities.length
          const pricePercentile = ((totalFacilities - priceRank + 1) / totalFacilities) * 100

          return (
            <Card key={facility.id} className="overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-muted">
                <Image
                  src={facility.images[0]}
                  alt={facility.name}
                  fill
                  className="object-cover"
                />
                {isCheapest && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-500 text-white">
                      Best Value
                    </Badge>
                  </div>
                )}
                {isExpensive && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-yellow-500 text-white">
                      Premium
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                {/* Name & Location */}
                <div className="mb-3">
                  <h3 className="font-semibold mb-1">{facility.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {facility.city}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="text-2xl font-bold text-primary">{facility.price}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <div className={`h-2 flex-1 bg-muted rounded-full overflow-hidden`}>
                      <div
                        className={`h-full ${
                          pricePercentile > 75 ? 'bg-red-500' :
                          pricePercentile > 50 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${pricePercentile}%` }}
                      />
                    </div>
                    <span className="text-xs whitespace-nowrap">
                      {isCheapest ? 'Cheapest' : isExpensive ? 'Most Expensive' : `${priceRank}/${totalFacilities}`}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      Rating
                    </div>
                    <span className="font-semibold">{facility.rating}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      Capacity
                    </div>
                    <span className="font-semibold">{facility.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Type
                    </div>
                    <Badge variant="outline">{facility.type}</Badge>
                  </div>
                </div>

                {/* Amenities Preview */}
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1">Top Amenities</div>
                  <div className="flex flex-wrap gap-1">
                    {facility.amenities.slice(0, 3).map((amenity, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button asChild className="w-full">
                  <Link href={`/facilities/${facility.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Price Range Info */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-2">Price Range</h4>
              <div className="text-sm text-muted-foreground">
                From {sortedFacilities[0]?.price} to {sortedFacilities[sortedFacilities.length - 1]?.price} per hour
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{facilities.length}</div>
              <div className="text-sm text-muted-foreground">facilities</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { facilities } from "@/data/facilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Star, Users, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Custom Swiper styles
const swiperStyles = `
  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5) !important;
    opacity: 1 !important;
    width: 8px !important;
    height: 8px !important;
    margin: 0 4px !important;
  }
  
  .swiper-pagination-bullet-active {
    background: hsl(var(--primary)) !important;
    transform: scale(1.2) !important;
  }
  
  .swiper-pagination {
    bottom: 8px !important;
  }
`;

export function StadiumCards({
  limit,
  facilities: facilitiesProp,
}: {
  limit?: number;
  facilities?: Facility[];
}) {
  const [city, setCity] = useState("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    let list = facilitiesProp || facilities;
    if (city !== "all") list = list.filter((f) => f.city === city);
    if (query)
      list = list.filter((f) =>
        f.name.toLowerCase().includes(query.toLowerCase())
      );
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [city, query, limit, facilitiesProp]);

  const cities = Array.from(
    new Set((facilitiesProp || facilities).map((f) => f.city))
  );

  return (
    <>
      <style jsx>{swiperStyles}</style>
      <div className="space-y-6">
        {!facilitiesProp && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-2xl mx-auto">
            <Input
              placeholder="Search stadiums"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-background/80 backdrop-blur border-border/60"
            />
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="bg-background/80 backdrop-blur border-border/60">
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
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((f) => (
            <Link
              key={f.id}
              href={`/facilities/${f.id}`}
              className="group block"
            >
              <Card className="h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:border-primary/60 bg-gradient-to-br from-card/95 via-card/90 to-card/85 backdrop-blur-md border-border/40 shadow-xl py-0">
                <div className="flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={0}
                      slidesPerView={1}
                      navigation={false}
                      pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 1,
                      }}
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                      }}
                      className="h-full w-full"
                    >
                      {f.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative h-full w-full">
                            <Image
                              src={image}
                              alt={`${f.name} - Image ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-700"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl backdrop-blur-md px-3 py-1.5 text-sm font-bold">
                        {f.type}
                      </Badge>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-background/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-xl">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-foreground">
                            {f.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-br from-background/50 to-muted/20">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {f.name}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">{f.city}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-foreground">
                              {f.rating}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Rating
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-foreground">
                              {f.capacity}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Capacity
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-foreground">
                          Amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {f.amenities.map((amenity, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20 px-2 py-1 text-xs font-medium"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                        <div className="text-xs text-muted-foreground mb-1">
                          Starting from
                        </div>
                        <div className="text-xl font-bold text-primary">
                          {f.price}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                        <span>View Stadium</span>
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

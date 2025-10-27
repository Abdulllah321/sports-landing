"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Trophy, Users, Clock, ArrowRight, Star, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Locale } from "@/lib/i18n"

interface Tournament {
  id: string
  name: string
  country: string
  city: string
  date: string
  type: string
  sport?: string
  ageGroup?: string
  prize?: string
  description?: string
  maxTeams?: number
  registeredTeams?: number
  status?: string
  featured?: boolean
  image?: string
}

interface TournamentsPageClientProps {
  tournaments: Tournament[]
  locale: Locale
  filterOptions: {
    countries: string[]
    types: string[]
    sports: string[]
    ageGroups: string[]
    statuses: string[]
  }
  translations: {
    searchPlaceholder: string
    countryPlaceholder: string
    allCountries: string
    sportPlaceholder: string
    allSports: string
    ageGroupPlaceholder: string
    allAgeGroups: string
    viewDetails: string
  }
}

export function TournamentsPageClient({ tournaments, locale, filterOptions, translations }: TournamentsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedSport, setSelectedSport] = useState("All")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filteredTournaments = useMemo(() => {
    let items = tournaments

    // Search filter
    if (searchQuery) {
      items = items.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Country filter
    if (selectedCountry !== "All") {
      items = items.filter((t) => t.country === selectedCountry)
    }

    // Type filter
    if (selectedType !== "All") {
      items = items.filter((t) => t.type === selectedType)
    }

    // Sport filter
    if (selectedSport !== "All") {
      items = items.filter((t) => t.sport === selectedSport)
    }

    // Age group filter
    if (selectedAgeGroup !== "All") {
      items = items.filter((t) => t.ageGroup === selectedAgeGroup)
    }

    // Status filter
    if (selectedStatus !== "All") {
      items = items.filter((t) => t.status === selectedStatus)
    }

    // Sort by date
    items = items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return items
  }, [searchQuery, selectedCountry, selectedType, selectedSport, selectedAgeGroup, selectedStatus, tournaments])

  const featuredTournaments = tournaments.filter((t) => t.featured)

  const getStatusColor = (status?: string) => {
    if (status === "Open") return "bg-green-500/50 text-green-700"
    if (status === "Registration Closed") return "bg-red-500/50 text-red-700"
    if (status === "Upcoming") return "bg-yellow-500/50 text-yellow-700"
    return "bg-gray-500/50"
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4">
              Tournaments
            </Badge>
            <h1 className="text-pretty font-mono tracking-wide text-4xl md:text-6xl mb-6">
              Compete & Win
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Join tournaments, discover competitions, and showcase your skills in our sports platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Tournaments */}
      {featuredTournaments.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 rounded bg-primary" />
              <h2 className="text-3xl md:text-4xl font-mono tracking-wide">Featured Tournaments</h2>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {featuredTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-lg pt-0">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {tournament.image ? (
                      <Image
                        src={tournament.image}
                        alt={tournament.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                    {tournament.status && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className={getStatusColor(tournament.status)}>
                          {tournament.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{tournament.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {tournament.city}, {tournament.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(tournament.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {tournament.description && (
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {tournament.description}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {tournament.prize || "TBD"}
                        </div>
                        <div className="text-sm text-muted-foreground">Prize Pool</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/5 rounded-lg">
                        <div className="text-2xl font-bold text-secondary">
                          {tournament.registeredTeams || 0}/{tournament.maxTeams || "∞"}
                        </div>
                        <div className="text-sm text-muted-foreground">Teams</div>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/tournaments/${tournament.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="bg-foreground/2">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 rounded bg-accent" />
              <h2 className="text-3xl md:text-4xl font-mono tracking-wide">All Tournaments</h2>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full sm:w-48">
                <MapPin className="mr-2 h-4 w-4" />
                <SelectValue placeholder={translations.countryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.countries.map((country) => (
                  <SelectItem key={country} value={country === "All" ? country : country}>
                    {country === "All" ? translations.allCountries : country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <Trophy className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder={translations.sportPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.sports.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport === "All" ? translations.allSports : sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
              <SelectTrigger className="w-full sm:w-48">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue placeholder={translations.ageGroupPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.ageGroups.map((ageGroup) => (
                  <SelectItem key={ageGroup} value={ageGroup}>
                    {ageGroup === "All" ? translations.allAgeGroups : ageGroup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tournaments Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg pt-0">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {tournament.image ? (
                      <Image
                        src={tournament.image}
                        alt={tournament.name}
                        fill
                        className="object-cover object-top transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    {tournament.status && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className={getStatusColor(tournament.status)}>
                          {tournament.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{tournament.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {tournament.city}, {tournament.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(tournament.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1">
                    {tournament.description && (
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {tournament.description}
                      </p>
                    )}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Prize Pool
                        </span>
                        <span className="font-semibold text-primary">
                          {tournament.prize || "TBD"}
                        </span>
                      </div>
                      {tournament.maxTeams && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Teams
                          </span>
                          <span className="font-semibold text-secondary">
                            {tournament.registeredTeams || 0}/{tournament.maxTeams}
                          </span>
                        </div>
                      )}
                      <Button asChild size="sm" className="w-full bg-primary">
                        <Link href={`/tournaments/${tournament.id}`}>
                          <Trophy className="mr-2 h-4 w-4" />
                          {translations.viewDetails}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTournaments.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tournaments found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}


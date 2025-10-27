"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Trophy, Users, Clock, FileText, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Locale } from "@/lib/i18n"
import { getClientTranslation } from "@/lib/client-translations"

interface Tournament {
  id: string
  name: string
  city: string
  country: string
  date: string
  type: string
  sport?: string
  ageGroup?: string
  prize?: string
  description?: string
  format?: string
  rules?: string[]
  participationRequirements?: string[]
  maxTeams?: number
  registeredTeams?: number
  status?: string
  image?: string
}

interface TournamentDetailClientProps {
  tournament: Tournament
  locale: Locale
}

export function TournamentDetailClient({ tournament, locale }: TournamentDetailClientProps) {
  const [open, setOpen] = useState(false)
  const [team, setTeam] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const t = getClientTranslation(locale)

  const getStatusColor = (status?: string) => {
    if (status === "Open") return "bg-green-500/20 text-green-600"
    if (status === "Registration Closed") return "bg-red-500/20 text-red-600"
    if (status === "Upcoming") return "bg-yellow-500/20 text-yellow-600"
    return "bg-gray-500/50"
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Tournament Image */}
      {tournament.image && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={tournament.image}
            alt={tournament.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {tournament.status && (
            <div className="absolute top-4 right-4">
              <Badge className={getStatusColor(tournament.status)}>
                {tournament.status}
              </Badge>
            </div>
          )}
          {tournament.sport && (
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                {tournament.sport}
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <div className="rounded-xl border bg-card p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {tournament.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {tournament.city}, {tournament.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(tournament.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                {tournament.type}
              </span>
              {tournament.sport && (
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {tournament.sport}
                </span>
              )}
              {tournament.ageGroup && (
                <Badge variant="outline">{tournament.ageGroup}</Badge>
              )}
            </div>
            {!tournament.image && tournament.status && (
              <div className="mt-3">
                <Badge className={getStatusColor(tournament.status)}>
                  {tournament.status}
                </Badge>
              </div>
            )}
          </div>
          {tournament.prize && (
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-3xl font-bold text-primary mb-1">{tournament.prize}</div>
              <div className="text-sm text-muted-foreground">Prize Pool</div>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="bg-primary text-foreground" onClick={() => setOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            Register Team
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          {tournament.description && (
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                  <FileText className="h-5 w-5" />
                  {t('tournaments.description')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-muted-foreground leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {tournament.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tournament Format */}
          {tournament.format && (
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                  <Trophy className="h-5 w-5" />
                  {t('tournaments.tournamentFormat')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-muted-foreground leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {tournament.format}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Rules */}
          {tournament.rules && tournament.rules.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                  <FileText className="h-5 w-5" />
                  {t('tournaments.rules')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tournament.rules.map((rule, index) => (
                    <li key={index} className={`flex items-start gap-2 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Participation Requirements */}
          {tournament.participationRequirements && tournament.participationRequirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                  <CheckCircle className="h-5 w-5" />
                  {t('tournaments.participationRequirements')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tournament.participationRequirements.map((req, index) => (
                    <li key={index} className={`flex items-start gap-2 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar Info */}
        <div className="space-y-6">
          {/* Team Registration Stats */}
          {tournament.maxTeams && (
            <Card>
              <CardHeader>
                <CardTitle className={`${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                  {t('tournaments.registeredTeams')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {t('tournaments.registeredTeams')}
                    </span>
                    <span className="font-semibold">{tournament.registeredTeams || 0}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className={`text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                      {t('tournaments.maxTeams')}
                    </span>
                    <span className="font-semibold">{tournament.maxTeams}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${((tournament.registeredTeams || 0) / tournament.maxTeams) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className={`${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                Quick Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tournament.sport && (
                <div className="flex justify-between">
                  <span className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {t('tournaments.sport')}
                  </span>
                  <span className={`text-sm font-semibold ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {tournament.sport}
                  </span>
                </div>
              )}
              {tournament.ageGroup && (
                <div className="flex justify-between">
                  <span className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {t('tournaments.ageGroup')}
                  </span>
                  <span className={`text-sm font-semibold ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {tournament.ageGroup}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between">
                <span className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {tournament.type}
                </span>
                <span className={`text-sm font-semibold ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {tournament.type}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Registration Form */}
      {open && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className={`${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              Team Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                  setTimeout(() => {
                    setOpen(false)
                    setSubmitted(false)
                  }, 3000)
                }}
              >
                <Input 
                  placeholder="Team name" 
                  value={team} 
                  onChange={(e) => setTeam(e.target.value)} 
                  required 
                  className={locale === 'ar' ? 'font-arabic-body' : ''}
                />
                <Input
                  type="email"
                  placeholder="Contact email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={locale === 'ar' ? 'font-arabic-body' : ''}
                />
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full bg-primary text-foreground">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Registration
                  </Button>
                </div>
              </form>
            ) : (
              <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">Registration Submitted Successfully!</span>
                </div>
                <p>Your team registration is pending approval. We'll contact you with further details.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

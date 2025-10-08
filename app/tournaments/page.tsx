"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { tournaments } from "@/data/tournaments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  MapPin,
  Calendar,
  Trophy,
  Users,
  Clock,
  Star,
  Plus,
  UserPlus,
  Filter,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Enhanced tournament data
const enhancedTournaments = [
  {
    ...tournaments[0],
    status: "Open",
    prize: "$5,000",
    teams: 8,
    maxTeams: 16,
    description:
      "Premier 7v7 tournament featuring top teams from across the region.",
    image: "/capital-cup-tournament.jpg",
    featured: true,
  },
  {
    ...tournaments[1],
    status: "Open",
    prize: "$2,500",
    teams: 12,
    maxTeams: 20,
    description: "Community-focused 5v5 league with multiple divisions.",
    image: "/public-yousport-highlight-frame.jpg",
    featured: false,
  },
  {
    ...tournaments[2],
    status: "Registration Closed",
    prize: "$10,000",
    teams: 16,
    maxTeams: 16,
    description: "Elite knockout tournament with international participation.",
    image: "/coastal-classic-tournament.jpg",
    featured: true,
  },
  {
    ...tournaments[3],
    status: "Upcoming",
    prize: "$3,000",
    teams: 0,
    maxTeams: 12,
    description: "Beachside 7v7 tournament with scenic coastal views.",
    image: "/metro-open-tournament.jpg",
    featured: false,
  },
  {
    ...tournaments[4],
    status: "Open",
    prize: "$1,500",
    teams: 6,
    maxTeams: 16,
    description: "Fast-paced 5v5 tournament in Qatar's capital.",
    image: "/news-regional-cup-format.jpg",
    featured: false,
  },
];

const countries = [
  "All",
  ...Array.from(new Set(tournaments.map((t) => t.country))),
];
const types = ["All", ...Array.from(new Set(tournaments.map((t) => t.type)))];
const statuses = [
  "All",
  "Open",
  "Registration Closed",
  "Upcoming",
  "Completed",
];
const sortOptions = ["Date", "Name", "Prize", "Teams", "Featured"];

export default function TournamentsIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Date");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [creationSubmitted, setCreationSubmitted] = useState(false);

  const filteredTournaments = useMemo(() => {
    let items = enhancedTournaments;

    // Search filter
    if (searchQuery) {
      items = items.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Country filter
    if (selectedCountry !== "All") {
      items = items.filter((t) => t.country === selectedCountry);
    }

    // Type filter
    if (selectedType !== "All") {
      items = items.filter((t) => t.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== "All") {
      items = items.filter((t) => t.status === selectedStatus);
    }

    // Sort
    switch (sortBy) {
      case "Date":
        items = items.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "Name":
        items = items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Prize":
        items = items.sort(
          (a, b) =>
            parseInt(b.prize.replace(/[$,]/g, "")) -
            parseInt(a.prize.replace(/[$,]/g, ""))
        );
        break;
      case "Teams":
        items = items.sort((a, b) => b.teams - a.teams);
        break;
      case "Featured":
        items = items.sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
        break;
    }

    return items;
  }, [searchQuery, selectedCountry, selectedType, selectedStatus, sortBy]);

  const featuredTournaments = enhancedTournaments.filter((t) => t.featured);

  function handleRegistrationSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRegistrationSubmitted(true);
    setTimeout(() => {
      setRegisterOpen(false);
      setRegistrationSubmitted(false);
    }, 3000);
  }

  function handleCreationSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCreationSubmitted(true);
    setTimeout(() => {
      setCreateOpen(false);
      setCreationSubmitted(false);
    }, 3000);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Background Image */}
        <Image
          src="/images/hero-illustration.jpg"
          alt="Hero illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10 w-full h-full" />
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
            <h1 className="text-pretty font-serif tracking-tight text-4xl md:text-6xl text-white">
              Compete & Win
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white">
              Join tournaments, create competitions, and showcase your skills in
              the ultimate sports platform.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={() => setRegisterOpen(true)}
                className="bg-primary text-primary-foreground hover:opacity-95"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Register Team
              </Button>
              <Button onClick={() => setCreateOpen(true)} variant="secondary">
                <Plus className="mr-2 h-4 w-4" />
                Create Tournament
              </Button>
            </div>
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
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
                Featured Tournaments
              </h2>
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
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={tournament.image}
                      alt={tournament.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className={
                          tournament.status === "Open"
                            ? "bg-green-700/50 text-foreground/80"
                            : tournament.status === "Registration Closed"
                            ? "bg-red-500/60 text-foreground/80"
                            : "bg-yellow-500/50 text-foreground/80"
                        }
                      >
                        {tournament.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {tournament.name}
                    </CardTitle>
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
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {tournament.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {tournament.prize}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Prize Pool
                        </div>
                      </div>
                      <div className="text-center p-3 bg-secondary/5 rounded-lg">
                        <div className="text-2xl font-bold text-secondary">
                          {tournament.teams}/{tournament.maxTeams}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Teams
                        </div>
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
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
                All Tournaments
              </h2>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full sm:w-48">
                <MapPin className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
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
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
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
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={tournament.image}
                      alt={tournament.name}
                      fill
                      className="object-cover object-top transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className={
                          tournament.status === "Open"
                            ? "bg-green-500/50 text-foreground/80"
                            : tournament.status === "Registration Closed"
                            ? "bg-red-500/60 text-foreground/80"
                            : "bg-yellow-500/50 text-foreground/80"
                        }
                      >
                        {tournament.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {tournament.name}
                    </CardTitle>
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
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {tournament.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Prize Pool
                        </span>
                        <span className="font-semibold text-primary">
                          {tournament.prize}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Teams
                        </span>
                        <span className="font-semibold text-secondary">
                          {tournament.teams}/{tournament.maxTeams}
                        </span>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-primary"
                      >
                        <Link href={`/tournaments/${tournament.id}`}>
                          <Trophy className="mr-2 h-4 w-4" />
                          View Details
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
              <h3 className="text-lg font-semibold mb-2">
                No tournaments found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Register Team Modal */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register Team for Tournament</DialogTitle>
          </DialogHeader>
          {registrationSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Registration Submitted!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your team registration is pending approval. Federation signoff
                required.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div>
                <Input type="text" placeholder="Team name" required />
              </div>
              <div>
                <Input type="email" placeholder="Team captain email" required />
              </div>
              <div>
                <Input type="tel" placeholder="Contact phone number" required />
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    {enhancedTournaments
                      .filter((t) => t.status === "Open")
                      .map((tournament) => (
                        <SelectItem key={tournament.id} value={tournament.id}>
                          {tournament.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea
                  placeholder="Team experience and achievements..."
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:opacity-95"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Submit Registration
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Tournament Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Tournament</DialogTitle>
          </DialogHeader>
          {creationSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Tournament Created!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your tournament is pending approval. Federation signoff
                required.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCreationSubmit} className="space-y-4">
              <div>
                <Input type="text" placeholder="Tournament name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input type="text" placeholder="City" required />
                <Input type="text" placeholder="Country" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" required />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tournament type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7v7">7v7</SelectItem>
                    <SelectItem value="5v5">5v5</SelectItem>
                    <SelectItem value="Knockout">Knockout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input type="text" placeholder="Prize pool (e.g., $5,000)" />
              </div>
              <div>
                <Textarea
                  placeholder="Tournament description and rules..."
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:opacity-95"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Tournament
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

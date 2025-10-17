"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { news } from "@/data/news";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Calendar,
  Tag,
  Clock,
  User,
  Share2,
  BookOpen,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Enhanced news data with categories and dates
const enhancedNews = [
  {
    ...news[0],
    category: "Academy",
    date: "2024-01-15",
    author: "Sarah Johnson",
    readTime: "5 min read",
    featured: true,
    image: "/news-elite-academy-clinics.jpg",
  },
  {
    ...news[1],
    category: "Partnerships",
    date: "2024-01-12",
    author: "Mike Chen",
    readTime: "3 min read",
    featured: false,
    image: "https://picsum.photos/400/250?random=2",
  },
  {
    ...news[2],
    category: "Tournaments",
    date: "2024-01-10",
    author: "Alex Rodriguez",
    readTime: "4 min read",
    featured: true,
    image: "/news-city-arena-upgrades.jpg",
  },
  {
    ...news[3],
    category: "YouSport",
    date: "2024-01-08",
    author: "Emma Wilson",
    readTime: "6 min read",
    featured: false,
    image: "https://picsum.photos/400/250?random=4",
  },
];

const categories = [
  "All",
  "Academy",
  "Partnerships",
  "Tournaments",
  "YouSport",
];
const sortOptions = ["Latest", "Oldest", "Most Popular", "Featured"];

export default function NewsIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  const filteredItems = useMemo(() => {
    let items = enhancedNews;

    // Search filter
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "Latest":
        items = items.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Oldest":
        items = items.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "Most Popular":
        items = items.sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
        break;
      case "Featured":
        items = items.filter((item) => item.featured);
        break;
    }

    return items;
  }, [searchQuery, selectedCategory, sortBy]);

  const featuredArticles = enhancedNews.filter((article) => article.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/investor-pack-pdf.jpg"
            alt="Investor Pack PDF"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 bg-secondary font-serif">
              News & Programs
            </Badge>
            <h1 className="text-pretty font-mono tracking-wide text-4xl md:text-6xl text-white">
              Stay Updated
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white/90 font-serif">
              Latest news, program updates, and insights from the Ficro Sports
              community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
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
              <h2 className="text-3xl md:text-4xl font-mono tracking-wide">
                Featured Articles
              </h2>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-lg pt-0 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
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
                      <Badge className="bg-secondary text-white">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="line-clamp-2 font-serif">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 font-serif">
                        <User className="h-4 w-4" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1 font-serif">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 font-serif">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <p className="text-muted-foreground line-clamp-3 mb-4 flex-1 font-serif">
                      {article.excerpt}
                    </p>
                    <Button asChild className="w-full mt-auto">
                      <Link href={`/news/${article.slug}`}>
                        Read Article
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
              <div className="h-1 w-12 rounded bg-primary" />
              <h2 className="text-3xl md:text-4xl font-mono tracking-wide">
                All Articles
              </h2>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 max-w-4xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48">
                <Tag className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <TrendingUp className="mr-2 h-4 w-4" />
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

            <Button className="w-full sm:w-auto cursor-pointer">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg pt-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-secondary text-white">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 font-serif">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 font-serif">
                        <User className="h-4 w-4" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1 font-serif">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1">
                    <p className="text-muted-foreground line-clamp-3 mb-4 font-serif">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground font-serif">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </span>
                      <Button asChild size="sm">
                        <Link href={`/news/${article.slug}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Read
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

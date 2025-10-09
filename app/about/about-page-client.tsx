"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Target,
  Users,
  Trophy,
  Building2,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";

interface AboutPageClientProps {
  locale: Locale;
}

export function AboutPageClient({ locale }: AboutPageClientProps) {
  const [investorEmail, setInvestorEmail] = useState("");
  const [investorSent, setInvestorSent] = useState(false);

  function handleInvestorSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInvestorSent(true);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4">
              About Ficro Sports
            </Badge>
            <h1 className={`text-pretty font-serif tracking-tight text-4xl md:text-6xl ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              Building the Future of Sports
            </h1>
            <p className={`mt-6 max-w-2xl mx-auto text-lg text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              We're revolutionizing how athletes train, compete, and connect
              through innovative technology and community-driven platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 rounded bg-primary" />
              <h2 className={`text-2xl font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>Our Vision</h2>
            </div>
            <p className={`text-lg text-muted-foreground leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              To make sports accessible to everyone by creating a unified
              platform that connects athletes, facilities, and communities. We
              envision a world where every athlete has equal opportunity to
              train, compete, and excel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 rounded bg-accent" />
              <h2 className={`text-2xl font-semibold ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>Our Mission</h2>
            </div>
            <p className={`text-lg text-muted-foreground leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              To unify tournaments, facilities, academies, and media under one
              comprehensive ecosystem that empowers athletes to reach their full
              potential while building sustainable revenue streams for sports
              organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-serif tracking-tight mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              Our Strategic Goals
            </h2>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              Driving growth and innovation across the sports ecosystem
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>Player Growth</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    Expand player participation and academy enrollments through
                    accessible training programs and competitive opportunities
                    that engage athletes at every skill level.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>Venue Optimization</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    Increase venue utilization with transparent booking systems
                    and data-driven insights that help facilities maximize their
                    potential and serve more athletes.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <PlayCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>Media Innovation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    Enable revenue-sharing media through YouSport platform,
                    creating new opportunities for content creators and athletes
                    to monetize their sports content.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-serif tracking-tight mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
            Our Team
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
            Passionate professionals dedicated to transforming the sports
            industry through technology and innovation.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="John Doe"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>John Doe</CardTitle>
                <CardDescription className={locale === 'ar' ? 'font-arabic-body' : ''}>CEO & Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-sm text-muted-foreground text-center ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  Former professional athlete with 15+ years in sports
                  technology and business development.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    alt="Sarah Miller"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>Sarah Miller</CardTitle>
                <CardDescription className={locale === 'ar' ? 'font-arabic-body' : ''}>CTO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-sm text-muted-foreground text-center ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  Technology leader with expertise in scalable platforms and
                  sports analytics systems.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="Mike Johnson"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>Mike Johnson</CardTitle>
                <CardDescription className={locale === 'ar' ? 'font-arabic-body' : ''}>Head of Operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-sm text-muted-foreground text-center ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  Operations expert with deep experience in sports facility
                  management and tournament organization.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Investor Section */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-serif tracking-tight mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                Investor Information
              </h2>
              <p className={`text-lg text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                Join us in revolutionizing the sports industry. Download our
                investor pack and connect with our team.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Investor Pack Download */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Download className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>Investor Pack</CardTitle>
                    </div>
                    <CardDescription className={locale === 'ar' ? 'font-arabic-body' : ''}>
                      Comprehensive overview of our business model, financial
                      projections, and growth strategy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      className="w-full bg-primary text-primary-foreground hover:opacity-95"
                    >
                      <a href="/investor-pack-pdf.jpg" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download Investor Pack (PDF)
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className={locale === 'ar' ? 'font-arabic-heading' : ''}>Request Information</CardTitle>
                    </div>
                    <CardDescription className={locale === 'ar' ? 'font-arabic-body' : ''}>
                      Get in touch with our team for detailed discussions about
                      investment opportunities.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {investorSent ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                          <Mail className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                          Thank You!
                        </h3>
                        <p className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                          Your request has been received. We'll follow up within
                          2 business days.
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleInvestorSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <Input
                            type="email"
                            placeholder="Your email address"
                            value={investorEmail}
                            onChange={(e) => setInvestorEmail(e.target.value)}
                            required
                            className={locale === 'ar' ? 'font-arabic-body' : ''}
                          />
                        </div>
                        <div>
                          <Input
                            type="text"
                            placeholder="Company name"
                            required
                            className={locale === 'ar' ? 'font-arabic-body' : ''}
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder="Tell us about your investment interests..."
                            rows={3}
                            className={locale === 'ar' ? 'font-arabic-body' : ''}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground hover:opacity-95"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Send Request
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 text-center"
            >
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center justify-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className={`text-sm ${locale === 'ar' ? 'font-arabic-body' : ''}`}>investors@ficro.com</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className={`text-sm ${locale === 'ar' ? 'font-arabic-body' : ''}`}>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className={`text-sm ${locale === 'ar' ? 'font-arabic-body' : ''}`}>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

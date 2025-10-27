"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"

export function SiteFooter() {
  const { locale } = useLanguage()
  const t = getClientTranslation(locale)
  
  return (
    <footer className="relative font-serif overflow-hidden rounded-t-3xl bg-gradient-to-b from-background via-muted/10 to-primary/20 text-foreground border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>

      {/* Blurry Background Elements */}
      <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-secondary/20 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full bg-accent/15 blur-xl"></div>
      <div className="absolute bottom-0 right-1/4 h-36 w-36 rounded-full bg-primary/10 blur-2xl"></div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
          {/* Logo and Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Image
                  src="/images/logo-ficro.png"
                  alt="Ficro Logo"
                  width={40}
                  height={40}
                  className="h-10 w-20 object-contain"
                />
              </div>
            </div>
            <p className={`text-sm text-foreground/70 leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('footer.description')}
            </p>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className={`text-sm font-semibold text-foreground mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {t('footer.explore')}
            </h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link
                  href="/tournaments"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Tournaments
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/yousport"
                  className="hover:text-primary transition-colors duration-200"
                >
                  YouSport
                </Link>
              </li>
              <li>
                <Link
                  href="/academies"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Academies
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className={`text-sm font-semibold text-foreground mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {t('footer.company')}
            </h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Advertise
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className={`text-sm font-semibold text-foreground mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {t('footer.connect')}
            </h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link
                  href="/news"
                  className="hover:text-primary transition-colors duration-200"
                >
                  News & Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="hover:text-primary transition-colors duration-200"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-foreground/70">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-6 text-xs text-foreground/70">
            <p className={locale === 'ar' ? 'font-arabic-body' : ''}>
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <div className="flex gap-6 mt-2 sm:mt-0">
              <Link
                href="/privacy"
                className={`hover:text-primary transition-colors duration-200 ${locale === 'ar' ? 'font-arabic-body' : ''}`}
              >
                {t('footer.privacy')}
              </Link>
              <Link
                href="/terms"
                className={`hover:text-primary transition-colors duration-200 ${locale === 'ar' ? 'font-arabic-body' : ''}`}
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

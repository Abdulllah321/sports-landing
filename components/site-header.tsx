"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { Trophy, Building2, PlayCircle, Newspaper, ShoppingBag, Calendar, GraduationCap, Megaphone } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/player", key: "player", icon: User },
  { href: "/tournaments", key: "tournaments", icon: Trophy },
  { href: "/facilities", key: "facilities", icon: Building2 },
  { href: "/academies", key: "academies", icon: GraduationCap },
  { href: "/events", key: "events", icon: Calendar },
  { href: "/yousport", key: "yousport", icon: PlayCircle },
  { href: "/news", key: "news", icon: Newspaper },
  { href: "/store", key: "store", icon: ShoppingBag },
  { href: "/advertise", key: "advertise", icon: Megaphone },
  { href: "/account", key: "account", icon: User },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { locale } = useLanguage()
  const t = getClientTranslation(locale)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50" 
          : "bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/images/logo-ficro.png" 
            alt="Ficro" 
            width={112} 
            height={32} 
            className={cn(
              "h-8 w-auto transition-transform duration-300",
              isScrolled ? "scale-95" : "group-hover:scale-105"
            )} 
            priority 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon 
                  className={cn(
                    "h-4 w-4 transition-all duration-200",
                    isActive 
                      ? "text-primary scale-110" 
                      : "text-muted-foreground group-hover:scale-110 group-hover:text-primary"
                  )} 
                  aria-hidden 
                />
                <span className={cn(
                  "relative",
                  isActive && "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                )}>
                  {t(`nav.${item.key}`)}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button 
            asChild 
            className={cn(
              "bg-primary text-primary-foreground hover:opacity-95 transition-all duration-200",
              isScrolled && "shadow-lg"
            )}
          >
            <Link href="/facilities">{t('nav.bookFields')}</Link>
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setOpen((v) => !v)} 
            aria-label="Toggle menu"
            className={cn(
              "transition-all duration-200",
              isScrolled && "shadow-md"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t transition-all duration-300 ease-in-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto flex flex-col gap-1 px-4 py-4 bg-background/95 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setOpen(false)} 
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/90 hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {t(`nav.${item.key}`)}
              </Link>
            )
          })}
          <div className="pt-2 mt-2 border-t">
            <Button 
              asChild 
              className="w-full bg-primary text-primary-foreground"
            >
              <Link href="/facilities" onClick={() => setOpen(false)}>
                {t('nav.bookFields')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

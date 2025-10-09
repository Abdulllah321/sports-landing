"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Trophy, Building2, PlayCircle, Newspaper, ShoppingBag } from "lucide-react"
import { useLanguage } from "@/lib/translation-context"
import { getServerTranslation } from "@/lib/server-translations"
import { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/tournaments", key: "tournaments", icon: Trophy },
  { href: "/facilities", key: "facilities", icon: Building2 },
  { href: "/yousport", key: "yousport", icon: PlayCircle },
  { href: "/news", key: "news", icon: Newspaper },
  { href: "/store", key: "store", icon: ShoppingBag },
]

interface MobileMenuProps {
  locale: Locale
}

export function MobileMenu({ locale }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const t = getServerTranslation(locale)

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t transition-[max-height,opacity] duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4">
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm text-foreground/90">
              {t(`nav.${n.key}`)}
            </Link>
          ))}
          <Button asChild className="bg-primary text-primary-foreground">
            <Link href="/facilities" onClick={() => setOpen(false)}>
              {t('nav.bookFields')}
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

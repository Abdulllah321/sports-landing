"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Trophy, Building2, PlayCircle, Newspaper, ShoppingBag } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/facilities", label: "Facilities", icon: Building2 },
  { href: "/yousport", label: "YouSport", icon: PlayCircle },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/store", label: "Store", icon: ShoppingBag },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo-ficro.png" alt="Ficro" width={112} height={32} className="h-8 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <n.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" aria-hidden />
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-95">
            <Link href="/facilities">Book Fields</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="outline" size="icon" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t transition-[max-height,opacity] duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm text-foreground/90">
              {n.label}
            </Link>
          ))}
          <Button asChild className="bg-primary text-primary-foreground">
            <Link href="/facilities" onClick={() => setOpen(false)}>
              Book Fields
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

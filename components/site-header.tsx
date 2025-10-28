"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Info, ChevronDown, MoreHorizontal } from "lucide-react"
import { Trophy, Building2, PlayCircle, Newspaper, ShoppingBag, Calendar, GraduationCap, Megaphone } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { cn } from "@/lib/utils"

const allNavItems = [
  { href: "/about", key: "about", icon: Info },
  { href: "/tournaments", key: "tournaments", icon: Trophy },
  { href: "/facilities", key: "facilities", icon: Building2 },
  { href: "/academies", key: "academies", icon: GraduationCap },
  { href: "/events", key: "events", icon: Calendar },
  { href: "/yousport", key: "yousport", icon: PlayCircle },
  { href: "/news", key: "news", icon: Newspaper },
  { href: "/store", key: "store", icon: ShoppingBag },  { href: "/advertise", key: "advertise", icon: Megaphone },
  { href: "/support", key: "support", icon: Info },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navPopoverOpen, setNavPopoverOpen] = useState(false)
  const [hasStickyElements, setHasStickyElements] = useState(false)
  const pathname = usePathname()
  const { locale } = useLanguage()
  const t = getClientTranslation(locale)
  const isArabic = locale === 'ar'

  // Handle scroll effect and header height
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      checkForStickyElements() // Check sticky elements on scroll
    }
    
    const updateHeaderHeight = () => {
      const header = document.querySelector('header')
      if (header) {
        const height = header.offsetHeight
        document.documentElement.style.setProperty('--header-height', `calc(${height}px + var(--spacing) * 5)`)
      }
    }
    
    const checkForStickyElements = () => {
      // Look specifically for elements with header-sticky-element class
      const stickyElements = document.querySelectorAll('.header-sticky-element')
      const headerRect = document?.querySelector('header')?.getBoundingClientRect()
      const headerLength = (headerRect?.top || 0) + (headerRect?.height || 0)
      const isSticky = stickyElements.length > 0 && Array.from(stickyElements)?.some((element) => {
        const elementRect = element.getBoundingClientRect()
        const elementTop = elementRect.top
        return elementTop <= headerLength + 10
      })

      // Reflect state on the sticky elements themselves
      Array.from(stickyElements).forEach((el) => {
        el.classList.toggle('rounded-t-none', isSticky)
      })

      setHasStickyElements(isSticky)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Update header height on mount and resize
    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    
    // Check for sticky elements on mount and when DOM changes
    checkForStickyElements()
    const observer = new MutationObserver(checkForStickyElements)
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateHeaderHeight)
      observer.disconnect()
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false)
    setNavPopoverOpen(false)
  }, [pathname])

  // Update header height when mobile menu state changes
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header')
      if (header) {
        const height = header.offsetHeight
        document.documentElement.style.setProperty('--header-height', `calc(${height}px + var(--spacing) * 5 + 1px)`)
      }
    }
    
    // Small delay to ensure DOM has updated
    const timeoutId = setTimeout(updateHeaderHeight, 10)
    return () => clearTimeout(timeoutId)
  }, [open])

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setNavPopoverOpen(false)
    }
    
    if (navPopoverOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [navPopoverOpen])

  return (
    <header 
      className={cn(
        "sticky z-50 w-full transition-all duration-300 mx-auto",
        isScrolled 
          ? cn(
              "bg-background/60 backdrop-blur border border-border/50 top-5 w-[calc(100%-2rem)] container max-lg:top-0 max-lg:rounded-none max-lg:w-full max-lg:border-b",
              hasStickyElements ? "rounded-t-2xl rounded-b-0 border-b-transparent element-sticky" : "rounded-2xl"
            )
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b top-0 w-full max-w-full"
      )}
     
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
        {/* Left Section: Menu Button */}
        <div className="flex items-center">
          {/* Desktop Navigation */}
          <nav className="hidden items-center lg:flex">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNavPopoverOpen(!navPopoverOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:shadow-sm"
                >
                  <motion.div
                    animate={{ 
                      rotate: navPopoverOpen ? 90 : 0,
                      scale: navPopoverOpen ? 1.1 : 1
                    }}
                    transition={{ 
                      duration: 0.2, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.div>
                  <motion.span
                    animate={{ 
                      opacity: navPopoverOpen ? 0.7 : 1,
                      x: navPopoverOpen ? 2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {t('nav.menu')}
                  </motion.span>
                </Button>
              </motion.div>
              
              <div className={cn(
                "absolute top-full  mt-2 w-72 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg py-2 z-50 transition-all duration-300 ease-in-out",
                locale === "ar" ? "right-0" : "left-0",
                navPopoverOpen 
                  ? "opacity-100 scale-100 translate-y-0" 
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}>
                <div className="grid grid-cols-2 gap-1">
                  {allNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setNavPopoverOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 whitespace-nowrap rounded-md",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/90 hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="whitespace-nowrap truncate">{t(`nav.${item.key}`)}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen((v) => !v)} 
              aria-label="Toggle menu"
              className={cn(
                "lg:hidden transition-all duration-200 hover:shadow-sm",
                isScrolled && "shadow-md max-lg:shadow-none"
              )}
            >
              <motion.div
                animate={{ 
                  rotate: open ? 90 : 0,
                  scale: open ? 1.1 : 1
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut" 
                }}
              >
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Center Section: Logo */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3 group">
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

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button 
              asChild 
              className={cn(
                "hidden lg:flex bg-primary text-primary-foreground hover:opacity-95 transition-all duration-200 hover:shadow-lg",
                isScrolled && "shadow-lg max-lg:shadow-none"
              )}
            >
              <Link href="/auth/register">{isArabic ? 'انضم الآن' : 'Join Now'}</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t transition-all duration-300 ease-in-out",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto flex flex-col gap-1 px-4 py-4 bg-background/95 backdrop-blur-md">
          {/* All Navigation Items */}
          <div className="grid grid-cols-2 gap-1">
            {allNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setOpen(false)} 
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/90 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap truncate">{t(`nav.${item.key}`)}</span>
                </Link>
              )
            })}
          </div>

          <div className="pt-2 mt-2 border-t">
            <Button 
              asChild 
              className="w-full bg-primary text-primary-foreground"
            >
              <Link href="/auth/register" onClick={() => setOpen(false)}>
                {isArabic ? 'انضم الآن' : 'Join Now'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

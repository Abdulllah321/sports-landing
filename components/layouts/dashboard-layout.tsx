"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  Home,
  Users,
  MapPin,
  Trophy,
  PlayCircle,
  Megaphone,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Dashboard Navigation Items
const dashboardNavItems = [
  { id: "overview", label: "Overview", icon: Home, href: "/academies/[username]/dashboard", color: "text-blue-600" },
  { id: "players", label: "Players", icon: Users, href: "/academies/[username]/dashboard/players", color: "text-green-600" },
  { id: "stadiums", label: "Stadiums", icon: MapPin, href: "/academies/[username]/dashboard/stadiums", color: "text-orange-600" },
  { id: "tournaments", label: "Tournaments", icon: Trophy, href: "/academies/[username]/dashboard/tournaments", color: "text-purple-600" },
  { id: "videos", label: "Videos", icon: PlayCircle, href: "/academies/[username]/dashboard/videos", color: "text-red-600" },
  { id: "advertisements", label: "Advertisements", icon: Megaphone, href: "/academies/[username]/dashboard/advertisements", color: "text-pink-600" },
  { id: "bookings", label: "Bookings", icon: BookOpen, href: "/academies/[username]/dashboard/bookings", color: "text-indigo-600" },
  { id: "crm", label: "CRM/Reports", icon: BarChart3, href: "/academies/[username]/dashboard/crm", color: "text-yellow-600" }
]

interface DashboardLayoutProps {
  children: React.ReactNode
  username: string
}

export function DashboardLayout({ children, username }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const getCurrentSection = () => {
    if (pathname.includes('/players')) return 'players'
    if (pathname.includes('/stadiums')) return 'stadiums'
    if (pathname.includes('/tournaments')) return 'tournaments'
    if (pathname.includes('/videos')) return 'videos'
    if (pathname.includes('/advertisements')) return 'advertisements'
    if (pathname.includes('/bookings')) return 'bookings'
    if (pathname.includes('/crm')) return 'crm'
    return 'overview'
  }

  const currentSection = getCurrentSection()

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobileMenu}
          className="bg-background/80 backdrop-blur-sm"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: sidebarOpen ? 280 : 80,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "hidden lg:flex flex-col bg-card border-r border-border",
          "transition-all duration-300 ease-in-out"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Academy Dashboard</h2>
                    <p className="text-sm text-muted-foreground">Management Portal</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="shrink-0"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {dashboardNavItems.map((item) => {
            const Icon = item.icon
            const isActive = currentSection === item.id
            const href = item.href.replace('[username]', username)
            
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={href}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : item.color)} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                key="footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <Badge variant="secondary" className="mb-2">
                  Elite Sports Academy
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Gold Package
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: mobileMenuOpen ? 0 : -280,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="lg:hidden fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 flex flex-col"
      >
        {/* Mobile Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Academy Dashboard</h2>
              <p className="text-sm text-muted-foreground">Management Portal</p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {dashboardNavItems.map((item) => {
            const Icon = item.icon
            const isActive = currentSection === item.id
            const href = item.href.replace('[username]', username)
            
            return (
              <Link
                key={item.id}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : item.color)} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              Elite Sports Academy
            </Badge>
            <p className="text-xs text-muted-foreground">
              Gold Package
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {dashboardNavItems.find(item => item.id === currentSection)?.label || "Dashboard"}
              </h1>
              <p className="text-muted-foreground">
                Manage your academy operations and activities
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

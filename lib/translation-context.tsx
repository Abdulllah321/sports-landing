"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Locale, defaultLocale, isValidLocale } from './i18n'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ 
  children, 
  initialLocale = defaultLocale 
}: { 
  children: React.ReactNode
  initialLocale?: Locale 
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const router = useRouter()

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    
    // Set cookie for server-side access
    document.cookie = `locale=${newLocale}; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax`
    
    // Refresh the current route to fetch server-rendered content for the new locale
    // Using router.refresh() instead of window.location.reload() for better UX:
    // - Preserves client state and scroll position
    // - Faster than full page reload
    // - Maintains React component state
    // - Only re-fetches server components
    router.refresh()
  }

  useEffect(() => {
    // Get locale from localStorage or use initial locale
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && isValidLocale(savedLocale)) {
      setLocaleState(savedLocale as Locale)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

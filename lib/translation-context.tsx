"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
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

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    
    // Set cookie for server-side access
    document.cookie = `locale=${newLocale}; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax`
    
    // Update the HTML lang and dir attributes
    document.documentElement.lang = newLocale
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    
    // Reload the page to fetch server-rendered content for the new locale
    window.location.reload()
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

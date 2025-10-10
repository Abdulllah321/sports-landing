"use client"

import { useLanguage } from "@/lib/translation-context"
import { useEffect } from "react"

export function HtmlAttributes() {
  const { locale } = useLanguage()

  useEffect(() => {
    // Only update attributes after hydration to avoid mismatch
    const html = document.documentElement
    if (html.getAttribute('lang') !== locale) {
      html.setAttribute('lang', locale)
    }
    const expectedDir = locale === 'ar' ? 'rtl' : 'ltr'
    if (html.getAttribute('dir') !== expectedDir) {
      html.setAttribute('dir', expectedDir)
    }
  }, [locale])

  return null
}

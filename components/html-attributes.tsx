"use client"

import { useLanguage } from "@/lib/translation-context"
import { useEffect } from "react"

export function HtmlAttributes() {
  const { locale } = useLanguage()

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', locale)
    html.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
  }, [locale])

  return null
}

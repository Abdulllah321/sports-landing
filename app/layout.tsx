import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"
import { Poppins, Inter } from "next/font/google"

const heading = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})
const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ficro Sports",
  description: "Book facilities, join tournaments, and train better — powered by Ficro.",
  generator: "v0.app",
}

function ThemeNoFlashScript() {
  // Ensures correct theme before hydration to avoid flash
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function(){
  try {
    const s = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const t = s || (prefersDark ? 'dark' : 'light');
    if (t === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch(e) {}
})();`,
      }}
    />
  )
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable} antialiased`}>
      <head>
        <ThemeNoFlashScript />
      </head>
      <body className="font-sans bg-background text-foreground">
        <Suspense fallback={<div>Loading...</div>}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

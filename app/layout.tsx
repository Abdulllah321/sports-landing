import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Suspense } from "react";
import { Anton, Poppins, Lato } from "next/font/google";

// Load Google fonts and expose CSS variables
const heading = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const subheading = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-subheading",
  display: "swap",
});

const body = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ficro Sports",
  description:
    "Book facilities, join tournaments, and train better — powered by Ficro.",
  generator: "v0.app",
};

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
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {
    // Fallback to light theme if localStorage is not available
    document.documentElement.classList.remove('dark');
  }
})();`,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${subheading.variable} ${body.variable} antialiased`}
      suppressHydrationWarning={true}
    >
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
  );
}

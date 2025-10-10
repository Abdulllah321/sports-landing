import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeaderServer } from "@/components/site-header-server";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/lib/translation-context";
import { HtmlAttributes } from "@/components/html-attributes";
import { Suspense } from "react";
import { Anton, Poppins, Lato } from "next/font/google";
import localFont from "next/font/local";

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

// Arabic fonts
const arabicHeading = localFont({
  src: [
    {
      path: "../public/fonts/reem-kufi-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/reem-kufi-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/reem-kufi-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/reem-kufi-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-arabic-heading",
  display: "swap",
});

const arabicBody = localFont({
  src: [
    {
      path: "../public/fonts/Naskh.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-arabic-body",
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
}: Readonly<{ 
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${heading.variable} ${subheading.variable} ${body.variable} ${arabicHeading.variable} ${arabicBody.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeNoFlashScript />
      </head>
      <body className="font-sans bg-background text-foreground" suppressHydrationWarning>
        <LanguageProvider initialLocale="en">
          <HtmlAttributes />
          <Suspense fallback={<div>Loading...</div>}>
            <SiteHeaderServer />
            <main>{children}</main>
            <SiteFooter />
          </Suspense>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
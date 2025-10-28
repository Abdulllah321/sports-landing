import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trophy, School, Building2, Store, LayoutDashboard, HeadphonesIcon } from "lucide-react"
import { getServerTranslation } from "@/lib/server-translations"
import { Locale } from "@/lib/i18n"
import { FeatureGridAnimated } from "@/components/feature-grid-animated"

const featureKeys = [
  "tournaments",
  "academies", 
  "facilities",
  "store",
  "dashboard",
  "support"
]

const featureIcons = [
  Trophy,
  School,
  Building2,
  Store,
  LayoutDashboard,
  HeadphonesIcon
]

const featureHrefs = [
  "/tournaments",
  "/academies",
  "/facilities", 
  "/store",
  "/account",
  "/support"
]

interface FeatureGridProps {
  locale: Locale
}

export function FeatureGrid({ locale }: FeatureGridProps) {
  const t = getServerTranslation(locale)
  return (
    <FeatureGridAnimated locale={locale}>
      {featureKeys.map((key, i) => {
        const Icon = featureIcons[i]
        const href = featureHrefs[i]
        
        return (
          <Card key={key} className="group relative h-full bg-card border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 py-2 gap-0">
            <CardHeader className="items-center text-center pb-2 pt-4">
              <div className="mb-4">
                <Icon className="h-16 w-16 text-primary mx-auto stroke-1" aria-hidden />
              </div>
              <CardTitle className={`font-mono text-xl font-extralight mb-0 text-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {t(`features.${key}.title`)}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3 text-center pb-4">
              <p className={`text-sm text-muted-foreground leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {t(`features.${key}.description`)}
              </p>
              <Button asChild className="w-full">
                <Link href={href} className={locale === 'ar' ? 'font-arabic-body' : ''}>
                  {t(`features.${key}.cta`)}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </FeatureGridAnimated>
  )
}

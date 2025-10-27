import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getServerNewsByLocale } from "@/lib/server-dynamic-translations"
import { Calendar, ArrowRight } from "lucide-react"
import { getServerTranslation } from "@/lib/server-translations"
import { Locale } from "@/lib/i18n"
// import { NewsCardsAnimated } from "./news-cards-animated"

interface NewsCardsProps {
  limit?: number
  locale: Locale
}

export function NewsCards({ limit, locale }: NewsCardsProps) {
  const t = getServerTranslation(locale)
  const newsData = getServerNewsByLocale(locale)
  const items = typeof limit === "number" ? newsData.slice(0, limit) : newsData
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((n: any, i: number) => (
        <Link key={n.slug} href={`/news/${n.slug}`} className="block group h-full">
          <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-hover:border-primary/40 pt-0">
            <div className="relative h-60 overflow-hidden">
              <Image
                src={n.image}
                alt={n.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-primary/90 text-primary-foreground">
                  {n.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className={`text-lg font-mono tracking-wide font-[100] group-hover:text-foreground transition-colors ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {n.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                  {new Date(n.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className={`text-sm text-muted-foreground line-clamp-3 leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {n.excerpt}
              </p>
              <div className="flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
                <span className={locale === 'ar' ? 'font-arabic-body' : ''}>
                  {t('news.readArticle')}
                </span>
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${locale === 'ar' ? 'ml-1' : 'ml-1'}`} />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

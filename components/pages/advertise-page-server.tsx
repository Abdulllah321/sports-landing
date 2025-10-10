import { getServerTranslationWithLocale } from "../locale-provider-server";
import { AdvertisePageClient } from "./advertise-page-client";

export async function AdvertisePageServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-accent/20" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className={`text-balance text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono tracking-wider'}`}>
              {locale === 'ar' ? 'الإعلان مع فيكرو' : 'Advertise with Ficro'}
            </h1>
            <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {locale === 'ar' ? 'وصل إلى آلاف الرياضيين والمشجعين من خلال منصتنا المتخصصة في الرياضة' : 'Reach thousands of athletes and sports fans through our specialized sports platform'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl">
                {locale === 'ar' ? 'اطلب حملة إعلانية' : 'Request Campaign'}
              </button>
              <button className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                {locale === 'ar' ? 'عرض الأسعار' : 'View Pricing'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Packages Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <AdvertisePageClient locale={locale} />
        </div>
      </section>
    </div>
  );
}

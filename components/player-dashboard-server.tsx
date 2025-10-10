import { getServerTranslationWithLocale } from "./locale-provider-server";
import { PlayerDashboardClient } from "./player-dashboard-client";

export async function PlayerDashboardServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-accent/20" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className={`text-balance text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono tracking-wider'}`}>
              {locale === 'ar' ? 'لوحة تحكم اللاعب' : 'Player Dashboard'}
            </h1>
            <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {locale === 'ar' ? 'مرحباً بك في منصة فيكرو الرياضية - ابدأ رحلتك الرياضية' : 'Welcome to Ficro Sports Platform - Start your sports journey'}
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <PlayerDashboardClient locale={locale} />
        </div>
      </section>
    </div>
  );
}

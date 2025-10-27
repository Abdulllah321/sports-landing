import { getServerTranslationWithLocale } from "./locale-provider-server";
import { PlayerDashboardClient } from "./player-dashboard-client";

export async function PlayerDashboardServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-6">
          <h1 className={`text-3xl font-bold text-foreground ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono tracking-wider'}`}>
            {locale === 'ar' ? 'لوحة تحكم اللاعب' : 'Dashboard'}
          </h1>
          <p className={`text-sm text-muted-foreground mt-1 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
            {locale === 'ar' ? 'نظرة عامة على نشاطك الرياضي' : 'Overview of your sports activity'}
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <PlayerDashboardClient locale={locale} />
      </div>
    </div>
  );
}

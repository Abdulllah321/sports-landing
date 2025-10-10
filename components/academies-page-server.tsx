import { getServerTranslationWithLocale } from "./locale-provider-server";
import { AcademyDirectory } from "./academy-directory";

export async function AcademiesPageServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
        {/* Background Image with Light Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop&crop=center')`
          }}
        />
        {/* Overlay with Light Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-accent/30" />
        {/* Light Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className={`text-balance text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono tracking-wider'}`}>
              {t('academies.hero.title')}
            </h1>
            <p className={`text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('academies.hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20 shadow-xl">
                <div className="text-2xl font-bold text-white">15</div>
                <div className={`text-sm text-white/80 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {t('academies.stats.totalAcademies')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20 shadow-xl">
                <div className="text-2xl font-bold text-white">3</div>
                <div className={`text-sm text-white/80 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {t('academies.stats.packageLevels')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20 shadow-xl">
                <div className="text-2xl font-bold text-white">2,500+</div>
                <div className={`text-sm text-white/80 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {t('academies.stats.activeStudents')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Directory Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 whitespace-nowrap ${locale === 'ar' ? 'font-arabic-heading' : 'font-mono tracking-wider'}`}>
              {t('academies.sections.directory')}
            </h2>
            <p className={`text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('academies.sections.directoryDescription')}
            </p>
          </div>
          <AcademyDirectory />
        </div>
      </section>

      {/* Package Levels Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                {t('academies.sections.packageLevels')}
              </h2>
              <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {t('academies.sections.packageDescription')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bronze Package */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">🥉</span>
                  </div>
                  <h3 className={`text-2xl font-bold text-foreground mb-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                    {t('academies.packages.bronze.title')}
                  </h3>
                  <p className={`text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {t('academies.packages.bronze.description')}
                  </p>
                </div>
                <ul className={`space-y-3 mb-6 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.bronze.features.basicTraining')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.bronze.features.groupSessions')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.bronze.features.equipmentAccess')}
                  </li>
                </ul>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">$99/month</div>
                  <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {t('academies.packages.bronze.priceNote')}
                  </div>
                </div>
              </div>

              {/* Silver Package */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t('academies.packages.silver.popular')}
                  </span>
                </div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">🥈</span>
                  </div>
                  <h3 className={`text-2xl font-bold text-foreground mb-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                    {t('academies.packages.silver.title')}
                  </h3>
                  <p className={`text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {t('academies.packages.silver.description')}
                  </p>
                </div>
                <ul className={`space-y-3 mb-6 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.silver.features.allBronze')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.silver.features.personalTraining')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.silver.features.nutritionGuidance')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.silver.features.competitionAccess')}
                  </li>
                </ul>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">$199/month</div>
                  <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {t('academies.packages.silver.priceNote')}
                  </div>
                </div>
              </div>

              {/* Gold Package */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">🥇</span>
                  </div>
                  <h3 className={`text-2xl font-bold text-foreground mb-2 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                    {t('academies.packages.gold.title')}
                  </h3>
                  <p className={`text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {t('academies.packages.gold.description')}
                  </p>
                </div>
                <ul className={`space-y-3 mb-6 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.gold.features.allSilver')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.gold.features.eliteTraining')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.gold.features.oneOnOneCoaching')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.gold.features.performanceAnalysis')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('academies.packages.gold.features.priorityBooking')}
                  </li>
                </ul>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">$399/month</div>
                  <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                    {t('academies.packages.gold.priceNote')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

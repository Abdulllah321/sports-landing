import { getServerTranslationWithLocale } from "./locale-provider-server";
import { EventList } from "./event-list";
import { ContestCards } from "./contest-cards";
import { VotingSection } from "./voting-section";

export async function EventsPageServer() {
  const { t, locale } = await getServerTranslationWithLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-accent/20" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className={`text-balance text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {t('events.hero.title')}
            </h1>
            <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('events.hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-background/80 backdrop-blur-md rounded-lg px-6 py-3 border border-border/50">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {t('events.stats.activeEvents')}
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-md rounded-lg px-6 py-3 border border-border/50">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {t('events.stats.liveContests')}
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-md rounded-lg px-6 py-3 border border-border/50">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className={`text-sm text-muted-foreground ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                  {t('events.stats.totalVotes')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event List Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {t('events.sections.upcomingEvents')}
            </h2>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('events.sections.upcomingDescription')}
            </p>
          </div>
          <EventList />
        </div>
      </section>

      {/* Contest Cards Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
                {t('events.sections.activeContests')}
              </h2>
              <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
                {t('events.sections.contestsDescription')}
              </p>
            </div>
            <ContestCards />
          </div>
        </div>
      </section>

      {/* Voting Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${locale === 'ar' ? 'font-arabic-heading' : ''}`}>
              {t('events.sections.voting')}
            </h2>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${locale === 'ar' ? 'font-arabic-body' : ''}`}>
              {t('events.sections.votingDescription')}
            </p>
          </div>
          <VotingSection />
        </div>
      </section>
    </div>
  );
}

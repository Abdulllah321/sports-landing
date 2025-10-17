import { getServerTranslationWithLocale } from "./locale-provider-server"
import { RegisterPageClient } from "./register-page-client"

export async function RegisterPageServer() {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              {t('register.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('register.description')}
            </p>
          </div>
          
          <RegisterPageClient locale={locale} />
        </div>
      </div>
    </div>
  )
}

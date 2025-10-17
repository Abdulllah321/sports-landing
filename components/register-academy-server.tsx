import { getServerTranslationWithLocale } from "./locale-provider-server"
import { RegisterAcademyClient } from "./register-academy-client"

export async function RegisterAcademyServer() {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('register.academy.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('register.academy.description')}
            </p>
          </div>
          
          <RegisterAcademyClient locale={locale} />
        </div>
      </div>
    </div>
  )
}

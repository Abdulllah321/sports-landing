"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Trophy, Star, ArrowRight, CheckCircle, X } from "lucide-react"
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"
import { cn } from "@/lib/utils"

export function RegisterPageClient({ locale }: { locale: string }) {
  const t = getClientTranslation(locale as any)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const registrationTypes = [
    {
      id: "academy",
      title: t('register.types.academy.title'),
      description: t('register.types.academy.description'),
      icon: Building2,
      features: [
        t('register.types.academy.features.manageStudents'),
        t('register.types.academy.features.organizeTournaments'),
        t('register.types.academy.features.trackProgress'),
        t('register.types.academy.features.community')
      ],
      popular: true,
      href: "/auth/register/academy"
    },
    {
      id: "player",
      title: t('register.types.player.title'),
      description: t('register.types.player.description'),
      icon: Users,
      features: [
        t('register.types.player.features.joinAcademies'),
        t('register.types.player.features.participateTournaments'),
        t('register.types.player.features.trackProgress'),
        t('register.types.player.features.connect')
      ],
      popular: false,
      href: "/auth/register/player"
    },
    {
      id: "referee",
      title: t('register.types.referee.title'),
      description: t('register.types.referee.description'),
      icon: Trophy,
      features: [
        t('register.types.referee.features.officiateGames'),
        t('register.types.referee.features.buildReputation'),
        t('register.types.referee.features.earnIncome'),
        t('register.types.referee.features.network')
      ],
      popular: false,
      href: "/auth/register/referee"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Registration Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {registrationTypes.map((type) => {
          const Icon = type.icon
          const isSelected = selectedType === type.id
          
          return (
            <Card 
              key={type.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300 hover:shadow-lg",
                isSelected && "ring-2 ring-primary shadow-lg",
                type.popular && "border-primary/20"
              )}
              onClick={() => setSelectedType(type.id)}
            >
              {type.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    {t('register.popular')}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={cn(
                  "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-200",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
                <CardDescription className="text-sm">
                  {type.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={cn(
                    "w-full transition-all duration-200",
                    isSelected 
                      ? "bg-primary hover:bg-primary/90" 
                      : "bg-muted hover:bg-muted/80"
                  )}
                  variant={isSelected ? "default" : "outline"}
                >
                  {t('register.selectType')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {selectedType && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 h-screen"
              onClick={() => setSelectedType(null)}
            />
            
            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border rounded-t-2xl shadow-2xl max-w-md mx-auto backdrop-blur supports-[backdrop-filter]:bg-background/70"
            >
              <div className="p-6">
                {/* Handle */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
                </div>
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedType(null)}
                  className="absolute top-4 right-4 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
                
                {/* Content */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold">
                      {t('register.selected')}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {t('register.selectedDescription')}
                  </p>
                  
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      const selectedTypeData = registrationTypes.find(type => type.id === selectedType)
                      if (selectedTypeData) {
                        window.location.href = selectedTypeData.href
                      }
                    }}
                  >
                    {t('register.proceedToRegistration')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Benefits Section */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('register.benefits.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('register.benefits.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('register.benefits.community.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('register.benefits.community.description')}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('register.benefits.tournaments.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('register.benefits.tournaments.description')}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('register.benefits.growth.title')}</h3>
            <p className="text-muted-foreground text-sm">{t('register.benefits.growth.description')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

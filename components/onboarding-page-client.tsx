"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Users,
  Trophy,
  GraduationCap,
  Building2,
  UserCheck,
  Newspaper,
  PlayCircle,
  Calendar,
  Award,
  ShoppingBag,
  Briefcase,
  Zap,
  TrendingUp,
  Target,
  CheckCircle
} from "lucide-react";

const onboardingSteps = [
  {
    id: 1,
    icon: Globe,
    titleEn: "Welcome to Ficro",
    titleAr: "مرحباً بك في فيكرو",
    descriptionEn: "The all-in-one digital sports ecosystem",
    descriptionAr: "النظام البيئي الرياضي الرقمي الشامل",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    icon: Users,
    titleEn: "Join Our Community",
    titleAr: "انضم إلى مجتمعنا",
    descriptionEn: "Join as a Player, Academy, Club, or Journalist and connect globally",
    descriptionAr: "انضم كلاعب، أكاديمية، نادي أو صحفي واتصل عالمياً",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    icon: Trophy,
    titleEn: "For Players",
    titleAr: "لللاعبين",
    descriptionEn: "Build profiles, join academies, register for tournaments, and share highlight videos",
    descriptionAr: "أنشئ ملفاً شخصياً، انضم للأكاديميات، سجل في البطولات وشارك أبرز فيديوهاتك",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    icon: GraduationCap,
    titleEn: "For Academies",
    titleAr: "للأكاديميات",
    descriptionEn: "Train players, organize tournaments, and list your stadiums for booking",
    descriptionAr: "درّب اللاعبين، نظم البطولات واعرض ملاعبك للحجز",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    icon: Building2,
    titleEn: "For Clubs & Agents",
    titleAr: "للأندية والوكلاء",
    descriptionEn: "Discover talent through verified profiles and private YouSport access",
    descriptionAr: "اكتشف المواهب من خلال الملفات الشخصية الم verified والفصل الخاص على YouSport",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    id: 6,
    icon: Newspaper,
    titleEn: "For Journalists",
    titleAr: "للصحفيين",
    descriptionEn: "Cover stories, publish reports, and share sports updates",
    descriptionAr: "غط القصص، انشر التقارير وشارك تحديثات الرياضة",
    gradient: "from-yellow-500 to-amber-500"
  },
  {
    id: 7,
    icon: PlayCircle,
    titleEn: "YouSport Channel",
    titleAr: "قناة YouSport",
    descriptionEn: "Stream live and recorded moments from across the network",
    descriptionAr: "بث مباشر ولحظات مسجلة من جميع أنحاء الشبكة",
    gradient: "from-red-500 to-pink-500"
  },
  {
    id: 8,
    icon: Calendar,
    titleEn: "Events & Contests",
    titleAr: "الأحداث والمسابقات",
    descriptionEn: "Events, Contests & Surveys keep the community engaged and competitive",
    descriptionAr: "الأحداث، المسابقات والاستطلاعات تبقي المجتمع متفاعلاً وتنافسياً",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    id: 9,
    icon: ShoppingBag,
    titleEn: "Store & Opportunities",
    titleAr: "المتجر والفرص",
    descriptionEn: "The Store & Opportunities Hub offer gear, sponsorships, and investment channels",
    descriptionAr: "المتجر ومركز الفرص يقدم المعدات، الرعايات وقنوات الاستثمار",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    id: 10,
    icon: Zap,
    titleEn: "Join. Play. Grow.",
    titleAr: "انضم. العب. نم.",
    descriptionEn: "Ficro connects sports talent, media, and opportunity worldwide",
    descriptionAr: "فيكرو يربط مواهب الرياضة، الإعلام والفرص حول العالم",
    gradient: "from-rose-500 to-orange-500"
  }
];

export function OnboardingPageClient({ locale }: { locale: string }) {
  const { locale: currentLocale, setLocale } = useLanguage();
  const isArabic = currentLocale === 'ar';
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const completeOnboarding = () => {
    // Set cookie to mark onboarding as completed
    document.cookie = `onboarding_completed=true; max-age=${60 * 60 * 24 * 365}; path=/`;
    router.push('/');
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and navigate home
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    document.cookie = `onboarding_completed=true; max-age=${60 * 60 * 24 * 365}; path=/`;
    router.push('/');
  };

  const currentSlide = onboardingSteps[currentStep];
  const Icon = currentSlide.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col justify-between p-6 md:p-12 relative z-10">
        {/* Skip button */}
        <div className="flex justify-end mb-4">
          <Button variant="ghost" onClick={skipOnboarding}>
            {isArabic ? "تخطي" : "Skip"}
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="text-center"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1
                  }}
                  className={cn(
                    "mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-8",
                    `bg-gradient-to-br ${currentSlide.gradient}`
                  )}
                >
                  <Icon className="h-16 w-16 text-white" />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className={cn(
                    "text-4xl md:text-6xl font-bold mb-6",
                    isArabic && "font-arabic-heading"
                  )}>
                    {isArabic ? currentSlide.titleAr : currentSlide.titleEn}
                  </h1>
                  <p className={cn(
                    "text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed",
                    isArabic && "font-arabic-body"
                  )}>
                    {isArabic ? currentSlide.descriptionAr : currentSlide.descriptionEn}
                  </p>
                </motion.div>

                {/* Progress dots */}
                {/* <div className="flex justify-center gap-2 mt-12">
                  {onboardingSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          index === currentStep ? "w-8 bg-primary" : "bg-muted-foreground/30"
                        )}
                      />
                    </motion.div>
                  ))}
                </div> */}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto w-full">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={isArabic ? "order-2" : ""}
          >
            {isArabic ? "التالي →" : "← Previous"}
          </Button>

          <div className="flex gap-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentStep ? "bg-primary w-8" : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            className={isArabic ? "order-1" : ""}
          >
            {currentStep === onboardingSteps.length - 1
              ? (isArabic ? "ابدأ" : "Get Started")
              : (isArabic ? "← السابق" : "Next →")}
            {currentStep === onboardingSteps.length - 1 && (
              <CheckCircle className="h-4 w-4 ml-2" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}


import { Locale } from "@/lib/i18n"

export interface TournamentItem {
  id: string
  name: {
    en: string
    ar: string
  }
  country: {
    en: string
    ar: string
  }
  city: {
    en: string
    ar: string
  }
  date: string
  type: {
    en: "7v7" | "5v5" | "Knockout"
    ar: "7 ضد 7" | "5 ضد 5" | "خروج المغلوب"
  }
  sport: {
    en: "Football" | "Basketball" | "Volleyball" | "Tennis"
    ar: "كرة القدم" | "كرة السلة" | "الكرة الطائرة" | "التنس"
  }
  ageGroup: {
    en: "Under 16" | "Under 18" | "Under 21" | "Open"
    ar: "تحت 16" | "تحت 18" | "تحت 21" | "مفتوح"
  }
  image?: string
  prize?: string
  description?: {
    en: string
    ar: string
  }
  format?: {
    en: string
    ar: string
  }
  rules?: {
    en: string[]
    ar: string[]
  }
  participationRequirements?: {
    en: string[]
    ar: string[]
  }
  maxTeams?: number
  registeredTeams?: number
  status?: "Open" | "Registration Closed" | "Upcoming" | "Completed"
  featured?: boolean
}

export const tournamentData: TournamentItem[] = [
  { 
    id: "t1", 
    name: {
      en: "City Cup 7v7",
      ar: "كأس المدينة 7 ضد 7"
    },
    country: {
      en: "UAE",
      ar: "الإمارات"
    },
    city: {
      en: "Dubai",
      ar: "دبي"
    },
    date: "2025-11-02", 
    type: {
      en: "7v7",
      ar: "7 ضد 7"
    },
    sport: {
      en: "Football",
      ar: "كرة القدم"
    },
    ageGroup: {
      en: "Open",
      ar: "مفتوح"
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
    prize: "$5,000",
    description: {
      en: "Premier 7v7 tournament featuring top teams from across the region. A competitive showcase of local talent with professional officiating and modern facilities.",
      ar: "بطولة 7 ضد 7 الرائدة التي تضم أفضل الفرق من مختلف المنطقة. عرض تنافسي للمواهب المحلية مع تحكيم احترافي ومرافق حديثة."
    },
    format: {
      en: "Group stage followed by knockout rounds. Maximum 16 teams in 4 groups of 4. Top 2 teams from each group advance to quarterfinals.",
      ar: "مرحلة المجموعات يليها جولات خروج المغلوب. بحد أقصى 16 فريقاً في 4 مجموعات من 4 فرق. يتأهل أول فريقين من كل مجموعة للدور ربع النهائي."
    },
    rules: {
      en: [
        "Matches are 50 minutes (25 minutes per half)",
        "Unlimited substitutions allowed",
        "Yellow card = warning, 2 yellow cards = red card and suspension",
        "Red card = immediate ejection for that match",
        "Fair play policy strictly enforced",
        "Teams must arrive 30 minutes before scheduled time"
      ],
      ar: [
        "المباريات 50 دقيقة (25 دقيقة لكل شوط)",
        "التبديلات غير محدودة",
        "البطاقة الصفراء = تحذير، بطاقتان صفراء = بطاقة حمراء وإيقاف",
        "البطاقة الحمراء = الطرد الفوري من المباراة",
        "سياسة اللعب النظيف مطبقة بصرامة",
        "يجب على الفرق الحضور قبل 30 دقيقة من الوقت المحدد"
      ]
    },
    participationRequirements: {
      en: [
        "Minimum 14 players per team (7 starting + 7 substitutes)",
        "Valid ID required for all players at check-in",
        "Team registration fee of $200",
        "Insurance coverage provided by organizers",
        "Teams must submit roster by October 25, 2025",
        "All players must be 18 years or older"
      ],
      ar: [
        "حد أدنى 14 لاعب لكل فريق (7 أساسيون + 7 بدلاء)",
        "الهوية صالحة مطلوبة لجميع اللاعبين عند التسجيل",
        "رسوم تسجيل الفريق 200 دولار",
        "التغطية التأمينية مقدمة من المنظمين",
        "يجب على الفرق تقديم القائمة بحلول 25 أكتوبر 2025",
        "جميع اللاعبين يجب أن يكونوا 18 سنة أو أكثر"
      ]
    },
    maxTeams: 16,
    registeredTeams: 8,
    status: "Open",
    featured: true
  },
  { 
    id: "t2", 
    name: {
      en: "Community League 5v5",
      ar: "دوري المجتمع 5 ضد 5"
    },
    country: {
      en: "UAE",
      ar: "الإمارات"
    },
    city: {
      en: "Abu Dhabi",
      ar: "أبو ظبي"
    },
    date: "2025-11-10", 
    type: {
      en: "5v5",
      ar: "5 ضد 5"
    },
    sport: {
      en: "Basketball",
      ar: "كرة السلة"
    },
    ageGroup: {
      en: "Under 21",
      ar: "تحت 21"
    },
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
    prize: "$3,000",
    description: {
      en: "Community-focused 5v5 league with multiple divisions. Designed for players of all skill levels to compete in a friendly but competitive environment.",
      ar: "دوري 5 ضد 5 يركز على المجتمع مع عدة أقسام. مصمم للاعبين من جميع المستويات للمنافسة في بيئة ودية ولكن تنافسية."
    },
    format: {
      en: "Round-robin league format with playoffs. Teams play each other once, top 8 advance to playoffs. Single elimination playoffs.",
      ar: "تنسيق الدوري الدائري مع التصفيات. تلعب الفرق ضد بعضها مرة واحدة، يتأهل أفضل 8 للتصفيات. تصفيات خروج المغلوب الفردية."
    },
    rules: {
      en: [
        "Matches are 40 minutes (2x 20 minute halves)",
        "5 players on court at a time",
        "4 fouls per player before disqualification",
        "3-point line rules apply",
        "Unlimited timeouts per game",
        "Minimum 7 players per team"
      ],
      ar: [
        "المباريات 40 دقيقة (شوطان من 20 دقيقة)",
        "5 لاعبين في الملعب في كل مرة",
        "4 أخطاء لكل لاعب قبل الإقصاء",
        "قواعد خط الثلاث نقاط تنطبق",
        "المهلة غير محدودة لكل مباراة",
        "حد أدنى 7 لاعبين لكل فريق"
      ]
    },
    participationRequirements: {
      en: [
        "Minimum 7 players per team",
        "Players must be 21 years or younger",
        "Valid ID or birth certificate required",
        "Team registration fee of $150",
        "Teams must register by November 3, 2025",
        "Health insurance recommended but not mandatory"
      ],
      ar: [
        "حد أدنى 7 لاعبين لكل فريق",
        "يجب أن يكون اللاعبون 21 سنة أو أقل",
        "الهوية أو شهادة الميلاد مطلوبة",
        "رسوم تسجيل الفريق 150 دولار",
        "يجب على الفرق التسجيل بحلول 3 نوفمبر 2025",
        "التأمين الصحي موصى به ولكنه ليس إلزامياً"
      ]
    },
    maxTeams: 20,
    registeredTeams: 12,
    status: "Open",
    featured: false
  },
  { 
    id: "t3", 
    name: {
      en: "GCC Knockout",
      ar: "خروج المغلوب الخليجي"
    },
    country: {
      en: "KSA",
      ar: "السعودية"
    },
    city: {
      en: "Riyadh",
      ar: "الرياض"
    },
    date: "2025-12-01", 
    type: {
      en: "Knockout",
      ar: "خروج المغلوب"
    },
    sport: {
      en: "Football",
      ar: "كرة القدم"
    },
    ageGroup: {
      en: "Open",
      ar: "مفتوح"
    },
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop&crop=center",
    prize: "$10,000",
    description: {
      en: "Elite knockout tournament with international participation. The most prestigious GCC tournament featuring professional and semi-professional teams from across the region.",
      ar: "بطولة خروج المغلوب النخبوية مع مشاركة دولية. البطولة الخليجية الأكثر شهرة بمشاركة فرق محترفة وشبه محترفة من مختلف المنطقة."
    },
    format: {
      en: "Single elimination knockout format. 16 teams compete in straight knockouts. No group stages. Quarterfinals, semifinals, and finals.",
      ar: "تنسيق خروج المغلوب الفردي. 16 فريقاً يتنافسون في خروج المغلوب المباشر. لا توجد مراحل مجمعة. ربع النهائي، نصف النهائي، والنهائي."
    },
    rules: {
      en: [
        "Full 11v11 football rules apply",
        "Matches are 90 minutes (45 minutes per half)",
        "Extra time (2x 15 minutes) if draw after regular time",
        "Penalty shootout if still tied after extra time",
        "3 substitutions maximum per match",
        "VAR review system available for key decisions"
      ],
      ar: [
        "قواعد كرة القدم الكاملة 11 ضد 11 تنطبق",
        "المباريات 90 دقيقة (45 دقيقة لكل شوط)",
        "الوقت الإضافي (شوطان من 15 دقيقة) في حالة التعادل",
        "ركلات الترجيح إذا استمر التعادل بعد الوقت الإضافي",
        "3 تبديلات كحد أقصى لكل مباراة",
        "نظام مراجعة الفيديو الحكم (VAR) متاح للقرارات المهمة"
      ]
    },
    participationRequirements: {
      en: [
        "Minimum 18 players per team",
        "Professional or registered amateur club",
        "Registration fee of $500 per team",
        "Full team roster and medical certificates required",
        "Teams must register by November 20, 2025",
        "Insurance coverage mandatory for all players"
      ],
      ar: [
        "حد أدنى 18 لاعب لكل فريق",
        "نادي محترف أو هاوٍ مسجل",
        "رسوم التسجيل 500 دولار لكل فريق",
        "القائمة الكاملة للفريق والشهادات الطبية مطلوبة",
        "يجب على الفرق التسجيل بحلول 20 نوفمبر 2025",
        "التأمين إلزامي لجميع اللاعبين"
      ]
    },
    maxTeams: 16,
    registeredTeams: 16,
    status: "Registration Closed",
    featured: true
  },
  { 
    id: "t4", 
    name: {
      en: "Seaside 7s",
      ar: "السبعات الساحلية"
    },
    country: {
      en: "UAE",
      ar: "الإمارات"
    },
    city: {
      en: "Sharjah",
      ar: "الشارقة"
    },
    date: "2025-12-20", 
    type: {
      en: "7v7",
      ar: "7 ضد 7"
    },
    sport: {
      en: "Football",
      ar: "كرة القدم"
    },
    ageGroup: {
      en: "Under 18",
      ar: "تحت 18"
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
    prize: "$4,500",
    description: {
      en: "Beachside 7v7 tournament with scenic coastal views. Special youth tournament for developing talent in a beautiful beach setting.",
      ar: "بطولة 7 ضد 7 الساحلية بإطلالات ساحلية رائعة. بطولة الشباب الخاصة لتطوير المواهب في إعداد ساحلي جميل."
    },
    format: {
      en: "Group stage (4 groups of 4 teams) followed by knockout. Top 2 from each group advance to quarterfinals. Beach football adapted rules.",
      ar: "مرحلة المجموعات (4 مجموعات من 4 فرق) يليها خروج المغلوب. يتأهل أول فريقين من كل مجموعة للدور ربع النهائي. قواعد كرة القدم الشاطئية المعدلة."
    },
    rules: {
      en: [
        "Beach football adapted 7v7 rules",
        "Matches are 24 minutes (12 minutes per half)",
        "No unlimited substitutions but quick rotations allowed",
        "Special beach ball dynamics apply",
        "No offside rule in beach football",
        "Players must wear beach-appropriate footwear"
      ],
      ar: [
        "قواعد كرة القدم الشاطئية المعدلة 7 ضد 7",
        "المباريات 24 دقيقة (12 دقيقة لكل شوط)",
        "لا توجد تبديلات غير محدودة ولكن الدورات السريعة مسموحة",
        "ديناميكيات الكرة الشاطئية الخاصة تنطبق",
        "لا توجد قاعدة التسلل في كرة القدم الشاطئية",
        "يجب على اللاعبين ارتداء أحذية مناسبة للشاطئ"
      ]
    },
    participationRequirements: {
      en: [
        "Minimum 10 players per team",
        "Players must be under 18 years old",
        "Birth certificate required for age verification",
        "Team registration fee of $120",
        "Teams must register by December 5, 2025",
        "Parental consent forms required for all participants"
      ],
      ar: [
        "حد أدنى 10 لاعبين لكل فريق",
        "يجب أن يكون اللاعبون أقل من 18 سنة",
        "شهادة الميلاد مطلوبة للتحقق من العمر",
        "رسوم تسجيل الفريق 120 دولار",
        "يجب على الفرق التسجيل بحلول 5 ديسمبر 2025",
        "نماذج موافقة الوالدين مطلوبة لجميع المشاركين"
      ]
    },
    maxTeams: 12,
    registeredTeams: 0,
    status: "Upcoming",
    featured: false
  },
  { 
    id: "t5", 
    name: {
      en: "Qatar Quick 5s",
      ar: "الخمسات السريعة القطرية"
    },
    country: {
      en: "Qatar",
      ar: "قطر"
    },
    city: {
      en: "Doha",
      ar: "الدوحة"
    },
    date: "2025-12-28", 
    type: {
      en: "5v5",
      ar: "5 ضد 5"
    },
    sport: {
      en: "Volleyball",
      ar: "الكرة الطائرة"
    },
    ageGroup: {
      en: "Open",
      ar: "مفتوح"
    },
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
    prize: "$2,500",
    description: {
      en: "Fast-paced 5v5 volleyball tournament in Qatar's capital. High intensity competition with focus on speed and agility in indoor court setting.",
      ar: "بطولة الكرة الطائرة 5 ضد 5 السريعة في عاصمة قطر. منافسة عالية الكثافة مع التركيز على السرعة والرشاقة في ملعب داخلي."
    },
    format: {
      en: "Round-robin preliminary stage followed by double elimination playoffs. Teams play best-of-three sets in early rounds, best-of-five in finals.",
      ar: "مرحلة أولية دورية يليها تصفيات الإزالة المزدوجة. تلعب الفرق أفضل من ثلاث مجموعات في الجولات الأولى، أفضل من خمسة في النهائي."
    },
    rules: {
      en: [
        "Standard volleyball 5v5 indoor rules",
        "Best of 3 sets for playoffs (15 points per set)",
        "Best of 5 sets for semifinals and finals (15 points per set)",
        "Ball contact limit of 3 touches per side",
        "Substitutions allowed between sets",
        "Net height: 2.43m for men, 2.24m for women"
      ],
      ar: [
        "قواعد الكرة الطائرة الداخلية 5 ضد 5 القياسية",
        "أفضل من 3 مجموعات للتصفيات (15 نقطة لكل مجموعة)",
        "أفضل من 5 مجموعات لنصف النهائي والنهائي (15 نقطة لكل مجموعة)",
        "حد اتصال الكرة 3 لمسات لكل جانب",
        "التبديلات مسموحة بين المجموعات",
        "ارتفاع الشبكة: 2.43م للرجال، 2.24م للنساء"
      ]
    },
    participationRequirements: {
      en: [
        "Minimum 8 players per team",
        "Mixed gender teams allowed (co-ed competition)",
        "Team registration fee of $180",
        "Teams must register by December 10, 2025",
        "All players must wear proper volleyball gear",
        "Medical certificates recommended"
      ],
      ar: [
        "حد أدنى 8 لاعبين لكل فريق",
        "الفرق المختلطة مسموحة (منافسة مشتركة)",
        "رسوم تسجيل الفريق 180 دولار",
        "يجب على الفرق التسجيل بحلول 10 ديسمبر 2025",
        "يجب على جميع اللاعبين ارتداء معدات الكرة الطائرة المناسبة",
        "الشهادات الطبية موصى بها"
      ]
    },
    maxTeams: 16,
    registeredTeams: 6,
    status: "Open",
    featured: false
  },
]

export function getTournamentsByLocale(locale: Locale) {
  return tournamentData.map(item => ({
    id: item.id,
    name: item.name[locale],
    country: item.country[locale],
    city: item.city[locale],
    date: item.date,
    type: item.type[locale],
    sport: item.sport[locale],
    ageGroup: item.ageGroup[locale],
    image: item.image,
    prize: item.prize,
    description: item.description?.[locale],
    format: item.format?.[locale],
    rules: item.rules?.[locale],
    participationRequirements: item.participationRequirements?.[locale],
    maxTeams: item.maxTeams,
    registeredTeams: item.registeredTeams,
    status: item.status,
    featured: item.featured
  }))
}

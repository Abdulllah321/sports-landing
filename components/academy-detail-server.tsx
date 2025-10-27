import { getServerTranslationWithLocale } from "./locale-provider-server";
import { AcademyDetailClient } from "./academy-detail-client";

interface AcademyDetailServerProps {
  academyId: string;
}

// Mock data - in a real app, this would come from a database
const mockAcademyData = {
  "1": {
    id: "1",
    name: "Elite Football Academy",
    description: "Premier football training academy with world-class facilities and professional coaching staff. We specialize in developing young talent and preparing athletes for professional careers.",
    sport: "Football",
    packageLevel: "gold" as const,
    location: "London, UK",
    rating: 4.9,
    students: 450,
    coaches: 25,
    established: "2015",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=600&fit=crop",
    facilities: ["Full-size pitches", "Gym", "Recovery center", "Cafeteria", "Video analysis room", "Medical center"],
    featured: true,
    about: "Founded in 2015, Elite Football Academy has been at the forefront of football development in the UK. Our state-of-the-art facilities and world-class coaching staff have helped over 200 players reach professional levels. We believe in holistic development, focusing not just on technical skills but also on mental strength, physical fitness, and character building.",
    services: [
      "Individual training sessions",
      "Group training programs",
      "Match analysis and video review",
      "Nutrition counseling",
      "Sports psychology sessions",
      "Injury prevention and recovery",
      "Scouting and recruitment assistance"
    ],
    courses: [
      {
        name: "Youth Development Program",
        duration: "12 months",
        ageGroup: "8-16 years",
        description: "Comprehensive program focusing on technical skills, tactical understanding, and physical development."
      },
      {
        name: "Elite Performance Program",
        duration: "18 months",
        ageGroup: "16-21 years",
        description: "Advanced training for serious athletes aiming for professional careers."
      },
      {
        name: "Goalkeeper Specialization",
        duration: "6 months",
        ageGroup: "12+ years",
        description: "Specialized training for goalkeepers with focus on shot-stopping, distribution, and positioning."
      }
    ],
    timetable: {
      "Monday": [
        { time: "09:00-10:30", activity: "Youth Development", group: "Ages 8-12" },
        { time: "11:00-12:30", activity: "Elite Performance", group: "Ages 16-21" },
        { time: "14:00-15:30", activity: "Individual Training", group: "All ages" },
        { time: "16:00-17:30", activity: "Group Training", group: "Ages 13-15" }
      ],
      "Tuesday": [
        { time: "09:00-10:30", activity: "Goalkeeper Training", group: "All ages" },
        { time: "11:00-12:30", activity: "Youth Development", group: "Ages 8-12" },
        { time: "14:00-15:30", activity: "Elite Performance", group: "Ages 16-21" },
        { time: "16:00-17:30", activity: "Group Training", group: "Ages 13-15" }
      ],
      "Wednesday": [
        { time: "09:00-10:30", activity: "Youth Development", group: "Ages 8-12" },
        { time: "11:00-12:30", activity: "Elite Performance", group: "Ages 16-21" },
        { time: "14:00-15:30", activity: "Individual Training", group: "All ages" },
        { time: "16:00-17:30", activity: "Group Training", group: "Ages 13-15" }
      ],
      "Thursday": [
        { time: "09:00-10:30", activity: "Goalkeeper Training", group: "All ages" },
        { time: "11:00-12:30", activity: "Youth Development", group: "Ages 8-12" },
        { time: "14:00-15:30", activity: "Elite Performance", group: "Ages 16-21" },
        { time: "16:00-17:30", activity: "Group Training", group: "Ages 13-15" }
      ],
      "Friday": [
        { time: "09:00-10:30", activity: "Youth Development", group: "Ages 8-12" },
        { time: "11:00-12:30", activity: "Elite Performance", group: "Ages 16-21" },
        { time: "14:00-15:30", activity: "Individual Training", group: "All ages" },
        { time: "16:00-17:30", activity: "Group Training", group: "Ages 13-15" }
      ],
      "Saturday": [
        { time: "10:00-11:30", activity: "Match Play", group: "All ages" },
        { time: "12:00-13:30", activity: "Skills Workshop", group: "All ages" },
        { time: "14:00-15:30", activity: "Fitness Training", group: "All ages" }
      ],
      "Sunday": [
        { time: "10:00-11:30", activity: "Recovery Session", group: "All ages" },
        { time: "12:00-13:30", activity: "Tactical Analysis", group: "Ages 13+" }
      ]
    },
    coachesList: [
      {
        name: "John Smith",
        role: "Head Coach",
        experience: "15 years",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        bio: "Former professional player with 15 years of coaching experience. UEFA Pro License holder."
      },
      {
        name: "Sarah Johnson",
        role: "Youth Development Coach",
        experience: "10 years",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        bio: "Specialized in youth development with a focus on technical skills and character building."
      },
      {
        name: "Mike Wilson",
        role: "Goalkeeper Coach",
        experience: "12 years",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        bio: "Former professional goalkeeper with extensive experience in developing young keepers."
      }
    ],
    management: [
      {
        name: "David Martinez",
        role: "Academy Director",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face",
        bio: "15 years in sports management with a passion for developing young athletes."
      },
      {
        name: "Lisa Anderson",
        role: "Operations Manager",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
        bio: "Efficiently managing daily operations and ensuring the best experience for all students."
      },
      {
        name: "Robert Taylor",
        role: "Sports Scientist",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        bio: "PhD in Sports Science with expertise in performance optimization and injury prevention."
      }
    ],
    testimonials: [
      {
        name: "Alex Thompson",
        age: 18,
        program: "Elite Performance",
        text: "The academy transformed my game completely. The coaching staff is incredible and the facilities are world-class. I've improved my skills significantly and made great friends.",
        rating: 5,
        date: "2 months ago"
      },
      {
        name: "Emma Davis",
        age: 16,
        program: "Youth Development",
        text: "I've been here for 2 years and my skills have improved dramatically. The coaches really care about each player. The management team is always helpful and responsive.",
        rating: 5,
        date: "1 month ago"
      },
      {
        name: "James Wilson",
        age: 20,
        program: "Elite Performance",
        text: "The academy helped me get signed to a professional club. The training and support are unmatched. Best decision I ever made!",
        rating: 5,
        date: "3 weeks ago"
      },
      {
        name: "Sophie Brown",
        age: 14,
        program: "Youth Development",
        text: "Amazing experience! The coaches are patient and encouraging. I love coming here every week.",
        rating: 5,
        date: "1 week ago"
      },
      {
        name: "Michael Chen",
        age: 17,
        program: "Elite Performance",
        text: "The facilities are excellent and the coaching is top-notch. The management team always listens to our feedback.",
        rating: 5,
        date: "5 days ago"
      },
      {
        name: "Olivia Garcia",
        age: 15,
        program: "Youth Development",
        text: "I've learned so much here. The trainers are professional and the schedule is well organized. Highly recommended!",
        rating: 5,
        date: "2 days ago"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop"
    ],
    contact: {
      phone: "+44 20 7123 4567",
      email: "info@elitefootballacademy.com",
      address: "123 Sports Avenue, London, UK",
      website: "www.elitefootballacademy.com"
    }
  },
  "2": {
    id: "2",
    name: "Metro Basketball Academy",
    description: "Comprehensive basketball training with focus on skill development and team play. We prepare athletes for competitive basketball at all levels.",
    sport: "Basketball",
    packageLevel: "silver" as const,
    location: "New York, USA",
    rating: 4.7,
    students: 320,
    coaches: 18,
    established: "2018",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=600&fit=crop",
    facilities: ["Indoor courts", "Weight room", "Video analysis room", "Training equipment", "Locker rooms"],
    featured: false,
    about: "Metro Basketball Academy, established in 2018, has quickly become one of the premier basketball training facilities in New York. We focus on developing well-rounded athletes through comprehensive training programs that emphasize fundamental skills, game strategy, and physical conditioning. Our modern facilities and experienced coaching staff help players reach their full potential.",
    services: [
      "Individual skill development",
      "Team training programs",
      "Strength and conditioning",
      "Game analysis and strategy",
      "Nutrition plans",
      "Recovery and injury prevention",
      "Scouting connections"
    ],
    courses: [
      {
        name: "Junior Development",
        duration: "10 months",
        ageGroup: "5-12 years",
        description: "Introduction to basketball fundamentals with fun, engaging activities designed for young athletes."
      },
      {
        name: "Elite Training Program",
        duration: "12 months",
        ageGroup: "13-18 years",
        description: "Advanced training focusing on competitive skills, team play, and college preparation."
      },
      {
        name: "Adult Competitive League",
        duration: "Ongoing",
        ageGroup: "18+ years",
        description: "Regular games and training for adult players looking to stay competitive."
      }
    ],
    timetable: {
      "Monday": [
        { time: "10:00-11:30", activity: "Junior Development", group: "Ages 5-12" },
        { time: "14:00-15:30", activity: "Elite Training", group: "Ages 13-18" },
        { time: "18:00-19:30", activity: "Adult League", group: "18+" }
      ],
      "Tuesday": [
        { time: "10:00-11:30", activity: "Shooting Clinic", group: "All ages" },
        { time: "14:00-15:30", activity: "Elite Training", group: "Ages 13-18" },
        { time: "19:00-20:30", activity: "Strength Training", group: "All ages" }
      ],
      "Wednesday": [
        { time: "10:00-11:30", activity: "Junior Development", group: "Ages 5-12" },
        { time: "14:00-15:30", activity: "Elite Training", group: "Ages 13-18" },
        { time: "18:00-19:30", activity: "Adult League", group: "18+" }
      ],
      "Thursday": [
        { time: "10:00-11:30", activity: "Skills Workshop", group: "All ages" },
        { time: "14:00-15:30", activity: "Elite Training", group: "Ages 13-18" },
        { time: "19:00-20:30", activity: "Conditioning", group: "All ages" }
      ],
      "Friday": [
        { time: "10:00-11:30", activity: "Junior Development", group: "Ages 5-12" },
        { time: "14:00-15:30", activity: "Elite Training", group: "Ages 13-18" },
        { time: "18:00-19:30", activity: "Game Analysis", group: "13+" }
      ],
      "Saturday": [
        { time: "09:00-10:30", activity: "Scrimmage Games", group: "All ages" },
        { time: "11:00-12:30", activity: "Coaching Clinic", group: "All ages" }
      ],
      "Sunday": [
        { time: "10:00-11:30", activity: "Recovery Session", group: "All ages" },
        { time: "14:00-15:30", activity: "Open Court", group: "All ages" }
      ]
    },
    coachesList: [
      {
        name: "Marcus Williams",
        role: "Head Coach",
        experience: "12 years",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        bio: "Former NCAA Division I player with extensive coaching experience at high school and college levels."
      },
      {
        name: "Jennifer Park",
        role: "Shooting Coach",
        experience: "8 years",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        bio: "Specialized in shooting mechanics and technique with proven results."
      },
      {
        name: "Carlos Rodriguez",
        role: "Strength Coach",
        experience: "10 years",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
        bio: "Certified strength and conditioning specialist focused on basketball-specific training."
      }
    ],
    management: [
      {
        name: "Rachel Thompson",
        role: "Academy Director",
        image: "https://images.unsplash.com/photo-1494790108362-0bbf1d822119?w=200&h=200&fit=crop&crop=face",
        bio: "MBA in Sports Management with 10 years of experience in basketball development."
      },
      {
        name: "Michael Brown",
        role: "Program Coordinator",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        bio: "Ensuring smooth operations and excellent experience for all participants."
      },
      {
        name: "Dr. Anna Lee",
        role: "Sports Medicine Director",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
        bio: "Specialist in sports injuries and performance optimization for basketball players."
      }
    ],
    testimonials: [
      {
        name: "Jordan Smith",
        age: 17,
        program: "Elite Training",
        text: "Best basketball academy in the city! The coaches are amazing and the facilities are top-notch. I've improved so much since joining.",
        rating: 5,
        date: "3 weeks ago"
      },
      {
        name: "Maya Chen",
        age: 15,
        program: "Elite Training",
        text: "The training is intense but really rewarding. The coaches push you to be your best while being supportive. Love it here!",
        rating: 5,
        date: "2 weeks ago"
      },
      {
        name: "Ryan Johnson",
        age: 28,
        program: "Adult League",
        text: "Great competitive environment for adults. Good mix of skill levels and excellent facilities. Highly recommend!",
        rating: 4,
        date: "1 month ago"
      },
      {
        name: "Sophia Martinez",
        age: 10,
        program: "Junior Development",
        text: "So much fun! I'm learning a lot and made many friends. The coaches are super nice and patient with us.",
        rating: 5,
        date: "4 days ago"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop"
    ],
    contact: {
      phone: "+1 212 555 7890",
      email: "info@metrobasketball.com",
      address: "456 Hoops Avenue, New York, NY, USA",
      website: "www.metrobasketball.com"
    }
  },
  "3": {
    id: "3",
    name: "Coastal Tennis Academy",
    description: "Professional tennis academy with clay and hard courts, perfect for all skill levels. We help players develop from beginner to professional levels.",
    sport: "Tennis",
    packageLevel: "gold" as const,
    location: "Barcelona, Spain",
    rating: 4.8,
    students: 280,
    coaches: 15,
    established: "2012",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=600&fit=crop",
    facilities: ["Clay courts", "Hard courts", "Fitness center", "Pro shop", "Restaurant", "Video analysis"],
    featured: true,
    about: "Established in 2012, Coastal Tennis Academy is located in beautiful Barcelona. We offer world-class tennis training on both clay and hard courts. Our academy has produced several professional players and continues to develop promising talent. Our coaching staff includes former professional players and certified coaches with international experience.",
    services: [
      "Individual lessons",
      "Group training",
      "Tournament preparation",
      "Physical conditioning",
      "Tactical analysis",
      "Professional coaching",
      "Match play"
    ],
    courses: [
      {
        name: "Junior Academy",
        duration: "Year-round",
        ageGroup: "4-12 years",
        description: "Early introduction to tennis with fun, progressive development programs."
      },
      {
        name: "Elite Performance",
        duration: "Year-round",
        ageGroup: "13-21 years",
        description: "Intensive training for competitive players aiming for college and professional tennis."
      },
      {
        name: "Adult Programs",
        duration: "Flexible",
        ageGroup: "18+ years",
        description: "Recreational and competitive programs for adult players of all levels."
      }
    ],
    timetable: {
      "Monday": [
        { time: "09:00-10:30", activity: "Junior Academy", group: "Ages 4-12" },
        { time: "11:00-12:30", activity: "Elite Performance", group: "Ages 13-21" },
        { time: "14:00-15:30", activity: "Individual Training", group: "All ages" },
        { time: "16:00-17:30", activity: "Adult Classes", group: "18+" }
      ],
      "Tuesday": [
        { time: "09:00-10:30", activity: "Junior Academy", group: "Ages 4-12" },
        { time: "11:00-12:30", activity: "Elite Performance", group: "Ages 13-21" },
        { time: "14:00-15:30", activity: "Match Play", group: "All ages" },
        { time: "16:00-17:30", activity: "Adult Classes", group: "18+" }
      ],
      "Wednesday": [
        { time: "09:00-10:30", activity: "Junior Academy", group: "Ages 4-12" },
        { time: "11:00-12:30", activity: "Elite Performance", group: "Ages 13-21" },
        { time: "14:00-15:30", activity: "Fitness Training", group: "All ages" },
        { time: "16:00-17:30", activity: "Adult Classes", group: "18+" }
      ],
      "Thursday": [
        { time: "09:00-10:30", activity: "Junior Academy", group: "Ages 4-12" },
        { time: "11:00-12:30", activity: "Elite Performance", group: "Ages 13-21" },
        { time: "14:00-15:30", activity: "Tactical Session", group: "All ages" },
        { time: "16:00-17:30", activity: "Adult Classes", group: "18+" }
      ],
      "Friday": [
        { time: "09:00-10:30", activity: "Junior Academy", group: "Ages 4-12" },
        { time: "11:00-12:30", activity: "Elite Performance", group: "Ages 13-21" },
        { time: "14:00-15:30", activity: "Match Play", group: "All ages" },
        { time: "16:00-17:30", activity: "Adult Classes", group: "18+" }
      ],
      "Saturday": [
        { time: "10:00-12:00", activity: "Tournament Prep", group: "Competitive players" },
        { time: "14:00-15:30", activity: "Open Court", group: "All ages" }
      ],
      "Sunday": [
        { time: "10:00-12:00", activity: "Recovery & Stretching", group: "All ages" }
      ]
    },
    coachesList: [
      {
        name: "Rafael Costa",
        role: "Head Pro",
        experience: "20 years",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face",
        bio: "Former ATP professional with 20 years of coaching experience. ITF certified."
      },
      {
        name: "Isabella Fernandez",
        role: "Development Coach",
        experience: "10 years",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
        bio: "Specialized in developing young players with a focus on fundamentals and mental toughness."
      },
      {
        name: "Luis Martinez",
        role: "Fitness Coach",
        experience: "8 years",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        bio: "Expert in tennis-specific conditioning and injury prevention."
      }
    ],
    management: [
      {
        name: "Elena Rodriguez",
        role: "Academy Director",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
        bio: "Former professional player and experienced academy director with a passion for developing talent."
      },
      {
        name: "Manuel Garcia",
        role: "Program Manager",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        bio: "Ensuring excellent player experience and program coordination."
      }
    ],
    testimonials: [
      {
        name: "Carlos Mendez",
        age: 16,
        program: "Elite Performance",
        text: "The best tennis academy in Barcelona! The coaching is professional and the facilities are amazing. I've improved my ranking significantly.",
        rating: 5,
        date: "2 weeks ago"
      },
      {
        name: "Emma Wilson",
        age: 12,
        program: "Junior Academy",
        text: "I love coming here! The coaches are so nice and I'm getting much better. The courts are beautiful!",
        rating: 5,
        date: "5 days ago"
      },
      {
        name: "Robert Taylor",
        age: 35,
        program: "Adult Programs",
        text: "Great facility with excellent coaching for adult players. Perfect balance of fun and improvement.",
        rating: 5,
        date: "3 weeks ago"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop"
    ],
    contact: {
      phone: "+34 93 123 4567",
      email: "info@coastaltennis.com",
      address: "789 Tennis Boulevard, Barcelona, Spain",
      website: "www.coastaltennis.com"
    }
  },
  "4": {
    id: "4",
    name: "Aqua Swimming Academy",
    description: "Olympic-standard swimming facility with certified coaches and modern equipment. We train swimmers from beginners to competitive levels.",
    sport: "Swimming",
    packageLevel: "silver" as const,
    location: "Sydney, Australia",
    rating: 4.6,
    students: 200,
    coaches: 12,
    established: "2019",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&h=600&fit=crop",
    facilities: ["Olympic pool", "Training pool", "Sauna", "Locker rooms", "Fitness area"],
    featured: false,
    about: "Aqua Swimming Academy opened in 2019 with state-of-the-art facilities including an Olympic-standard 50-meter pool and a training pool. Our certified coaches work with swimmers of all ages and abilities, from learn-to-swim programs to competitive training. We pride ourselves on technique development, endurance building, and competitive success.",
    services: [
      "Learn to swim",
      "Competitive training",
      "Stroke technique",
      "Endurance programs",
      "Competition preparation",
      "Adult fitness programs",
      "Pool access"
    ],
    courses: [
      {
        name: "Learn to Swim",
        duration: "10 weeks",
        ageGroup: "3-10 years",
        description: "Progressive swimming lessons for beginners focusing on water safety and basic strokes."
      },
      {
        name: "Competitive Squad",
        duration: "Year-round",
        ageGroup: "8-18 years",
        description: "Intensive training for competitive swimmers preparing for meets and championships."
      },
      {
        name: "Adult Programs",
        duration: "Flexible",
        ageGroup: "18+ years",
        description: "Adult swimming classes for fitness, technique improvement, and endurance."
      }
    ],
    timetable: {
      "Monday": [
        { time: "06:00-07:30", activity: "Early Training", group: "Competitive squad" },
        { time: "09:00-10:00", activity: "Learn to Swim", group: "Ages 3-10" },
        { time: "15:00-16:30", activity: "Competitive Squad", group: "Ages 8-18" },
        { time: "18:00-19:00", activity: "Adult Classes", group: "18+" }
      ],
      "Tuesday": [
        { time: "06:00-07:30", activity: "Early Training", group: "Competitive squad" },
        { time: "10:00-11:00", activity: "Stroke Technique", group: "All ages" },
        { time: "15:00-16:30", activity: "Competitive Squad", group: "Ages 8-18" },
        { time: "19:00-20:00", activity: "Adult Fitness", group: "18+" }
      ],
      "Wednesday": [
        { time: "06:00-07:30", activity: "Early Training", group: "Competitive squad" },
        { time: "09:00-10:00", activity: "Learn to Swim", group: "Ages 3-10" },
        { time: "15:00-16:30", activity: "Competitive Squad", group: "Ages 8-18" },
        { time: "18:00-19:00", activity: "Adult Classes", group: "18+" }
      ],
      "Thursday": [
        { time: "06:00-07:30", activity: "Early Training", group: "Competitive squad" },
        { time: "11:00-12:00", activity: "Endurance Training", group: "All ages" },
        { time: "15:00-16:30", activity: "Competitive Squad", group: "Ages 8-18" }
      ],
      "Friday": [
        { time: "06:00-07:30", activity: "Early Training", group: "Competitive squad" },
        { time: "09:00-10:00", activity: "Learn to Swim", group: "Ages 3-10" },
        { time: "15:00-16:30", activity: "Competitive Squad", group: "Ages 8-18" }
      ],
      "Saturday": [
        { time: "08:00-09:30", activity: "Weekend Squad", group: "Competitive squad" },
        { time: "10:00-11:00", activity: "Family Swim", group: "All ages" }
      ],
      "Sunday": [
        { time: "10:00-11:30", activity: "Recovery Session", group: "Competitive squad" }
      ]
    },
    coachesList: [
      {
        name: "Sarah Johnson",
        role: "Head Coach",
        experience: "15 years",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        bio: "Former Olympic swimmer with extensive coaching experience at national and international levels."
      },
      {
        name: "James Mitchell",
        role: "Development Coach",
        experience: "8 years",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        bio: "Specialized in technique development and stroke mechanics."
      },
      {
        name: "Lisa Wong",
        role: "Learn-to-Swim Coach",
        experience: "6 years",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        bio: "Expert in teaching beginners with patience and progressive techniques."
      }
    ],
    management: [
      {
        name: "Peter Anderson",
        role: "Academy Director",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face",
        bio: "20 years in swimming academy management with a focus on excellence and athlete development."
      },
      {
        name: "Emma Collins",
        role: "Operations Manager",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
        bio: "Ensuring smooth operations and excellent experience for swimmers of all levels."
      }
    ],
    testimonials: [
      {
        name: "Oliver Brown",
        age: 14,
        program: "Competitive Squad",
        text: "Amazing facilities and coaching! My times have improved significantly and I'm competing at a higher level now.",
        rating: 5,
        date: "1 week ago"
      },
      {
        name: "Zoe Wilson",
        age: 8,
        program: "Learn to Swim",
        text: "I learned to swim here and now I love swimming! The teachers are so patient and kind.",
        rating: 5,
        date: "2 weeks ago"
      },
      {
        name: "David Chen",
        age: 42,
        program: "Adult Programs",
        text: "Great facility for adult swimmers. The coaches help me improve my technique and fitness.",
        rating: 4,
        date: "3 weeks ago"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
    ],
    contact: {
      phone: "+61 2 9876 5432",
      email: "info@aquaswimming.com",
      address: "321 Aquatic Drive, Sydney, Australia",
      website: "www.aquaswimming.com"
    }
  },
  "5": {
    id: "5",
    name: "Mountain Climbing Academy",
    description: "Adventure sports academy specializing in rock climbing and mountaineering. From indoor training to outdoor expeditions, we've got you covered.",
    sport: "Climbing",
    packageLevel: "bronze" as const,
    location: "Denver, USA",
    rating: 4.5,
    students: 150,
    coaches: 8,
    established: "2020",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=600&fit=crop",
    facilities: ["Indoor climbing wall", "Outdoor routes", "Equipment rental", "Training area"],
    featured: false,
    about: "Founded in 2020, Mountain Climbing Academy combines indoor training with outdoor adventure. We offer comprehensive programs in bouldering, sport climbing, and traditional mountaineering. Our experienced instructors provide both technical training and safety education. Whether you're a beginner or experienced climber, we have programs to challenge and develop your skills.",
    services: [
      "Indoor climbing lessons",
      "Outdoor excursions",
      "Safety training",
      "Equipment orientation",
      "Advanced technique",
      "Route setting",
      "Group climbing trips"
    ],
    courses: [
      {
        name: "Introduction to Climbing",
        duration: "6 weeks",
        ageGroup: "10+ years",
        description: "Learn the fundamentals of climbing including basic techniques and safety procedures."
      },
      {
        name: "Advanced Technique",
        duration: "8 weeks",
        ageGroup: "14+ years",
        description: "Advanced climbing skills including lead climbing, route reading, and problem-solving."
      },
      {
        name: "Outdoor Expeditions",
        duration: "Weekend trips",
        ageGroup: "16+ years",
        description: "Real-world climbing experiences on outdoor routes with certified guides."
      }
    ],
    timetable: {
      "Monday": [
        { time: "16:00-17:30", activity: "Beginner Class", group: "All ages" },
        { time: "18:00-19:30", activity: "Advanced Training", group: "14+" }
      ],
      "Tuesday": [
        { time: "17:00-18:30", activity: "Youth Program", group: "Ages 10-15" },
        { time: "19:00-20:30", activity: "Adult Sessions", group: "16+" }
      ],
      "Wednesday": [
        { time: "16:00-17:30", activity: "Technique Workshop", group: "All ages" },
        { time: "18:00-19:30", activity: "Route Setting", group: "All ages" }
      ],
      "Thursday": [
        { time: "17:00-18:30", activity: "Youth Program", group: "Ages 10-15" },
        { time: "19:00-20:30", activity: "Bouldering Session", group: "All ages" }
      ],
      "Friday": [
        { time: "16:00-17:30", activity: "Safety Training", group: "All ages" },
        { time: "18:00-19:30", activity: "Advanced Training", group: "14+" }
      ],
      "Saturday": [
        { time: "09:00-12:00", activity: "Outdoor Excursion", group: "16+" },
        { time: "14:00-16:00", activity: "Open Climbing", group: "All ages" }
      ],
      "Sunday": [
        { time: "10:00-12:00", activity: "Family Session", group: "All ages" },
        { time: "14:00-16:00", activity: "Open Climbing", group: "All ages" }
      ]
    },
    coachesList: [
      {
        name: "Jake Roberts",
        role: "Head Instructor",
        experience: "12 years",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        bio: "Certified mountain guide with extensive experience in both indoor training and outdoor expeditions."
      },
      {
        name: "Amanda Stone",
        role: "Safety Specialist",
        experience: "8 years",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
        bio: "Expert in climbing safety, rescue techniques, and risk management."
      }
    ],
    management: [
      {
        name: "Chris Martinez",
        role: "Academy Director",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face",
        bio: "15 years in adventure sports with a passion for sharing climbing with others."
      }
    ],
    testimonials: [
      {
        name: "Alex Turner",
        age: 18,
        program: "Advanced Technique",
        text: "Incredible academy! The instructors are skilled and safety-focused. I've progressed from beginner to confidently climbing outdoors.",
        rating: 5,
        date: "1 month ago"
      },
      {
        name: "Emily White",
        age: 14,
        program: "Youth Program",
        text: "Love climbing here! It's challenging and fun. The coaches really care about teaching proper technique and safety.",
        rating: 5,
        date: "2 weeks ago"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
    ],
    contact: {
      phone: "+1 303 555 3456",
      email: "info@mountainclimbing.com",
      address: "789 Summit Avenue, Denver, CO, USA",
      website: "www.mountainclimbing.com"
    }
  },
  "6": {
    id: "6",
    name: "Urban Martial Arts Academy",
    description: "Traditional and modern martial arts training with experienced instructors. We offer various disciplines including Karate, Taekwondo, and Mixed Martial Arts.",
    sport: "Martial Arts",
    packageLevel: "bronze" as const,
    location: "Tokyo, Japan",
    rating: 4.7,
    students: 180,
    coaches: 10,
    established: "2017",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=600&fit=crop",
    facilities: ["Training mats", "Weights", "Meditation room", "Equipment", "Shower facilities"],
    featured: false,
    about: "Urban Martial Arts Academy, founded in 2017, offers comprehensive martial arts training combining traditional techniques with modern training methods. Our instructors have years of experience in various disciplines and provide personalized attention to each student. We focus on building discipline, confidence, and physical fitness alongside technical mastery.",
    services: [
      "Karate classes",
      "Taekwondo training",
      "Mixed Martial Arts",
      "Self-defense",
      "Fitness conditioning",
      "Belt testing",
      "Tournament preparation"
    ],
    courses: [
      {
        name: "Karate Fundamentals",
        duration: "6 months",
        ageGroup: "5-18 years",
        description: "Traditional Karate training focusing on kihon (basics), kata (forms), and kumite (sparring)."
      },
      {
        name: "Taekwondo Programs",
        duration: "6 months",
        ageGroup: "6-16 years",
        description: "Dynamic Taekwondo training emphasizing kicking techniques, forms, and sparring skills."
      },
      {
        name: "Adult Mixed Martial Arts",
        duration: "Flexible",
        ageGroup: "18+ years",
        description: "Modern MMA training combining techniques from various martial arts disciplines."
      }
    ],
    timetable: {
      "Monday": [
        { time: "16:00-17:00", activity: "Kids Karate", group: "Ages 5-10" },
        { time: "17:30-18:30", activity: "Junior Taekwondo", group: "Ages 6-14" },
        { time: "19:00-20:30", activity: "Adult MMA", group: "18+" }
      ],
      "Tuesday": [
        { time: "16:00-17:00", activity: "Junior Karate", group: "Ages 11-18" },
        { time: "17:30-18:30", activity: "Teen Taekwondo", group: "Ages 14-18" },
        { time: "19:00-20:00", activity: "Adult Karate", group: "18+" }
      ],
      "Wednesday": [
        { time: "16:00-17:00", activity: "Kids Karate", group: "Ages 5-10" },
        { time: "17:30-18:30", activity: "Junior Taekwondo", group: "Ages 6-14" },
        { time: "19:00-20:30", activity: "Adult MMA", group: "18+" }
      ],
      "Thursday": [
        { time: "16:00-17:00", activity: "Junior Karate", group: "Ages 11-18" },
        { time: "17:30-18:30", activity: "Teen Taekwondo", group: "Ages 14-18" },
        { time: "19:00-20:30", activity: "Self-Defense", group: "18+" }
      ],
      "Friday": [
        { time: "16:00-17:00", activity: "Kids Karate", group: "Ages 5-10" },
        { time: "17:30-18:30", activity: "Junior Taekwondo", group: "Ages 6-14" },
        { time: "19:00-20:30", activity: "Adult MMA", group: "18+" }
      ],
      "Saturday": [
        { time: "10:00-11:30", activity: "Mixed Session", group: "All ages" },
        { time: "14:00-15:30", activity: "Belt Testing", group: "All ages" }
      ],
      "Sunday": [
        { time: "10:00-11:00", activity: "Meditation & Stretching", group: "All ages" }
      ]
    },
    coachesList: [
      {
        name: "Kenji Tanaka",
        role: "Head Sensei",
        experience: "25 years",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face",
        bio: "6th degree black belt in Karate with traditional Japanese training background."
      },
      {
        name: "Mai Suzuki",
        role: "Taekwondo Master",
        experience: "15 years",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
        bio: "3rd dan black belt in Taekwondo specializing in competitive training."
      },
      {
        name: "Hiro Nakamura",
        role: "MMA Instructor",
        experience: "10 years",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        bio: "Former professional MMA fighter with expertise in ground fighting and submissions."
      }
    ],
    management: [
      {
        name: "Yuki Yamamoto",
        role: "Academy Director",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        bio: "30 years in martial arts with a deep understanding of traditional and modern training approaches."
      }
    ],
    testimonials: [
      {
        name: "Ryota Ito",
        age: 12,
        program: "Junior Karate",
        text: "Great academy! I've learned discipline and respect along with karate skills. The sensei is amazing and very patient.",
        rating: 5,
        date: "3 weeks ago"
      },
      {
        name: "Haruka Sato",
        age: 15,
        program: "Teen Taekwondo",
        text: "The training is intense and challenging but really rewarding. I've improved my fitness and learned great self-defense skills.",
        rating: 5,
        date: "2 weeks ago"
      },
      {
        name: "Takeshi Yamamoto",
        age: 28,
        program: "Adult MMA",
        text: "Excellent MMA training facility. The instructors are knowledgeable and the training is well-structured. Highly recommend!",
        rating: 5,
        date: "1 month ago"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
    ],
    contact: {
      phone: "+81 3 1234 5678",
      email: "info@urbanmartialarts.com",
      address: "456 Dojo Street, Tokyo, Japan",
      website: "www.urbanmartialarts.com"
    }
  }
};

export async function AcademyDetailServer({ academyId }: AcademyDetailServerProps) {
  const { t, locale } = await getServerTranslationWithLocale();
  const academy = mockAcademyData[academyId as keyof typeof mockAcademyData];

  if (!academy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Academy Not Found</h1>
          <p className="text-muted-foreground">The academy you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <AcademyDetailClient academy={academy} />;
}

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
    testimonials: [
      {
        name: "Alex Thompson",
        age: 18,
        program: "Elite Performance",
        text: "The academy transformed my game completely. The coaching staff is incredible and the facilities are world-class.",
        rating: 5
      },
      {
        name: "Emma Davis",
        age: 16,
        program: "Youth Development",
        text: "I've been here for 2 years and my skills have improved dramatically. The coaches really care about each player.",
        rating: 5
      },
      {
        name: "James Wilson",
        age: 20,
        program: "Elite Performance",
        text: "The academy helped me get signed to a professional club. The training and support are unmatched.",
        rating: 5
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

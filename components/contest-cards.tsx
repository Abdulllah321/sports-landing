"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Users, Award, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";

interface ContestOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface Contest {
  id: string;
  title: string;
  description: string;
  type: "multiple-choice" | "single-choice" | "ranking";
  status: "active" | "ended" | "upcoming";
  endDate: string;
  totalVotes: number;
  participants: number;
  prize: string;
  image: string;
  options: ContestOption[];
  isPublic: boolean;
  rules: string[];
}

const mockContests: Contest[] = [
  {
    id: "1",
    title: "Best Football Goal of the Month",
    description: "Vote for the most spectacular goal scored this month. Watch the clips and choose your favorite!",
    type: "single-choice",
    status: "active",
    endDate: "2024-07-15",
    totalVotes: 1247,
    participants: 89,
    prize: "$500 + Trophy",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
    isPublic: true,
    rules: [
      "One vote per person",
      "Voting ends on July 15th",
      "Winner will be announced on July 16th"
    ],
    options: [
      { id: "goal1", text: "Amazing bicycle kick from outside the box", votes: 456, percentage: 36.6 },
      { id: "goal2", text: "Incredible solo run and chip over goalkeeper", votes: 389, percentage: 31.2 },
      { id: "goal3", text: "Perfect free kick into top corner", votes: 234, percentage: 18.8 },
      { id: "goal4", text: "Header from impossible angle", votes: 168, percentage: 13.5 }
    ]
  },
  {
    id: "2",
    title: "Favorite Basketball Player",
    description: "Who is your favorite basketball player? Choose from these amazing athletes!",
    type: "single-choice",
    status: "active",
    endDate: "2024-07-20",
    totalVotes: 892,
    participants: 156,
    prize: "Signed Jersey",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    isPublic: false,
    rules: [
      "Sign in required to vote",
      "One vote per registered user",
      "Voting ends on July 20th"
    ],
    options: [
      { id: "player1", text: "LeBron James", votes: 234, percentage: 26.2 },
      { id: "player2", text: "Stephen Curry", votes: 198, percentage: 22.2 },
      { id: "player3", text: "Kevin Durant", votes: 156, percentage: 17.5 },
      { id: "player4", text: "Giannis Antetokounmpo", votes: 134, percentage: 15.0 },
      { id: "player5", text: "Luka Dončić", votes: 98, percentage: 11.0 },
      { id: "player6", text: "Jayson Tatum", votes: 72, percentage: 8.1 }
    ]
  },
  {
    id: "3",
    title: "Best Tennis Shot",
    description: "Rank these incredible tennis shots from best to worst. Your ranking will be combined with others!",
    type: "ranking",
    status: "upcoming",
    endDate: "2024-08-01",
    totalVotes: 0,
    participants: 0,
    prize: "Tennis Equipment Set",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    isPublic: true,
    rules: [
      "Rank all options from 1-4",
      "Contest starts August 1st",
      "Results will be announced August 15th"
    ],
    options: [
      { id: "shot1", text: "Incredible backhand winner", votes: 0, percentage: 0 },
      { id: "shot2", text: "Perfect drop shot", votes: 0, percentage: 0 },
      { id: "shot3", text: "Amazing volley at the net", votes: 0, percentage: 0 },
      { id: "shot4", text: "Powerful serve ace", votes: 0, percentage: 0 }
    ]
  }
];

export function ContestCards() {
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});

  const handleVote = (contestId: string, optionId: string) => {
    if (hasVoted[contestId]) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [contestId]: optionId
    }));
  };

  const submitVote = (contestId: string) => {
    if (!selectedOptions[contestId] || hasVoted[contestId]) return;
    
    setHasVoted(prev => ({
      ...prev,
      [contestId]: true
    }));
    
    // In a real app, this would make an API call
    console.log(`Voted for option ${selectedOptions[contestId]} in contest ${contestId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "upcoming": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "ended": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Trophy className="h-4 w-4" />;
      case "upcoming": return <Clock className="h-4 w-4" />;
      case "ended": return <Award className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {mockContests.map((contest) => (
        <Card key={contest.id} className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="relative h-48 overflow-hidden">
            <img
              src={contest.image}
              alt={contest.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <Badge className={cn("flex items-center gap-1", getStatusColor(contest.status))}>
                {getStatusIcon(contest.status)}
                {contest.status === "active" ? "Live" : contest.status === "upcoming" ? "Upcoming" : "Ended"}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                {contest.isPublic ? "Public" : "Sign-in Required"}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-4">
            <CardTitle className={cn(
              "text-xl font-bold group-hover:text-primary transition-colors",
              locale === 'ar' && "font-arabic-heading"
            )}>
              {contest.title}
            </CardTitle>
            <p className={cn(
              "text-muted-foreground text-sm",
              locale === 'ar' && "font-arabic-body"
            )}>
              {contest.description}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Contest Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{contest.totalVotes}</div>
                <div className={cn(
                  "text-xs text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  {t('events.contests.participants')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{contest.participants}</div>
                <div className={cn(
                  "text-xs text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  Users
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{contest.prize}</div>
                <div className={cn(
                  "text-xs text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  {t('events.contests.prize')}
                </div>
              </div>
            </div>

            {/* Voting Options */}
            {contest.status === "active" && (
              <div className="space-y-4">
                <RadioGroup
                  value={selectedOptions[contest.id] || ""}
                  onValueChange={(value) => handleVote(contest.id, value)}
                  disabled={hasVoted[contest.id]}
                >
                  {contest.options.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label 
                          htmlFor={option.id} 
                          className={cn(
                            "flex-1 cursor-pointer",
                            locale === 'ar' && "font-arabic-body"
                          )}
                        >
                          {option.text}
                        </Label>
                        {hasVoted[contest.id] && selectedOptions[contest.id] === option.id && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className={cn(
                            "text-muted-foreground",
                            locale === 'ar' && "font-arabic-body"
                          )}>
                            {option.votes} votes
                          </span>
                          <span className={cn(
                            "text-muted-foreground",
                            locale === 'ar' && "font-arabic-body"
                          )}>
                            {option.percentage}%
                          </span>
                        </div>
                        <Progress value={option.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {/* Vote Button */}
                <div className="pt-4">
                  {hasVoted[contest.id] ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <CheckCircle className="h-5 w-5" />
                      <span className={cn(
                        "font-medium",
                        locale === 'ar' && "font-arabic-body"
                      )}>
                        Vote submitted!
                      </span>
                    </div>
                  ) : contest.isPublic ? (
                    <Button 
                      onClick={() => submitVote(contest.id)}
                      disabled={!selectedOptions[contest.id]}
                      className="w-full"
                    >
                      {t('events.contests.participate')}
                    </Button>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className={cn(
                        "text-sm text-muted-foreground",
                        locale === 'ar' && "font-arabic-body"
                      )}>
                        {t('events.voting.signInRequired')}
                      </div>
                      <Button variant="outline" className="w-full">
                        {t('events.voting.signIn')}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upcoming Contest */}
            {contest.status === "upcoming" && (
              <div className="text-center space-y-4">
                <div className={cn(
                  "text-sm text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  {t('events.contests.endsIn')} {contest.endDate}
                </div>
                <Button variant="outline" disabled>
                  {t('events.contests.participate')}
                </Button>
              </div>
            )}

            {/* Ended Contest */}
            {contest.status === "ended" && (
              <div className="text-center space-y-4">
                <div className={cn(
                  "text-sm text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  Contest has ended
                </div>
                <Button variant="outline">
                  {t('events.contests.viewResults')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

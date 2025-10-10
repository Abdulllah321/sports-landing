"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy, Users, Clock, CheckCircle, AlertCircle, Star } from "lucide-react";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";

interface VotingItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  votes: number;
  percentage: number;
  isVoted: boolean;
}

interface VotingContest {
  id: string;
  title: string;
  description: string;
  status: "active" | "ended" | "upcoming";
  endDate: string;
  totalVotes: number;
  participants: number;
  isPublic: boolean;
  requiresSignIn: boolean;
  items: VotingItem[];
}

const mockVotingContests: VotingContest[] = [
  {
    id: "1",
    title: "Best Sports Moment of 2024",
    description: "Vote for the most memorable sports moment from this year. This is a public contest - no sign-in required!",
    status: "active",
    endDate: "2024-07-30",
    totalVotes: 2156,
    participants: 342,
    isPublic: true,
    requiresSignIn: false,
    items: [
      {
        id: "moment1",
        title: "Championship Winning Goal",
        description: "Last-minute goal that secured the championship title",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
        category: "Football",
        votes: 456,
        percentage: 21.2,
        isVoted: false
      },
      {
        id: "moment2",
        title: "Record-Breaking Performance",
        description: "Athlete breaks 20-year-old world record",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
        category: "Athletics",
        votes: 389,
        percentage: 18.0,
        isVoted: false
      },
      {
        id: "moment3",
        title: "Underdog Victory",
        description: "Unexpected team wins against all odds",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        category: "Basketball",
        votes: 234,
        percentage: 10.9,
        isVoted: false
      },
      {
        id: "moment4",
        title: "Perfect Game",
        description: "Pitcher throws a perfect game in championship",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
        category: "Baseball",
        votes: 198,
        percentage: 9.2,
        isVoted: false
      }
    ]
  },
  {
    id: "2",
    title: "Favorite Athlete of the Year",
    description: "Choose your favorite athlete from this year's performances. Sign-in required to participate.",
    status: "active",
    endDate: "2024-08-15",
    totalVotes: 1847,
    participants: 156,
    isPublic: false,
    requiresSignIn: true,
    items: [
      {
        id: "athlete1",
        title: "Sarah Johnson",
        description: "Swimming - Olympic Gold Medalist",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
        category: "Swimming",
        votes: 234,
        percentage: 12.7,
        isVoted: false
      },
      {
        id: "athlete2",
        title: "Marcus Williams",
        description: "Basketball - MVP of the Season",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
        category: "Basketball",
        votes: 198,
        percentage: 10.7,
        isVoted: false
      },
      {
        id: "athlete3",
        title: "Emma Davis",
        description: "Tennis - Grand Slam Winner",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        category: "Tennis",
        votes: 156,
        percentage: 8.4,
        isVoted: false
      }
    ]
  }
];

export function VotingSection() {
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});
  const [isSignedIn, setIsSignedIn] = useState(false); // Mock sign-in state

  const handleVote = (contestId: string, itemId: string) => {
    if (hasVoted[contestId]) return;
    
    setSelectedItems(prev => ({
      ...prev,
      [contestId]: itemId
    }));
  };

  const submitVote = (contestId: string) => {
    const contest = mockVotingContests.find(c => c.id === contestId);
    if (!contest || !selectedItems[contestId] || hasVoted[contestId]) return;
    
    if (contest.requiresSignIn && !isSignedIn) {
      // In a real app, this would trigger sign-in flow
      alert(t('events.voting.signInRequired'));
      return;
    }
    
    setHasVoted(prev => ({
      ...prev,
      [contestId]: true
    }));
    
    // In a real app, this would make an API call
    console.log(`Voted for item ${selectedItems[contestId]} in contest ${contestId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "upcoming": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "ended": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {mockVotingContests.map((contest) => (
        <Card key={contest.id} className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className={cn(
                  "text-2xl font-bold",
                  locale === 'ar' && "font-arabic-heading"
                )}>
                  {contest.title}
                </CardTitle>
                <p className={cn(
                  "text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  {contest.description}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={cn("flex items-center gap-1", getStatusColor(contest.status))}>
                  <Trophy className="h-4 w-4" />
                  {contest.status === "active" ? "Live" : contest.status === "upcoming" ? "Upcoming" : "Ended"}
                </Badge>
                <Badge variant="outline">
                  {contest.isPublic ? "Public" : "Sign-in Required"}
                </Badge>
              </div>
            </div>
            
            {/* Contest Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{contest.totalVotes}</div>
                <div className={cn(
                  "text-sm text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  Total Votes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{contest.participants}</div>
                <div className={cn(
                  "text-sm text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  Participants
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{contest.endDate}</div>
                <div className={cn(
                  "text-sm text-muted-foreground",
                  locale === 'ar' && "font-arabic-body"
                )}>
                  Ends
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Voting Items */}
            <RadioGroup
              value={selectedItems[contest.id] || ""}
              onValueChange={(value) => handleVote(contest.id, value)}
              disabled={hasVoted[contest.id] || contest.status !== "active"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contest.items.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={item.id} id={item.id} />
                      <Label 
                        htmlFor={item.id} 
                        className={cn(
                          "flex-1 cursor-pointer",
                          locale === 'ar' && "font-arabic-body"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.title}</span>
                          {hasVoted[contest.id] && selectedItems[contest.id] === item.id && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </Label>
                    </div>
                    
                    <div className="ml-6 space-y-2">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className={cn(
                        "text-sm text-muted-foreground",
                        locale === 'ar' && "font-arabic-body"
                      )}>
                        {item.description}
                      </p>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className={cn(
                            "text-muted-foreground",
                            locale === 'ar' && "font-arabic-body"
                          )}>
                            {item.votes} votes
                          </span>
                          <span className={cn(
                            "text-muted-foreground",
                            locale === 'ar' && "font-arabic-body"
                          )}>
                            {item.percentage}%
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {/* Vote Button or Status */}
            <div className="pt-4">
              {hasVoted[contest.id] ? (
                <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className={cn(
                    "text-green-800 dark:text-green-200",
                    locale === 'ar' && "font-arabic-body"
                  )}>
                    {t('events.voting.voteSubmitted')}
                  </AlertDescription>
                </Alert>
              ) : contest.status === "active" ? (
                <div className="space-y-4">
                  {contest.requiresSignIn && !isSignedIn ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className={locale === 'ar' ? 'font-arabic-body' : ''}>
                        {t('events.voting.signInRequired')}
                      </AlertDescription>
                    </Alert>
                  ) : null}
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => submitVote(contest.id)}
                      disabled={!selectedItems[contest.id] || (contest.requiresSignIn && !isSignedIn)}
                      className="flex-1"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Vote Now
                    </Button>
                    
                    {contest.requiresSignIn && !isSignedIn && (
                      <Button 
                        variant="outline"
                        onClick={() => setIsSignedIn(true)}
                      >
                        {t('events.voting.signIn')}
                      </Button>
                    )}
                  </div>
                </div>
              ) : contest.status === "upcoming" ? (
                <div className="text-center space-y-2">
                  <div className={cn(
                    "text-sm text-muted-foreground",
                    locale === 'ar' && "font-arabic-body"
                  )}>
                    Voting starts soon
                  </div>
                  <Button variant="outline" disabled>
                    Coming Soon
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className={cn(
                    "text-sm text-muted-foreground",
                    locale === 'ar' && "font-arabic-body"
                  )}>
                    Voting has ended
                  </div>
                  <Button variant="outline">
                    View Results
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

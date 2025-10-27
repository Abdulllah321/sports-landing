"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  UserPlus,
  UserMinus,
  Trophy,
  Calendar,
  X,
  Check,
  Clock,
  MapPin,
  Mail,
  MessageCircle,
  Settings,
  LogOut,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Team = {
  id: string;
  name: string;
  sport: string;
  location: string;
  members: number;
  role: "Player" | "Captain" | "Coach";
  joinedDate: string;
  activeTournaments: number;
  avatar?: string;
};

type Invitation = {
  id: string;
  teamName: string;
  teamId: string;
  role: string;
  invitedBy: string;
  date: string;
  status: "pending" | "accepted" | "declined";
};

type Connection = {
  id: string;
  name: string;
  role: "Player" | "Coach";
  sport: string;
  location: string;
  avatar?: string;
  connectedDate: string;
};

// Mock data
const mockTeams: Team[] = [
  {
    id: "1",
    name: "City Champions FC",
    sport: "Football",
    location: "Dubai",
    members: 18,
    role: "Captain",
    joinedDate: "2024-01-15",
    activeTournaments: 2,
  },
  {
    id: "2",
    name: "Desert Eagles",
    sport: "Basketball",
    location: "Abu Dhabi",
    members: 12,
    role: "Player",
    joinedDate: "2024-02-20",
    activeTournaments: 1,
  },
];

const mockInvitations: Invitation[] = [
  {
    id: "inv1",
    teamName: "Phoenix Rising",
    teamId: "3",
    role: "Player",
    invitedBy: "Ahmed Hassan",
    date: "2024-03-10",
    status: "pending",
  },
  {
    id: "inv2",
    teamName: "Thunder Bolts",
    teamId: "4",
    role: "Coach",
    invitedBy: "Sarah Johnson",
    date: "2024-03-08",
    status: "pending",
  },
];

const mockConnections: Connection[] = [
  {
    id: "conn1",
    name: "Mohammed Al-Rashid",
    role: "Player",
    sport: "Football",
    location: "Dubai",
    connectedDate: "2024-01-20",
  },
  {
    id: "conn2",
    name: "Hassan Ali",
    role: "Coach",
    sport: "Basketball",
    location: "Sharjah",
    connectedDate: "2024-02-15",
  },
  {
    id: "conn3",
    name: "Fatima Al-Zahra",
    role: "Player",
    sport: "Tennis",
    location: "Abu Dhabi",
    connectedDate: "2024-03-01",
  },
];

type DirectoryTeam = {
  id: string;
  name: string;
  sport: string;
  location: string;
  members: number;
  lookingFor: string[];
  description: string;
  captain: string;
  avatar?: string;
};

const mockDirectoryTeams: DirectoryTeam[] = [
  {
    id: "dir1",
    name: "Thunder Bolts FC",
    sport: "Football",
    location: "Dubai",
    members: 15,
    lookingFor: ["Striker", "Midfielder"],
    description: "Competitive team looking for passionate players",
    captain: "Ahmed Mohammed",
  },
  {
    id: "dir2",
    name: "Desert Warriors",
    sport: "Football",
    location: "Abu Dhabi",
    members: 12,
    lookingFor: ["Defender", "Goalkeeper"],
    description: "Friendly team focused on development",
    captain: "Sara Al-Hashimi",
  },
  {
    id: "dir3",
    name: "Dunk Masters",
    sport: "Basketball",
    location: "Sharjah",
    members: 8,
    lookingFor: ["Point Guard", "Center"],
    description: "Competitive basketball team",
    captain: "Omar Hassan",
  },
  {
    id: "dir4",
    name: "Court Kings",
    sport: "Tennis",
    location: "Dubai",
    members: 6,
    lookingFor: ["Player", "Coach"],
    description: "Elite tennis team",
    captain: "Fatima Al-Zahra",
  },
  {
    id: "dir5",
    name: "Swift Strikers",
    sport: "Football",
    location: "Dubai",
    members: 14,
    lookingFor: ["Midfielder"],
    description: "Fast-paced attacking team",
    captain: "Youssef Ibrahim",
  },
  {
    id: "dir6",
    name: "Hoops Legends",
    sport: "Basketball",
    location: "Abu Dhabi",
    members: 9,
    lookingFor: ["Small Forward"],
    description: "Championship-winning team",
    captain: "Layla Mohammed",
  },
];

export function TeamsPageClient({ locale }: { locale: string }) {
  const { locale: contextLocale } = useLanguage();
  const t = getClientTranslation(locale);
  const isArabic = locale === "ar";
  const { toast } = useToast();

  const [teams, setTeams] = useState(mockTeams);
  const [invitations, setInvitations] = useState(mockInvitations);
  const [connections] = useState(mockConnections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [viewInvitationDialog, setViewInvitationDialog] = useState(false);
  const [currentInvitation, setCurrentInvitation] = useState<Invitation | null>(
    null
  );
  const [leaveTeamDialog, setLeaveTeamDialog] = useState(false);
  const [teamToLeave, setTeamToLeave] = useState<Team | null>(null);
  const [showDirectoryDialog, setShowDirectoryDialog] = useState(false);
  const [directorySearch, setDirectorySearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const handleAcceptInvitation = (invitationId: string) => {
    const invitation = invitations.find((inv) => inv.id === invitationId);
    if (!invitation) return;

    const newTeam: Team = {
      id: invitation.teamId,
      name: invitation.teamName,
      sport: "Football",
      location: "Dubai",
      members: Math.floor(Math.random() * 10) + 10,
      role: invitation.role as "Player" | "Captain" | "Coach",
      joinedDate: new Date().toISOString().split("T")[0],
      activeTournaments: 0,
    };

    setTeams([...teams, newTeam]);
    setInvitations(invitations.filter((inv) => inv.id !== invitationId));
    setViewInvitationDialog(false);
    setCurrentInvitation(null);
    toast({
      title: t("teams.invitationAccepted"),
      variant: "default",
    });
  };

  const handleDeclineInvitation = (invitationId: string) => {
    setInvitations(invitations.filter((inv) => inv.id !== invitationId));
    toast({
      title: t("teams.invitationDeclined"),
      variant: "default",
    });
  };

  const handleLeaveTeam = () => {
    if (!teamToLeave) return;
    setTeams(teams.filter((t) => t.id !== teamToLeave.id));
    setLeaveTeamDialog(false);
    setTeamToLeave(null);
    toast({
      title: t("teams.teamLeft"),
      variant: "default",
    });
  };

  const openLeaveTeamDialog = (team: Team) => {
    setTeamToLeave(team);
    setLeaveTeamDialog(true);
  };

  const openInvitationDialog = (invitation: Invitation) => {
    setCurrentInvitation(invitation);
    setViewInvitationDialog(true);
  };

  const pendingInvitations = invitations.filter(
    (inv) => inv.status === "pending"
  );

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1
            className={cn(
              "text-3xl font-bold",
              isArabic && "font-arabic-heading"
            )}
          >
            {t("teams.title")}
          </h1>
          <p
            className={cn(
              "text-muted-foreground",
              isArabic && "font-arabic-body"
            )}
          >
            {t("teams.description")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className={cn("text-sm font-medium", isArabic && "font-arabic-body")}
              >
                {t("teams.myTeams")}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className={cn("text-sm font-medium", isArabic && "font-arabic-body")}
              >
                {t("teams.invitations")}
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingInvitations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className={cn("text-sm font-medium", isArabic && "font-arabic-body")}
              >
                {t("teams.networking")}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{connections.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Teams */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2
                className={cn(
                  "text-xl font-semibold",
                  isArabic && "font-arabic-heading"
                )}
              >
                {t("teams.myTeams")}
              </h2>
              <Button
                size="sm"
                onClick={() => setShowDirectoryDialog(true)}
              >
                <Search className="h-4 w-4 mr-2" />
                {t("teams.viewDirectory")}
              </Button>
            </div>

            {teams.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <p
                    className={cn(
                      "text-lg font-medium mb-2",
                      isArabic && "font-arabic-body"
                    )}
                  >
                    {t("teams.noTeams")}
                  </p>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground text-center",
                      isArabic && "font-arabic-body"
                    )}
                  >
                    {t("teams.noTeamsDescription")}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {teams.map((team) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className={cn(
                                    "text-lg font-semibold",
                                    isArabic && "font-arabic-heading"
                                  )}
                                >
                                  {team.name}
                                </h3>
                                <Badge variant="secondary">{team.sport}</Badge>
                              </div>
                              <div
                                className={cn(
                                  "text-sm text-muted-foreground space-y-1",
                                  isArabic && "font-arabic-body"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3 w-3" />
                                  {team.location}
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {team.members} {t("teams.members")}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Trophy className="h-3 w-3" />
                                    {team.activeTournaments}{" "}
                                    {t("teams.activeTournaments")}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={
                                      team.role === "Captain"
                                        ? "default"
                                        : "outline"
                                    }
                                  >
                                    {team.role}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {t("teams.joined")}{" "}
                                    {new Date(team.joinedDate).toLocaleDateString(
                                      locale
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedTeam(team);
                                toast({
                                  title: "Team management",
                                  description: "Coming soon!",
                                  variant: "default",
                                });
                              }}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => openLeaveTeamDialog(team)}
                            >
                              <LogOut className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Invitations */}
            <Card>
              <CardHeader>
                <CardTitle
                  className={cn(isArabic && "font-arabic-heading")}
                >
                  {t("teams.invitations")}
                </CardTitle>
                <CardDescription
                  className={cn(isArabic && "font-arabic-body")}
                >
                  {pendingInvitations.length} {t("teams.pending")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingInvitations.length === 0 ? (
                  <div
                    className={cn(
                      "text-center py-6 text-sm text-muted-foreground",
                      isArabic && "font-arabic-body"
                    )}
                  >
                    {t("teams.noInvitations")}
                  </div>
                ) : (
                  pendingInvitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div>
                        <p
                          className={cn(
                            "font-medium",
                            isArabic && "font-arabic-body"
                          )}
                        >
                          {invitation.teamName}
                        </p>
                        <p
                          className={cn(
                            "text-sm text-muted-foreground",
                            isArabic && "font-arabic-body"
                          )}
                        >
                          {t("teams.invitationFrom")} {invitation.invitedBy}
                        </p>
                        <p
                          className={cn(
                            "text-xs text-muted-foreground",
                            isArabic && "font-arabic-body"
                          )}
                        >
                          {t("teams.role")}: {invitation.role}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleAcceptInvitation(invitation.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          {t("teams.accept")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleDeclineInvitation(invitation.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          {t("teams.decline")}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Networking */}
            <Card>
              <CardHeader>
                <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                  {t("teams.networking")}
                </CardTitle>
                <CardDescription
                  className={cn(isArabic && "font-arabic-body")}
                >
                  {connections.length} {t("teams.connectedPlayers")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {connections.length === 0 ? (
                  <div
                    className={cn(
                      "text-center py-6 text-sm text-muted-foreground",
                      isArabic && "font-arabic-body"
                    )}
                  >
                    {t("teams.noConnections")}
                  </div>
                ) : (
                  connections.map((connection) => (
                    <div
                      key={connection.id}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "font-medium truncate",
                            isArabic && "font-arabic-body"
                          )}
                        >
                          {connection.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {connection.role}
                          </Badge>
                          <span
                            className={cn(
                              "text-xs text-muted-foreground",
                              isArabic && "font-arabic-body"
                            )}
                          >
                            {connection.sport}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Team Directory Dialog */}
      <Dialog open={showDirectoryDialog} onOpenChange={setShowDirectoryDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className={cn(isArabic && "font-arabic-heading")}>
              {t("teams.directory.title")}
            </DialogTitle>
            <DialogDescription className={cn(isArabic && "font-arabic-body")}>
              {t("teams.directory.description")}
            </DialogDescription>
          </DialogHeader>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("teams.directory.searchPlaceholder")}
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("teams.directory.filterBySport")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("teams.directory.allSports")}</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("teams.directory.filterByLocation")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("teams.directory.allLocations")}</SelectItem>
                  <SelectItem value="Dubai">Dubai</SelectItem>
                  <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                  <SelectItem value="Sharjah">Sharjah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Teams List */}
          <div className="space-y-4 mt-4">
            {mockDirectoryTeams
              .filter((team) => {
                const matchesSearch = team.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
                  team.sport.toLowerCase().includes(directorySearch.toLowerCase()) ||
                  team.location.toLowerCase().includes(directorySearch.toLowerCase());
                const matchesSport = selectedSport === "all" || team.sport === selectedSport;
                const matchesLocation = selectedLocation === "all" || team.location === selectedLocation;
                return matchesSearch && matchesSport && matchesLocation;
              })
              .map((team) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className={cn("text-lg font-semibold", isArabic && "font-arabic-heading")}>
                                {team.name}
                              </h3>
                              <Badge variant="secondary">{team.sport}</Badge>
                            </div>
                            <div className={cn("text-sm text-muted-foreground space-y-1", isArabic && "font-arabic-body")}>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {team.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3" />
                                {team.members} {t("teams.directory.members")}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{t("teams.directory.lookingFor")}:</span>
                                <div className="flex gap-1 flex-wrap">
                                  {team.lookingFor.map((role, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {role}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <p className={cn("text-sm", isArabic && "font-arabic-body")}>
                                {team.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Request Sent",
                                description: `Your request to join ${team.name} has been sent!`,
                                variant: "default",
                              });
                            }}
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            {t("teams.directory.requestToJoin")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            {mockDirectoryTeams.filter((team) => {
              const matchesSearch = team.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
                team.sport.toLowerCase().includes(directorySearch.toLowerCase()) ||
                team.location.toLowerCase().includes(directorySearch.toLowerCase());
              const matchesSport = selectedSport === "all" || team.sport === selectedSport;
              const matchesLocation = selectedLocation === "all" || team.location === selectedLocation;
              return matchesSearch && matchesSport && matchesLocation;
            }).length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className={cn("text-lg font-medium mb-2", isArabic && "font-arabic-body")}>
                    {t("teams.directory.noTeams")}
                  </p>
                  <p className={cn("text-sm text-muted-foreground text-center", isArabic && "font-arabic-body")}>
                    {t("teams.directory.adjustFilters")}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Leave Team Dialog */}
      <AlertDialog open={leaveTeamDialog} onOpenChange={setLeaveTeamDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              className={cn(isArabic && "font-arabic-heading")}
            >
              {t("teams.confirmLeave")}
            </AlertDialogTitle>
            <AlertDialogDescription
              className={cn(isArabic && "font-arabic-body")}
            >
              {t("teams.confirmLeaveDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={cn(isArabic && "font-arabic-body")}
            >
              {t("teams.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLeaveTeam}
              className={cn("bg-destructive", isArabic && "font-arabic-body")}
            >
              {t("teams.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


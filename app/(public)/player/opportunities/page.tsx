"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Target,
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  Clock,
  Award,
  Star,
  Eye,
  Share2,
  Send,
  Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OpportunityType = 'sponsorship' | 'scouting' | 'training' | 'content';

interface Opportunity {
  id: number;
  title: string;
  company: string;
  companyLogo?: string;
  type: OpportunityType;
  reward: string;
  rewardAmount?: number;
  exposure: string;
  requirements: string[];
  description: string;
  deadline?: string;
  applicants: number;
  featured: boolean;
  status: 'available' | 'pending' | 'closed';
  exposureMetrics: {
    followers?: number;
    reach?: string;
    engagements?: string;
  };
}

export default function PlayerOpportunitiesPage() {
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const isArabic = locale === 'ar';
  const { toast } = useToast();
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    motivation: '',
    experience: '',
    availability: ''
  });

  const opportunities: Opportunity[] = [
    {
      id: 1,
      title: isArabic ? "رعاية من شركة معدات رياضية" : "Sports Equipment Brand Sponsorship",
      company: "Elite Sportswear",
      type: "sponsorship",
      reward: "$5,000/month",
      rewardAmount: 5000,
      exposure: isArabic ? "عرض على جميع المنصات" : "Feature on all platforms",
      requirements: [isArabic ? "لاعب محترف" : "Professional player", "18+ years", "Active on social media"],
      description: isArabic 
        ? "حصل على دعم من شركة رائدة في المعدات الرياضية. تشمل الحزمة معدات مجانية، ودعماً مادياً شهرياً، وعرض علاماتنا التجارية على منصات التواصل الاجتماعي الخاصة بك."
        : "Get sponsored by a leading sports equipment company. Includes free gear, monthly financial support, and feature our brands on your social media platforms.",
      applicants: 124,
      featured: true,
      status: 'available',
      exposureMetrics: {
        followers: 250000,
        reach: "500K+",
        engagements: "High"
      }
    },
    {
      id: 2,
      title: isArabic ? "استكشاف موهبة من نخبة الأكاديميات" : "Talent Scouting by Elite Academies",
      company: "Pro Academy Scouts",
      type: "scouting",
      reward: isArabic ? "فرصة احترافية" : "Professional opportunity",
      exposure: isArabic ? "تقديم لأكاديميات نخبة" : "Recommendation to elite academies",
      requirements: [isArabic ? "أداء عالي" : "High performance", isArabic ? "حماس" : "Dedication", "Minimum 2 years experience"],
      description: isArabic
        ? "انضم إلى برنامج الاستكشاف الاحترافي وكن جزءاً من شبكة الأكاديميات النخبوية. احصل على فرص للوصول إلى أندية محترفة ومسارات مهنية."
        : "Join our professional scouting program and become part of an elite academy network. Get opportunities to access professional clubs and career paths.",
      applicants: 89,
      featured: false,
      status: 'available',
      exposureMetrics: {
        followers: 18000,
        reach: "Elite Network",
        engagements: "Qualified"
      }
    },
    {
      id: 3,
      title: isArabic ? "برنامج التدريب الصيفي المتقدم" : "Advanced Summer Training Program",
      company: "Elite Training Camp",
      type: "training",
      reward: isArabic ? "تجربة تعليمية" : "Educational experience",
      exposure: isArabic ? "تدريب مع مدربين محترفين" : "Training with professional coaches",
      requirements: [isArabic ? "الالتزام" : "Commitment", isArabic ? "التزامن" : "Attendance", "Age 16-25"],
      description: isArabic
        ? "احضر معسكر تدريبي صيفي مكثف مع مدربين محترفين. احصل على منهج تدريبي مخصص وتحسين المهارات المتقدمة."
        : "Attend an intensive summer training camp with professional coaches. Get personalized training curriculum and advanced skill development.",
      applicants: 156,
      featured: false,
      status: 'available',
      deadline: "30 days left",
      exposureMetrics: {
        followers: 4500,
        reach: "Regional",
        engagements: "Active"
      }
    },
    {
      id: 4,
      title: isArabic ? "برنامج إنشاء المحتوى الرياضي" : "Sports Content Creator Program",
      company: "SportVibe Media",
      type: "content",
      reward: "$2,500/month + Equipment",
      rewardAmount: 2500,
      exposure: isArabic ? "ظهور على قناة YouTube الرياضية" : "Feature on sports YouTube channel",
      requirements: ["Content creation experience", "Video editing skills", "Social media presence"],
      description: isArabic
        ? "انضم إلى فريق إنشاء المحتوى الرياضي. أنشئ مقاطع فيديو، وأبرز النقاط، ومحتوى خلف الكواليس للمنصات الرقمية."
        : "Join our sports content creation team. Create videos, highlights, and behind-the-scenes content for digital platforms.",
      applicants: 203,
      featured: true,
      status: 'available',
      exposureMetrics: {
        followers: 125000,
        reach: "300K+",
        engagements: "Very High"
      }
    },
    {
      id: 5,
      title: isArabic ? "رعاية بطولة الشباب" : "Youth Tournament Sponsorship",
      company: "City Sports Council",
      type: "sponsorship",
      reward: "$3,000/tournament",
      rewardAmount: 3000,
      exposure: isArabic ? "إعلانات على الملعب" : "Stadium advertising",
      requirements: ["Team participation", "Tournament registration", "Youth category"],
      description: isArabic
        ? "احصل على رعاية لمشاركة فريقك في بطولة الشباب. تشمل الرعاية الدعم المالي واللوجستي والتغطية الإعلامية."
        : "Get sponsorship for your team's participation in youth tournaments. Includes financial and logistical support plus media coverage.",
      applicants: 67,
      featured: false,
      status: 'pending',
      exposureMetrics: {
        followers: 12000,
        reach: "Local",
        engagements: "Medium"
      }
    }
  ];

  const getOpportunityIcon = (type: OpportunityType) => {
    switch (type) {
      case 'sponsorship': return <DollarSign className="h-6 w-6" />;
      case 'scouting': return <Target className="h-6 w-6" />;
      case 'training': return <TrendingUp className="h-6 w-6" />;
      case 'content': return <FileText className="h-6 w-6" />;
      default: return <Briefcase className="h-6 w-6" />;
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'pending': return 'secondary';
      case 'closed': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleApply = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowApplyDialog(true);
  };

  const handleSubmitApplication = () => {
    if (!applicationForm.motivation.trim() || !applicationForm.experience.trim()) {
      toast({
        title: isArabic ? "الرجاء ملء جميع الحقول" : "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isArabic ? "تم إرسال طلبك بنجاح" : "Application submitted successfully",
      description: isArabic 
        ? "سيتم مراجعة طلبك وإرسال تحديث قريباً" 
        : "Your application will be reviewed and you'll receive an update soon",
      variant: "default",
    });

    setShowApplyDialog(false);
    setApplicationForm({ motivation: '', experience: '', availability: '' });
  };

  const featuredOpportunities = opportunities.filter(o => o.featured);
  const otherOpportunities = opportunities.filter(o => !o.featured);

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={cn("text-3xl font-bold", isArabic && "font-arabic-heading")}>
          {isArabic ? 'الفرص والرعاية' : 'Opportunities & Sponsorships'}
        </h1>
        <p className={cn("text-muted-foreground", isArabic && "font-arabic-body")}>
          {isArabic ? 'استكشف فرص الرعاية والاستكشاف والتدريب' : 'Explore sponsorship, scouting, and training opportunities'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'الفرص المتاحة' : 'Available Opportunities'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  {opportunities.filter(o => o.status === 'available').length}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'إجمالي المتقدمين' : 'Total Applicants'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  {opportunities.reduce((sum, o) => sum + o.applicants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'ميزة مميزة' : 'Featured'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  {featuredOpportunities.length}
                </p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Opportunities */}
      {featuredOpportunities.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <h2 className={cn("text-2xl font-semibold", isArabic && "font-arabic-heading")}>
              {isArabic ? 'فرص مميزة' : 'Featured Opportunities'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredOpportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-yellow-500/20 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {getOpportunityIcon(opportunity.type)}
                        </div>
                        <div>
                          <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                            {opportunity.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                              {opportunity.company}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={getBadgeVariant(opportunity.status)}>
                        {opportunity.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={cn("text-sm mb-4", isArabic && "font-arabic-body")}>
                      {opportunity.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                          {isArabic ? 'المكافأة' : 'Reward'}
                        </p>
                        <p className={cn("text-sm font-semibold flex items-center gap-1", isArabic && "font-arabic-heading")}>
                          <DollarSign className="h-4 w-4" />
                          {opportunity.reward}
                        </p>
                      </div>
                      <div>
                        <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                          {isArabic ? 'المتقدمين' : 'Applicants'}
                        </p>
                        <p className={cn("text-sm font-semibold flex items-center gap-1", isArabic && "font-arabic-body")}>
                          <Users className="h-4 w-4" />
                          {opportunity.applicants}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <p className={cn("text-xs font-medium mb-2", isArabic && "font-arabic-body")}>
                        {isArabic ? 'مقاييس التعرض' : 'Exposure Metrics'}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {opportunity.exposureMetrics.followers && (
                          <Badge variant="outline" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            {opportunity.exposureMetrics.followers.toLocaleString()} {isArabic ? 'متابع' : 'followers'}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {opportunity.exposureMetrics.reach} {isArabic ? 'وصول' : 'reach'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          {opportunity.exposureMetrics.engagements} {isArabic ? 'تفاعل' : 'engagement'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => handleApply(opportunity)}
                      >
                        <Briefcase className="h-4 w-4 mr-2" />
                        {isArabic ? 'تقدم الآن' : 'Apply Now'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedOpportunity(opportunity);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {isArabic ? 'التفاصيل' : 'Details'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Opportunities */}
      <div className="space-y-4">
        <h2 className={cn("text-2xl font-semibold", isArabic && "font-arabic-heading")}>
          {isArabic ? 'جميع الفرص' : 'All Opportunities'}
        </h2>

        <div className="space-y-4">
          {otherOpportunities.map((opportunity) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg shrink-0",
                      opportunity.type === 'sponsorship' && "bg-green-500/10",
                      opportunity.type === 'scouting' && "bg-blue-500/10",
                      opportunity.type === 'training' && "bg-purple-500/10",
                      opportunity.type === 'content' && "bg-orange-500/10"
                    )}>
                      <div className={cn(
                        opportunity.type === 'sponsorship' && "text-green-600",
                        opportunity.type === 'scouting' && "text-blue-600",
                        opportunity.type === 'training' && "text-purple-600",
                        opportunity.type === 'content' && "text-orange-600"
                      )}>
                        {getOpportunityIcon(opportunity.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={cn("text-lg font-semibold", isArabic && "font-arabic-heading")}>
                            {opportunity.title}
                          </h3>
                          <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                            {opportunity.company}
                          </p>
                        </div>
                        <Badge variant={getBadgeVariant(opportunity.status)}>
                          {opportunity.status}
                        </Badge>
                      </div>
                      
                      <p className={cn("text-sm mb-3", isArabic && "font-arabic-body")}>
                        {opportunity.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                            {isArabic ? 'المكافأة' : 'Reward'}
                          </p>
                          <p className={cn("text-sm font-semibold", isArabic && "font-arabic-heading")}>
                            {opportunity.reward}
                          </p>
                        </div>
                        <div>
                          <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                            {isArabic ? 'التعرض' : 'Exposure'}
                          </p>
                          <p className={cn("text-sm font-semibold", isArabic && "font-arabic-body")}>
                            {opportunity.exposure}
                          </p>
                        </div>
                        <div>
                          <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                            {isArabic ? 'المتقدمين' : 'Applicants'}
                          </p>
                          <p className={cn("text-sm font-semibold", isArabic && "font-arabic-body")}>
                            {opportunity.applicants}
                          </p>
                        </div>
                        {opportunity.deadline && (
                          <div>
                            <p className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                              {isArabic ? 'الموعد النهائي' : 'Deadline'}
                            </p>
                            <p className={cn("text-sm font-semibold", isArabic && "font-arabic-body")}>
                              {opportunity.deadline}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleApply(opportunity)}>
                        {isArabic ? 'تقدم' : 'Apply'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedOpportunity(opportunity);
                          setShowDetailsDialog(true);
                        }}
                      >
                        {isArabic ? 'تفاصيل' : 'Details'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className={cn(isArabic && "font-arabic-heading")}>
              {isArabic ? 'التقدم للفرصة' : 'Apply for Opportunity'}
            </DialogTitle>
            <DialogDescription className={cn(isArabic && "font-arabic-body")}>
              {selectedOpportunity && (
                <div>
                  <p className="font-semibold mb-1">{selectedOpportunity.title}</p>
                  <p className="text-sm">{selectedOpportunity.company}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'لماذا أنت مناسب لهذه الفرصة؟' : 'Why are you suitable for this opportunity?'}
              </Label>
              <Textarea
                placeholder={isArabic ? "اشرح دوافعك وخبراتك..." : "Explain your motivation and experience..."}
                value={applicationForm.motivation}
                onChange={(e) => setApplicationForm({ ...applicationForm, motivation: e.target.value })}
                rows={4}
                className={cn(isArabic && "font-arabic-body")}
              />
            </div>

            <div className="space-y-2">
              <Label className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'خبرتك ذات الصلة' : 'Your Relevant Experience'}
              </Label>
              <Textarea
                placeholder={isArabic ? "صف خبرتك ومهاراتك..." : "Describe your experience and skills..."}
                value={applicationForm.experience}
                onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                rows={4}
                className={cn(isArabic && "font-arabic-body")}
              />
            </div>

            <div className="space-y-2">
              <Label className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'توفرك' : 'Your Availability'}
              </Label>
              <Input
                placeholder={isArabic ? "متى ستكون متاحاً؟" : "When will you be available?"}
                value={applicationForm.availability}
                onChange={(e) => setApplicationForm({ ...applicationForm, availability: e.target.value })}
                className={cn(isArabic && "font-arabic-body")}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowApplyDialog(false);
              setApplicationForm({ motivation: '', experience: '', availability: '' });
            }}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleSubmitApplication}>
              <Send className="h-4 w-4 mr-2" />
              {isArabic ? 'إرسال الطلب' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className={cn(isArabic && "font-arabic-heading")}>
              {selectedOpportunity?.title}
            </DialogTitle>
            <DialogDescription className={cn(isArabic && "font-arabic-body")}>
              {selectedOpportunity?.company}
            </DialogDescription>
          </DialogHeader>

          {selectedOpportunity && (
            <div className="space-y-6 py-4">
              {/* Description */}
              <div>
                <h3 className={cn("font-semibold mb-2", isArabic && "font-arabic-heading")}>
                  {isArabic ? 'الوصف' : 'Description'}
                </h3>
                <p className={cn("text-sm", isArabic && "font-arabic-body")}>
                  {selectedOpportunity.description}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className={cn("font-semibold mb-2", isArabic && "font-arabic-heading")}>
                  {isArabic ? 'المتطلبات' : 'Requirements'}
                </h3>
                <ul className="space-y-2">
                  {selectedOpportunity.requirements.map((req, idx) => (
                    <li key={idx} className={cn("text-sm flex items-start gap-2", isArabic && "font-arabic-body")}>
                      <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <p className={cn("text-sm font-medium", isArabic && "font-arabic-body")}>
                        {isArabic ? 'المكافأة' : 'Reward'}
                      </p>
                    </div>
                    <p className={cn("text-lg font-bold", isArabic && "font-arabic-heading")}>
                      {selectedOpportunity.reward}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-blue-500" />
                      <p className={cn("text-sm font-medium", isArabic && "font-arabic-body")}>
                        {isArabic ? 'التعرض' : 'Exposure'}
                      </p>
                    </div>
                    <p className={cn("text-sm", isArabic && "font-arabic-body")}>
                      {selectedOpportunity.exposure}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      <p className={cn("text-sm font-medium", isArabic && "font-arabic-body")}>
                        {isArabic ? 'المتقدمين' : 'Applicants'}
                      </p>
                    </div>
                    <p className={cn("text-lg font-bold", isArabic && "font-arabic-heading")}>
                      {selectedOpportunity.applicants}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <p className={cn("text-sm font-medium", isArabic && "font-arabic-body")}>
                        {isArabic ? 'الحالة' : 'Status'}
                      </p>
                    </div>
                    <Badge variant={getBadgeVariant(selectedOpportunity.status)}>
                      {selectedOpportunity.status}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Exposure Metrics */}
              {selectedOpportunity.exposureMetrics && (
                <div>
                  <h3 className={cn("font-semibold mb-3", isArabic && "font-arabic-heading")}>
                    {isArabic ? 'مقاييس التعرض' : 'Exposure Metrics'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.exposureMetrics.followers && (
                      <Badge variant="secondary" className="text-sm">
                        <Eye className="h-3 w-3 mr-1" />
                        {selectedOpportunity.exposureMetrics.followers.toLocaleString()} {isArabic ? 'متابع' : 'followers'}
                      </Badge>
                    )}
                    {selectedOpportunity.exposureMetrics.reach && (
                      <Badge variant="secondary" className="text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {selectedOpportunity.exposureMetrics.reach} {isArabic ? 'وصول' : 'reach'}
                      </Badge>
                    )}
                    {selectedOpportunity.exposureMetrics.engagements && (
                      <Badge variant="secondary" className="text-sm">
                        <Star className="h-3 w-3 mr-1" />
                        {selectedOpportunity.exposureMetrics.engagements} {isArabic ? 'تفاعل' : 'engagement'}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Deadline */}
              {selectedOpportunity.deadline && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className={cn("font-semibold", isArabic && "font-arabic-heading")}>
                        {isArabic ? 'الموعد النهائي' : 'Deadline'}
                      </p>
                      <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                        {selectedOpportunity.deadline}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              {isArabic ? 'إغلاق' : 'Close'}
            </Button>
            {selectedOpportunity && (
              <Button onClick={() => {
                setShowDetailsDialog(false);
                handleApply(selectedOpportunity);
              }}>
                <Briefcase className="h-4 w-4 mr-2" />
                {isArabic ? 'تقدم الآن' : 'Apply Now'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

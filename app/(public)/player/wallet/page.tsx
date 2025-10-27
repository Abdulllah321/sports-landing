"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  ArrowDown,
  ArrowUp,
  Wallet,
  CreditCard,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Receipt,
  Trophy,
  Users,
  Briefcase,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TransactionType = 'sponsorship' | 'tournament' | 'match' | 'bonus' | 'withdrawal';
type TransactionStatus = 'completed' | 'pending' | 'failed';

interface Transaction {
  id: number;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  description?: string;
}

export default function PlayerWalletPage() {
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const isArabic = locale === 'ar';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const transactions: Transaction[] = [
    {
      id: 1,
      type: "sponsorship",
      title: isArabic ? "رعاية Elite Sportswear" : "Elite Sportswear Sponsorship",
      amount: 5000,
      date: "2024-03-15",
      status: "completed",
      description: isArabic ? "رعاية شهرية - مارس 2024" : "Monthly sponsorship - March 2024"
    },
    {
      id: 2,
      type: "tournament",
      title: isArabic ? "بطولة المدينة الصيفية" : "City Summer Tournament",
      amount: 2000,
      date: "2024-02-28",
      status: "completed",
      description: isArabic ? "جائزة المركز الثاني" : "Second place prize"
    },
    {
      id: 3,
      type: "match",
      title: isArabic ? "مباراة سريعة" : "Quick Match",
      amount: 500,
      date: "2024-03-10",
      status: "pending",
      description: isArabic ? "حفز الأداء" : "Performance incentive"
    },
    {
      id: 4,
      type: "bonus",
      title: isArabic ? "مكافأة التوصيات" : "Referral Bonus",
      amount: 300,
      date: "2024-03-08",
      status: "completed",
      description: isArabic ? "مكافأة لإحضار لاعبين جدد" : "Bonus for bringing new players"
    },
    {
      id: 5,
      type: "sponsorship",
      title: isArabic ? "رعاية SportVibe Media" : "SportVibe Media Sponsorship",
      amount: 2500,
      date: "2024-02-15",
      status: "completed",
      description: isArabic ? "برنامج إنشاء المحتوى" : "Content creation program"
    },
    {
      id: 6,
      type: "tournament",
      title: isArabic ? "بطولة الشباب" : "Youth Tournament",
      amount: 800,
      date: "2024-02-10",
      status: "completed",
      description: isArabic ? "جائزة الفريق" : "Team prize"
    }
  ];

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'sponsorship': return <Briefcase className="h-5 w-5" />;
      case 'tournament': return <Trophy className="h-5 w-5" />;
      case 'match': return <Users className="h-5 w-5" />;
      case 'bonus': return <TrendingUp className="h-5 w-5" />;
      case 'withdrawal': return <ArrowDown className="h-5 w-5" />;
      default: return <DollarSign className="h-5 w-5" />;
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case 'sponsorship': return "bg-blue-500/10 text-blue-600";
      case 'tournament': return "bg-purple-500/10 text-purple-600";
      case 'match': return "bg-green-500/10 text-green-600";
      case 'bonus': return "bg-orange-500/10 text-orange-600";
      case 'withdrawal': return "bg-red-500/10 text-red-600";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };

  const totalEarnings = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const availableAmount = totalEarnings - pendingAmount;

  const sponsorshipEarnings = transactions
    .filter(t => t.type === 'sponsorship' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const tournamentEarnings = transactions
    .filter(t => t.type === 'tournament' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const matchEarnings = transactions
    .filter(t => t.type === 'match' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = activeTab === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);

  const handleWithdraw = () => {
    toast({
      title: isArabic ? "طلب سحب الأموال" : "Withdrawal Request",
      description: isArabic 
        ? "سيتم معالجة طلبك خلال 3-5 أيام عمل" 
        : "Your request will be processed within 3-5 business days",
      variant: "default",
    });
  };

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={cn("text-3xl font-bold", isArabic && "font-arabic-heading")}>
          {isArabic ? 'المحفظة والأرباح' : 'Wallet & Earnings'}
        </h1>
        <p className={cn("text-muted-foreground", isArabic && "font-arabic-body")}>
          {isArabic ? 'إدارة أرباحك ومعاملاتك' : 'Manage your earnings and transactions'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'المتاح' : 'Available'}
                </p>
                <p className={cn("text-3xl font-bold text-green-600", isArabic && "font-arabic-heading")}>
                  ${availableAmount.toLocaleString()}
                </p>
                <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                  {isArabic ? 'جاهز للسحب' : 'Ready to withdraw'}
                </p>
              </div>
              <ArrowUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'قيد الانتظار' : 'Pending'}
                </p>
                <p className={cn("text-3xl font-bold text-yellow-600", isArabic && "font-arabic-heading")}>
                  ${pendingAmount.toLocaleString()}
                </p>
                <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                  {isArabic ? 'قيد المعالجة' : 'Processing'}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'إجمالي الأرباح' : 'Total Earnings'}
                </p>
                <p className={cn("text-3xl font-bold text-blue-600", isArabic && "font-arabic-heading")}>
                  ${totalEarnings.toLocaleString()}
                </p>
                <p className={cn("text-xs text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                  {isArabic ? 'في كل الأوقات' : 'All time'}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'من الرعاية' : 'From Sponsorships'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  ${sponsorshipEarnings.toLocaleString()}
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
                  {isArabic ? 'من البطولات' : 'From Tournaments'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  ${tournamentEarnings.toLocaleString()}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'من المباريات' : 'From Matches'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  ${matchEarnings.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button onClick={handleWithdraw} size="lg">
          <ArrowDown className="h-4 w-4 mr-2" />
          {isArabic ? 'سحب الأموال' : 'Withdraw Money'}
        </Button>
        <Button variant="outline" size="lg">
          <Download className="h-4 w-4 mr-2" />
          {isArabic ? 'تحميل كشف حساب' : 'Download Statement'}
        </Button>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                {isArabic ? 'تاريخ المعاملات' : 'Transaction History'}
              </CardTitle>
              <CardDescription className={cn(isArabic && "font-arabic-body")}>
                {isArabic ? 'سجل جميع أرباحك' : 'Record of all your earnings'}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {isArabic ? 'فلترة' : 'Filter'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">
                {isArabic ? 'الكل' : 'All'}
              </TabsTrigger>
              <TabsTrigger value="sponsorship">
                {isArabic ? 'رعاية' : 'Sponsorship'}
              </TabsTrigger>
              <TabsTrigger value="tournament">
                {isArabic ? 'بطولات' : 'Tournaments'}
              </TabsTrigger>
              <TabsTrigger value="match">
                {isArabic ? 'مباريات' : 'Matches'}
              </TabsTrigger>
              <TabsTrigger value="bonus">
                {isArabic ? 'مكافآت' : 'Bonuses'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredTransactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className={cn(
                        "flex items-center justify-between p-4 rounded-lg border transition-all",
                        "hover:shadow-md"
                      )}>
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "p-3 rounded-lg",
                            getTransactionColor(transaction.type)
                          )}>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <p className={cn("font-semibold", isArabic && "font-arabic-heading")}>
                              {transaction.title}
                            </p>
                            <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                              {transaction.description || transaction.date}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                                {transaction.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={cn(
                              "text-lg font-bold",
                              transaction.status === 'completed' ? "text-green-600" : "text-yellow-600",
                              isArabic && "font-arabic-heading"
                            )}>
                              ${transaction.amount.toLocaleString()}
                            </p>
                            <Badge 
                              variant={
                                transaction.status === 'completed' ? 'default' : 
                                transaction.status === 'pending' ? 'secondary' : 'destructive'
                              }
                              className="mt-1"
                            >
                              {transaction.status === 'completed'
                                ? (isArabic ? 'مكتمل' : 'Completed')
                                : transaction.status === 'pending'
                                ? (isArabic ? 'قيد الانتظار' : 'Pending')
                                : (isArabic ? 'فشل' : 'Failed')}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

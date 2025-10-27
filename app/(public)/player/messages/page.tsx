"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Mail, 
  Search, 
  Bell, 
  Send, 
  Star,
  Trash2,
  Archive,
  Filter,
  MoreVertical,
  Users,
  Trophy,
  Building2,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  UserPlus,
  ChevronRight,
  Calendar,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MessageType = 'team' | 'tournament' | 'sponsor' | 'system' | 'admin';

interface Message {
  id: number;
  sender: string;
  senderType: MessageType;
  subject: string;
  body: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  attachments?: number;
}

interface Notification {
  id: number;
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

export default function PlayerMessagesPage() {
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const isArabic = locale === 'ar';
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams?.get('tab') || "messages");

  // Sync activeTab with URL changes
  useEffect(() => {
    const tab = searchParams?.get('tab') || 'messages';
    setActiveTab(tab);
  }, [searchParams]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<MessageType | 'all'>("all");
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showArchivedView, setShowArchivedView] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Tournament Organizer",
      senderType: "tournament",
      subject: isArabic ? "تأكيد التسجيل في البطولة" : "Tournament Registration Confirmed",
      body: isArabic ? "شكراً لك على التسجيل في بطولة الربيع. نود إعلامك أن تسجيلك قد تم تأكيده بنجاح. سيتم إرسال تفاصيل البطولة والجدول الزمني قريباً." : "Thank you for registering for the Spring Tournament. We'd like to inform you that your registration has been successfully confirmed. Tournament details and schedule will be sent soon.",
      preview: isArabic ? "شكراً لك على التسجيل في بطولة الربيع..." : "Thank you for registering for Spring Tournament...",
      date: "2 days ago",
      read: false,
      starred: false,
      attachments: 0
    },
    {
      id: 2,
      sender: "City Champions FC",
      senderType: "team",
      subject: isArabic ? "اجتماع الفريق القادم" : "Upcoming Team Meeting",
      body: isArabic ? "نود دعوتك لحضور اجتماع الفريق الذي سيعقد يوم السبت القادم. سنناقش استراتيجية اللعب للبطولة القادمة." : "We would like to invite you to attend the team meeting scheduled for next Saturday. We'll discuss playing strategy for the upcoming tournament.",
      preview: isArabic ? "نود دعوتك لحضور اجتماع الفريق..." : "We would like to invite you to team meeting...",
      date: "3 days ago",
      read: false,
      starred: true,
      attachments: 1
    },
    {
      id: 3,
      sender: "Sponsor Agent - SportBoost",
      senderType: "sponsor",
      subject: isArabic ? "عرض رعاية جديد" : "New Sponsorship Offer",
      body: isArabic ? "نود مناقشة فرصة رعاية معك. نحن نبحث عن رياضيين واعدين للترويج لمنتجاتنا الرياضية." : "We would like to discuss a sponsorship opportunity with you. We're looking for promising athletes to promote our sports products.",
      preview: isArabic ? "نود مناقشة فرصة رعاية معك..." : "We would like to discuss sponsorship opportunity...",
      date: "1 week ago",
      read: true,
      starred: false,
      attachments: 2
    },
    {
      id: 4,
      sender: "Ficro Support Team",
      senderType: "admin",
      subject: isArabic ? "تحديث النظام" : "System Update",
      body: isArabic ? "نود إعلامك بالتحديثات الجديدة على المنصة بما في ذلك الميزات المحسنة وإصلاحات الأخطاء." : "We'd like to inform you about new updates on the platform including improved features and bug fixes.",
      preview: isArabic ? "نود إعلامك بالتحديثات الجديدة..." : "We would like to inform you about new updates...",
      date: "2 weeks ago",
      read: true,
      starred: false,
      attachments: 0
    },
    {
      id: 5,
      sender: "Desert Eagles",
      senderType: "team",
      subject: isArabic ? "دعوة للانضمام للمباراة" : "Match Participation Invitation",
      body: isArabic ? "نود دعوتك للمشاركة في المباراة الودية القادمة ضد فريق Desert Warriors." : "We would like to invite you to participate in the upcoming friendly match against Desert Warriors team.",
      preview: isArabic ? "نود دعوتك للمشاركة في المباراة الودية..." : "We would like to invite you to participate...",
      date: "3 weeks ago",
      read: true,
      starred: false,
      attachments: 0
    }
  ]);

  const notifications: Notification[] = [
    {
      id: 1,
      title: isArabic ? "بطولة جديدة مفتوحة للتسجيل" : "New tournament open for registration",
      description: isArabic ? "بطولة المدينة الصيفية متاحة الآن للتسجيل" : "City Summer Tournament is now available for registration",
      type: "info",
      time: "1 hour ago",
      read: false
    },
    {
      id: 2,
      title: isArabic ? "تم تحديث إحصائياتك" : "Your stats have been updated",
      description: isArabic ? "تم تحديث سجلك بناءً على مبارياتك الأخيرة" : "Your record has been updated based on your recent matches",
      type: "success",
      time: "3 hours ago",
      read: false
    },
    {
      id: 3,
      title: isArabic ? "لديك رسالة جديدة من فريق" : "You have a new message from team",
      description: isArabic ? "City Champions FC أرسل لك رسالة جديدة" : "City Champions FC sent you a new message",
      type: "info",
      time: "5 hours ago",
      read: true
    },
    {
      id: 4,
      title: isArabic ? "تم قبول طلبك" : "Your request has been accepted",
      description: isArabic ? "تم قبول طلبك للانضمام إلى فريق Desert Eagles" : "Your request to join Desert Eagles has been accepted",
      type: "success",
      time: "1 day ago",
      read: true
    }
  ];

  const getMessageIcon = (type: MessageType) => {
    switch (type) {
      case 'team': return <Users className="h-5 w-5" />;
      case 'tournament': return <Trophy className="h-5 w-5" />;
      case 'sponsor': return <Building2 className="h-5 w-5" />;
      case 'admin': return <Shield className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBadgeVariant = (type: MessageType) => {
    switch (type) {
      case 'team': return 'default';
      case 'tournament': return 'secondary';
      case 'sponsor': return 'outline';
      case 'admin': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || msg.senderType === filterType;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => !m.read).length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      setMessages(messages.map(m => m.id === message.id ? { ...m, read: true } : m));
    }
  };

  const handleStarMessage = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(messages.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
    toast({
      title: "Message starred",
      variant: "default",
    });
  };

  const handleDeleteMessage = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(messages.filter(m => m.id !== id));
    toast({
      title: isArabic ? "تم حذف الرسالة" : "Message deleted",
      variant: "default",
    });
  };

  const handleArchiveMessage = (message: Message) => {
    setMessages(messages.filter(m => m.id !== message.id));
    setArchivedMessages([...archivedMessages, message]);
    setSelectedMessage(null);
    toast({
      title: isArabic ? "تم أرشفة الرسالة" : "Message archived",
      description: isArabic ? "يمكنك العثور عليها في الأرشيف" : "You can find it in the archived section",
      variant: "default",
    });
  };

  const handleReplyMessage = () => {
    if (!selectedMessage || !replyText.trim()) {
      toast({
        title: isArabic ? "الرجاء إدخال رد" : "Please enter a reply",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending reply
    setShowReplyDialog(false);
    setReplyText("");
    toast({
      title: isArabic ? "تم إرسال الرد" : "Reply sent",
      description: isArabic ? "تم إرسال ردك بنجاح" : "Your reply has been sent successfully",
      variant: "default",
    });
  };

  const markAllAsRead = () => {
    setMessages(messages.map(m => ({ ...m, read: true })));
    toast({
      title: isArabic ? "تم قراءة جميع الرسائل" : "All messages marked as read",
      variant: "default",
    });
  };

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={cn("text-3xl font-bold", isArabic && "font-arabic-heading")}>
                {isArabic ? 'الرسائل والإشعارات' : 'Messages & Notifications'}
              </h1>
        <p className={cn("text-muted-foreground", isArabic && "font-arabic-body")}>
                {isArabic ? 'إدارة رسائلك وإشعاراتك' : 'Manage your messages and notifications'}
              </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'الرسائل غير المقروءة' : 'Unread Messages'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  {unreadCount}
                </p>
              </div>
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'الإشعارات غير المقروءة' : 'Unread Notifications'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  {unreadNotifications}
                </p>
              </div>
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm font-medium text-muted-foreground", isArabic && "font-arabic-body")}>
                  {isArabic ? 'إجمالي الرسائل' : 'Total Messages'}
                </p>
                <p className={cn("text-2xl font-bold", isArabic && "font-arabic-heading")}>
                  {messages.length}
                </p>
          </div>
              <Send className="h-8 w-8 text-muted-foreground" />
        </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={(tab) => {
          setActiveTab(tab);
          router.push(`/player/messages?tab=${tab}`);
        }} 
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="messages">
            <Mail className="h-4 w-4 mr-2" />
            {isArabic ? 'الرسائل' : 'Messages'}
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            {isArabic ? 'الإشعارات' : 'Notifications'}
            {unreadNotifications > 0 && (
              <Badge variant="secondary" className="ml-2">{unreadNotifications}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          {/* Filters and Search */}
          <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={isArabic ? "بحث الرسائل..." : "Search messages..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
            </div>
            <Button size="sm" variant="outline" onClick={markAllAsRead}>
              {isArabic ? 'قراءة الكل' : 'Mark All Read'}
            </Button>
            </div>

          {/* Message List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {filteredMessages.map((message) => (
                  <motion.div
                  key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={() => handleMessageClick(message)}
                  >
                    <Card className={cn(
                      "cursor-pointer hover:shadow-md transition-all",
                      !message.read && "border-primary bg-primary/5",
                      selectedMessage?.id === message.id && "ring-2 ring-primary"
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                            message.senderType === 'team' && "bg-blue-500/10 text-blue-600",
                            message.senderType === 'tournament' && "bg-purple-500/10 text-purple-600",
                            message.senderType === 'sponsor' && "bg-orange-500/10 text-orange-600",
                            message.senderType === 'admin' && "bg-red-500/10 text-red-600",
                            message.senderType === 'system' && "bg-gray-500/10 text-gray-600"
                          )}>
                            {getMessageIcon(message.senderType)}
                      </div>
                      <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <p className={cn("font-semibold truncate", isArabic && "font-arabic-heading")}>
                            {message.sender}
                          </p>
                          {!message.read && (
                                  <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                          )}
                              </div>
                              <div className="flex gap-1 shrink-0 ml-2">
                                {message.starred && <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />}
                              </div>
                        </div>
                        <p className={cn(
                              "text-sm truncate",
                              !message.read && "font-semibold",
                              isArabic && "font-arabic-body"
                        )}>
                          {message.subject}
                        </p>
                            <p className={cn("text-xs text-muted-foreground truncate mt-1", isArabic && "font-arabic-body")}>
                          {message.preview}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                              <span className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                            {message.date}
                          </span>
                              <Badge variant={getBadgeVariant(message.senderType)} className="text-xs">
                                {message.senderType}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={(e) => handleStarMessage(message.id, e)}
                            >
                              <Star className={cn("h-4 w-4", message.starred && "fill-yellow-500 text-yellow-500")} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={(e) => handleDeleteMessage(message.id, e)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredMessages.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className={cn("text-lg font-medium mb-2", isArabic && "font-arabic-body")}>
                      {isArabic ? 'لا توجد رسائل' : 'No messages found'}
                    </p>
                    <p className={cn("text-sm text-muted-foreground text-center", isArabic && "font-arabic-body")}>
                      {isArabic ? 'حاول تعديل فلاتر البحث' : 'Try adjusting your search filters'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Message Preview */}
            {selectedMessage ? (
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="sticky top-6"
                >
                  <Card>
                    <CardHeader className="border-b">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            selectedMessage.senderType === 'team' && "bg-blue-500/10 text-blue-600",
                            selectedMessage.senderType === 'tournament' && "bg-purple-500/10 text-purple-600",
                            selectedMessage.senderType === 'sponsor' && "bg-orange-500/10 text-orange-600",
                            selectedMessage.senderType === 'admin' && "bg-red-500/10 text-red-600"
                          )}>
                            {getMessageIcon(selectedMessage.senderType)}
                          </div>
                          <div>
                            <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                              {selectedMessage.sender}
                            </CardTitle>
                            <Badge variant={getBadgeVariant(selectedMessage.senderType)} className="mt-1">
                              {selectedMessage.senderType}
                          </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <p className={cn("font-semibold mb-2", isArabic && "font-arabic-heading")}>
                            {selectedMessage.subject}
                          </p>
                          <p className={cn("text-sm text-muted-foreground mb-2", isArabic && "font-arabic-body")}>
                            {selectedMessage.date}
                          </p>
                        </div>
                        <div className="border-t pt-4">
                          <p className={cn("text-sm whitespace-pre-wrap", isArabic && "font-arabic-body")}>
                            {selectedMessage.body}
                          </p>
                        </div>
                        <div className="flex gap-2 pt-4 border-t">
                          <Button 
                            className="flex-1" 
                            onClick={() => setShowReplyDialog(true)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            {isArabic ? 'رد' : 'Reply'}
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleArchiveMessage(selectedMessage)}
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            {isArabic ? 'أرشفة' : 'Archive'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                    </div>
            ) : (
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className={cn("text-sm text-muted-foreground text-center", isArabic && "font-arabic-body")}>
                      {isArabic ? 'اختر رسالة لعرض التفاصيل' : 'Select a message to view details'}
                    </p>
                  </CardContent>
                </Card>
            </div>
            )}
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
              <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
                  <Bell className="h-5 w-5" />
                {isArabic ? 'الإشعارات الحديثة' : 'Recent Notifications'}
                </CardTitle>
              </CardHeader>
            <CardContent className="space-y-3">
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-lg border transition-colors",
                      !notification.read && "bg-primary/5 border-primary",
                      notification.read && "hover:bg-muted/50"
                    )}
                  >
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={cn(
                            "font-medium",
                            !notification.read && "font-semibold",
                            isArabic && "font-arabic-body"
                          )}>
                            {notification.title}
                          </p>
                          <p className={cn("text-sm text-muted-foreground mt-1", isArabic && "font-arabic-body")}>
                            {notification.description}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary ml-2" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className={cn("text-xs text-muted-foreground", isArabic && "font-arabic-body")}>
                        {notification.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className={cn(isArabic && "font-arabic-heading")}>
              {isArabic ? 'إرسال رد' : 'Reply to Message'}
            </DialogTitle>
            <DialogDescription className={cn(isArabic && "font-arabic-body")}>
              {selectedMessage && (
                <span>
                  {isArabic ? 'الرد على: ' : 'Replying to: '}
                  <strong>{selectedMessage.sender}</strong>
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-lg border p-4 bg-muted/50">
              <p className={cn("text-sm font-medium mb-2", isArabic && "font-arabic-body")}>
                {selectedMessage?.subject}
              </p>
              <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                {selectedMessage?.body}
              </p>
            </div>

            <div className="space-y-2">
              <label className={cn("text-sm font-medium", isArabic && "font-arabic-body")}>
                {isArabic ? 'رسالتك' : 'Your message'}
              </label>
              <Textarea
                placeholder={isArabic ? "اكتب ردك هنا..." : "Type your reply here..."}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={8}
                className={cn(isArabic && "font-arabic-body")}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowReplyDialog(false);
              setReplyText("");
            }}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleReplyMessage}>
              <Send className="h-4 w-4 mr-2" />
              {isArabic ? 'إرسال' : 'Send Reply'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Archive Section */}
      {archivedMessages.length > 0 && !showArchivedView && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                {isArabic ? 'الأرشيف' : 'Archive'}
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowArchivedView(true)}
              >
                {isArabic ? 'عرض الأرشيف' : 'View Archive'}
                <Archive className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <CardDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic 
                ? `${archivedMessages.length} رسالة في الأرشيف` 
                : `${archivedMessages.length} message${archivedMessages.length > 1 ? 's' : ''} in archive`
              }
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Archived Messages View */}
      {showArchivedView && (
        <Card className="mt-6">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className={cn(isArabic && "font-arabic-heading")}>
                {isArabic ? 'الرسائل المؤرشفة' : 'Archived Messages'}
              </CardTitle>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setShowArchivedView(false)}
              >
                {isArabic ? 'إغلاق' : 'Close'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            {archivedMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Archive className="h-12 w-12 text-muted-foreground mb-4" />
                <p className={cn("text-lg font-medium mb-2", isArabic && "font-arabic-body")}>
                  {isArabic ? 'لا توجد رسائل مؤرشفة' : 'No archived messages'}
                </p>
              </div>
            ) : (
              archivedMessages.map((message) => (
                <Card key={message.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        message.senderType === 'team' && "bg-blue-500/10 text-blue-600",
                        message.senderType === 'tournament' && "bg-purple-500/10 text-purple-600",
                        message.senderType === 'sponsor' && "bg-orange-500/10 text-orange-600"
                      )}>
                        {getMessageIcon(message.senderType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("font-semibold truncate", isArabic && "font-arabic-heading")}>
                          {message.sender}
                        </p>
                        <p className={cn("text-sm truncate", isArabic && "font-arabic-body")}>
                          {message.subject}
                        </p>
                        <p className={cn("text-xs text-muted-foreground truncate mt-1", isArabic && "font-arabic-body")}>
                          {message.date}
                        </p>
        </div>
                      <Archive className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

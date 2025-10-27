"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Headphones,
  FileText,
  Clock,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SupportPageClient({ locale }: { locale: string }) {
  const { locale: currentLocale } = useLanguage();
  const t = getClientTranslation(currentLocale as any);
  const isArabic = currentLocale === 'ar';
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: isArabic ? "تم إرسال رسالتك!" : "Message Sent!",
      description: isArabic
        ? "شكراً لتواصلك معنا. سنرد عليك قريباً."
        : "Thank you for contacting us. We'll get back to you soon.",
      variant: "default",
    });

    setFormData({ name: '', email: '', category: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: isArabic ? "البريد الإلكتروني" : "Email",
      description: "support@ficro.com",
      value: "support@ficro.com"
    },
    {
      icon: Phone,
      title: isArabic ? "الهاتف" : "Phone",
      description: "+971 XX XXX XXXX",
      value: "+971123456789"
    },
    {
      icon: MapPin,
      title: isArabic ? "العنوان" : "Address",
      description: isArabic ? "دبي، الإمارات العربية المتحدة" : "Dubai, UAE",
      value: "Dubai, UAE"
    },
    {
      icon: Clock,
      title: isArabic ? "ساعات العمل" : "Working Hours",
      description: "9AM - 6PM (GMT+4)",
      value: "Mon-Fri 9AM-6PM"
    }
  ];

  const faqs = [
    {
      question: isArabic ? "كيف يمكنني التسجيل كلاعب؟" : "How can I register as a player?",
      answer: isArabic
        ? "يمكنك التسجيل من خلال الانتقال إلى صفحة التسجيل واختيار 'انضم كلاعب' وملء النموذج."
        : "You can register by going to the registration page and selecting 'Join as Player' and filling out the form."
    },
    {
      question: isArabic ? "كيف أحجز ملعب؟" : "How do I book a facility?",
      answer: isArabic
        ? "انتقل إلى صفحة المرافق، ابحث عن المرفق الذي تريده، واختر التاريخ والوقت المناسبين."
        : "Go to the facilities page, search for your desired facility, and select your preferred date and time."
    },
    {
      question: isArabic ? "كيف أشارك في بطولة؟" : "How do I participate in a tournament?",
      answer: isArabic
        ? "تصفح البطولات المتاحة، ابحث عن بطولة مناسبة، وانقر على 'التسجيل' لبدء التسجيل."
        : "Browse available tournaments, find a suitable one, and click 'Register' to start your enrollment."
    },
    {
      question: isArabic ? "هل يمكنني تحميل مقاطع فيديو؟" : "Can I upload videos?",
      answer: isArabic
        ? "نعم، يمكن للاعبين والمشاركين المسجلين تحميل مقاطع الفيديو واللقطات البارزة على منصة YouSport."
        : "Yes, registered players and participants can upload videos and highlights on the YouSport platform."
    },
    {
      question: isArabic ? "كيف أعرض فرص الرعاية؟" : "How do I view sponsorship opportunities?",
      answer: isArabic
        ? "انتقل إلى لوحة تحكم اللاعب واختر 'الفرص والرعاية' لعرض العروض المتاحة."
        : "Go to your player dashboard and select 'Opportunities' to view available offers."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={cn("text-4xl md:text-5xl font-bold mb-4", isArabic && "font-arabic-heading")}>
                {isArabic ? "مركز الدعم" : "Support Center"}
              </h1>
              <p className={cn("text-lg text-muted-foreground", isArabic && "font-arabic-body")}>
                {isArabic
                  ? "نحن هنا لمساعدتك. تواصل معنا بأي أسئلة أو استفسارات."
                  : "We're here to help. Contact us with any questions or inquiries."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
                  <MessageSquare className="h-5 w-5" />
                  {isArabic ? "إرسال رسالة" : "Send us a Message"}
                </CardTitle>
                <CardDescription className={cn(isArabic && "font-arabic-body")}>
                  {isArabic
                    ? "املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن"
                    : "Fill out the form below and we'll get back to you as soon as possible"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className={cn(isArabic && "font-arabic-body")}>
                        {isArabic ? "الاسم الكامل" : "Full Name"} *
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isArabic ? "اسمك الكامل" : "Your full name"}
                        required
                        className={cn(isArabic && "font-arabic-body")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className={cn(isArabic && "font-arabic-body")}>
                        {isArabic ? "البريد الإلكتروني" : "Email"} *
                      </Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={isArabic ? "example@email.com" : "example@email.com"}
                        required
                        className={cn(isArabic && "font-arabic-body")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isArabic && "font-arabic-body")}>
                      {isArabic ? "الفئة" : "Category"} *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className={cn(isArabic && "font-arabic-body")}>
                        <SelectValue placeholder={isArabic ? "اختر الفئة" : "Select category"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">
                          {isArabic ? "عام" : "General Inquiry"}
                        </SelectItem>
                        <SelectItem value="technical">
                          {isArabic ? "مشكلة تقنية" : "Technical Issue"}
                        </SelectItem>
                        <SelectItem value="account">
                          {isArabic ? "مشكلة في الحساب" : "Account Issue"}
                        </SelectItem>
                        <SelectItem value="payment">
                          {isArabic ? "مشكلة في الدفع" : "Payment Issue"}
                        </SelectItem>
                        <SelectItem value="tournament">
                          {isArabic ? "البطولات" : "Tournaments"}
                        </SelectItem>
                        <SelectItem value="facility">
                          {isArabic ? "المرافق" : "Facilities"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isArabic && "font-arabic-body")}>
                      {isArabic ? "الموضوع" : "Subject"} *
                    </Label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={isArabic ? "موضوع الرسالة" : "Message subject"}
                      required
                      className={cn(isArabic && "font-arabic-body")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className={cn(isArabic && "font-arabic-body")}>
                      {isArabic ? "الرسالة" : "Message"} *
                    </Label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isArabic ? "اكتب رسالتك هنا..." : "Write your message here..."}
                      rows={6}
                      required
                      className={cn(isArabic && "font-arabic-body")}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        {isArabic ? "جارٍ الإرسال..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {isArabic ? "إرسال الرسالة" : "Send Message"}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
                  <Headphones className="h-5 w-5" />
                  {isArabic ? "تواصل معنا" : "Get in Touch"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={cn("font-semibold text-sm", isArabic && "font-arabic-heading")}>
                          {info.title}
                        </p>
                        <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                          {info.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className={cn("flex items-center gap-2", isArabic && "font-arabic-heading")}>
              <HelpCircle className="h-5 w-5" />
              {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </CardTitle>
            <CardDescription className={cn(isArabic && "font-arabic-body")}>
              {isArabic
                ? "إجابات سريعة لأسئلتك الأكثر شيوعاً"
                : "Quick answers to your most common questions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <h3 className={cn("font-semibold mb-2 flex items-center gap-2", isArabic && "font-arabic-heading")}>
                    <FileText className="h-4 w-4 text-primary" />
                    {faq.question}
                  </h3>
                  <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic-body")}>
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


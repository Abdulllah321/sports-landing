"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Target, 
  Eye, 
  Users, 
  TrendingUp, 
  BarChart3, 
  MapPin, 
  Calendar,
  DollarSign,
  CheckCircle,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Building,
  Send
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Image from "next/image";

interface AdvertisePageClientProps {
  locale: Locale;
}

export function AdvertisePageClient({ locale }: AdvertisePageClientProps) {
  const [activeTab, setActiveTab] = useState("packages");
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    budget: "",
    duration: "",
    targetAudience: "",
    message: ""
  });

  const isArabic = locale === 'ar';

  const adPackages = [
    {
      name: isArabic ? 'الباقة البرونزية' : 'Bronze Package',
      price: isArabic ? '500$' : '$500',
      duration: isArabic ? 'شهر واحد' : '1 Month',
      features: [
        isArabic ? 'إعلان في الصفحة الرئيسية' : 'Homepage banner ad',
        isArabic ? '10,000 عرض' : '10,000 impressions',
        isArabic ? 'تقرير شهري' : 'Monthly report',
        isArabic ? 'دعم عبر البريد الإلكتروني' : 'Email support'
      ],
      color: 'bg-orange-500',
      popular: false
    },
    {
      name: isArabic ? 'الباقة الفضية' : 'Silver Package',
      price: isArabic ? '1,200$' : '$1,200',
      duration: isArabic ? '3 أشهر' : '3 Months',
      features: [
        isArabic ? 'إعلان في الصفحة الرئيسية + الأحداث' : 'Homepage + Events page ads',
        isArabic ? '50,000 عرض' : '50,000 impressions',
        isArabic ? 'تقرير أسبوعي' : 'Weekly reports',
        isArabic ? 'دعم أولوية' : 'Priority support',
        isArabic ? 'استهداف متقدم' : 'Advanced targeting'
      ],
      color: 'bg-gray-400',
      popular: true
    },
    {
      name: isArabic ? 'الباقة الذهبية' : 'Gold Package',
      price: isArabic ? '2,500$' : '$2,500',
      duration: isArabic ? '6 أشهر' : '6 Months',
      features: [
        isArabic ? 'إعلانات في جميع الصفحات' : 'Ads on all pages',
        isArabic ? '150,000 عرض' : '150,000 impressions',
        isArabic ? 'تقرير يومي' : 'Daily reports',
        isArabic ? 'دعم مخصص' : 'Dedicated support',
        isArabic ? 'استهداف متقدم + تحليلات' : 'Advanced targeting + Analytics',
        isArabic ? 'إعلانات فيديو' : 'Video ads'
      ],
      color: 'bg-yellow-500',
      popular: false
    }
  ];

  const placementMap = [
    { position: isArabic ? 'أعلى الصفحة الرئيسية' : 'Homepage Top', impressions: '15,000', ctr: '3.2%', price: '$200' },
    { position: isArabic ? 'شريط جانبي' : 'Sidebar', impressions: '8,500', ctr: '2.8%', price: '$150' },
    { position: isArabic ? 'صفحة الأحداث' : 'Events Page', impressions: '12,000', ctr: '4.1%', price: '$180' },
    { position: isArabic ? 'صفحة البطولات' : 'Tournaments Page', impressions: '9,200', ctr: '3.7%', price: '$160' },
    { position: isArabic ? 'صفحة الأكاديميات' : 'Academies Page', impressions: '6,800', ctr: '2.9%', price: '$120' },
    { position: isArabic ? 'صفحة اللاعبين' : 'Player Dashboard', impressions: '18,500', ctr: '5.2%', price: '$250' }
  ];

  const sampleReports = [
    {
      title: isArabic ? 'تقرير الأداء الشهري' : 'Monthly Performance Report',
      metrics: {
        impressions: '45,230',
        clicks: '1,847',
        ctr: '4.08%',
        conversions: '234'
      }
    },
    {
      title: isArabic ? 'تحليل الجمهور' : 'Audience Analysis',
      metrics: {
        age18_24: '35%',
        age25_34: '42%',
        male: '68%',
        female: '32%'
      }
    },
    {
      title: isArabic ? 'المناطق الجغرافية' : 'Geographic Reach',
      metrics: {
        uae: '45%',
        saudi: '28%',
        egypt: '15%',
        other: '12%'
      }
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Campaign request submitted:', formData);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="packages">
          {isArabic ? 'الباقات' : 'Packages'}
        </TabsTrigger>
        <TabsTrigger value="placements">
          {isArabic ? 'مواضع الإعلان' : 'Ad Placements'}
        </TabsTrigger>
        <TabsTrigger value="reports">
          {isArabic ? 'التقارير' : 'Reports'}
        </TabsTrigger>
        <TabsTrigger value="contact">
          {isArabic ? 'اتصل بنا' : 'Contact Us'}
        </TabsTrigger>
      </TabsList>

      {/* Ad Packages Tab */}
      <TabsContent value="packages" className="space-y-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
            {isArabic ? 'باقات الإعلان' : 'Advertising Packages'}
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
            {isArabic ? 'اختر الباقة التي تناسب احتياجاتك وميزانيتك' : 'Choose the package that fits your needs and budget'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adPackages.map((pkg, index) => (
            <Card key={index} className={`relative ${pkg.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  {isArabic ? 'الأكثر شعبية' : 'Most Popular'}
                </Badge>
              )}
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${pkg.color} mx-auto mb-4 flex items-center justify-center`}>
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className={`text-2xl ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {pkg.name}
                </CardTitle>
                <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                  {pkg.duration}
                </CardDescription>
                <div className="text-4xl font-bold text-primary mt-4">
                  {pkg.price}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className={`text-sm ${isArabic ? 'font-arabic-body' : ''}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${pkg.popular ? 'bg-primary hover:bg-primary/90' : ''}`}>
                  {isArabic ? 'اختر الباقة' : 'Choose Package'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Ad Placements Tab */}
      <TabsContent value="placements" className="space-y-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
            {isArabic ? 'خريطة مواضع الإعلان' : 'Ad Placement Map'}
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
            {isArabic ? 'استكشف أفضل المواضع لإعلاناتك على منصتنا' : 'Explore the best placements for your ads on our platform'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Placement Map Visual */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'خريطة الموقع' : 'Site Map'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="h-8 bg-primary/20 rounded mb-2 flex items-center justify-center">
                    <span className={`text-xs font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'الصفحة الرئيسية' : 'Homepage'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-6 bg-accent/30 rounded flex items-center justify-center">
                      <span className={`text-xs ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic ? 'أعلى' : 'Top'}
                      </span>
                    </div>
                    <div className="h-6 bg-accent/30 rounded flex items-center justify-center">
                      <span className={`text-xs ${isArabic ? 'font-arabic-body' : ''}`}>
                        {isArabic ? 'جانبي' : 'Sidebar'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-3 rounded">
                    <div className="h-6 bg-primary/20 rounded mb-1"></div>
                    <span className={`text-xs ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'الأحداث' : 'Events'}
                    </span>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <div className="h-6 bg-primary/20 rounded mb-1"></div>
                    <span className={`text-xs ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'البطولات' : 'Tournaments'}
                    </span>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <div className="h-6 bg-primary/20 rounded mb-1"></div>
                    <span className={`text-xs ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'الأكاديميات' : 'Academies'}
                    </span>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <div className="h-6 bg-primary/20 rounded mb-1"></div>
                    <span className={`text-xs ${isArabic ? 'font-arabic-body' : ''}`}>
                      {isArabic ? 'اللاعبين' : 'Players'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Placement Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'إحصائيات المواضع' : 'Placement Statistics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {placementMap.map((placement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                        {placement.position}
                      </h4>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{placement.impressions} {isArabic ? 'عرض' : 'impressions'}</span>
                        <span>{placement.ctr} CTR</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{placement.price}</div>
                      <div className="text-xs text-muted-foreground">
                        {isArabic ? 'شهرياً' : 'monthly'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Reports Tab */}
      <TabsContent value="reports" className="space-y-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
            {isArabic ? 'عينة من التقارير' : 'Sample Reports'}
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
            {isArabic ? 'اطلع على نوع التقارير التي ستحصل عليها' : 'See what kind of reports you\'ll receive'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleReports.map((report, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className={`text-lg ${isArabic ? 'font-arabic-heading' : ''}`}>
                  {report.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(report.metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sample Screenshots */}
        <Card>
          <CardHeader>
            <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
              {isArabic ? 'لقطات شاشة للتقارير' : 'Report Screenshots'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className={`font-semibold mb-2 ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'تقرير الأداء' : 'Performance Dashboard'}
                </h3>
                <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'رسوم بيانية تفاعلية ومؤشرات الأداء الرئيسية' : 'Interactive charts and key performance indicators'}
                </p>
              </div>
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className={`font-semibold mb-2 ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'تحليل الجمهور' : 'Audience Analytics'}
                </h3>
                <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'تفاصيل ديموغرافية وسلوكية للجمهور المستهدف' : 'Demographic and behavioral details of your target audience'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Contact Tab */}
      <TabsContent value="contact" className="space-y-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'font-arabic-heading' : ''}`}>
            {isArabic ? 'اطلب حملة إعلانية' : 'Request Campaign'}
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${isArabic ? 'font-arabic-body' : ''}`}>
            {isArabic ? 'املأ النموذج وسنتواصل معك خلال 24 ساعة' : 'Fill out the form and we\'ll get back to you within 24 hours'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'نموذج الطلب' : 'Request Form'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'اسم الشركة' : 'Company Name'}
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder={isArabic ? 'أدخل اسم الشركة' : 'Enter company name'}
                      className={isArabic ? 'font-arabic-body' : ''}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'اسم جهة الاتصال' : 'Contact Person'}
                    </Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      placeholder={isArabic ? 'أدخل اسم جهة الاتصال' : 'Enter contact person name'}
                      className={isArabic ? 'font-arabic-body' : ''}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder={isArabic ? 'أدخل البريد الإلكتروني' : 'Enter email address'}
                      className={isArabic ? 'font-arabic-body' : ''}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder={isArabic ? 'أدخل رقم الهاتف' : 'Enter phone number'}
                      className={isArabic ? 'font-arabic-body' : ''}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'الميزانية' : 'Budget'}
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                      <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                        <SelectValue placeholder={isArabic ? 'اختر الميزانية' : 'Select budget'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500-1000">{isArabic ? '500$ - 1,000$' : '$500 - $1,000'}</SelectItem>
                        <SelectItem value="1000-2500">{isArabic ? '1,000$ - 2,500$' : '$1,000 - $2,500'}</SelectItem>
                        <SelectItem value="2500-5000">{isArabic ? '2,500$ - 5,000$' : '$2,500 - $5,000'}</SelectItem>
                        <SelectItem value="5000+">{isArabic ? '5,000$+' : '$5,000+'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className={isArabic ? 'font-arabic-body' : ''}>
                      {isArabic ? 'مدة الحملة' : 'Campaign Duration'}
                    </Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                      <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                        <SelectValue placeholder={isArabic ? 'اختر المدة' : 'Select duration'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-month">{isArabic ? 'شهر واحد' : '1 Month'}</SelectItem>
                        <SelectItem value="3-months">{isArabic ? '3 أشهر' : '3 Months'}</SelectItem>
                        <SelectItem value="6-months">{isArabic ? '6 أشهر' : '6 Months'}</SelectItem>
                        <SelectItem value="1-year">{isArabic ? 'سنة واحدة' : '1 Year'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience" className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'الجمهور المستهدف' : 'Target Audience'}
                  </Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    placeholder={isArabic ? 'صف جمهورك المستهدف' : 'Describe your target audience'}
                    className={isArabic ? 'font-arabic-body' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className={isArabic ? 'font-arabic-body' : ''}>
                    {isArabic ? 'رسالة إضافية' : 'Additional Message'}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder={isArabic ? 'أي معلومات إضافية تريد مشاركتها...' : 'Any additional information you\'d like to share...'}
                    className={`min-h-32 ${isArabic ? 'font-arabic-body' : ''}`}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {isArabic ? 'إرسال الطلب' : 'Send Request'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </h4>
                  <p className={`text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    advertise@ficro.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'الهاتف' : 'Phone'}
                  </h4>
                  <p className={`text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    +971 4 123 4567
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className={`font-semibold ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'العنوان' : 'Address'}
                  </h4>
                  <p className={`text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates'}
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className={`font-semibold mb-2 ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'ساعات العمل' : 'Business Hours'}
                </h4>
                <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'الأحد - الخميس: 9:00 ص - 6:00 م' : 'Sunday - Thursday: 9:00 AM - 6:00 PM'}
                </p>
                <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                  {isArabic ? 'الجمعة - السبت: مغلق' : 'Friday - Saturday: Closed'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}

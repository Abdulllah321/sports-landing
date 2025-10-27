"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard,
  User,
  Trophy,
  Users,
  MessageCircle,
  Bell,
  Briefcase,
  Wallet,
  TrendingUp,
  Settings,
  LogOut
} from "lucide-react";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";

export function PlayerSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useLanguage();
  const t = getClientTranslation(locale);
  const isArabic = locale === 'ar';

  const navItems = [
    {
      title: isArabic ? 'لوحة التحكم' : 'Dashboard',
      icon: LayoutDashboard,
      href: '/player/dashboard',
    },
    {
      title: isArabic ? 'الملف الشخصي' : 'Profile',
      icon: User,
      href: '/player/profile',
    },
    {
      title: isArabic ? 'البطولات' : 'Tournaments',
      icon: Trophy,
      href: '/player/tournaments',
    },
    {
      title: isArabic ? 'الأداء' : 'Performance',
      icon: TrendingUp,
      href: '/player/performance',
    },
    {
      title: isArabic ? 'الفرق والاتصالات' : 'Teams & Connections',
      icon: Users,
      href: '/player/teams',
    },
    {
      title: isArabic ? 'الرسائل' : 'Messages',
      icon: MessageCircle,
      href: '/player/messages?tab=messages',
    },
    {
      title: isArabic ? 'الإشعارات' : 'Notifications',
      icon: Bell,
      href: '/player/messages?tab=notifications',
    },
    {
      title: isArabic ? 'الفرص والرعاية' : 'Opportunities',
      icon: Briefcase,
      href: '/player/opportunities',
    },
    {
      title: isArabic ? 'المحفظة' : 'Wallet',
      icon: Wallet,
      href: '/player/wallet',
    },
    {
      title: isArabic ? 'الإعدادات' : 'Settings',
      icon: Settings,
      href: '/player/settings',
    },
  ];

  return (
    <aside 
      className={cn(
        "w-64 bg-card border-r flex flex-col shrink-0",
        "sticky top-20 h-max rounded-lg"
      )}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className={cn(
              "text-sm font-semibold",
              isArabic && 'font-arabic-heading'
            )}>
              {isArabic ? 'لوحة اللاعب' : 'Player Panel'}
            </h2>
            <p className={cn(
              "text-xs text-muted-foreground",
              isArabic && 'font-arabic-body'
            )}>
              {isArabic ? 'الإصدار الاحترافي' : 'Pro Version'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          let isActive = pathname === item.href || pathname?.startsWith(item.href.split('?')[0] + '/');
          
          // Special handling for messages/notifications
          if (pathname === '/player/messages') {
            const urlParams = new URLSearchParams(item.href.split('?')[1] || '');
            const tabParam = urlParams.get('tab');
            const currentTab = searchParams?.get('tab') || 'messages';
            
            if (tabParam === 'messages' && currentTab === 'messages') {
              isActive = true;
            } else if (tabParam === 'notifications' && currentTab === 'notifications') {
              isActive = true;
            } else if (!tabParam && currentTab === 'messages' && item.href.includes('messages')) {
              isActive = true;
            }
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                "hover:bg-muted",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className={cn(
                "text-sm font-medium",
                isArabic && 'font-arabic-body'
              )}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
            "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          )}
        >
          <LogOut className="h-5 w-5" />
          <span className={cn(
            "text-sm font-medium",
            isArabic && 'font-arabic-body'
          )}>
            {isArabic ? 'تسجيل الخروج' : 'Logout'}
          </span>
        </Link>
      </div>
    </aside>
  );
}


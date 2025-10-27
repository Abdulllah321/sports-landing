"use client";

import { PlayerSidebar } from "@/components/player-sidebar";
import { useLanguage } from "@/lib/translation-context";
import { cn } from "@/lib/utils";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useLanguage();
  const isArabic = locale === 'ar';

  return (
    <div className={cn(
      "flex min-h-screen w-full gap-4 container mx-auto my-4",
      isArabic && 'rtl'
    )}>
      <PlayerSidebar />
      <main className="flex-1 w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20 rounded-lg ">
        {children}
      </main>
    </div>
  );
}


import { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  // Don't wrap with header/footer for full-screen onboarding
  return <>{children}</>;
}


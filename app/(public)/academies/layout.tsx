import { ReactNode } from "react"

interface AcademiesLayoutProps {
  children: ReactNode
}

export default function AcademiesLayout({ children }: AcademiesLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}

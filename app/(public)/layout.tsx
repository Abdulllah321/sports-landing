import { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeaderServer } from "@/components/site-header-server"

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
            <SiteHeaderServer />
            <main>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

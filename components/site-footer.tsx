import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-7 w-7 rounded-md bg-primary" aria-hidden />
            <span>YouSport</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A unified platform for tournaments, facilities, academies, and the YouSport channel. Investor demo UI.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/tournaments">Tournaments</Link>
            </li>
            <li>
              <Link href="/facilities">Facilities</Link>
            </li>
            <li>
              <Link href="/yousport">YouSport</Link>
            </li>
            <li>
              <Link href="/academies">Academies</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/opportunities">Opportunities</Link>
            </li>
            <li>
              <Link href="/advertise">Advertise</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex items-center justify-between px-4 py-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} YouSport. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

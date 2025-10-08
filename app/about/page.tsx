export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">About Us</h1>
      <p className="mt-2 text-muted-foreground">
        Vision: accessible sports for everyone. Mission: unify tournaments, facilities, academies, and media.
      </p>

      <div className="prose mt-6 dark:prose-invert">
        <h2>Goals</h2>
        <ul>
          <li>Grow player participation and academy enrollments</li>
          <li>Increase venue utilization with transparent booking</li>
          <li>Enable revenue-sharing media via YouSport</li>
        </ul>
      </div>

      <div className="mt-8">
        <a href="/investor-pack-pdf.jpg" className="inline-flex rounded-lg border px-4 py-2 text-sm">
          Download Investor Pack (PDF)
        </a>
      </div>
    </section>
  )
}

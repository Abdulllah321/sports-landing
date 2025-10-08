import { StadiumCards } from "@/components/stadium-cards"

export default function FacilitiesIndex() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Facilities & Stadiums</h1>
      <p className="mt-2 text-muted-foreground">Find available fields and training venues.</p>
      <div className="mt-8">
        <StadiumCards />
      </div>
    </section>
  )
}

import { PRODUCTS } from "@/data/products"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"

export default function ProductDetail({ params }: { params: { id: string } }) {
  const p = PRODUCTS.find((x) => x.id === params.id)
  if (!p) return notFound()
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <SectionHeader title={p.name} subtitle={`$${p.price}`} align="left" />
      <div className="flex items-center gap-3">
        <Button className="bg-[color:var(--brand-600)] text-[color:var(--on-brand)] hover:bg-[color:var(--brand-700)]">
          Add to Cart (Stub)
        </Button>
        <Button variant="outline">Buy Now (Stub)</Button>
      </div>
    </main>
  )
}

import { notFound } from "next/navigation"

const projects = [
  { slug: "futsal-expansion", title: "Futsal League Expansion", amount: "$250k", use: "League ops & media" },
  { slug: "academy-scholarships", title: "Academy Scholarships", amount: "$180k", use: "Coaching & scholarships" },
]

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  if (!p) return notFound()
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 prose dark:prose-invert">
      <h1>{p.title}</h1>
      <p>
        <strong>Amount needed:</strong> {p.amount}
      </p>
      <p>
        <strong>Use of funds:</strong> {p.use}
      </p>
      <p>This is a demo project page. Replace with actual investment memo and due diligence materials.</p>
    </section>
  )
}

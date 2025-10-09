import { notFound } from "next/navigation"
import { news } from "@/data/news"

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = news.find((n) => n.slug === slug)
  if (!item) return notFound()
  return (
    <article className="container mx-auto px-4 py-12 md:py-16 prose dark:prose-invert">
      <h1>{item.title}</h1>
      <p className="text-muted-foreground">{item.excerpt}</p>
      <hr />
      <p>
        This article is part of the demo. Replace with your CMS content. Share buttons and related media can be added
        here.
      </p>
    </article>
  )
}

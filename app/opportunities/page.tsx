"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projects = [
  { slug: "futsal-expansion", title: "Futsal League Expansion", amount: "$250k", use: "League ops & media" },
  { slug: "academy-scholarships", title: "Academy Scholarships", amount: "$180k", use: "Coaching & scholarships" },
]

export default function OpportunitiesPage() {
  const [sent, setSent] = useState(false)
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Opportunities & Investments</h1>
      <p className="mt-2 text-muted-foreground">Talent showcases and investment projects.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.slug}>
            <CardHeader>
              <CardTitle className="text-base">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Needed: {p.amount}</p>
              <p className="text-sm text-muted-foreground">Use of funds: {p.use}</p>
              <Link className="text-sm text-accent underline underline-offset-4" href={`/opportunities/${p.slug}`}>
                Open
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-lg border bg-card p-4">
        <h2 className="text-sm font-medium">Express Interest</h2>
        {!sent ? (
          <form
            className="mt-3 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <Input placeholder="Your name" required />
            <Input placeholder="Organization" />
            <Input type="email" placeholder="Email" required />
            <Button type="submit" className="bg-primary text-foreground">
              Submit
            </Button>
          </form>
        ) : (
          <div className="text-sm text-accent">Thanks — we recorded your interest (demo).</div>
        )}
      </div>
    </section>
  )
}

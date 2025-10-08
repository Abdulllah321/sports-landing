"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdvertisePage() {
  const [sent, setSent] = useState(false)
  const packages = [
    { name: "Starter", price: "$1,000", features: ["Web placements", "2x social shoutouts"] },
    { name: "Growth", price: "$4,000", features: ["Homepage placement", "YouSport pre-rolls"] },
    { name: "Pro", price: "$10,000", features: ["Season sponsorship", "On-site signage (mock)"] },
  ]

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Advertise</h1>
      <p className="mt-2 text-muted-foreground">Ad package descriptions, placements map mock, and sample reporting.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {packages.map((p) => (
          <Card key={p.name}>
            <CardHeader>
              <CardTitle className="text-base">
                {p.name} — {p.price}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 max-w-xl rounded-lg border bg-card p-4">
        <h2 className="text-sm font-medium">Request campaign</h2>
        {!sent ? (
          <form
            className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <Input placeholder="Company" required />
            <Input placeholder="Contact name" required />
            <Input type="email" placeholder="Email" className="md:col-span-2" required />
            <Button type="submit" className="md:col-span-2 bg-primary text-foreground">
              Submit
            </Button>
          </form>
        ) : (
          <div className="text-sm text-accent">Thanks — campaign request sent (demo).</div>
        )}
      </div>
    </section>
  )
}

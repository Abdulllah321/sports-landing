"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { tournaments } from "@/data/tournaments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TournamentDetail({ params }: { params: { id: string } }) {
  const t = tournaments.find((x) => x.id === params.id)
  const [open, setOpen] = useState(false)
  const [team, setTeam] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  if (!t) return notFound()

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="rounded-xl border bg-card p-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{t.name}</h1>
        <p className="mt-2 text-muted-foreground">
          {t.city}, {t.country} — {t.date} — {t.type}
        </p>
        <div className="mt-6 flex gap-3">
          <Button className="bg-primary text-foreground" onClick={() => setOpen(true)}>
            Register team
          </Button>
          <Button variant="secondary" onClick={() => alert("Create tournament is a demo-only stub.")}>
            Create tournament
          </Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Schedule</h2>
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">Schedule will appear here.</div>
          <h2 className="text-lg font-semibold">Media</h2>
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">Photos and videos gallery (stub).</div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Rules & Info</h2>
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">
            Standard 7v7 rules with fair play policy.
          </div>
        </div>
      </div>

      {open && (
        <div className="mt-10 rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Team Registration</h3>
          {!submitted ? (
            <form
              className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <Input placeholder="Team name" value={team} onChange={(e) => setTeam(e.target.value)} required />
              <Input
                type="email"
                placeholder="Contact email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="md:col-span-2">
                <Button type="submit" className="bg-primary text-foreground">
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-sm text-muted-foreground">
              Pending approval — requires federation signoff. We recorded your request for the demo.
            </div>
          )}
        </div>
      )}
    </section>
  )
}

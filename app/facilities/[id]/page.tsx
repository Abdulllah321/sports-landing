"use client"

import { notFound } from "next/navigation"
import { facilities } from "@/data/facilities"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function FacilityDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const f = facilities.find((x) => x.id === id)
  const [booking, setBooking] = useState<{ name: string; email: string; when: string } | null>(null)
  const [submitted, setSubmitted] = useState(false)
  if (!f) return notFound()

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="rounded-xl border bg-card p-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{f.name}</h1>
        <p className="mt-2 text-muted-foreground">
          {f.city} — {f.type} — {f.price}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">Amenities: {f.amenities.join(", ")}</p>
        <div className="mt-6">
          <Button className="bg-primary text-foreground" onClick={() => setBooking({ name: "", email: "", when: "" })}>
            Book slot
          </Button>
        </div>
      </div>

      {booking && (
        <div className="mt-8 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Booking Form</h2>
          {!submitted ? (
            <form
              className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <Input
                placeholder="Your name"
                required
                value={booking.name}
                onChange={(e) => setBooking({ ...booking, name: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email"
                required
                value={booking.email}
                onChange={(e) => setBooking({ ...booking, email: e.target.value })}
              />
              <Input
                placeholder="Preferred date/time"
                required
                value={booking.when}
                onChange={(e) => setBooking({ ...booking, when: e.target.value })}
              />
              <div className="md:col-span-3">
                <Button type="submit" className="bg-primary text-foreground">
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Booking ID: DEMO-{Math.floor(Math.random() * 9999)}</p>
              <p>To complete booking, please login / integrate payments.</p>
              <Button variant="secondary" onClick={() => alert("Mock payment success!")}>
                Mock Pay
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

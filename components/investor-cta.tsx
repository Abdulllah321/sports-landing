"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InvestorCta() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In a real app, send to email/CRM. For demo we just mark as sent.
    setSent(true)
  }

  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-xl border bg-card p-6 md:flex-row">
      <div>
        <h3 className="text-lg font-semibold">Request Investor Pack</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get the deck and schedule time with our team. We’ll follow up within 2 business days.
        </p>
      </div>
      {sent ? (
        <div className="text-sm text-accent">Thanks! Your request has been received.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-3">
          <Input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Investor email"
          />
          <Button type="submit" className="bg-primary text-foreground hover:opacity-90">
            Request
          </Button>
        </form>
      )}
    </div>
  )
}

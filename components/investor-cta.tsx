"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
        <h3 className="text-lg font-semibold">Request Investment</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get the investor pack and schedule time with our team. We’ll follow up within 2 business days.
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary text-foreground hover:opacity-90">Open Form</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Investment</DialogTitle>
            <DialogDescription>Share your email and any brief note.</DialogDescription>
          </DialogHeader>
          {sent ? (
            <div className="text-sm text-primary">Thanks! Your request has been received.</div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Investor email"
              />
              <DialogFooter>
                <Button type="submit" className="bg-primary text-foreground hover:opacity-90">
                  Send Request
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

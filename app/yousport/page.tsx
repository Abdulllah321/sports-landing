"use client"

import { useState } from "react"
import { videos } from "@/data/videos"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default function YouSportPage() {
  const [open, setOpen] = useState<string | null>(null)
  const current = videos.find((v) => v.id === open)

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">YouSport Channel</h1>
      <p className="mt-2 text-muted-foreground">Public highlights and private content (stubbed).</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {videos.map((v) => (
          <div key={v.id} className="rounded-lg border bg-card p-4">
            <div className="mb-2 text-sm font-medium">{v.title}</div>
            {v.public ? (
              <Button className="bg-primary text-foreground" onClick={() => setOpen(v.id)}>
                Play
              </Button>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Private
                </span>
                <Button variant="secondary" onClick={() => alert("Request Access form (lead capture) submitted.")}>
                  Request Access
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {current?.public && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{current.title}</div>
              <Button variant="outline" onClick={() => setOpen(null)}>
                Close
              </Button>
            </div>
            <div className="mt-4 aspect-video overflow-hidden rounded-lg">
              <video controls className="h-full w-full">
                <source src={current.src!} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

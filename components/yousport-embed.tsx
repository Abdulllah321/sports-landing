"use client"

export function YouSportEmbed() {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border bg-card shadow">
      <video controls className="h-full w-full" poster="/public-yousport-highlight-frame.jpg">
        <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

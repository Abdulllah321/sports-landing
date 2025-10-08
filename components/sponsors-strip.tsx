"use client"

import Image from "next/image"

const logos = [
  { src: "/images/sponsor-1.png", alt: "Sponsor 1" },
  { src: "/images/sponsor-2.png", alt: "Sponsor 2" },
  { src: "/images/sponsor-3.png", alt: "Sponsor 3" },
  { src: "/images/sponsor-4.png", alt: "Sponsor 4" },
  { src: "/images/sponsor-5.png", alt: "Sponsor 5" },
  { src: "/images/sponsor-6.png", alt: "Sponsor 6" },
]

export function SponsorsStrip() {
  return (
    <section aria-label="Sponsors" className="relative border-y bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="relative overflow-hidden">
          <div className="marquee flex items-center gap-12 opacity-80 hover:opacity-100">
            {[...logos, ...logos].map((logo, idx) => (
              <div key={idx} className="shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain dark:invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee { width: max-content; will-change: transform; animation: scroll 28s linear infinite; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  )
}



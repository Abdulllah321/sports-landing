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
    <section aria-label="Sponsors" className="relative bg-muted border-y border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="relative overflow-hidden">
          <div className="marquee flex items-center gap-16">
            {[...logos, ...logos].map((logo, idx) => (
              <div key={idx} className="shrink-0 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain filter  opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          width: max-content;
          animation: scroll 20s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}



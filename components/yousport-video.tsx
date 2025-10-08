"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function YouSportVideo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-foreground/10 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="yousport-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-primary" />
              <path d="M0,10 L20,10 M10,0 L10,20" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#yousport-pattern)" />
        </svg>
      </div>
      
      <div className="container relative mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-balance text-3xl md:text-4xl font-extralight tracking-tight font-mono text-foreground">
            Latest YouSport Clip
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch public highlights from the community.
          </p>
        </div>
        
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card/95 to-card/90 shadow-2xl">
            <video 
              controls 
              className="h-full w-full object-cover" 
              poster="/public-yousport-highlight-frame.jpg"
              preload="metadata"
            >
              <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Video Overlay Info */}
          <div className="absolute top-6 left-6 z-10">
            <div className="bg-background/95 backdrop-blur-md rounded-full px-4 py-2 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-foreground">LIVE</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 z-10">
            <div className="bg-background/95 backdrop-blur-md rounded-full px-4 py-2 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">2.3K views</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/yousport" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl">
              Watch More Clips
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/yousport/upload" className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground px-8 py-4 rounded-xl font-semibold hover:from-secondary/90 hover:to-secondary/70 transition-all duration-300 shadow-lg hover:shadow-xl">
              Upload Your Clip
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

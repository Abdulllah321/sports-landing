"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Download, Calendar, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"

export function InvestorCta() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In a real app, send to email/CRM. For demo we just mark as sent.
    setSent(true)
  }

  return (
    <>
    
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-md rounded-2xl border border-border/50 p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Invest?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get the complete investor pack with financial projections, market analysis, 
                  and exclusive access to our founding team. We'll follow up within 24 hours.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Detailed Financial Projections</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Market Analysis Report</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Direct Team Access</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Request Investment Pack
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Request Investment Pack</DialogTitle>
                      <DialogDescription>
                        Get exclusive access to our investor materials and schedule a call with our team.
                      </DialogDescription>
                    </DialogHeader>
                    {sent ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                        <div className="text-lg font-semibold text-foreground mb-2">Request Received!</div>
                        <div className="text-muted-foreground">
                          We'll send you the investor pack and follow up within 24 hours.
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <Input
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 text-lg"
                            aria-label="Investor email"
                          />
                        </div>
                        <DialogFooter>
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                          >
                            Send Request
                          </Button>
                        </DialogFooter>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="secondary" 
                  className="rounded-xl "
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </>


  )
}

"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AccountPage() {
  const [user, setUser] = useState<string | null>(null)
  useEffect(() => {
    setUser(localStorage.getItem("ys_demo_user"))
  }, [])

  if (!user) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">My Account</h1>
        <p className="mt-2 text-muted-foreground">Login/Register is a demo-only stub.</p>
        <div className="mt-6 flex items-center gap-3">
          <Button
            className="bg-primary text-foreground"
            onClick={() => {
              localStorage.setItem("ys_demo_user", "demo@user")
              setUser("demo@user")
            }}
          >
            Demo user sign-in
          </Button>
          <Button variant="secondary" onClick={() => alert("Request real account sent (demo).")}>
            Request real account
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome, {user}. Wallet, Withdraw, CRM links are “Coming soon”.</p>

      <Tabs defaultValue="profile" className="mt-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>Demo profile info.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
            </CardHeader>
            <CardContent>Sample booking data (demo).</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Registrations</CardTitle>
            </CardHeader>
            <CardContent>Sample registrations (demo).</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inbox">
          <Card>
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
            </CardHeader>
            <CardContent>Leads/messages appear here (demo).</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}

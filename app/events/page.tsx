"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EventsPage() {
  const [voted, setVoted] = useState(false);
  const [needLogin, setNeedLogin] = useState(false);
  const [demoUser, setDemoUser] = useState<string | null>(null);

  useEffect(() => {
    setDemoUser(localStorage.getItem("ys_demo_user"));
  }, []);

  function handleVote() {
    if (!demoUser) {
      setNeedLogin(true);
      return;
    }
    setVoted(true);
  }

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Events & Contests
      </h1>
      <p className="mt-2 text-muted-foreground">
        One public contest is interactive; others are UI stubs.
      </p>

      <div className="mt-8 rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Fan Vote: Goal of the Week</h2>
        {!voted ? (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <Button onClick={handleVote} className="bg-primary text-foreground">
              Goal A
            </Button>
            <Button onClick={handleVote} variant="secondary">
              Goal B
            </Button>
            <Button onClick={handleVote} variant="outline">
              Goal C
            </Button>
          </div>
        ) : (
          <div className="mt-4 text-sm text-accent">
            Thanks for voting! (Demo)
          </div>
        )}
      </div>

      {needLogin && (
        <div className="mt-6 max-w-md rounded-lg border bg-card p-4">
          <h3 className="text-sm font-medium">Sign-in required (stub)</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Use demo sign-in to continue.
          </p>
          <form
            className="mt-3 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem("ys_demo_user", "demo@user");
              setDemoUser("demo@user");
              setNeedLogin(false);
            }}
          >
            <Input placeholder="Email (not validated)" />
            <Button type="submit" className="bg-primary text-foreground">
              Demo Sign-In
            </Button>
          </form>
        </div>
      )}
    </section>
  );
}

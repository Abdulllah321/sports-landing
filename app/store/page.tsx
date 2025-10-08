"use client";
import useSWR from "swr";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StorePage() {
  const { data } = useSWR("/api/products", fetcher);
  const items = data?.items ?? [];

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <SectionHeader
        title="Sports Store"
        subtitle="Curated gear for players and coaches."
        align="left"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((p: any) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-[color:var(--foreground)]">
                {p.name}{" "}
                {p.badge ? (
                  <span className="rounded-full bg-[color:var(--accent-600)] px-2 py-0.5 text-xs text-[color:var(--on-accent)]">
                    {p.badge}
                  </span>
                ) : null}
              </CardTitle>
              <CardDescription>${p.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Button
                asChild
                variant="secondary"
                className="bg-[color:var(--brand-600)] text-[color:var(--on-brand)] hover:bg-[color:var(--brand-700)]"
              >
                <Link href={`/store/${p.id}`}>View</Link>
              </Button>
              <Button variant="outline">Add to Cart (Stub)</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

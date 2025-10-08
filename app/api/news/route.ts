import { NextResponse } from "next/server"
import { NEWS } from "@/data/news"
export async function GET() {
  return NextResponse.json({ items: NEWS })
}

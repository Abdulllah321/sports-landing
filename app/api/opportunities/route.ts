import { NextResponse } from "next/server"
import { OPPORTUNITIES } from "@/data/opportunities"
export async function GET() {
  return NextResponse.json({ items: OPPORTUNITIES })
}

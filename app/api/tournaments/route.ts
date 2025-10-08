import { NextResponse } from "next/server"
import { TOURNAMENTS } from "@/data/tournaments"
export async function GET() {
  return NextResponse.json({ items: TOURNAMENTS })
}

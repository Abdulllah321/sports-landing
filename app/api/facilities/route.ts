import { NextResponse } from "next/server"
import { FACILITIES } from "@/data/facilities"
export async function GET() {
  return NextResponse.json({ items: FACILITIES })
}

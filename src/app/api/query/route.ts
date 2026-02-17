import { db } from "@/db";
import { dataTable } from "@/db/schema";
import { and, gte, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const north = Number(searchParams.get("north"));
  const south = Number(searchParams.get("south"));
  const east = Number(searchParams.get("east"));
  const west = Number(searchParams.get("west"));

  if (!north || !south || !east || !west) {
    return NextResponse.json({ error: "Missing bounds" }, { status: 400 });
  }

  const data = await db
    .select()
    .from(dataTable)
    .where(
      and(
        gte(dataTable.lat, south),
        lte(dataTable.lat, north),
        gte(dataTable.lng, west),
        lte(dataTable.lng, east)
      )
    );

  return NextResponse.json(data, { status: 200 });
}
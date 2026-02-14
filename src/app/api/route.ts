import { db } from "@/db";
import { DataTable, dataTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as DataTable;

  try {
    if (payload.lng == 0 || payload.lat == 0)
      return NextResponse.json({ success: false }, { status: 406 });

    //@ts-ignore
    await db.insert(dataTable).values(payload);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function GET() {
  const data = await db.select().from(dataTable);

  return NextResponse.json(data, { status: 200 });
}

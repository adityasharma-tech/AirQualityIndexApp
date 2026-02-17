import { db } from "@/db";
import { dataTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log(payload);

  delete payload.id;
  delete payload.timestamp;

  if(payload.lat > 90 || payload.lng > 180){
    payload.lat = payload.lat / 1000000.0;
    payload.lng = payload.lng / 1000000.0;
  }

  try {
    if (payload.lng == 0 || payload.lat == 0)
      return NextResponse.json({ success: false }, { status: 406 });

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
import { db } from "@/db";
import { dataTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const payload = await request.json();
    
    try {
        await db.insert(dataTable).values(payload);
    } catch (error) {
        console.error(error);
    }

    return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET() {
    const data = await db.select().from(dataTable)

    return NextResponse.json(data, { status: 200 })
}
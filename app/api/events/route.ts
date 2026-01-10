import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        attendees: true, // ✅ THIS FIXES THE ERROR
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/events ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        capacity: Number(body.capacity),
        address: body.address,
        city: body.city,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("POST /api/events ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}


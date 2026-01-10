import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1️⃣ Fetch event with attendees
    const event = await prisma.event.findUnique({
      where: { id: body.eventId },
      include: {
        attendees: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // 2️⃣ CAPACITY CHECK (THIS WAS MISSING)
    if (event.attendees.length >= event.capacity) {
      return NextResponse.json(
        { error: "Event capacity reached" },
        { status: 400 }
      );
    }

    // 3️⃣ Create attendee
    const attendee = await prisma.attendee.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        eventId: body.eventId,
      },
    });

    return NextResponse.json(attendee, { status: 201 });
  } catch (error) {
    console.error("POST /api/attendees error:", error);
    return NextResponse.json(
      { error: "Failed to register attendee" },
      { status: 500 }
    );
  }
}


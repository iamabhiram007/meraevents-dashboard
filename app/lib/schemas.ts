import { z } from "zod";

/* ---------- EVENT ---------- */
export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string(),
  capacity: z.number().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
});

/* ---------- ATTENDEE ---------- */
export const registerAttendeeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10, "Phone number required"),
  eventId: z.string().min(1),
});


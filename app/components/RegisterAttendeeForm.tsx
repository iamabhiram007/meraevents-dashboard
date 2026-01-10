"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAttendeeSchema } from "@/app/lib/schemas";
import { z } from "zod";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/app/lib/queries";

type RegisterInput = z.infer<typeof registerAttendeeSchema>;

export default function RegisterAttendeeForm() {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerAttendeeSchema),
  });

  async function onSubmit(data: RegisterInput) {
    const res = await fetch("/api/attendees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

const result = await res.json();

if (!res.ok) {
  toast.error(result.error || "Registration failed");
  return;
}

    toast.success("Attendee registered");
    reset();
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Register Attendee</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border p-2 bg-black text-white"
        />

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-2 bg-black text-white"
        />

        <input
          {...register("phone")}
          placeholder="Phone Number"
          className="w-full border p-2 bg-black text-white"
        />

        <select
          {...register("eventId")}
          defaultValue=""
          className="w-full border p-2 bg-black text-white"
        >
          <option value="" disabled>
            Select Event
          </option>
          {events?.map((event: any) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>

        <button className="px-4 py-2 bg-white text-black">
          Register
        </button>
      </form>
    </section>
  );
}


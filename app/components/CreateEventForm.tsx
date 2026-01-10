"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "@/app/lib/schemas";
import { z } from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type CreateEventInput = z.infer<typeof createEventSchema>;

export default function CreateEventForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
  });

  async function onSubmit(data: CreateEventInput) {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Failed to create event");
      return;
    }

    toast.success("Event created");
    reset();
    queryClient.invalidateQueries({ queryKey: ["events"] });
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Create Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full border p-2 bg-black text-white"
        />
        {errors.title && (
          <p className="text-red-500">{errors.title.message}</p>
        )}

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2 bg-black text-white"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        {/* Date */}
        <input
          type="datetime-local"
          {...register("date")}
          className="w-full border p-2 bg-black text-white"
        />

        {/* Capacity (FIXED) */}
        <input
          type="number"
          {...register("capacity", { valueAsNumber: true })}
          placeholder="Capacity"
          className="w-full border p-2 bg-black text-white"
        />
        {errors.capacity && (
          <p className="text-red-500">{errors.capacity.message}</p>
        )}

        {/* Address */}
        <input
          {...register("address")}
          placeholder="Address"
          className="w-full border p-2 bg-black text-white"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}

        {/* City Dropdown */}
        <select
          {...register("city")}
          defaultValue=""
          className="w-full border p-2 bg-black text-white"
        >
          <option value="" disabled>
            Select City
          </option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
        </select>
        {errors.city && (
          <p className="text-red-500">{errors.city.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black"
        >
          Create Event
        </button>
      </form>
    </section>
  );
}


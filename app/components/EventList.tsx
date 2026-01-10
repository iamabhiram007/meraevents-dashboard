"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/app/lib/queries";

export default function EventList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p>Loading events...</p>;
  if (error) return <p>Failed to load events</p>;

  return (
    <div className="space-y-4">
      {data.map((event: any) => (
        <div key={event.id} className="border p-4 rounded">
          <h3 className="font-semibold">{event.title}</h3>
          <p>{event.description}</p>
          <p>📍 {event.address}, {event.city}</p>
          <p>Capacity: {event.capacity}</p>
          <p>Attendees: {event.attendees.length}</p>
        </div>
      ))}
    </div>
  );
}


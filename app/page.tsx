import CreateEventForm from "./components/CreateEventForm";
import RegisterAttendeeForm from "./components/RegisterAttendeeForm";
import EventList from "./components/EventList";

export default function Home() {
  return (
    <main className="p-8 space-y-12">
      <CreateEventForm />
      <RegisterAttendeeForm />
      <EventList />
    </main>
  );
}


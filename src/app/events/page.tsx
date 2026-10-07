import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = { title: "Events", description: "Competitions, practices, fundraisers, and community events for Special Olympics Hall County." };

export default function EventsPage() {
  return <EventsClient />;
}

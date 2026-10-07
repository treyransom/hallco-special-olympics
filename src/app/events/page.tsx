import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import EventsClient from "./EventsClient";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Events",
  description: "Competitions, practices, fundraisers, and community events for Special Olympics Hall County.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero eyebrow="Event calendar" title="What's coming up." image="/images/golf-group.jpg" description="Competitions, practices, fundraisers, and the moments in between. Families and fans are always welcome." />
      <EventsClient />
      <CTA />
    </>
  );
}

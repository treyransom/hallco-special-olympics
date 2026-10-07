import type { Metadata } from "next";
import VolunteerClient from "./VolunteerClient";

export const metadata: Metadata = { title: "Volunteer Shifts", description: "Open volunteer shifts at upcoming Special Olympics Hall County events." };

export default function VolunteerPage() {
  return <VolunteerClient />;
}

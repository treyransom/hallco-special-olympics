import type { Metadata } from "next";
import LocationsClient from "./LocationsClient";

export const metadata: Metadata = { title: "Where We Practice", description: "Practice venues for Special Olympics Hall County with maps and directions." };

export default function LocationsPage() {
  return <LocationsClient />;
}

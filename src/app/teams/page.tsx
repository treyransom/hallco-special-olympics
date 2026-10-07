import type { Metadata } from "next";
import TeamsClient from "./TeamsClient";

export const metadata: Metadata = { title: "Teams & Coaches", description: "Coaches, rosters, and practice times for every Special Olympics Hall County sport." };

export default function TeamsPage() {
  return <TeamsClient />;
}

import type { Metadata } from "next";
import ScheduleClient from "./ScheduleClient";

export const metadata: Metadata = { title: "Practice Schedule", description: "Weekly practice times and venues for every Special Olympics Hall County sport." };

export default function SchedulePage() {
  return <ScheduleClient />;
}

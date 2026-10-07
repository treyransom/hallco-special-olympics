import type { Metadata } from "next";
import HoursClient from "./HoursClient";
export const metadata: Metadata = { title: "Volunteer Hours", description: "Log volunteer hours and see the season leaderboard for Special Olympics Hall County." };
export default function HoursPage() { return <HoursClient />; }

import type { Metadata } from "next";
import CoachesClient from "./CoachesClient";
export const metadata: Metadata = { title: "Coach Resources", description: "Practice plans, drills, rules, safety guides, and certification status for Special Olympics Hall County coaches." };
export default function CoachesPage() { return <CoachesClient />; }

import type { Metadata } from "next";
import StoriesClient from "./StoriesClient";

export const metadata: Metadata = { title: "Athlete Stories", description: "Athletes, unified partners, and families on what Special Olympics Hall County means to them." };

export default function StoriesPage() {
  return <StoriesClient />;
}

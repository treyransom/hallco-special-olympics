import type { Metadata } from "next";
import GuideClient from "./GuideClient";

export const metadata: Metadata = { title: "Competition Guide", description: "Packing list and what to expect at State Games for Special Olympics Hall County families." };

export default function GuidePage() {
  return <GuideClient />;
}

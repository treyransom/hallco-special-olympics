import type { Metadata } from "next";
import SponsorClient from "./SponsorClient";

export const metadata: Metadata = { title: "Sponsor", description: "Sponsorship packages for local businesses supporting Special Olympics Hall County." };

export default function SponsorPage() {
  return <SponsorClient />;
}

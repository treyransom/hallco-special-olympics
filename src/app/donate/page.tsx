import type { Metadata } from "next";
import DonateClient from "./DonateClient";

export const metadata: Metadata = { title: "Donate", description: "Every donation to Special Olympics Hall County goes to athlete transportation, uniforms, housing, equipment, and registration fees." };

export default function DonatePage() {
  return <DonateClient />;
}

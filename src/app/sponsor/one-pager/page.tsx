import type { Metadata } from "next";
import OnePagerClient from "./OnePagerClient";

export const metadata: Metadata = { title: "Sponsorship One-Pager", description: "Printable sponsorship packet for Special Olympics Hall County." };

export default function OnePagerPage() {
  return <OnePagerClient />;
}

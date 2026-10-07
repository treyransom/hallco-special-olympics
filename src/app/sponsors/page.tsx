import type { Metadata } from "next";
import SponsorsClient from "./SponsorsClient";

export const metadata: Metadata = { title: "Our Sponsors", description: "The local businesses and organizations that fund every Special Olympics Hall County season." };

export default function SponsorsPage() {
  return <SponsorsClient />;
}

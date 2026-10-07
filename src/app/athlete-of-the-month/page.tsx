import type { Metadata } from "next";
import AOMClient from "./AOMClient";

export const metadata: Metadata = { title: "Athlete of the Month", description: "Celebrating the Special Olympics Hall County athlete of the month and past honorees." };

export default function AOMPage() {
  return <AOMClient />;
}

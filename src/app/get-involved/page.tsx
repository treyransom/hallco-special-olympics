import type { Metadata } from "next";
import GetInvolvedClient from "./GetInvolvedClient";

export const metadata: Metadata = { title: "Get Involved", description: "Become an athlete, volunteer, coach, or unified partner with Special Olympics Hall County." };

export default function GetInvolvedPage() {
  return <GetInvolvedClient />;
}

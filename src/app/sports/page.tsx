import type { Metadata } from "next";
import SportsClient from "./SportsClient";

export const metadata: Metadata = { title: "Sports", description: "Basketball, bowling, athletics, swimming, bocce, flag football, and softball. See the season schedule for Special Olympics Hall County." };

export default function SportsPage() {
  return <SportsClient />;
}

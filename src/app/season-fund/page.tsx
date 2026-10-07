import type { Metadata } from "next";
import SeasonFundClient from "./SeasonFundClient";

export const metadata: Metadata = { title: "Season Fund", description: "Progress toward the Special Olympics Hall County season fundraising goal." };

export default function SeasonFundPage() {
  return <SeasonFundClient />;
}

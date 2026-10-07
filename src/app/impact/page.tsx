import type { Metadata } from "next";
import ImpactClient from "./ImpactClient";
export const metadata: Metadata = { title: "Impact Report", description: "What donor and sponsor support did for Special Olympics Hall County this season." };
export default function ImpactPage() { return <ImpactClient />; }

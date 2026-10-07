import type { Metadata } from "next";
import CarpoolClient from "./CarpoolClient";
export const metadata: Metadata = { title: "Carpool Board", description: "Rides to practice and State Games, arranged between Special Olympics Hall County families." };
export default function CarpoolPage() { return <CarpoolClient />; }

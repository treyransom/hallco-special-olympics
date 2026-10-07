import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = { title: "Forms & Resources", description: "Athlete registration, medical forms, volunteer applications, coach training, and family resources for Special Olympics Hall County." };

export default function ResourcesPage() {
  return <ResourcesClient />;
}

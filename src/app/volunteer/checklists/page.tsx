import type { Metadata } from "next";
import ChecklistsClient from "./ChecklistsClient";
export const metadata: Metadata = { title: "Day-of Checklists", description: "Step-by-step checklists for every Special Olympics Hall County volunteer role." };
export default function ChecklistsPage() { return <ChecklistsClient />; }

import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = { title: "News", description: "News, recaps, and updates from Special Olympics Hall County." };

export default function NewsPage() {
  return <NewsClient />;
}

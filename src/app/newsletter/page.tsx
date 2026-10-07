import type { Metadata } from "next";
import NewsletterClient from "./NewsletterClient";

export const metadata: Metadata = { title: "Newsletter", description: "Season updates from Special Olympics Hall County, once or twice a month." };

export default function NewsletterPage() {
  return <NewsletterClient />;
}

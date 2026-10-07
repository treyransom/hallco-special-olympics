import type { Metadata } from "next";
import { faqs } from "@/lib/data";
import FAQClient from "./FAQClient";

export const metadata: Metadata = { title: "FAQ", description: "Answers to common questions about joining, volunteering, costs, and competitions with Special Olympics Hall County." };

export default function FAQPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FAQClient />
    </>
  );
}

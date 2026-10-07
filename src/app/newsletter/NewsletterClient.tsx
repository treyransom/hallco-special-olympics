"use client";

import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Newsletter from "@/components/home/Newsletter";
import { useDict } from "@/lib/i18n";

export default function NewsletterClient() {
  const d = useDict();
  const n = d.newsletterPage;
  return (
    <>
      <PageHero eyebrow={n.eyebrow} title={n.title} image="/images/bus-trip.jpg" description={n.text} />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x max-w-3xl">
          <ul className="space-y-3">
            {[n.get1, n.get2, n.get3, n.get4, n.get5].map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.05} className="flex gap-3 rounded-2xl bg-mist p-4 text-ink"><CheckCircle2 className="h-6 w-6 shrink-0 text-teal" />{t}</Reveal>
            ))}
          </ul>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

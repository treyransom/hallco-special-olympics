"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { sponsors, type SponsorTier } from "@/lib/data";
import { useDict } from "@/lib/i18n";

const order: SponsorTier[] = ["Gold", "Silver", "Bronze", "Partner"];
const size: Record<SponsorTier, string> = { Gold: "h-28 text-2xl", Silver: "h-24 text-xl", Bronze: "h-20 text-lg", Partner: "h-16 text-base" };
const cols: Record<SponsorTier, string> = { Gold: "grid-cols-1 sm:grid-cols-2", Silver: "grid-cols-2 sm:grid-cols-3", Bronze: "grid-cols-2 sm:grid-cols-4", Partner: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6" };

export default function Sponsors({ full = false }: { full?: boolean }) {
  const d = useDict();
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading align="center" eyebrow={d.sponsorsWall.eyebrow} title={d.sponsorsWall.title} description={full ? d.sponsorsWall.text : undefined} />
        <div className="mt-12 space-y-8">
          {order.map((tier) => {
            const list = sponsors.filter((s) => s.tier === tier);
            if (!list.length) return null;
            return (
              <div key={tier}>
                <p className="mb-3 text-center font-heading text-sm font-bold uppercase tracking-[0.2em] text-ink-soft">{d.common.tiers[tier]}</p>
                <ul className={`mx-auto grid max-w-5xl gap-4 ${cols[tier]}`}>
                  {list.map((s, i) => {
                    const inner = s.logo ? (
                      <Image src={s.logo} alt={s.name} width={400} height={160} className="max-h-full w-auto object-contain" />
                    ) : (
                      <span className={`px-4 text-center font-heading font-bold uppercase leading-tight text-ink-soft ${size[tier].split(" ")[1]}`}>{s.name}</span>
                    );
                    return (
                      <Reveal as="li" key={s.name} delay={i * 0.04}>
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className={`focus-ring flex items-center justify-center rounded-2xl border border-mist-dark bg-mist p-3 transition hover:border-teal ${size[tier].split(" ")[0]}`}>{inner}</a>
                        ) : (
                          <div className={`flex items-center justify-center rounded-2xl border border-mist-dark bg-mist p-3 ${size[tier].split(" ")[0]}`}>{inner}</div>
                        )}
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <Reveal className="mt-10 flex flex-col items-center gap-3 text-center text-sm text-ink-soft sm:flex-row sm:justify-center sm:gap-6">
          <span>{d.sponsorsWall.want} <Link href="/sponsor" className="font-semibold text-teal underline-offset-4 hover:underline">{d.sponsorsWall.become}</Link></span>
          {!full && <Link href="/sponsors" className="focus-ring font-semibold text-ink hover:text-teal">{d.common.viewAll}</Link>}
          <Link href="/sponsor/one-pager" className="focus-ring inline-flex items-center gap-1.5 font-semibold text-ink hover:text-teal"><Download className="h-4 w-4" /> {d.sponsorsWall.onePager}</Link>
        </Reveal>
      </div>
    </section>
  );
}

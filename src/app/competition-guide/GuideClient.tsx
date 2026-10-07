"use client";

import { useState } from "react";
import { Printer, Check, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Countdown from "@/components/home/Countdown";
import { competitionGuide, team } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function GuideClient() {
  const { lang, dict: d } = useLang();
  const [packed, setPacked] = useState<Set<number>>(new Set());
  const fam = team.find((t) => t.role.includes("Family"));
  const toggle = (i: number) => setPacked((p) => {
    const n = new Set(p);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    return n;
  });
  return (
    <>
      <div className="print:hidden"><PageHero eyebrow={d.guide.eyebrow} title={d.guide.title} image="/images/bus-trip.jpg" description={d.guide.text} /></div>
      <div className="print:hidden"><Countdown compact /></div>
      <section className="bg-white py-20 sm:py-28 print:py-0">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading title={d.guide.packing} className="max-w-none" />
              <button type="button" onClick={() => window.print()} className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-heading text-base font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-white print:hidden"><Printer className="h-4 w-4" /> {d.guide.print}</button>
            </div>
            <p className="mt-2 text-sm text-ink-soft print:hidden">{packed.size} / {competitionGuide.packing.length} {d.guide.checked}</p>
            <ul className="mt-6 space-y-2">
              {competitionGuide.packing.map((p, i) => {
                const on = packed.has(i);
                return (
                  <li key={i}>
                    <button type="button" onClick={() => toggle(i)} aria-pressed={on} className={cn("focus-ring flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition print:border-ink print:bg-white", on ? "border-teal bg-teal/5" : "border-mist-dark hover:border-teal/50")}>
                      <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 print:border-ink", on ? "border-teal bg-teal text-white" : "border-mist-dark")}>{on && <Check className="h-4 w-4 print:hidden" />}</span>
                      <span className={cn("text-ink", on && "line-through opacity-60 print:no-underline print:opacity-100")}>{lang === "es" ? p.es : p.item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="print:hidden">
            <SectionHeading title={d.guide.expect} className="max-w-none" />
            <ol className="mt-6 space-y-5">
              {competitionGuide.expect.map((e, i) => (
                <Reveal as="li" key={e.title} delay={i * 0.06} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-heading text-xl font-bold text-ink">{i + 1}</span>
                  <div>
                    <h3 className="text-2xl font-extrabold uppercase text-ink">{lang === "es" ? e.es.title : e.title}</h3>
                    <p className="mt-1 text-ink-soft">{lang === "es" ? e.es.text : e.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            {fam?.email && (
              <Reveal className="mt-10 rounded-3xl bg-mist p-6">
                <p className="font-semibold text-ink">{d.guide.questions}</p>
                <a href={`mailto:${fam.email}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline"><Mail className="h-4 w-4" /> {fam.name} · {fam.email}</a>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

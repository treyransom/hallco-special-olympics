"use client";

import Link from "next/link";
import { ArrowRight, Medal } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { results, loc, formatDate } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function ResultsPreview() {
  const { lang, dict: d } = useLang();
  const r = results[0];
  if (!r) return null;
  const cells = [
    { n: r.medals.gold, label: d.results.gold, c: "bg-gold text-ink" },
    { n: r.medals.silver, label: d.results.silver, c: "bg-mist-dark text-ink" },
    { n: r.medals.bronze, label: d.results.bronze, c: "bg-[#c97b3a] text-white" },
  ];
  return (
    <section className="bg-mist py-16">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-red"><Medal className="h-4 w-4" /> {d.results.latest}</p>
            <h2 className="mt-1 text-3xl font-extrabold uppercase text-ink sm:text-4xl">{loc(lang, r, "competition")}</h2>
            <p className="text-sm text-ink-soft">{formatDate(r.date, { month: "long", year: "numeric" }, lang)} · {r.location}</p>
          </div>
          <div className="flex items-center gap-3">
            {cells.map((c) => (
              <div key={c.label} className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl ${c.c}`}>
                <span className="font-heading text-4xl font-extrabold leading-none">{c.n}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{c.label}</span>
              </div>
            ))}
          </div>
          <Link href="/results" className="focus-ring inline-flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-teal">{d.nav.results} <ArrowRight className="h-5 w-5" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Medal } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { results, formatDate, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Confetti, { useConfetti } from "@/components/ui/Confetti";
import { PartyPopper } from "lucide-react";

const placeStyle = ["", "bg-gold text-ink", "bg-mist-dark text-ink", "bg-[#c97b3a] text-white", "bg-mist text-ink-soft"];

export default function ResultsClient() {
  const { lang, dict: d } = useLang();
  const r = d.results;
  const { pieces, fire } = useConfetti();
  const totals = results.reduce((t, x) => ({ gold: t.gold + x.medals.gold, silver: t.silver + x.medals.silver, bronze: t.bronze + x.medals.bronze, ribbons: t.ribbons + x.medals.ribbons }), { gold: 0, silver: 0, bronze: 0, ribbons: 0 });
  const cells = (m: typeof totals) => [
    { n: m.gold, l: r.gold, c: "bg-gold text-ink" },
    { n: m.silver, l: r.silver, c: "bg-mist-dark text-ink" },
    { n: m.bronze, l: r.bronze, c: "bg-[#c97b3a] text-white" },
    { n: m.ribbons, l: r.ribbons, c: "bg-teal text-white" },
  ];
  return (
    <>
      <PageHero curve="ink" eyebrow={r.eyebrow} title={r.title} image="/images/medals.jpg" description={r.pageText} />
      <section className="noise relative overflow-hidden bg-ink py-16 text-white">
        <div className="bg-dots-light absolute inset-0" aria-hidden />
        <div className="container-x relative flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <p className="inline-flex items-center gap-2 font-heading text-2xl font-bold uppercase"><Medal className="h-6 w-6 text-gold" /> {r.allTime}</p>
          <div className="grid grid-cols-4 gap-3">
            {cells(totals).map((c) => (
              <div key={c.l} className={cn("flex h-24 w-24 flex-col items-center justify-center rounded-2xl", c.c)}>
                <span className="font-heading text-5xl font-extrabold leading-none">{c.n}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{c.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-dots bg-mist py-20 sm:py-28">
        <div className="container-x space-y-10">
          {results.map((res, i) => (
            <Reveal key={res.slug} delay={i * 0.05} className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-ink/5">
              <div className="flex flex-col gap-6 border-b border-mist-dark p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-red">{formatDate(res.date, { month: "long", year: "numeric" }, lang)} · {res.location}</p>
                  <h2 className="mt-1 text-4xl font-extrabold uppercase text-ink">{loc(lang, res, "competition")}</h2>
                  {res.recap && <Link href={`/news/${res.recap}`} className="mt-2 inline-flex items-center gap-1 font-semibold text-teal hover:underline">{r.readRecap} <ArrowRight className="h-4 w-4" /></Link>}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {cells(res.medals).map((c) => (
                    <div key={c.l} className={cn("flex h-20 w-20 flex-col items-center justify-center rounded-2xl", c.c)}>
                      <span className="font-heading text-4xl font-extrabold leading-none">{c.n}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{c.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto p-6 sm:p-8">
                <p className="flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-ink-soft">{r.highlights} <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 text-[10px] text-teal"><PartyPopper className="h-3 w-3" /> {d.confetti.hint}</span></p>
                <table className="mt-3 w-full min-w-[32rem] text-left text-sm">
                  <thead><tr className="text-xs uppercase tracking-wider text-ink-soft"><th className="py-2 pr-4 font-bold">{r.athlete}</th><th className="py-2 pr-4 font-bold">{d.nav.sports}</th><th className="py-2 pr-4 font-bold">{r.event}</th><th className="py-2 font-bold">{r.place}</th></tr></thead>
                  <tbody className="divide-y divide-mist">
                    {res.highlights.map((h, n) => (
                      <tr key={n}>
                        <td className="py-2.5 pr-4"><button type="button" onClick={(e) => fire(e.clientX, e.clientY)} className="focus-ring rounded font-heading text-lg font-bold uppercase text-ink transition hover:text-teal">{h.athlete}</button></td>
                        <td className="py-2.5 pr-4 text-ink-soft">{h.sport}</td>
                        <td className="py-2.5 pr-4 text-ink-soft">{h.event}</td>
                        <td className="py-2.5"><span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider", placeStyle[h.place])}>{d.common.places[h.place]}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          ))}
          <SectionHeading align="center" title={d.cta.title} description={d.cta.text} className="pt-6" />
        </div>
      </section>
      <Confetti pieces={pieces} />
    </>
  );
}

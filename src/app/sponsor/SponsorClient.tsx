"use client";

import Link from "next/link";
import { Download, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Sponsors from "@/components/home/Sponsors";
import Campaign from "@/components/home/Campaign";
import { sponsorTiers, team, site, stats } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function SponsorClient() {
  const { lang, dict: d } = useLang();
  const x = d.donate;
  const chair = team.find((t) => t.role === "Chairperson");
  return (
    <>
      <PageHero eyebrow={x.sponsorE} title={x.sponsorT} image="/images/golf-sponsors.jpg" description={x.sponsorX} />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-mist p-5 text-center">
                <p className="font-heading text-5xl font-extrabold text-teal">{s.value}{s.suffix}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{lang === "es" ? s.labelEs : s.label}</p>
              </div>
            ))}
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {sponsorTiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className={`rounded-3xl p-8 ${i === 2 ? "bg-ink text-white" : "border border-mist-dark bg-white text-ink"}`}>
                <p className={`font-heading text-sm font-bold uppercase tracking-[0.2em] ${i === 2 ? "text-gold" : "text-red"}`}>{d.common.tiers[t.name]}</p>
                <p className="mt-2 font-heading text-5xl font-extrabold">{t.amount}</p>
                <ul className={`mt-6 space-y-2 text-sm ${i === 2 ? "text-white/80" : "text-ink-soft"}`}>
                  {(lang === "es" ? t.es.perks : t.perks).map((p) => <li key={p} className="flex gap-2"><span className="text-teal-light">✓</span>{p}</li>)}
                </ul>
                <a href={`mailto:${chair?.email ?? site.email}?subject=${encodeURIComponent(`${t.name} sponsorship`)}`} className={`focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide ${i === 2 ? "bg-white text-ink hover:bg-gold" : "bg-teal text-white hover:bg-teal-dark"}`}><Mail className="h-4 w-4" /> {x.become} {d.common.tiers[t.name]} {x.sponsorWord}</a>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-mist p-6 sm:flex-row">
            <p className="text-ink">{d.sponsorsWall.onePager}</p>
            <Link href="/sponsor/one-pager" className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-deep"><Download className="h-4 w-4" /> PDF</Link>
          </Reveal>
        </div>
      </section>
      <Campaign />
      <Sponsors full />
      <section className="bg-white py-20">
        <div className="container-x text-center">
          <SectionHeading align="center" title={d.faq.stillT} description={d.faq.stillX} />
          <Reveal className="mt-6"><Button href="/contact">{d.common.contactUs}</Button></Reveal>
        </div>
      </section>
    </>
  );
}

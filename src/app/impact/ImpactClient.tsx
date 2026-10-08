"use client";

import Image from "@/components/ui/SmartImage";
import { Printer, Users, CalendarDays, Medal, Clock, HandCoins, Building2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/home/Counter";
import Sponsors from "@/components/home/Sponsors";
import { stats, events, results, volunteerHours, campaign, sponsors, athleteOfMonth, loc, site } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function ImpactClient() {
  const { lang, dict: d } = useLang();
  const im = d.impact;
  const medals = results.reduce((n, r) => n + r.medals.gold + r.medals.silver + r.medals.bronze, 0);
  const hours = volunteerHours.reduce((n, v) => n + v.hours, 0);
  const tiles = [
    { icon: Users, n: stats[0].value, s: stats[0].suffix, l: im.athletes, c: "bg-teal text-white" },
    { icon: CalendarDays, n: events.length, s: "", l: im.events, c: "bg-gold text-ink" },
    { icon: Medal, n: medals, s: "", l: im.medals, c: "bg-red text-white" },
    { icon: Clock, n: hours, s: "", l: im.volunteers, c: "bg-ink text-white" },
    { icon: HandCoins, n: campaign.raised, s: "", l: im.raised, c: "bg-teal-deep text-white", money: true },
    { icon: Building2, n: sponsors.length, s: "", l: im.sponsors, c: "bg-white text-ink border border-mist-dark" },
  ];
  return (
    <>
      <div className="print:hidden"><PageHero eyebrow={im.eyebrow} title={im.title} image="/images/medals.jpg" description={im.text}><button type="button" onClick={() => window.print()} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-ink hover:bg-gold"><Printer className="h-4 w-4" /> {im.print}</button></PageHero></div>
      <section className="bg-dots bg-white py-20 sm:py-28 print:py-6">
        <div className="container-x">
          <div className="hidden items-center justify-between border-b-4 border-teal pb-4 print:flex">
            <Image src="/images/logo-horizontal.png" alt={site.name} width={1254} height={220} className="h-12 w-auto" />
            <p className="font-heading text-2xl font-extrabold uppercase">{im.eyebrow} · {lang === "es" ? campaign.nameEs : campaign.name}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((t, i) => (
              <Reveal key={t.l} delay={i * 0.06} className={`rounded-3xl p-7 shadow-lg ${t.c}`}>
                <t.icon className="h-7 w-7 opacity-80" />
                <p className="mt-3 font-heading text-6xl font-extrabold leading-none">{t.money ? "$" : ""}<Counter to={t.n} />{t.s}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-80">{t.l}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow={d.nav.results} title={d.results.title} />
              <ul className="mt-6 space-y-2">
                {results.map((r) => (
                  <li key={r.slug} className="flex items-center justify-between rounded-2xl bg-mist px-5 py-3"><span className="font-heading text-xl font-bold uppercase text-ink">{loc(lang, r, "competition")}</span><span className="font-heading text-lg font-bold text-ink-soft"><span className="text-[#8a5a00]">{r.medals.gold}</span> · {r.medals.silver} · <span className="text-[#8a4f1c]">{r.medals.bronze}</span></span></li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow={d.aom.eyebrow} title={d.aom.archive} />
              <ul className="mt-6 space-y-2">
                {athleteOfMonth.map((a) => (
                  <li key={a.month} className="flex items-center gap-4 rounded-2xl bg-mist px-5 py-3"><span className="relative h-10 w-10 overflow-hidden rounded-full"><Image src={a.image} alt="" fill sizes="2.5rem" className="object-cover" /></span><span className="font-heading text-xl font-bold uppercase text-ink">{a.name}</span><span className="text-sm text-ink-soft">{a.sport}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
      <div className="print:hidden"><Sponsors full /></div>
      <section className="noise relative overflow-hidden bg-ink py-20 text-white print:bg-white print:text-ink">
        <div className="container-x text-center">
          <h2 className="text-5xl font-extrabold uppercase sm:text-6xl">{im.thanks}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80 print:text-ink">{im.thanksText}</p>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { Star, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { athleteOfMonth, formatDate, loc, team } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function AOMClient() {
  const { lang, dict: d } = useLang();
  const [current, ...past] = athleteOfMonth;
  const coachCoord = team.find((t) => t.role === "Coach Coordinator");
  return (
    <>
      <PageHero eyebrow={d.aom.eyebrow} title={current ? `${d.aom.title} ${current.name}.` : d.aom.eyebrow} image={current?.image ?? "/images/medals.jpg"} description={d.aom.pageText} />
      {current && (
        <section className="bg-gold py-20 text-ink sm:py-24">
          <div className="container-x grid items-center gap-10 lg:grid-cols-[20rem_1fr]">
            <Reveal className="relative mx-auto aspect-square w-72 overflow-hidden rounded-full border-8 border-white shadow-2xl"><Image src={current.image} alt={current.name} fill sizes="20rem" className="object-cover" /></Reveal>
            <Reveal delay={0.1}>
              <p className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em]"><Star className="h-4 w-4 fill-current" /> {formatDate(current.month + "-01", { month: "long", year: "numeric" }, lang)}</p>
              <h2 className="mt-2 text-6xl font-extrabold uppercase">{current.name}</h2>
              <p className="font-semibold">{current.sport}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed">{loc(lang, current, "story")}</p>
            </Reveal>
          </div>
        </section>
      )}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={d.aom.eyebrow} title={d.aom.archive} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((a, i) => (
              <Reveal as="li" key={a.month} delay={i * 0.06} className="flex gap-5 rounded-3xl border border-mist-dark bg-mist p-5">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow"><Image src={a.image} alt={a.name} fill sizes="6rem" className="object-cover" /></div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-red">{formatDate(a.month + "-01", { month: "long", year: "numeric" }, lang)}</p>
                  <h3 className="text-3xl font-extrabold uppercase text-ink">{a.name}</h3>
                  <p className="text-sm font-semibold text-teal">{a.sport}</p>
                  <p className="mt-2 text-sm text-ink-soft">{loc(lang, a, "story")}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          {coachCoord?.email && (
            <Reveal className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-teal-deep p-8 text-white sm:flex-row">
              <p className="text-2xl font-extrabold uppercase">{d.aom.nominate}</p>
              <a href={`mailto:${coachCoord.email}?subject=${encodeURIComponent("Athlete of the Month nomination")}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-ink hover:bg-gold"><Mail className="h-4 w-4" /> {coachCoord.name}</a>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

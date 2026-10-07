"use client";

import Link from "next/link";
import { MapPin, Navigation, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import PracticeMap from "@/components/home/PracticeMap";
import { locations, practices, sports, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function LocationsClient() {
  const { lang, dict: d } = useLang();
  return (
    <>
      <PageHero eyebrow={d.locationsPage.eyebrow} title={d.locationsPage.title} image="/images/team-outside.jpg" description={d.locationsPage.text} />
      <PracticeMap />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((l, i) => {
            const here = practices.filter((p) => p.location === l.name);
            return (
              <Reveal key={l.name} delay={i * 0.05} className="flex flex-col rounded-3xl border border-mist-dark bg-mist p-6">
                <h2 className="flex items-start gap-2 text-2xl font-extrabold uppercase text-ink"><MapPin className="mt-1 h-5 w-5 shrink-0 text-red" />{l.name}</h2>
                <p className="ml-7 text-sm text-ink-soft">{l.address}</p>
                <p className="ml-7 mt-4 font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{d.locationsPage.practicesHere}</p>
                {here.length === 0 ? (
                  <p className="ml-7 mt-1 text-sm text-ink-soft">{d.locationsPage.noneYet}</p>
                ) : (
                  <ul className="ml-7 mt-1 flex-1 space-y-1.5 text-sm">
                    {here.map((p, n) => {
                      const s = sports.find((x) => x.slug === p.sport)!;
                      return (
                        <li key={n} className="flex flex-wrap items-center gap-x-2">
                          <Link href={`/teams/${p.sport}`} className="font-heading text-lg font-bold uppercase text-ink hover:text-teal">{loc(lang, s, "name")}</Link>
                          <span className="inline-flex items-center gap-1 text-ink-soft"><Clock className="h-3 w-3 text-teal" />{d.common.daysShort[p.day]} {p.time}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(l.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="focus-ring mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 font-heading text-sm font-bold uppercase tracking-wide text-white hover:bg-teal-deep"><Navigation className="h-4 w-4" /> {d.common.directions}</a>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

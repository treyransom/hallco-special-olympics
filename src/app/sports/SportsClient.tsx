"use client";

import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import SportIcon from "@/components/ui/SportIcon";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { sports, practices, loc } from "@/lib/data";
import { DeadlineBadge } from "@/components/home/Deadlines";
import { useLang } from "@/lib/i18n";

const seasons = ["Winter", "Spring", "Summer", "Fall"] as const;
const seasonBg: Record<string, string> = { Winter: "bg-teal text-white", Spring: "bg-gold text-ink", Summer: "bg-red text-white", Fall: "bg-ink text-white" };

export default function SportsClient() {
  const { lang, dict: d } = useLang();
  const s = d.sports;
  return (
    <>
      <PageHero eyebrow={s.pageEyebrow} title={s.pageTitle} image="/images/basketball-action.jpg" description={s.pageText} />
      <section className="bg-white py-16">
        <div className="container-x">
          <Reveal className="grid gap-3 sm:grid-cols-4">
            {seasons.map((se) => (
              <div key={se} className={`rounded-3xl p-5 shadow-lg ${seasonBg[se]}`}>
                <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] opacity-80">{d.common.seasons[se]}</p>
                <ul className="mt-2 space-y-1">
                  {sports.filter((x) => x.season === se).map((x) => (
                    <li key={x.slug}><a href={`#${x.slug}`} className="font-heading text-2xl font-bold uppercase underline-offset-4 hover:underline">{loc(lang, x, "name")}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="bg-dots bg-mist py-24 sm:py-32">
        <div className="container-x space-y-24">
          {sports.map((sp, i) => {
            const pr = practices.filter((p) => p.sport === sp.slug);
            return (
              <article key={sp.slug} id={sp.slug} className="relative scroll-mt-28 grid items-center gap-10 lg:grid-cols-2">
                <span aria-hidden className={`text-outline pointer-events-none absolute -top-10 select-none font-heading text-[10rem] font-extrabold leading-none text-ink/5 ${i % 2 ? "right-0" : "left-0"}`}>{String(i + 1).padStart(2, "0")}</span>
                <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-ink/15 ${i % 2 ? "lg:order-2 -rotate-1" : "rotate-1"}`}>
                  <Image src={sp.image} alt={loc(lang, sp, "name")} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute left-5 top-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white shadow-lg"><SportIcon icon={sp.icon} className="h-7 w-7" /></div>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-red"><span className="h-0.5 w-8 bg-red" /> {d.common.seasons[sp.season]} {s.season}</p>
                  <h2 className="mt-3 text-5xl font-extrabold uppercase text-ink sm:text-6xl">{loc(lang, sp, "name")}</h2>
                  <div className="mt-3"><DeadlineBadge season={sp.season} /></div>
                  <p className="mt-4 text-lg text-ink-soft">{loc(lang, sp, "blurb")}</p>
                  <div className="mt-6 rounded-2xl bg-white p-4 shadow-lg shadow-ink/5">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft"><CalendarDays className="h-4 w-4 text-teal" /> {s.practices} · <span className={`rounded-full px-2 py-0.5 ${seasonBg[sp.season]}`}>{sp.months}</span></p>
                    {pr.length === 0 ? (
                      <p className="mt-2 text-sm text-ink-soft">{s.noPractices}</p>
                    ) : (
                      <ul className="mt-2 divide-y divide-mist">
                        {pr.map((p, n) => (
                          <li key={n} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-sm">
                            <span className="w-24 font-heading text-lg font-bold uppercase text-ink">{d.common.days[p.day]}</span>
                            <span className="inline-flex items-center gap-1 text-ink-soft"><Clock className="h-3.5 w-3.5 text-teal" />{p.time}</span>
                            <span className="inline-flex items-center gap-1 text-ink-soft"><MapPin className="h-3.5 w-3.5 text-teal" />{p.location}</span>
                            {p.note && <span className="rounded-full bg-mist px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-teal-dark">{p.note}</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button href="/register" variant="secondary">{s.join}</Button>
                    <Link href={`/teams/${sp.slug}`} className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-heading font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white"><Users className="h-4 w-4" /> {s.meetTeam}</Link>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading align="center" eyebrow={s.missingEyebrow} title={s.missingTitle} description={s.missingText} />
          <Reveal className="mt-8 text-center"><Button href="/contact">{d.common.contactUs}</Button></Reveal>
        </div>
      </section>
    </>
  );
}

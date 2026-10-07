"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock, HandHeart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { events, formatDate, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const typeColor: Record<string, string> = { Competition: "bg-teal text-white", Practice: "bg-gold text-ink", Fundraiser: "bg-red text-white", Community: "bg-white text-ink" };

export default function UpcomingEvents() {
  const { lang, dict: d } = useLang();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  return (
    <section className="noise relative overflow-hidden bg-teal-deep py-24 text-white sm:py-32">
      <div className="absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full border-[40px] border-white/5" aria-hidden />
      <div className="absolute -right-52 -top-40 h-[36rem] w-[36rem] rounded-full border-[40px] border-gold/10" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading light eyebrow={d.events.eyebrow} title={d.events.title} />
          <Button href="/events" variant="white">{d.events.full} <ArrowRight className="h-4 w-4" /></Button>
        </div>
        <ol className="mt-14 grid gap-4 md:grid-cols-2">
          {upcoming.map((e, i) => {
            const open = e.shifts?.reduce((n, s) => n + Math.max(0, s.needed - s.filled), 0) ?? 0;
            return (
              <Reveal as="li" key={e.slug} delay={i * 0.06}>
                <Link href={`/events#${e.slug}`} className="focus-ring group flex h-full gap-5 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10 hover:ring-gold/60">
                  <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-gold text-ink">
                    <span className="font-heading text-5xl font-extrabold leading-none">{formatDate(e.date, { day: "numeric" }, lang)}</span>
                    <span className="font-heading text-sm font-bold uppercase tracking-wide">{formatDate(e.date, { month: "short" }, lang)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${typeColor[e.type]}`}>{d.common.types[e.type]}</span>
                    {open > 0 && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold"><HandHeart className="h-3 w-3" /> {open} {d.events.volunteersNeeded}</span>}
                    <h3 className="mt-2 text-3xl font-extrabold uppercase leading-tight group-hover:text-gold">{loc(lang, e, "title")}</h3>
                    <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/70">
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{e.time}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{e.location}</span>
                    </p>
                  </div>
                  <ArrowRight className="hidden h-6 w-6 self-center text-white/40 transition group-hover:translate-x-1 group-hover:text-gold sm:block" />
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

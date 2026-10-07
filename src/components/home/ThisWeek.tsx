"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CalendarDays, MapPin, Clock, ArrowRight, Dumbbell, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { events, practices, loc, sportName, formatDate, localISO } from "@/lib/data";
import { useLang } from "@/lib/i18n";

type Item = { kind: "practice" | "event"; date: Date; title: string; time: string; location: string; href: string; type?: string };

const subscribe = () => () => {};
const today = () => localISO();

export function weekItems(lang: "en" | "es", base: string): Item[] {
  const start = new Date(base + "T12:00:00");
  const items: Item[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const iso = localISO(day);
    for (const p of practices) {
      if (p.day === day.getDay() && iso >= p.start && iso <= p.end) {
        items.push({ kind: "practice", date: day, title: sportName(p.sport, lang), time: p.time, location: p.location, href: `/teams/${p.sport}` });
      }
    }
    for (const e of events) {
      if (iso >= e.date && iso <= (e.endDate ?? e.date) && (iso === e.date || i === 0)) {
        items.push({ kind: "event", date: day, title: loc(lang, e, "title"), time: e.time, location: e.location, href: `/events/${e.slug}`, type: e.type });
      }
    }
  }
  return items;
}

export default function ThisWeek() {
  const { lang, dict: d } = useLang();
  const base = useSyncExternalStore(subscribe, today, () => "");
  if (!base) return null;
  const items = weekItems(lang, base);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={d.thisWeek.eyebrow} title={d.thisWeek.title} />
          <Link href="/events" className="focus-ring group inline-flex w-fit items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-teal">
            {d.thisWeek.fullSchedule} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        </div>
        {items.length === 0 ? (
          <Reveal className="mt-10 rounded-3xl bg-mist p-8 text-ink-soft">{d.thisWeek.none}</Reveal>
        ) : (
          <ul className="mt-10 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {items.map((it, i) => {
              const isToday = localISO(it.date) === base;
              const tomorrow = new Date(base + "T12:00:00");
              tomorrow.setDate(tomorrow.getDate() + 1);
              const isTomorrow = localISO(it.date) === localISO(tomorrow);
              const label = isToday ? d.thisWeek.today : isTomorrow ? d.thisWeek.tomorrow : d.common.days[it.date.getDay()];
              return (
                <Reveal as="li" key={i} delay={i * 0.05} className="w-72 shrink-0">
                  <Link href={it.href} className={`focus-ring block h-full rounded-3xl border p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${isToday ? "border-teal bg-teal text-white" : "border-mist-dark bg-mist"}`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-heading text-sm font-bold uppercase tracking-[0.2em] ${isToday ? "text-gold" : "text-red"}`}>{label}</span>
                      <span className={`text-xs ${isToday ? "text-white/70" : "text-ink-soft"}`}>{formatDate(localISO(it.date), { month: "short", day: "numeric" }, lang)}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {it.kind === "practice" ? <Dumbbell className={`h-4 w-4 ${isToday ? "text-gold" : "text-teal"}`} /> : <Trophy className={`h-4 w-4 ${isToday ? "text-gold" : "text-teal"}`} />}
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${isToday ? "text-white/80" : "text-ink-soft"}`}>{it.kind === "practice" ? d.thisWeek.practice : d.common.types[it.type as keyof typeof d.common.types]}</span>
                    </div>
                    <h3 className="mt-1 text-2xl font-extrabold uppercase leading-tight">{it.title}</h3>
                    <p className={`mt-2 space-y-0.5 text-sm ${isToday ? "text-white/85" : "text-ink-soft"}`}>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{it.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{it.location}</span>
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        )}
        <p className="mt-2 flex items-center gap-2 text-xs text-ink-soft"><CalendarDays className="h-3.5 w-3.5" /> {formatDate(base, { weekday: "long", month: "long", day: "numeric" }, lang)}</p>
      </div>
    </section>
  );
}

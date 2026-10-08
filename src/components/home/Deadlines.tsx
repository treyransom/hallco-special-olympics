"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CalendarClock, ArrowRight } from "lucide-react";
import { registrationWindows, daysUntil, formatDate, localISO } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const subscribe = () => () => {};
const today = () => localISO();

export function DeadlineBadge({ season, compact = false }: { season: string; compact?: boolean }) {
  const { lang, dict: d } = useLang();
  const base = useSyncExternalStore(subscribe, today, () => "");
  const w = registrationWindows.find((x) => x.season === season);
  if (!base || !w) return null;
  const now = new Date(base + "T12:00:00");
  const left = daysUntil(w.closes, now);
  const notYet = base < w.opens;
  if (notYet) return <span className={`inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-soft ${compact ? "" : "text-xs"}`}><CalendarClock className="h-3.5 w-3.5" /> {d.deadlines.opens} {formatDate(w.opens, { month: "short", day: "numeric" }, lang)}</span>;
  if (left < 0) return <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-soft"><CalendarClock className="h-3.5 w-3.5" /> {d.deadlines.closed}</span>;
  const urgent = left <= 7;
  return (
    <Link href={w.href} className={`focus-ring inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${urgent ? "animate-pulse bg-red text-white" : "bg-gold text-ink"}`}>
      <CalendarClock className="h-3.5 w-3.5" /> {left === 0 ? d.deadlines.lastDay : `${left} ${d.deadlines.daysLeft}`}
    </Link>
  );
}

export default function Deadlines() {
  const { lang, dict: d } = useLang();
  const base = useSyncExternalStore(subscribe, today, () => "");
  if (!base) return null;
  const now = new Date(base + "T12:00:00");
  const open = registrationWindows.filter((w) => base >= w.opens && base <= w.closes).sort((a, b) => a.closes.localeCompare(b.closes));
  if (open.length === 0) return null;
  return (
    <section className="bg-mist pb-12">
      <div className="container-x grid gap-4 md:grid-cols-2">
        {open.map((w) => {
          const left = daysUntil(w.closes, now);
          const urgent = left <= 7;
          return (
            <Link key={w.season} href={w.href} className={`focus-ring group flex items-center gap-5 rounded-3xl p-6 shadow-lg transition hover:-translate-y-0.5 ${urgent ? "bg-red text-white shadow-red/30" : "bg-white shadow-ink/5"}`}>
              <div className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl ${urgent ? "bg-white/15" : "bg-gold text-ink"}`}>
                <span className="font-heading text-5xl font-extrabold leading-none">{Math.max(0, left)}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{d.deadlines.daysLeft}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className={`font-heading text-sm font-bold uppercase tracking-[0.2em] ${urgent ? "text-white/80" : "text-red"}`}>{d.deadlines.eyebrow}</p>
                <p className={`text-2xl font-extrabold uppercase leading-tight ${urgent ? "" : "text-ink"}`}>{d.deadlines.open}: {d.common.seasons[w.season]} {d.deadlines.season}</p>
                <p className={`text-sm ${urgent ? "text-white/80" : "text-ink-soft"}`}>{d.deadlines.closes} {formatDate(w.closes, { weekday: "long", month: "long", day: "numeric" }, lang)}</p>
              </div>
              <ArrowRight className={`h-6 w-6 shrink-0 transition group-hover:translate-x-1 ${urgent ? "text-white" : "text-teal"}`} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

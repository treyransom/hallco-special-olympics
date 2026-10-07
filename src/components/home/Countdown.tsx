"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { nextCompetition, loc, formatDate } from "@/lib/data";
import { useLang } from "@/lib/i18n";

function diff(target: string) {
  const ms = new Date(target + "T08:00:00").getTime() - Date.now();
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60, past: ms <= 0 };
}

export default function Countdown({ compact = false }: { compact?: boolean }) {
  const { lang, dict: d } = useLang();
  const ev = nextCompetition();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    if (!ev) return;
    const tick = () => setT(diff(ev.date));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [ev]);
  if (!ev) return null;

  const cells = t
    ? [
        [t.days, d.countdown.days],
        [t.hours, d.countdown.hours],
        [t.minutes, d.countdown.minutes],
        [t.seconds, d.countdown.seconds],
      ]
    : [["--", d.countdown.days], ["--", d.countdown.hours], ["--", d.countdown.minutes], ["--", d.countdown.seconds]];

  return (
    <section className={`bg-gradient-to-r from-teal-deep via-teal-dark to-teal text-white ${compact ? "py-10" : "py-14 sm:py-16"}`}>
      <div className="container-x flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
        <div className="text-center lg:text-left">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{t?.past ? d.countdown.live : d.countdown.eyebrow}</p>
          <h2 className="mt-1 text-4xl font-extrabold uppercase sm:text-5xl">{loc(lang, ev, "title")}</h2>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/85 lg:justify-start">
            <span>{formatDate(ev.date, { weekday: "long", month: "long", day: "numeric" }, lang)}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{ev.location}</span>
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-live="polite">
            {cells.map(([v, l]) => (
              <div key={l as string} className="flex w-16 flex-col items-center rounded-2xl bg-white/10 py-3 backdrop-blur sm:w-20">
                <span className="font-heading text-4xl font-extrabold leading-none tabular-nums sm:text-5xl">{typeof v === "number" ? String(v).padStart(2, "0") : v}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/70">{l}</span>
              </div>
            ))}
          </div>
          <Link href="/competition-guide" className="focus-ring hidden items-center gap-2 rounded-full bg-gold px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-white md:inline-flex">
            {d.countdown.guide} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Link href="/competition-guide" className="focus-ring inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-ink md:hidden">
          {d.countdown.guide} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

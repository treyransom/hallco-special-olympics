"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Trophy } from "lucide-react";
import { nextCompetition, loc, formatDate } from "@/lib/data";
import { useLang } from "@/lib/i18n";

function diff(target: string) {
  const ms = new Date(target + "T08:00:00").getTime() - Date.now();
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60, past: ms <= 0 };
}

export default function Countdown({ compact = false, overlap = false }: { compact?: boolean; overlap?: boolean }) {
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

  const cells = (t ? [t.days, t.hours, t.minutes, t.seconds] : ["--", "--", "--", "--"]).map((v, i) => [v, [d.countdown.days, d.countdown.hours, d.countdown.minutes, d.countdown.seconds][i]] as const);

  const inner = (
    <div className="noise relative flex flex-col items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-teal-deep via-teal-dark to-teal p-8 text-white shadow-2xl shadow-teal/30 lg:flex-row lg:justify-between lg:p-10">
      <div className="bg-dots-light absolute inset-0" aria-hidden />
      <Trophy className="absolute -right-8 -top-8 h-56 w-56 -rotate-12 text-white/5" aria-hidden />
      <div className="relative text-center lg:text-left">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{t?.past ? d.countdown.live : d.countdown.eyebrow}</p>
        <h2 className="mt-1 text-4xl font-extrabold uppercase sm:text-5xl">{loc(lang, ev, "title")}</h2>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/85 lg:justify-start">
          <span>{formatDate(ev.date, { weekday: "long", month: "long", day: "numeric" }, lang)}</span>
          <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{ev.location}</span>
        </p>
      </div>
      <div className="relative flex flex-col items-center gap-5 sm:flex-row">
        <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-live="polite">
          {cells.map(([v, l]) => (
            <div key={l} className="flex w-14 flex-col items-center rounded-2xl bg-white/10 py-3 backdrop-blur sm:w-20">
              <span className="font-heading text-3xl font-extrabold leading-none tabular-nums sm:text-5xl">{typeof v === "number" ? String(v).padStart(2, "0") : v}</span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/70">{l}</span>
            </div>
          ))}
        </div>
        <Link href="/competition-guide" className="focus-ring inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-white">
          {d.countdown.guide} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );

  if (overlap) {
    return (
      <section className="relative z-10 -mt-24 bg-mist pb-4 lg:-mt-28">
        <div className="container-x">{inner}</div>
      </section>
    );
  }
  return (
    <section className={`bg-mist ${compact ? "py-8" : "py-12"}`}>
      <div className="container-x">{inner}</div>
    </section>
  );
}

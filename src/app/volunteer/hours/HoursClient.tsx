"use client";

import { useState } from "react";
import { Trophy, Send, CheckCircle2, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/home/Counter";
import { volunteerHours, team, site } from "@/lib/data";
import { useDict } from "@/lib/i18n";

const medal = ["bg-gold text-ink", "bg-mist-dark text-ink", "bg-[#c97b3a] text-white"];

export default function HoursClient() {
  const d = useDict();
  const h = d.hours;
  const coord = team.find((t) => t.role === "Volunteer Coordinator");
  const [sent, setSent] = useState(false);
  const total = volunteerHours.reduce((a, b) => a + b.hours, 0);
  const sorted = [...volunteerHours].sort((a, b) => b.hours - a.hours);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = [`Volunteer hours`, ``, `Name: ${fd.get("name")}`, `Date: ${fd.get("date")}`, `Hours: ${fd.get("hours")}`, `Activity: ${fd.get("activity")}`].join("\n");
    window.location.assign(`mailto:${coord?.email ?? site.email}?subject=${encodeURIComponent(`Volunteer hours: ${fd.get("name")} — ${fd.get("hours")}h`)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  }
  const field = "focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3 text-ink";
  return (
    <>
      <PageHero curve="ink" eyebrow={h.eyebrow} title={h.title} image="/images/coaches.jpg" description={h.text} />
      <section className="noise relative overflow-hidden bg-ink py-16 text-white">
        <div className="bg-dots-light absolute inset-0" aria-hidden />
        <div className="container-x relative flex flex-col items-center gap-2 text-center">
          <Clock className="h-8 w-8 text-gold" />
          <p className="font-heading text-7xl font-extrabold leading-none sm:text-8xl"><Counter to={total} /></p>
          <p className="font-heading text-xl font-bold uppercase tracking-[0.2em] text-gold">{h.total}</p>
        </div>
      </section>
      <section className="bg-dots bg-white py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_24rem]">
          <div>
            <SectionHeading eyebrow={h.eyebrow} title={h.leaderboard} />
            <ol className="mt-8 space-y-2">
              {sorted.map((v, i) => (
                <Reveal as="li" key={v.name} delay={i * 0.04} className="flex items-center gap-4 rounded-2xl border border-mist-dark bg-white p-4 shadow-sm">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-heading text-xl font-extrabold ${medal[i] ?? "bg-mist text-ink-soft"}`}>{i < 3 ? <Trophy className="h-5 w-5" /> : i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-2xl font-bold uppercase text-ink">{v.name}</p>
                    <p className="text-sm text-ink-soft">{v.role}</p>
                  </div>
                  <div className="w-32">
                    <div className="h-2 overflow-hidden rounded-full bg-mist"><div className="h-full rounded-full bg-teal" style={{ width: `${Math.round((v.hours / sorted[0].hours) * 100)}%` }} /></div>
                    <p className="mt-1 text-right font-heading text-xl font-bold text-ink">{v.hours}<span className="text-xs text-ink-soft"> h</span></p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <aside className="h-fit lg:sticky lg:top-28">
            <form onSubmit={submit} className="rounded-3xl bg-mist p-6 shadow-xl shadow-ink/5">
              <h2 className="text-3xl font-extrabold uppercase text-ink">{h.log}</h2>
              {sent ? (
                <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal"><CheckCircle2 className="h-4 w-4" /> {h.sent}</p>
              ) : (
                <div className="mt-4 space-y-3 text-sm font-semibold text-ink">
                  <label className="block">{h.name}<input name="name" required className={field} /></label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">{h.date}<input name="date" type="date" required className={field} /></label>
                    <label className="block">{h.hoursLabel}<input name="hours" type="number" step="0.5" min="0.5" required className={field} /></label>
                  </div>
                  <label className="block">{h.activity}<textarea name="activity" rows={3} required className={field} /></label>
                  <button type="submit" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-dark"><Send className="h-4 w-4" /> {h.send}</button>
                </div>
              )}
            </form>
          </aside>
        </div>
      </section>
    </>
  );
}

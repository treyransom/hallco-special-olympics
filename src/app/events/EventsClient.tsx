"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Trophy, HandHeart, Printer, Ticket, CalendarCheck, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { events, formatDate, site, loc, localISO, type Event } from "@/lib/data";
import { useSyncExternalStore } from "react";
import Link2 from "next/link";
import { ArrowRight } from "lucide-react";

const subscribe = () => () => {};
const today = () => localISO();
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import AddToCalendar from "@/components/ui/AddToCalendar";
import CTA from "@/components/home/CTA";
import { useLang } from "@/lib/i18n";

const types = ["All", "Competition", "Practice", "Fundraiser", "Community"] as const;
const typeColor: Record<Event["type"], string> = { Competition: "bg-teal text-white", Practice: "bg-gold text-ink", Fundraiser: "bg-red text-white", Community: "bg-ink text-white" };
const dateColor: Record<Event["type"], string> = { Competition: "bg-teal text-white", Practice: "bg-gold text-ink", Fundraiser: "bg-red text-white", Community: "bg-ink text-white" };

export default function EventsClient() {
  const { lang, dict: d } = useLang();
  const [filter, setFilter] = useState<(typeof types)[number]>("All");
  const [copied, setCopied] = useState(false);
  const base = useSyncExternalStore(subscribe, today, () => "");
  const weekend = (() => {
    if (!base) return [] as Event[];
    const d0 = new Date(base + "T12:00:00");
    const sat = new Date(d0); sat.setDate(d0.getDate() + ((6 - d0.getDay() + 7) % 7));
    const sun = new Date(sat); sun.setDate(sat.getDate() + 1);
    const a = localISO(sat), b = localISO(sun);
    return events.filter((e) => e.date <= b && (e.endDate ?? e.date) >= a);
  })();
  const list = [...events].sort((a, b) => a.date.localeCompare(b.date)).filter((e) => filter === "All" || e.type === filter);
  const byMonth = list.reduce<Record<string, Event[]>>((acc, e) => {
    const key = formatDate(e.date, { month: "long", year: "numeric" }, lang);
    (acc[key] ||= []).push(e);
    return acc;
  }, {});
  const icsUrl = `${site.url}/calendar.ics`;
  const webcal = icsUrl.replace(/^https?:/, "webcal:");

  return (
    <>
      <PageHero curve="mist" eyebrow={d.events.pageEyebrow} title={d.events.pageTitle} image="/images/golf-group.jpg" description={d.events.pageText} />
      <section className="bg-dots bg-mist py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="tablist">
            {types.map((t) => (
              <button key={t} role="tab" aria-selected={filter === t} onClick={() => setFilter(t)} className={cn("focus-ring rounded-full px-5 py-2 font-heading text-lg font-bold uppercase tracking-wide transition", filter === t ? "bg-ink text-white" : "bg-white text-ink hover:bg-mist-dark")}>
                {t === "All" ? d.events.all : d.common.types[t]}
              </button>
            ))}
          </div>
          {base && (
            <div className="mt-10 rounded-3xl bg-ink p-6 text-white sm:p-8">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{d.weekend.title}</p>
              {weekend.length === 0 ? (
                <p className="mt-2 text-white/80">{d.weekend.none}</p>
              ) : (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {weekend.map((e) => (
                    <li key={e.slug}>
                      <Link2 href={`/events/${e.slug}`} className="focus-ring group flex items-center gap-3 rounded-2xl bg-white/10 p-4 transition hover:bg-white/15">
                        <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gold text-ink"><span className="font-heading text-xl font-extrabold leading-none">{formatDate(e.date, { day: "numeric" }, lang)}</span><span className="text-[9px] font-bold uppercase">{formatDate(e.date, { month: "short" }, lang)}</span></span>
                        <span className="min-w-0 flex-1"><span className="block font-heading text-lg font-bold uppercase leading-tight group-hover:text-gold">{loc(lang, e, "title")}</span><span className="block text-xs text-white/70">{e.time} · {e.location}</span></span>
                        <ArrowRight className="h-4 w-4 text-white/60" />
                      </Link2>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className="mt-12 space-y-14">
            <AnimatePresence mode="popLayout">
              {Object.entries(byMonth).map(([month, items]) => (
                <motion.div key={month} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="flex items-center gap-4 text-3xl font-extrabold uppercase text-ink"><span className="text-teal">{month}</span><span className="h-px flex-1 bg-mist-dark" /></h2>
                  <ol className="mt-5 grid gap-5 md:grid-cols-2">
                    {items.map((e) => {
                      const open = e.shifts?.reduce((n, s) => n + Math.max(0, s.needed - s.filled), 0) ?? 0;
                      return (
                        <li key={e.slug} id={e.slug} className="scroll-mt-28">
                          <article className="flex h-full gap-5 rounded-3xl bg-white p-6 shadow-lg shadow-ink/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/10">
                            <div className={`flex w-16 shrink-0 flex-col items-center rounded-2xl py-3 ${dateColor[e.type]}`}>
                              <span className="font-heading text-3xl font-extrabold leading-none">{formatDate(e.date, { day: "numeric" }, lang)}</span>
                              <span className="font-heading text-sm font-bold uppercase">{formatDate(e.date, { month: "short" }, lang)}</span>
                              {e.endDate && <span className="mt-1 text-[10px] font-semibold opacity-70">– {formatDate(e.endDate, { day: "numeric" }, lang)}</span>}
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider", typeColor[e.type])}>{d.common.types[e.type]}</span>
                              <h3 className="mt-2 text-2xl font-extrabold uppercase text-ink"><Link href={`/events/${e.slug}`} className="focus-ring rounded hover:text-teal">{loc(lang, e, "title")}</Link></h3>
                              <p className="mt-2 text-sm text-ink-soft">{loc(lang, e, "description")}</p>
                              <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal" />{e.time}</li>
                                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal" />{e.location}</li>
                                {e.sport && <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-teal" />{e.sport}</li>}
                              </ul>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Link href={`/events/${e.slug}`} className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-teal-deep">{d.common.details} <ArrowRight className="h-3.5 w-3.5" /></Link>
                                <AddToCalendar event={e} />
                                <Link href={`/events/${e.slug}/flyer`} className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-mist-dark px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:border-teal hover:text-teal"><Printer className="h-3.5 w-3.5" /> {d.common.printFlyer}</Link>
                                {open > 0 && <Link href={`/volunteer#${e.slug}`} className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-white"><HandHeart className="h-3.5 w-3.5" /> {open} {d.events.shiftsOpen}</Link>}
                                {e.registerHref && <Link href={e.registerHref} className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-red px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-dark"><Ticket className="h-3.5 w-3.5" /> {d.events.registerNow}</Link>}
                              </div>
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ol>
                </motion.div>
              ))}
            </AnimatePresence>
            {list.length === 0 && <p className="text-ink-soft">{d.events.none}</p>}
          </div>

          <div id="subscribe" className="mt-16 grid min-w-0 scroll-mt-28 gap-6 lg:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-3xl bg-teal-deep p-6 text-white sm:p-10">
              <p className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold"><CalendarCheck className="h-4 w-4" /> {d.events.subscribe}</p>
              <p className="mt-3 text-white/85">{d.events.subscribeText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={webcal} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-ink hover:bg-gold">{d.events.subscribeApple}</a>
                <a href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}`} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-white hover:text-ink">{d.events.subscribeGoogle}</a>
              </div>
              <p className="mt-5 text-xs text-white/60">{d.events.subscribeHow}</p>
              <div className="mt-2 flex items-center gap-2">
                <code className="min-w-0 flex-1 break-all rounded-lg bg-white/10 px-3 py-2 text-xs">{icsUrl}</code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(icsUrl).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    });
                  }}
                  className="focus-ring inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white/20"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? d.events.copied : d.events.copy}
                </button>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 text-center sm:p-10">
              <h2 className="text-3xl font-extrabold uppercase text-ink">{d.events.never}</h2>
              <p className="mx-auto mt-2 max-w-xl text-ink-soft">{d.events.neverText}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href={site.social.facebook} external variant="secondary">{d.events.follow}</Button>
                <Button href="/contact" variant="outline">{d.events.ask}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { events, formatDate, site, type Event } from "@/lib/data";
import Button from "@/components/ui/Button";
import AddToCalendar from "@/components/ui/AddToCalendar";

const types = ["All", "Competition", "Practice", "Fundraiser", "Community"] as const;
const typeColor: Record<Event["type"], string> = {
  Competition: "bg-teal text-white",
  Practice: "bg-gold text-ink",
  Fundraiser: "bg-red text-white",
  Community: "bg-ink text-white",
};

export default function EventsClient() {
  const [filter, setFilter] = useState<(typeof types)[number]>("All");
  const list = [...events].sort((a, b) => a.date.localeCompare(b.date)).filter((e) => filter === "All" || e.type === filter);

  const byMonth = list.reduce<Record<string, Event[]>>((acc, e) => {
    const key = formatDate(e.date, { month: "long", year: "numeric" });
    (acc[key] ||= []).push(e);
    return acc;
  }, {});

  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter events">
          {types.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={filter === t}
              onClick={() => setFilter(t)}
              className={cn(
                "focus-ring rounded-full px-5 py-2 font-heading text-lg font-bold uppercase tracking-wide transition",
                filter === t ? "bg-ink text-white" : "bg-white text-ink hover:bg-mist-dark",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-12 space-y-14">
          <AnimatePresence mode="popLayout">
            {Object.entries(byMonth).map(([month, items]) => (
              <motion.div key={month} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h2 className="text-3xl font-extrabold uppercase text-ink">{month}</h2>
                <ol className="mt-5 grid gap-5 md:grid-cols-2">
                  {items.map((e) => (
                    <li key={e.slug} id={e.slug} className="scroll-mt-28">
                      <article className="flex h-full gap-5 rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg hover:shadow-ink/5">
                        <div className="flex w-16 shrink-0 flex-col items-center rounded-2xl bg-teal-deep py-3 text-white">
                          <span className="font-heading text-3xl font-extrabold leading-none">{formatDate(e.date, { day: "numeric" })}</span>
                          <span className="font-heading text-sm font-bold uppercase">{formatDate(e.date, { month: "short" })}</span>
                          {e.endDate && <span className="mt-1 text-[10px] font-semibold text-white/70">– {formatDate(e.endDate, { day: "numeric" })}</span>}
                        </div>
                        <div className="min-w-0">
                          <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider", typeColor[e.type])}>{e.type}</span>
                          <h3 className="mt-2 text-2xl font-extrabold uppercase text-ink">{e.title}</h3>
                          <p className="mt-2 text-sm text-ink-soft">{e.description}</p>
                          <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal" />{e.time}</li>
                            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal" />{e.location}</li>
                            {e.sport && <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-teal" />{e.sport}</li>}
                          </ul>
                          <AddToCalendar event={e} className="mt-4" />
                        </div>
                      </article>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </AnimatePresence>
          {list.length === 0 && <p className="text-ink-soft">No events in this category yet. Check back soon.</p>}
        </div>

        <div className="mt-16 rounded-3xl bg-white p-8 text-center sm:p-12">
          <h2 className="text-3xl font-extrabold uppercase text-ink">Never miss a game</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">Follow us on Facebook for practice reminders, weather updates, and photos from every event.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={site.social.facebook} external variant="secondary">Follow on Facebook</Button>
            <Button href="/contact" variant="outline">Ask a question</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

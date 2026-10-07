"use client";

import { useRef, useState } from "react";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, HandHeart, Send, CheckCircle2, X, ClipboardCheck, Timer } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { events, team, site, formatDate, loc, type Event, type Shift } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function VolunteerClient() {
  const { lang, dict: d } = useLang();
  const v = d.volunteerPage;
  const coord = team.find((t) => t.role === "Volunteer Coordinator");
  const list = [...events].filter((e) => e.shifts?.length).sort((a, b) => a.date.localeCompare(b.date));
  const [pick, setPick] = useState<{ e: Event; s: Shift } | null>(null);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLFormElement>(null);
  useFocusTrap(dialogRef, !!pick);

  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!pick) return;
    const fd = new FormData(ev.currentTarget);
    const body = [`Volunteer signup`, ``, `Event: ${pick.e.title} (${pick.e.date})`, `Shift: ${pick.s.role} — ${pick.s.time}`, ``, `Name: ${fd.get("name")}`, `Email: ${fd.get("email")}`, `Phone: ${fd.get("phone")}`, `Notes: ${fd.get("notes") || "—"}`].join("\n");
    window.location.href = `mailto:${coord?.email ?? site.email}?subject=${encodeURIComponent(`Volunteer: ${pick.s.role} @ ${pick.e.title}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageHero curve="mist" eyebrow={v.eyebrow} title={v.title} image="/images/coaches.jpg" description={v.text} />
      <section className="bg-dots bg-mist py-20 sm:py-28">
        <div className="container-x space-y-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <Button href="/volunteer/checklists" variant="secondary" className="justify-start"><ClipboardCheck className="h-5 w-5" /> {d.nav.checklists}</Button>
            <Button href="/volunteer/hours" variant="outline" className="justify-start"><Timer className="h-5 w-5" /> {d.nav.hours}</Button>
          </div>
          {list.length === 0 && <p className="text-ink-soft">{v.noShifts}</p>}
          {list.map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.05} className="scroll-mt-28 overflow-hidden rounded-3xl bg-white shadow-sm">
              <div id={e.slug} className="flex flex-col gap-2 border-b border-mist-dark p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-red">{formatDate(e.date, { weekday: "long", month: "long", day: "numeric" }, lang)}</p>
                  <h2 className="text-3xl font-extrabold uppercase text-ink">{loc(lang, e, "title")}</h2>
                  <p className="flex flex-wrap gap-x-4 text-sm text-ink-soft"><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-teal" />{e.time}</span><span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-teal" />{e.location}</span></p>
                </div>
                <p className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink"><HandHeart className="h-3.5 w-3.5" /> {e.shifts!.reduce((n, s) => n + Math.max(0, s.needed - s.filled), 0)} {d.events.shiftsOpen}</p>
              </div>
              <ul className="divide-y divide-mist">
                {e.shifts!.map((s) => {
                  const open = Math.max(0, s.needed - s.filled);
                  const pct = Math.round((s.filled / s.needed) * 100);
                  return (
                    <li key={s.role} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:px-8">
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-xl font-bold uppercase text-ink">{loc(lang, s, "role")}</p>
                        <p className="text-sm text-ink-soft">{s.time}</p>
                      </div>
                      <div className="w-full sm:w-48">
                        <div className="h-2 overflow-hidden rounded-full bg-mist"><div className={cn("h-full rounded-full", open === 0 ? "bg-teal" : "bg-gold")} style={{ width: `${pct}%` }} /></div>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-ink-soft">{s.filled}/{s.needed} · {open} {v.open}</p>
                      </div>
                      {open === 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-dark"><CheckCircle2 className="h-3.5 w-3.5" /> {v.filled}</span>
                      ) : (
                        <button type="button" onClick={() => { setPick({ e, s }); setSent(false); }} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-teal px-4 py-2 font-heading text-base font-bold uppercase tracking-wide text-white hover:bg-teal-dark">{v.signup}</button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
          <Reveal className="rounded-3xl bg-white p-8 text-center">
            <p className="text-ink-soft">{d.involved.volX}</p>
            <Button href="/get-involved#volunteer" variant="outline" className="mt-4">{d.common.learnMore}</Button>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {pick && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 p-4 sm:items-center" onClick={() => setPick(null)} role="dialog" aria-modal="true" aria-label={v.form}>
            <motion.form ref={dialogRef} initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} onSubmit={submit} onClick={(ev) => ev.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{v.form}</p>
                  <h2 className="text-3xl font-extrabold uppercase text-ink">{loc(lang, pick.s, "role")}</h2>
                  <p className="text-sm text-ink-soft">{loc(lang, pick.e, "title")} · {pick.s.time}</p>
                </div>
                <button type="button" onClick={() => setPick(null)} aria-label={d.common.close} className="focus-ring rounded-full p-2 hover:bg-mist"><X className="h-5 w-5" /></button>
              </div>
              {sent ? (
                <p className="mt-6 flex items-center gap-2 font-semibold text-teal"><CheckCircle2 className="h-5 w-5" /> {v.sent}</p>
              ) : (
                <>
                  <div className="mt-6 grid gap-4">
                    <label className="block text-sm font-semibold text-ink">{d.common.name}<input name="name" required className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-semibold text-ink">{d.common.email}<input name="email" type="email" required className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
                      <label className="block text-sm font-semibold text-ink">{d.common.phone}<input name="phone" type="tel" className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
                    </div>
                    <label className="block text-sm font-semibold text-ink">{d.register.notes}<textarea name="notes" rows={2} className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
                  </div>
                  <button type="submit" className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-5 py-3.5 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-dark"><Send className="h-4 w-4" /> {v.send}</button>
                </>
              )}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

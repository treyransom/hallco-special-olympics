"use client";

import Link from "next/link";
import { Clock, MapPin, Trophy, HandHeart, Printer, Ticket, Navigation, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import AddToCalendar from "@/components/ui/AddToCalendar";
import ShareBar from "@/components/ui/ShareBar";
import AlertBanner from "@/components/layout/AlertBanner";
import { events, fundraisers, formatDate, loc, alert, sportName } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const typeColor = { Competition: "bg-teal text-white", Practice: "bg-gold text-ink", Fundraiser: "bg-red text-white", Community: "bg-ink text-white" };

export default function EventClient({ slug }: { slug: string }) {
  const { lang, dict: d } = useLang();
  const e = events.find((x) => x.slug === slug)!;
  const f = fundraisers.find((x) => x.eventSlug === e.slug);
  const image = f?.image ?? (e.type === "Competition" ? "/images/medals.jpg" : e.type === "Practice" ? "/images/basketball-action.jpg" : "/images/holiday-dance.jpg");
  const q = encodeURIComponent(e.address ?? e.location);
  const open = e.shifts?.reduce((n, s) => n + Math.max(0, s.needed - s.filled), 0) ?? 0;
  const alertApplies = alert.sports.length === 0 || alert.sports.some((sl) => (e.sport ?? "").toLowerCase().includes(sportName(sl).toLowerCase()));
  const others = [...events].filter((x) => x.slug !== e.slug && x.date >= e.date).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return (
    <>
      <PageHero curve="mist" eyebrow={d.common.types[e.type]} title={loc(lang, e, "title")} image={image} description={loc(lang, e, "description")}>
        <div className="flex flex-wrap items-center gap-3">
          {e.registerHref && <Button href={e.registerHref}><Ticket className="h-4 w-4" /> {d.events.registerNow}</Button>}
          <AddToCalendar event={e} className="border-white/40 text-white hover:border-gold hover:text-gold" />
          <Link href={`/events/${e.slug}/flyer`} className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-white/40 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-gold hover:text-gold"><Printer className="h-3.5 w-3.5" /> {d.common.printFlyer}</Link>
        </div>
      </PageHero>
      <section className="bg-dots bg-mist py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-8">
            {alertApplies && <AlertBanner inline />}
            <Reveal className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Clock, label: formatDate(e.date, { weekday: "long", month: "long", day: "numeric" }, lang) + (e.endDate ? ` – ${formatDate(e.endDate, { day: "numeric" }, lang)}` : ""), sub: e.time },
                { icon: MapPin, label: e.location, sub: e.address ?? "" },
                { icon: Trophy, label: e.sport ?? d.common.types[e.type], sub: "" },
              ].map((c, i) => (
                <div key={i} className="rounded-3xl bg-white p-5 shadow-sm">
                  <c.icon className="h-6 w-6 text-teal" />
                  <p className="mt-3 font-heading text-xl font-bold uppercase leading-tight text-ink">{c.label}</p>
                  {c.sub && <p className="text-sm text-ink-soft">{c.sub}</p>}
                </div>
              ))}
            </Reveal>
            <Reveal className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-ink/5">
              <iframe title={`${d.map.mapOf} ${e.location}`} src={`https://www.google.com/maps?q=${q}&z=14&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[16/9] w-full border-0" />
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer" className="focus-ring absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-teal-deep"><Navigation className="h-4 w-4" /> {d.common.directions}</a>
            </Reveal>
            {e.shifts && e.shifts.length > 0 && (
              <Reveal className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="flex items-center gap-2 text-3xl font-extrabold uppercase text-ink"><HandHeart className="h-7 w-7 text-red" /> {d.nav.volunteerShifts}</h2>
                  <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">{open} {d.events.shiftsOpen}</span>
                </div>
                <ul className="mt-4 divide-y divide-mist">
                  {e.shifts.map((s) => (
                    <li key={s.role} className="flex flex-wrap items-center justify-between gap-2 py-3">
                      <span><span className="font-heading text-lg font-bold uppercase text-ink">{loc(lang, s, "role")}</span><span className="ml-2 text-sm text-ink-soft">{s.time}</span></span>
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">{s.filled}/{s.needed}</span>
                    </li>
                  ))}
                </ul>
                <Button href={`/volunteer#${e.slug}`} variant="secondary" className="mt-5">{d.volunteerPage.signup}</Button>
              </Reveal>
            )}
            <ShareBar path={`/events/${e.slug}`} title={loc(lang, e, "title")} />
          </div>
          <aside className="h-fit space-y-5 lg:sticky lg:top-28">
            {f && (
              <Reveal className="noise relative overflow-hidden rounded-3xl bg-gradient-to-br from-red to-red-dark p-6 text-white shadow-xl shadow-red/30">
                <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/80">{d.fundraiser.eyebrow}</p>
                <h3 className="mt-1 text-3xl font-extrabold uppercase">{loc(lang, f, "name")}</h3>
                <p className="mt-2 text-sm text-white/85">{loc(lang, f, "blurb")}</p>
                <Button href={f.href} variant="white" className="mt-5 w-full">{d.fundraiser.register}</Button>
              </Reveal>
            )}
            <Reveal delay={0.1} className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{d.events.eyebrow}</p>
              <ul className="mt-3 divide-y divide-mist">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/events/${o.slug}`} className="focus-ring group flex items-center gap-3 py-3">
                      <span className={cn("flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl", typeColor[o.type])}><span className="font-heading text-xl font-extrabold leading-none">{formatDate(o.date, { day: "numeric" }, lang)}</span><span className="text-[9px] font-bold uppercase">{formatDate(o.date, { month: "short" }, lang)}</span></span>
                      <span className="min-w-0 flex-1 font-heading text-lg font-bold uppercase leading-tight text-ink group-hover:text-teal">{loc(lang, o, "title")}</span>
                      <ArrowRight className="h-4 w-4 text-ink-soft" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/events" className="mt-3 inline-flex items-center gap-1 font-heading text-base font-bold uppercase tracking-wide text-teal">{d.events.full} <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

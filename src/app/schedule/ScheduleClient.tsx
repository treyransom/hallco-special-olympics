"use client";

import Link from "next/link";
import { Clock, MapPin, User, CalendarCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import SportIcon from "@/components/ui/SportIcon";
import ThisWeek from "@/components/home/ThisWeek";
import Countdown from "@/components/home/Countdown";
import { practices, sports, loc } from "@/lib/data";
import AlertBanner from "@/components/layout/AlertBanner";
import { useLang } from "@/lib/i18n";

export default function ScheduleClient() {
  const { lang, dict: d } = useLang();
  const days = [1, 2, 3, 4, 5, 6, 0] as const;
  return (
    <>
      <PageHero curve="mist" eyebrow={d.schedulePage.eyebrow} title={d.schedulePage.title} image="/images/basketball-action.jpg" description={d.schedulePage.text} />
      <Countdown compact />
      <div className="container-x -mt-2 mb-2"><AlertBanner inline /></div>
      <ThisWeek />
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={d.schedulePage.byDay} title={d.sports.practices} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {days.map((day) => {
              const list = practices.filter((p) => p.day === day);
              return (
                <Reveal key={day} className="rounded-3xl bg-white p-5 shadow-sm">
                  <h3 className="font-heading text-2xl font-extrabold uppercase text-ink">{d.common.days[day]}</h3>
                  {list.length === 0 ? (
                    <p className="mt-3 text-sm text-ink-soft">{d.schedulePage.noPractice}</p>
                  ) : (
                    <ul className="mt-3 space-y-3">
                      {list.map((p, i) => {
                        const s = sports.find((x) => x.slug === p.sport)!;
                        return (
                          <li key={i} className="rounded-2xl bg-mist p-3">
                            <Link href={`/teams/${p.sport}`} className="focus-ring flex items-center gap-2 font-heading text-lg font-bold uppercase text-ink hover:text-teal">
                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal text-white"><SportIcon icon={s.icon} className="h-4 w-4" /></span>
                              {loc(lang, s, "name")}
                            </Link>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft"><Clock className="h-3 w-3 text-teal" />{p.time}</p>
                            <p className="flex items-center gap-1.5 text-xs text-ink-soft"><MapPin className="h-3 w-3 text-teal" />{p.location}</p>
                            {p.coach && <p className="flex items-center gap-1.5 text-xs text-ink-soft"><User className="h-3 w-3 text-teal" />{p.coach}</p>}
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-red">{s.months}</p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-12 rounded-3xl bg-white p-6 sm:p-8">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{d.schedulePage.seasonNote}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {sports.map((s) => (
                <li key={s.slug} className="flex items-center justify-between rounded-2xl bg-mist px-4 py-2.5 text-sm"><span className="font-heading text-lg font-bold uppercase text-ink">{loc(lang, s, "name")}</span><span className="text-ink-soft">{d.common.seasons[s.season]} · {s.months}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl bg-teal-deep p-8 text-white sm:flex-row">
            <p className="inline-flex items-center gap-2 text-2xl font-extrabold uppercase"><CalendarCheck className="h-6 w-6 text-gold" /> {d.events.subscribe}</p>
            <Button href="/events#subscribe" variant="white">{d.events.subscribeApple} / {d.events.subscribeGoogle}</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

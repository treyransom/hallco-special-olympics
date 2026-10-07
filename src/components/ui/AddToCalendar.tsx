"use client";

import { CalendarPlus } from "lucide-react";
import type { Event } from "@/lib/data";
import { site, loc, localISO } from "@/lib/data";
import { useLang } from "@/lib/i18n";

function ymd(iso: string) {
  return iso.replaceAll("-", "");
}

export function googleCalendarUrl(e: Event, lang: "en" | "es" = "en") {
  const start = ymd(e.date);
  const endDate = new Date((e.endDate ?? e.date) + "T12:00:00");
  endDate.setDate(endDate.getDate() + 1);
  const end = localISO(endDate).replaceAll("-", "");
  const p = new URLSearchParams({ action: "TEMPLATE", text: `${loc(lang, e, "title")} — ${site.shortName}`, dates: `${start}/${end}`, details: `${loc(lang, e, "description")}\n${e.time}`, location: e.address ?? e.location });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export default function AddToCalendar({ event, className = "" }: { event: Event; className?: string }) {
  const { lang, dict: d } = useLang();
  return (
    <a href={googleCalendarUrl(event, lang)} target="_blank" rel="noopener noreferrer" className={`focus-ring inline-flex items-center gap-1.5 rounded-full border border-mist-dark px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:border-teal hover:text-teal ${className}`}>
      <CalendarPlus className="h-3.5 w-3.5" /> {d.common.addToCalendar}
    </a>
  );
}

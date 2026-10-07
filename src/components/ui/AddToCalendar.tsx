import { CalendarPlus } from "lucide-react";
import type { Event } from "@/lib/data";
import { site } from "@/lib/data";

function ymd(iso: string) {
  return iso.replaceAll("-", "");
}

export function googleCalendarUrl(e: Event) {
  const start = ymd(e.date);
  const endDate = new Date((e.endDate ?? e.date) + "T12:00:00");
  endDate.setDate(endDate.getDate() + 1);
  const end = endDate.toISOString().slice(0, 10).replaceAll("-", "");
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.title} — ${site.shortName}`,
    dates: `${start}/${end}`,
    details: `${e.description}\n${e.time}`,
    location: e.location,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export default function AddToCalendar({ event, className = "" }: { event: Event; className?: string }) {
  return (
    <a
      href={googleCalendarUrl(event)}
      target="_blank"
      rel="noopener noreferrer"
      className={`focus-ring inline-flex items-center gap-1.5 rounded-full border border-mist-dark px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:border-teal hover:text-teal ${className}`}
    >
      <CalendarPlus className="h-3.5 w-3.5" /> Add to calendar
    </a>
  );
}

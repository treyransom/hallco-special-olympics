import { events, practices, sports, site, localISO } from "@/lib/data";

export const dynamic = "force-static";

const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
const ymd = (iso: string) => iso.replaceAll("-", "");
const nextDay = (iso: string) => {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + 1);
  return localISO(d).replaceAll("-", "");
};
const stamp = () => new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";

/** "10:00 – 11:30 AM" → ["100000","113000"] in local time, or null for all-day */
function parseTime(t: string): [string, string] | null {
  const m = t.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?\s*[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!m) return null;
  const toHM = (h: string, min: string | undefined, ap: string) => {
    let hh = parseInt(h, 10) % 12;
    if (ap.toUpperCase() === "PM") hh += 12;
    return `${String(hh).padStart(2, "0")}${min ?? "00"}00`;
  };
  const endAp = m[6];
  const startAp = m[3] ?? endAp;
  return [toHM(m[1], m[2], startAp), toHM(m[4], m[5], endAp)];
}

export function GET() {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Calendar//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${esc(site.name)}`,
    "X-WR-TIMEZONE:America/New_York",
    "REFRESH-INTERVAL;VALUE=DURATION:P1D",
  ];
  for (const e of events) {
    const t = parseTime(e.time);
    lines.push("BEGIN:VEVENT", `UID:event-${e.slug}@specialolympicshallcounty.org`, `DTSTAMP:${stamp()}`);
    if (t && !e.endDate) {
      lines.push(`DTSTART;TZID=America/New_York:${ymd(e.date)}T${t[0]}`, `DTEND;TZID=America/New_York:${ymd(e.date)}T${t[1]}`);
    } else {
      lines.push(`DTSTART;VALUE=DATE:${ymd(e.date)}`, `DTEND;VALUE=DATE:${nextDay(e.endDate ?? e.date)}`);
    }
    lines.push(`SUMMARY:${esc(e.title)}`, `DESCRIPTION:${esc(`${e.description}\n${e.time}\n${site.url}/events#${e.slug}`)}`, `LOCATION:${esc(e.address ?? e.location)}`, `URL:${site.url}/events#${e.slug}`, `CATEGORIES:${e.type}`, "END:VEVENT");
  }
  for (const p of practices) {
    const sport = sports.find((s) => s.slug === p.sport);
    const t = parseTime(p.time);
    if (!t) continue;
    // first occurrence on/after p.start matching the weekday
    const first = new Date(p.start + "T12:00:00");
    while (first.getDay() !== p.day) first.setDate(first.getDate() + 1);
    const firstIso = localISO(first);
    lines.push(
      "BEGIN:VEVENT",
      `UID:practice-${p.sport}-${p.day}-${p.start}@specialolympicshallcounty.org`,
      `DTSTAMP:${stamp()}`,
      `DTSTART;TZID=America/New_York:${ymd(firstIso)}T${t[0]}`,
      `DTEND;TZID=America/New_York:${ymd(firstIso)}T${t[1]}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${DAYS[p.day]};UNTIL=${ymd(p.end)}T235959Z`,
      `SUMMARY:${esc(`${sport?.name ?? p.sport} practice`)}`,
      `DESCRIPTION:${esc(`${p.coach ? `Coach: ${p.coach}\n` : ""}${p.note ?? ""}\n${site.url}/teams/${p.sport}`)}`,
      `LOCATION:${esc(p.location)}`,
      `URL:${site.url}/teams/${p.sport}`,
      "CATEGORIES:Practice",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  const body = lines.map((l) => (l.length > 73 ? l.match(/.{1,73}/g)!.join("\r\n ") : l)).join("\r\n") + "\r\n";
  return new Response(body, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'inline; filename="special-olympics-hall-county.ics"' } });
}

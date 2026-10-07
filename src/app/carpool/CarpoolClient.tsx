"use client";

import { useState } from "react";
import { Car, HandHelping, MapPin, Clock, Users, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { carpools, team, site } from "@/lib/data";
import { useDict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function RideList({ kind, d }: { kind: "offer" | "request"; d: ReturnType<typeof useDict> }) {
  const c = d.carpool;
  return (
    <div>
      <h2 className="flex items-center gap-2 text-3xl font-extrabold uppercase text-ink">{kind === "offer" ? <Car className="h-7 w-7 text-teal" /> : <HandHelping className="h-7 w-7 text-red" />} {kind === "offer" ? c.offers : c.requests}</h2>
      <ul className="mt-5 space-y-3">
        {carpools.filter((x) => x.type === kind).map((x, i) => (
          <Reveal as="li" key={i} delay={i * 0.05} className={cn("rounded-2xl border-l-4 bg-white p-5 shadow-sm", kind === "offer" ? "border-teal" : "border-red")}>
            <p className="font-heading text-xl font-bold uppercase text-ink">{x.from} → {x.to}</p>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft"><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-teal" />{x.when}</span>{x.seats !== undefined && <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5 text-teal" />{x.seats} {c.seats}</span>}<span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-teal" />{c.contact} {x.contact}</span></p>
            {x.note && <p className="mt-2 text-sm text-ink-soft">{x.note}</p>}
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default function CarpoolClient() {
  const d = useDict();
  const c = d.carpool;
  const rep = team.find((t) => t.role.includes("Family"));
  const [type, setType] = useState<"offer" | "request">("offer");
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = [`Carpool ${type}`, ``, `Name: ${fd.get("name")}`, `Email/phone: ${fd.get("contact")}`, `From: ${fd.get("from")}`, `To: ${fd.get("to")}`, `When: ${fd.get("when")}`, type === "offer" ? `Seats: ${fd.get("seats")}` : "", `Notes: ${fd.get("note") || "—"}`].filter(Boolean).join("\n");
    window.location.assign(`mailto:${rep?.email ?? site.email}?subject=${encodeURIComponent(`Carpool ${type}: ${fd.get("from")} → ${fd.get("to")}`)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  }
  const field = "focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-white px-4 py-3 text-ink";
  return (
    <>
      <PageHero curve="mist" eyebrow={c.eyebrow} title={c.title} image="/images/bus-trip.jpg" description={c.text} />
      <section className="bg-dots bg-mist py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr_22rem]">
          <RideList kind="offer" d={d} />
          <RideList kind="request" d={d} />
          <aside className="h-fit lg:sticky lg:top-28">
            <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-xl shadow-ink/5">
              <SectionHeading title={c.form} accent={false} className="max-w-none" />
              <div className="mt-5 grid grid-cols-2 gap-2">
                {(["offer", "request"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setType(t)} aria-pressed={type === t} className={cn("focus-ring rounded-full py-2 font-heading text-base font-bold uppercase", type === t ? "bg-ink text-white" : "bg-mist text-ink")}>{t === "offer" ? c.offer : c.request}</button>
                ))}
              </div>
              {sent ? (
                <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal"><CheckCircle2 className="h-4 w-4" /> {c.sent}</p>
              ) : (
                <div className="mt-4 space-y-3 text-sm font-semibold text-ink">
                  <label className="block">{d.common.name}<input name="name" required className={field} /></label>
                  <label className="block">{d.common.email} / {d.common.phone}<input name="contact" required className={field} /></label>
                  <label className="block">{c.from}<input name="from" required className={field} /></label>
                  <label className="block">{c.to}<input name="to" required className={field} /></label>
                  <label className="block">{c.when}<input name="when" required className={field} /></label>
                  {type === "offer" && <label className="block">{c.seatsLabel}<input name="seats" type="number" min={1} max={8} defaultValue={2} className={field} /></label>}
                  <label className="block">{c.note}<textarea name="note" rows={2} className={field} /></label>
                  <button type="submit" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-dark"><Send className="h-4 w-4" /> {c.send}</button>
                </div>
              )}
              <p className="mt-4 flex gap-2 text-xs text-ink-soft"><ShieldCheck className="h-4 w-4 shrink-0 text-teal" /> {c.safety}</p>
            </form>
          </aside>
        </div>
      </section>
    </>
  );
}

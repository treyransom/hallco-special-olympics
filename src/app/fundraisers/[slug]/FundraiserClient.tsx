"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, Minus, Plus, CreditCard, Mail, Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import AddToCalendar from "@/components/ui/AddToCalendar";
import { fundraisers, events, site, team, formatDate, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function FundraiserClient({ slug }: { slug: string }) {
  const { lang, dict: d } = useLang();
  const f = fundraisers.find((x) => x.slug === slug)!;
  const ev = events.find((e) => e.slug === f.eventSlug);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [players, setPlayers] = useState("");
  const [note, setNote] = useState("");
  const total = f.options.reduce((sum, o) => sum + (qty[o.id] ?? 0) * o.price, 0);
  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const treasurer = team.find((t) => t.role === "Treasurer");
  const money = (n: number) => n.toLocaleString(lang === "es" ? "es-US" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const hasPaid = f.options.some((o) => o.price > 0);

  const summaryLines = () => {
    const lines = [
      `${loc(lang, f, "name")} — ${f.date}`,
      ``,
      ...f.options.filter((o) => qty[o.id]).map((o) => `${qty[o.id]} × ${o.label} @ ${money(o.price)} = ${money(qty[o.id] * o.price)}`),
      ``,
      `TOTAL: ${money(total)}`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
    ];
    if (company) lines.push(`Company: ${company}`);
    if (players) lines.push(`Players: ${players}`);
    if (note) lines.push(`Notes: ${note}`);
    return lines;
  };

  function emailRegistration() {
    window.location.assign(`mailto:${treasurer?.email ?? site.email}?subject=${encodeURIComponent(`${f.name} registration — ${name || "new"}`)}&body=${encodeURIComponent(summaryLines().join("\n"))}`);
  }
  function checkout() {
    // Hand off to the payment processor with the summary; the processor URL is a placeholder.
    const u = site.donateUrl.startsWith("http") ? `${site.donateUrl}${site.donateUrl.includes("?") ? "&" : "?"}amount=${total}&note=${encodeURIComponent(summaryLines().join(" | "))}` : "";
    if (u) window.open(u, "_blank", "noopener");
    else emailRegistration();
  }

  return (
    <>
      <PageHero eyebrow={`${d.fundraiser.eyebrow} · ${loc(lang, f, "when")}`} title={loc(lang, f, "name")} image={f.image} description={loc(lang, f, "long")} />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_24rem]">
          <div>
            <SectionHeading eyebrow={d.fundraiser.register} title={d.fundraiser.pick} />
            <ul className="mt-8 space-y-3">
              {f.options.map((o) => {
                const n = qty[o.id] ?? 0;
                const soldOut = o.max !== undefined && o.max <= 0;
                return (
                  <li key={o.id} className={cn("flex flex-wrap items-center gap-4 rounded-2xl border p-4 transition sm:flex-nowrap", n > 0 ? "border-teal bg-teal/5" : "border-mist-dark")}>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-2xl font-bold uppercase text-ink">{loc(lang, o, "label")}</p>
                      <p className="text-sm text-ink-soft">{loc(lang, o, "desc")}{o.max !== undefined && o.max > 0 && ` · ${o.max} ${d.fundraiser.left}`}</p>
                    </div>
                    <p className="font-heading text-3xl font-extrabold text-teal">{o.price === 0 ? d.common.free : money(o.price)}</p>
                    {soldOut ? (
                      <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-soft">{d.fundraiser.soldOut}</span>
                    ) : (
                      <div className="flex items-center gap-1 rounded-full border border-mist-dark">
                        <button type="button" aria-label="−" onClick={() => setQty({ ...qty, [o.id]: Math.max(0, n - 1) })} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full hover:bg-mist"><Minus className="h-4 w-4" /></button>
                        <span className="w-6 text-center font-heading text-xl font-bold">{n}</span>
                        <button type="button" aria-label="+" onClick={() => setQty({ ...qty, [o.id]: o.max !== undefined ? Math.min(o.max, n + 1) : n + 1 })} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full hover:bg-mist"><Plus className="h-4 w-4" /></button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-ink">{d.fundraiser.yourName}<input value={name} onChange={(e) => setName(e.target.value)} className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
              <label className="block text-sm font-semibold text-ink">{d.common.email}<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
              <label className="block text-sm font-semibold text-ink">{d.fundraiser.company}<input value={company} onChange={(e) => setCompany(e.target.value)} className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
              {f.slug === "golf" && <label className="block text-sm font-semibold text-ink">{d.fundraiser.playerNames}<input value={players} onChange={(e) => setPlayers(e.target.value)} className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>}
              <label className="block text-sm font-semibold text-ink sm:col-span-2">{d.fundraiser.note}<textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
            </div>

            <div className="mt-12">
              <SectionHeading title={d.fundraiser.perks} className="max-w-none" />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {loc(lang, f, "perks").map((p) => <li key={p} className="flex gap-3 rounded-2xl bg-mist p-4 text-ink"><Check className="h-5 w-5 shrink-0 text-teal" />{p}</li>)}
              </ul>
            </div>
          </div>

          <aside className="h-fit space-y-5 lg:sticky lg:top-28">
            <Reveal className="rounded-3xl bg-ink p-6 text-white">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{d.fundraiser.summary}</p>
              <ul className="mt-3 space-y-1 text-sm text-white/85">
                {f.options.filter((o) => qty[o.id]).map((o) => <li key={o.id} className="flex justify-between gap-3"><span>{qty[o.id]} × {loc(lang, o, "label")}</span><span>{money(qty[o.id] * o.price)}</span></li>)}
                {count === 0 && <li className="text-white/50">—</li>}
              </ul>
              <p className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4"><span className="font-heading text-lg font-bold uppercase">{d.fundraiser.total}</span><span className="font-heading text-4xl font-extrabold">{money(total)}</span></p>
              {hasPaid ? (
                <button type="button" disabled={count === 0} onClick={checkout} className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-5 py-3.5 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-red-dark disabled:opacity-40"><CreditCard className="h-4 w-4" /> {d.fundraiser.checkout}</button>
              ) : (
                <p className="mt-4 text-sm text-white/70">{d.fundraiser.tableNote}</p>
              )}
              <button type="button" disabled={count === 0} onClick={emailRegistration} className="focus-ring mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 font-heading text-base font-bold uppercase tracking-wide text-white hover:bg-white/10 disabled:opacity-40"><Mail className="h-4 w-4" /> {d.fundraiser.emailInstead}</button>
            </Reveal>
            {ev && (
              <Reveal delay={0.1} className="rounded-3xl border border-mist-dark p-6">
                <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{d.fundraiser.eventDetails}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink">
                  <li className="flex items-center gap-2"><Calendar className="h-4 w-4 text-teal" />{formatDate(ev.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" }, lang)}</li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal" />{ev.time}</li>
                  <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal" />{ev.address ?? ev.location}</li>
                </ul>
                <div className="mt-4"><AddToCalendar event={ev} /></div>
              </Reveal>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}

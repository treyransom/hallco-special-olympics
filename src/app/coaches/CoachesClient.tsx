"use client";

import { useState, useSyncExternalStore } from "react";
import { FileText, ExternalLink, ShieldCheck, ShieldAlert, ShieldX, ShieldQuestion } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { coachResources, certifications, coaches, sports, certStatus, loc, formatDate, CERT_VALID_YEARS } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};
const today = () => new Date().toISOString().slice(0, 10);
const statusStyle = { valid: "bg-teal text-white", expiring: "bg-gold text-ink", expired: "bg-red text-white", missing: "bg-mist text-ink-soft" };
const statusIcon = { valid: ShieldCheck, expiring: ShieldAlert, expired: ShieldX, missing: ShieldQuestion };
const typeColor: Record<string, string> = { "Practice plan": "bg-teal text-white", Drills: "bg-gold text-ink", Rules: "bg-ink text-white", Divisioning: "bg-red text-white", Safety: "bg-teal-deep text-white" };

export default function CoachesClient() {
  const { lang, dict: d } = useLang();
  const c = d.coachesPage;
  const base = useSyncExternalStore(subscribe, today, () => "");
  const now = base ? new Date(base + "T12:00:00") : new Date("2026-01-01T12:00:00");
  const [sport, setSport] = useState("all");
  const list = coachResources.filter((r) => sport === "all" || r.sport === "all" || r.sport === sport);
  const certKeys = [["classA", c.classA], ["protectiveBehaviors", c.protective], ["concussion", c.concussion]] as const;
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} image="/images/coaches.jpg" description={c.text} />
      <section className="bg-dots bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="tablist">
            <button type="button" role="tab" aria-selected={sport === "all"} onClick={() => setSport("all")} className={cn("focus-ring rounded-full px-4 py-2 font-heading text-base font-bold uppercase", sport === "all" ? "bg-ink text-white" : "bg-mist text-ink")}>{c.all}</button>
            {sports.map((s) => (
              <button key={s.slug} type="button" role="tab" aria-selected={sport === s.slug} onClick={() => setSport(s.slug)} className={cn("focus-ring rounded-full px-4 py-2 font-heading text-base font-bold uppercase", sport === s.slug ? "bg-ink text-white" : "bg-mist text-ink")}>{loc(lang, s, "name")}</button>
            ))}
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((r, i) => {
              const ext = r.href.startsWith("http");
              return (
                <Reveal as="li" key={r.title} delay={(i % 3) * 0.05}>
                  <a href={r.href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} className="focus-ring group flex h-full flex-col rounded-3xl border border-mist-dark bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal hover:shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider", typeColor[r.type])}>{c.types[r.type]}</span>
                      {ext ? <ExternalLink className="h-4 w-4 text-ink-soft" /> : <FileText className="h-4 w-4 text-ink-soft" />}
                    </div>
                    <h3 className="mt-4 text-2xl font-extrabold uppercase text-ink group-hover:text-teal">{loc(lang, r, "title")}</h3>
                    <p className="mt-2 flex-1 text-sm text-ink-soft">{loc(lang, r, "desc")}</p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-teal">{r.sport === "all" ? c.all : loc(lang, sports.find((s) => s.slug === r.sport)!, "name")}</p>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={c.eyebrow} title={c.certs} description={c.certsText} />
          <div className="mt-10 overflow-x-auto rounded-3xl bg-white shadow-xl shadow-ink/5">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-wider text-ink-soft">
                <tr><th className="px-5 py-3 font-bold">{c.coach}</th><th className="px-5 py-3 font-bold">{d.nav.sports}</th>{certKeys.map(([, l]) => <th key={l} className="px-5 py-3 font-bold">{l}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {certifications.map((ct) => {
                  const mine = coaches.filter((x) => x.name === ct.coach).map((x) => loc(lang, sports.find((s) => s.slug === x.sport)!, "name"));
                  return (
                    <tr key={ct.coach}>
                      <td className="px-5 py-3 font-heading text-lg font-bold uppercase text-ink">{ct.coach}</td>
                      <td className="px-5 py-3 text-ink-soft">{mine.join(", ") || "—"}</td>
                      {certKeys.map(([k]) => {
                        const st = certStatus(ct[k], now);
                        const Icon = statusIcon[st];
                        return (
                          <td key={k} className="px-5 py-3">
                            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider", statusStyle[st])}><Icon className="h-3.5 w-3.5" /> {c[st]}</span>
                            {ct[k] && <span className="ml-2 text-xs text-ink-soft">{formatDate(ct[k]!, { month: "short", year: "numeric" }, lang)}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-ink-soft">{CERT_VALID_YEARS} {lang === "es" ? "años de validez" : "years valid"}.</p>
          <Reveal className="mt-8"><Button href="https://www.specialolympicsga.org/" external variant="secondary">{c.renew}</Button></Reveal>
        </div>
      </section>
    </>
  );
}

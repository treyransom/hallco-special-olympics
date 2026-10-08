"use client";

import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Mail, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { sports, coaches, rosters, practices, loc, certifications, certStatus } from "@/lib/data";
import AlertBanner from "@/components/layout/AlertBanner";
import { DeadlineBadge } from "@/components/home/Deadlines";
import { Award, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function TeamClient({ slug }: { slug: string }) {
  const { lang, dict: d } = useLang();
  const s = sports.find((x) => x.slug === slug)!;
  const cs = coaches.filter((c) => c.sport === slug);
  const roster = rosters.find((r) => r.sport === slug);
  const pr = practices.filter((p) => p.sport === slug);
  const name = loc(lang, s, "name");
  const year = new Date().getFullYear();
  const milestone = (since: number) => {
    const n = Math.max(1, year - since + 1);
    const label = n >= 10 ? d.milestones.legend : n >= 5 ? d.milestones.veteran : n <= 1 ? d.milestones.newAthlete : null;
    const color = n >= 10 ? "bg-gold text-ink" : n >= 5 ? "bg-teal text-white" : "bg-red text-white";
    return { n, label, color };
  };
  const certIcon = { valid: ShieldCheck, expiring: ShieldAlert, expired: ShieldX, missing: ShieldX };
  const certColor = { valid: "text-teal", expiring: "text-gold", expired: "text-red", missing: "text-ink-soft" };
  return (
    <>
      <PageHero eyebrow={`${d.teams.eyebrow} · ${d.common.seasons[s.season]}`} title={name} image={s.image} description={loc(lang, s, "blurb")} />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <Link href="/teams" className="focus-ring mb-6 inline-flex items-center gap-2 py-2 text-sm font-semibold text-ink-soft hover:text-teal"><ArrowLeft className="h-4 w-4" /> {d.teams.allTeams}</Link>
          <div className="mb-8 flex flex-wrap items-center gap-3"><AlertBanner inline sport={slug} /><DeadlineBadge season={s.season} /></div>
          <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-16">
              <div>
                <SectionHeading title={d.teams.coaches} className="max-w-none" />
                <ul className="mt-8 grid gap-5 md:grid-cols-2">
                  {cs.length === 0 && (
                    <li className="rounded-3xl border-2 border-dashed border-mist-dark p-6">
                      <h3 className="text-2xl font-extrabold uppercase text-ink">{d.teams.noCoach}</h3>
                      <p className="mt-2 text-ink-soft">{d.teams.noCoachText}</p>
                      <Button href="/get-involved#volunteer" variant="secondary" className="mt-4">{d.teams.coachCta}</Button>
                    </li>
                  )}
                  {cs.map((c, i) => (
                    <Reveal as="li" key={c.name} delay={i * 0.06} className="flex min-w-0 gap-4 rounded-3xl border border-mist-dark bg-mist p-5 sm:gap-5 sm:p-6">
                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-heading text-2xl font-bold text-white shadow-lg ${i % 2 ? "bg-red" : "bg-teal"}`}>{c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
                      <div className="min-w-0">
                        <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{c.role === "Head Coach" ? d.common.headCoach : c.role}{c.since ? ` · ${d.common.since} ${c.since}` : ""}</p>
                        <h3 className="text-2xl font-extrabold uppercase text-ink">{c.name}</h3>
                        <p className="mt-1 text-sm text-ink-soft">{c.bio}</p>
                        {c.email && <a href={`mailto:${c.email}`} className="mt-2 inline-flex max-w-full items-center gap-1.5 break-all text-sm font-semibold text-teal hover:underline"><Mail className="h-3.5 w-3.5 shrink-0" /> {c.email}</a>}
                        {(() => {
                          const ct = certifications.find((x) => x.coach === c.name);
                          if (!ct) return null;
                          const keys = [["classA", d.coachesPage.classA], ["protectiveBehaviors", d.coachesPage.protective], ["concussion", d.coachesPage.concussion]] as const;
                          return (
                            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                              {keys.map(([k, l]) => {
                                const st = certStatus(ct[k]);
                                const Icon = certIcon[st];
                                return <li key={k} className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${certColor[st]}`}><Icon className="h-3.5 w-3.5" /> {l}</li>;
                              })}
                            </ul>
                          );
                        })()}
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
              <div>
                <SectionHeading title={d.teams.roster} className="max-w-none" />
                {roster?.showRoster ? (
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {roster.athletes.map((a, i) => (
                      <Reveal as="li" key={a.name} delay={i * 0.04} className="flex items-center gap-3 rounded-2xl border border-mist-dark p-4">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold ${["bg-gold text-ink", "bg-teal text-white", "bg-red text-white"][i % 3]}`}>{a.name[0]}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-xl font-bold uppercase text-ink">{a.name}</span>
                          <span className="block text-xs text-ink-soft">{d.common.since} {a.since}{a.also?.length ? ` · ${d.teams.also} ${a.also.join(", ")}` : ""}</span>
                        </span>
                        {(() => {
                          const m = milestone(a.since);
                          return (
                            <span className={`inline-flex shrink-0 flex-col items-center rounded-xl px-2 py-1 ${m.color}`} title={m.label ?? undefined}>
                              <span className="inline-flex items-center gap-0.5 font-heading text-lg font-extrabold leading-none"><Award className="h-3.5 w-3.5" />{m.n}</span>
                              <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{m.label ?? d.milestones.seasons}</span>
                            </span>
                          );
                        })()}
                      </Reveal>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 flex items-center gap-2 rounded-2xl bg-mist p-5 text-ink-soft"><Users className="h-5 w-5 text-teal" /> {d.teams.rosterHidden}</p>
                )}
              </div>
            </div>
            <aside className="h-fit space-y-6 lg:sticky lg:top-28">
              <Reveal className="noise relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-deep to-teal p-6 text-white shadow-xl shadow-teal/20">
                <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{d.sports.practices}</p>
                <p className="text-sm text-white/70">{s.months}</p>
                {pr.length === 0 ? (
                  <p className="mt-3 text-sm text-white/80">{d.sports.noPractices}</p>
                ) : (
                  <ul className="mt-4 divide-y divide-white/10">
                    {pr.map((p, i) => (
                      <li key={i} className="py-3">
                        <p className="font-heading text-2xl font-bold uppercase">{d.common.days[p.day]}</p>
                        <p className="flex items-center gap-1.5 text-sm text-white/85"><Clock className="h-3.5 w-3.5 text-gold" />{p.time}</p>
                        <p className="flex items-center gap-1.5 text-sm text-white/85"><MapPin className="h-3.5 w-3.5 text-gold" />{p.location}</p>
                        {p.note && <p className="mt-1 text-xs text-gold">{p.note}</p>}
                      </li>
                    ))}
                  </ul>
                )}
                <Button href="/register" variant="white" className="mt-5 w-full">{d.sports.join}</Button>
              </Reveal>
              <Reveal delay={0.1} className="rounded-3xl border border-mist-dark p-6">
                <h3 className="text-xl font-extrabold uppercase text-ink">{d.teams.coachCta}</h3>
                <p className="mt-1 text-sm text-ink-soft">{d.teams.noCoachText}</p>
                <Button href="/get-involved#volunteer" variant="outline" className="mt-4 w-full">{d.common.volunteer}</Button>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "@/components/ui/SmartImage";
import { Mail, Users, BadgeDollarSign, Sparkles, HeartHandshake } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CTA from "@/components/home/CTA";
import { team, site } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function AboutClient() {
  const { lang, dict: d } = useLang();
  const a = d.about;
  const values = [[a.v1, a.v1t, Users, "border-teal bg-teal"], [a.v2, a.v2t, BadgeDollarSign, "border-gold bg-gold"], [a.v3, a.v3t, Sparkles, "border-red bg-red"], [a.v4, a.v4t, HeartHandshake, "border-ink bg-ink"]] as const;
  const avatar = ["bg-teal", "bg-gold text-ink", "bg-red", "bg-ink", "bg-teal-dark", "bg-red-dark", "bg-teal-deep"];
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} image="/images/team-polos.jpg" description={a.text} />
      <section className="bg-dots bg-white py-24 sm:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <SectionHeading eyebrow={a.missionE} title={a.missionT} description={a.missionX} />
          <Reveal delay={0.15} className="relative aspect-[4/3] rotate-2 overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-ink/20">
            <Image src="/images/athletes-flags.jpg" alt={a.flagsAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>
      <section className="bg-mist py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading align="center" eyebrow={a.valuesE} title={a.valuesT} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, x, Icon, c], i) => (
              <Reveal key={t} delay={i * 0.08} className={`rounded-3xl border-t-4 bg-white p-7 shadow-lg shadow-ink/5 transition hover:-translate-y-1 ${c.split(" ")[0]}`}>
                <span className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white ${c.split(" ")[1]} ${c.includes("gold") ? "text-ink" : ""}`}><Icon className="h-6 w-6" /></span>
                <h3 className="text-2xl font-extrabold uppercase text-ink">{t}</h3>
                <p className="mt-3 text-ink-soft">{x}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="noise relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="bg-dots-light absolute inset-0" aria-hidden />
        <p aria-hidden className="text-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[12rem] font-extrabold uppercase text-white/5 lg:text-[20rem]">Brave</p>
        <div className="container-x relative text-center">
          <Reveal>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{a.oath}</p>
            <blockquote className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-extrabold uppercase sm:text-6xl lg:text-7xl">
              {a.oathText}<span className="text-teal-light">{a.oathHl}</span>{a.oathEnd}
            </blockquote>
          </Reveal>
        </div>
      </section>
      <section id="team" className="scroll-mt-20 bg-white py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={a.teamE} title={a.teamT} description={a.teamX} />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 0.06} className="flex min-w-0 items-center gap-4 rounded-2xl border border-mist-dark bg-mist p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg sm:gap-5 sm:p-5">
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-heading text-2xl font-bold text-white shadow-lg ${avatar[i % avatar.length]}`}>{m.name.split(" ").map((n) => n[0]).join("")}</div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-extrabold uppercase text-ink">{m.name}</h3>
                  <p className="text-sm font-semibold text-teal">{lang === "es" && m.roleEs ? m.roleEs : m.role}</p>
                  {m.email && <a href={`mailto:${m.email}`} className="mt-1 inline-flex max-w-full items-center gap-1.5 break-all text-sm text-ink-soft hover:text-teal"><Mail className="h-3.5 w-3.5 shrink-0" /> {m.email}</a>}
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="noise relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-teal-deep to-teal p-8 text-white sm:flex sm:items-center sm:justify-between sm:p-10">
            <div>
              <h3 className="text-3xl font-extrabold uppercase">{a.biggerT}</h3>
              <p className="mt-2 max-w-xl text-white/80">{a.biggerX}</p>
            </div>
            <Button href={site.parentOrg.url} external variant="white" className="mt-6 sm:mt-0">{a.biggerCta}</Button>
          </Reveal>
        </div>
      </section>
      <CTA />
    </>
  );
}

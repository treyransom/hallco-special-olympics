"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
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
  const values = [[a.v1, a.v1t], [a.v2, a.v2t], [a.v3, a.v3t], [a.v4, a.v4t]];
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} image="/images/team-polos.jpg" description={a.text} />
      <section className="bg-white py-24 sm:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <SectionHeading eyebrow={a.missionE} title={a.missionT} description={a.missionX} />
          <Reveal delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-ink/15">
            <Image src="/images/athletes-flags.jpg" alt={a.flagsAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>
      <section className="bg-mist py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading align="center" eyebrow={a.valuesE} title={a.valuesT} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, x], i) => (
              <Reveal key={t} delay={i * 0.08} className="rounded-3xl border-t-4 border-teal bg-white p-7 shadow-sm">
                <h3 className="text-2xl font-extrabold uppercase text-ink">{t}</h3>
                <p className="mt-3 text-ink-soft">{x}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-x text-center">
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
              <Reveal as="li" key={m.name} delay={i * 0.06} className="flex items-center gap-5 rounded-2xl border border-mist-dark bg-mist p-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal font-heading text-2xl font-bold text-white">{m.name.split(" ").map((n) => n[0]).join("")}</div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-extrabold uppercase text-ink">{m.name}</h3>
                  <p className="text-sm font-semibold text-teal">{lang === "es" && m.roleEs ? m.roleEs : m.role}</p>
                  {m.email && <a href={`mailto:${m.email}`} className="mt-1 inline-flex items-center gap-1.5 truncate text-sm text-ink-soft hover:text-teal"><Mail className="h-3.5 w-3.5 shrink-0" /> {m.email}</a>}
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12 rounded-3xl bg-teal-deep p-8 text-white sm:flex sm:items-center sm:justify-between sm:p-10">
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

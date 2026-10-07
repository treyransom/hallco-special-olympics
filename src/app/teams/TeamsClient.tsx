"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SportIcon from "@/components/ui/SportIcon";
import { sports, coaches, rosters, practices, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function TeamsClient() {
  const { lang, dict: d } = useLang();
  return (
    <>
      <PageHero eyebrow={d.teams.eyebrow} title={d.teams.title} image="/images/coaches.jpg" description={d.teams.pageText} />
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map((s, i) => {
            const head = coaches.find((c) => c.sport === s.slug && c.role === "Head Coach");
            const roster = rosters.find((r) => r.sport === s.slug);
            const pr = practices.filter((p) => p.sport === s.slug);
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link href={`/teams/${s.slug}`} className="focus-ring group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
                  <div className="relative aspect-[16/9]">
                    <Image src={s.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal text-white shadow"><SportIcon icon={s.icon} className="h-6 w-6" /></span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{d.common.seasons[s.season]}</p>
                    <h2 className="text-3xl font-extrabold uppercase text-ink group-hover:text-teal">{loc(lang, s, "name")}</h2>
                    <p className="mt-2 text-sm text-ink-soft">{d.common.headCoach}: <span className="font-semibold text-ink">{head?.name ?? d.teams.noCoach}</span></p>
                    <p className="text-sm text-ink-soft">{pr.length ? pr.map((p) => `${d.common.daysShort[p.day]} ${p.time}`).join(" · ") : d.sports.noPractices}</p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft"><Users className="h-4 w-4 text-teal" /> {roster?.showRoster ? `${roster.athletes.length} ${d.teams.athletes}` : d.teams.rosterHidden}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-heading font-bold uppercase tracking-wide text-teal">{d.teams.viewTeam} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

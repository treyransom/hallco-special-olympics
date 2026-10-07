"use client";

import Image from "next/image";
import { CheckCircle2, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { team } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const coord = (role: string) => team.find((t) => t.role.includes(role));

export default function GetInvolvedClient() {
  const { lang, dict: d } = useLang();
  const v = d.involved;
  const roles = [
    { id: "athletes", eyebrow: v.athletesE, title: v.athletesT, image: "/images/basketball-team.jpg", text: v.athletesX, steps: [v.athletesS1, v.athletesS2, v.athletesS3], contact: coord("Local Coordinator"), cta: { label: v.athletesCta, href: "/register" } },
    { id: "volunteer", eyebrow: v.volE, title: v.volT, image: "/images/coaches.jpg", text: v.volX, steps: [v.volS1, v.volS2, v.volS3], contact: coord("Volunteer Coordinator"), cta: { label: v.volCta, href: "/volunteer" } },
    { id: "unified", eyebrow: v.uniE, title: v.uniT, image: "/images/unified-partner-award.jpg", text: v.uniX, steps: [v.uniS1, v.uniS2, v.uniS3], contact: coord("Coach Coordinator"), cta: { label: v.uniCta, href: "/contact" } },
  ];
  return (
    <>
      <PageHero eyebrow={v.pageEyebrow} title={v.pageTitle} image="/images/team-outside.jpg" description={v.pageText} />
      <section className="bg-dots bg-white py-24 sm:py-32">
        <div className="container-x space-y-28">
          {roles.map((r, i) => (
            <article key={r.id} id={r.id} className="scroll-mt-28 grid items-center gap-12 lg:grid-cols-2">
              <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-ink/20 ${i % 2 ? "lg:order-2 -rotate-1" : "rotate-1"}`}>
                <Image src={r.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </Reveal>
              <div>
                <SectionHeading eyebrow={r.eyebrow} title={r.title} description={r.text} />
                <Reveal delay={0.1}>
                  <ol className="mt-8 space-y-4">
                    {r.steps.map((s, n) => (
                      <li key={s} className="flex gap-4">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold shadow-lg ${["bg-teal text-white", "bg-gold text-ink", "bg-red text-white"][n]}`}>{n + 1}</span>
                        <p className="pt-1.5 text-ink-soft">{s}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button href={r.cta.href} variant="secondary">{r.cta.label}</Button>
                    {r.contact?.email && <a href={`mailto:${r.contact.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-teal"><Mail className="h-4 w-4" /> {r.contact.name}, {lang === "es" && r.contact.roleEs ? r.contact.roleEs : r.contact.role}</a>}
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="families" className="noise relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-teal-deep via-teal-dark to-teal py-24 text-white sm:py-32">
        <div className="bg-dots-light absolute inset-0" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading light eyebrow={v.famE} title={v.famT} description={v.famX} />
            <Reveal delay={0.1} className="mt-6"><Button href="/competition-guide" variant="white">{v.famCta}</Button></Reveal>
          </div>
          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {[v.fam1, v.fam2, v.fam3, v.fam4].map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-white/10 p-4"><CheckCircle2 className="h-6 w-6 shrink-0 text-gold" /><span>{t}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

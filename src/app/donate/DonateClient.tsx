"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Bus, Shirt, Medal, ClipboardList, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Campaign from "@/components/home/Campaign";
import SponsorAthlete from "@/components/home/SponsorAthlete";
import { givingLevels, site, fundraisers, sponsorTiers, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function DonateClient() {
  const { lang, dict: d } = useLang();
  const x = d.donate;
  const uses = [[Bus, x.u1], [Shirt, x.u2], [Medal, x.u3], [ClipboardList, x.u4]] as const;
  return (
    <>
      <PageHero curve="mist" eyebrow={x.eyebrow} title={x.title} image="/images/powerlifting.jpg" description={x.text} />
      <Campaign />
      <section className="bg-dots bg-white py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading eyebrow={x.pickE} title={x.pickT} description={x.pickX} />
            <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2">
              {givingLevels.map((g, i) => (
                <a key={g.amount} href={site.donateUrl} className={`focus-ring group rounded-3xl p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${["bg-mist text-ink", "bg-teal text-white", "bg-gold text-ink", "bg-ink text-white"][i]}`}>
                  <p className="font-heading text-6xl font-extrabold leading-none">${g.amount}</p>
                  <p className="mt-3 text-sm opacity-80">{lang === "es" ? g.labelEs : g.label}</p>
                </a>
              ))}
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={site.donateUrl} size="lg"><Heart className="h-5 w-5 fill-current" /> {x.any}</Button>
              <p className="text-sm text-ink-soft">{x.secure}{site.ein && ` EIN ${site.ein}.`}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="space-y-6">
            <div className="relative aspect-[4/3] rotate-1 overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-ink/15"><Image src="/images/bus-trip.jpg" alt={x.busAlt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover object-top" /></div>
            <div className="rounded-3xl bg-mist p-7">
              <h3 className="text-2xl font-extrabold uppercase text-ink">{x.where}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {uses.map(([Icon, label]) => (
                  <li key={label} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-semibold text-ink"><Icon className="h-5 w-5 shrink-0 text-teal" /> {label}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-soft">{x.local}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <SponsorAthlete />

      <section id="fundraisers" className="noise relative scroll-mt-20 overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="bg-dots-light absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <SectionHeading light eyebrow={x.fundE} title={x.fundT} description={x.fundX} />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {fundraisers.map((f, i) => (
              <Reveal key={f.slug} delay={i * 0.08}>
                <Link href={f.href} className="focus-ring group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-teal-deep">
                  <Image src={f.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{loc(lang, f, "when")}</p>
                    <h3 className="mt-1 text-3xl font-extrabold uppercase">{loc(lang, f, "name")}</h3>
                    <p className="mt-2 text-sm text-white/80">{loc(lang, f, "blurb")}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsor" className="scroll-mt-20 bg-mist py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading align="center" eyebrow={x.sponsorE} title={x.sponsorT} description={x.sponsorX} />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {sponsorTiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className={`relative rounded-3xl p-8 shadow-lg transition hover:-translate-y-1 ${i === 2 ? "bg-gradient-to-br from-ink to-teal-deep text-white ring-4 ring-gold" : "bg-white text-ink"}`}>
                <p className={`font-heading text-sm font-bold uppercase tracking-[0.2em] ${i === 2 ? "text-gold" : "text-red"}`}>{d.common.tiers[t.name]}</p>
                <p className="mt-2 font-heading text-5xl font-extrabold">{t.amount}</p>
                <ul className={`mt-6 space-y-2 text-sm ${i === 2 ? "text-white/80" : "text-ink-soft"}`}>
                  {(lang === "es" ? t.es.perks : t.perks).map((p) => <li key={p} className="flex gap-2"><span className="text-teal-light">✓</span>{p}</li>)}
                </ul>
                <Button href="/sponsor" variant={i === 2 ? "white" : "secondary"} className="mt-8 w-full">{x.become} {d.common.tiers[t.name]} {x.sponsorWord}</Button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-mist-dark p-8">
            <h3 className="text-2xl font-extrabold uppercase text-ink">{x.honorT}</h3>
            <p className="mt-3 text-ink-soft">{x.honorX}</p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-flex items-center gap-2 font-semibold text-teal hover:underline"><Mail className="h-4 w-4" /> {site.email}</a>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-mist-dark p-8">
            <h3 className="text-2xl font-extrabold uppercase text-ink">{x.checkT}</h3>
            <p className="mt-3 text-ink-soft">{x.checkX} <strong>{site.name}</strong> {x.checkTo}</p>
            <address className="mt-3 not-italic text-ink">{site.address.line1}<br />{site.address.city}, {site.address.state} {site.address.zip}</address>
          </Reveal>
        </div>
      </section>
    </>
  );
}

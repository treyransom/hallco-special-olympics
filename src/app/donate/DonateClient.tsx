"use client";

import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { Heart, Bus, Shirt, Medal, ClipboardList, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Campaign from "@/components/home/Campaign";
import SponsorAthlete from "@/components/home/SponsorAthlete";
import { givingLevels, site, fundraisers, sponsorTiers, loc, recurringLevels, matchingEmployers } from "@/lib/data";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Repeat, Gift } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function DonateClient() {
  const { lang, dict: d } = useLang();
  const x = d.donate;
  const uses = [[Bus, x.u1], [Shirt, x.u2], [Medal, x.u3], [ClipboardList, x.u4]] as const;
  const [q, setQ] = useState("");
  const tabs = [["once", d.donateTabs.once], ["monthly", d.donateTabs.monthly], ["sponsor", d.donateTabs.sponsor], ["other", d.donateTabs.other]] as const;
  const [tab, setTab] = useState<(typeof tabs)[number][0]>("once");
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");
      const map: Record<string, (typeof tabs)[number][0]> = { monthly: "monthly", sponsor: "sponsor", "sponsor-an-athlete": "sponsor", fundraisers: "other", matching: "other" };
      if (map[h]) setTab(map[h]);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
     
  }, []);
  const show = (t: (typeof tabs)[number][0]) => (tab === t ? "" : "hidden");
  const employers = matchingEmployers.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero curve="mist" eyebrow={x.eyebrow} title={x.title} image="/images/powerlifting.jpg" description={x.text} />
      <Campaign />
      <div className="sticky top-16 z-30 border-b border-mist-dark bg-white/95 backdrop-blur sm:top-20">
        <div className="container-x flex gap-1 overflow-x-auto py-2" role="tablist" aria-label={d.nav.donate}>
          {tabs.map(([k, l]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => { setTab(k); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={cn("focus-ring shrink-0 rounded-full px-5 py-2 font-heading text-lg font-bold uppercase tracking-wide transition", tab === k ? "bg-ink text-white" : "text-ink hover:bg-mist")}>{l}</button>
          ))}
        </div>
      </div>
      <section className={cn("bg-dots bg-white py-24 sm:py-32", show("once"))}>
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

      <section id="monthly" className={cn("scroll-mt-36 bg-mist py-24 sm:py-32", show("monthly"))}>
        <div className="container-x">
          <SectionHeading align="center" eyebrow={d.recurring.eyebrow} title={d.recurring.title} description={d.recurring.text} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recurringLevels.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.06} className={`flex flex-col rounded-3xl p-7 shadow-lg ${i === 3 ? "bg-gradient-to-br from-ink to-teal-deep text-white ring-4 ring-gold" : "bg-white text-ink"}`}>
                <p className={`font-heading text-sm font-bold uppercase tracking-[0.2em] ${i === 3 ? "text-gold" : "text-red"}`}>{r.name}</p>
                <p className="mt-2 font-heading text-5xl font-extrabold leading-none">${r.amount}<span className={`text-base font-bold ${i === 3 ? "text-white/60" : "text-ink-soft"}`}>{d.recurring.perMonth}</span></p>
                <ul className={`mt-5 flex-1 space-y-2 text-sm ${i === 3 ? "text-white/85" : "text-ink-soft"}`}>{(lang === "es" ? r.es.perks : r.perks).map((p) => <li key={p} className="flex gap-2"><span className="text-teal-light">✓</span>{p}</li>)}</ul>
                <a href={site.donateUrl} className={`focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 font-heading text-base font-bold uppercase tracking-wide ${i === 3 ? "bg-white text-ink hover:bg-gold" : "bg-teal text-white hover:bg-teal-dark"}`}><Repeat className="h-4 w-4" /> {d.recurring.join}</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className={show("sponsor")}><SponsorAthlete /></div>

      <section className={cn("bg-dots bg-mist py-20", show("other"))}>
        <div className="container-x">
          <Reveal className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-teal-deep to-teal p-8 text-white sm:flex-row sm:p-10">
            <div><p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{d.wishlistPage.eyebrow}</p><h2 className="mt-1 text-3xl font-extrabold uppercase">{d.wishlistPage.title}</h2></div>
            <Button href="/wishlist" variant="white"><Gift className="h-4 w-4" /> {d.nav.wishlist}</Button>
          </Reveal>
        </div>
      </section>

      <section id="fundraisers" className={cn("noise relative scroll-mt-36 overflow-hidden bg-ink py-24 text-white sm:py-32", show("other"))}>
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

      <section id="sponsor" className={cn("scroll-mt-36 bg-mist py-24 sm:py-32", show("sponsor"))}>
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

      <section id="matching" className={cn("scroll-mt-36 bg-white py-24 sm:py-32", show("other"))}>
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow={d.matching.eyebrow} title={d.matching.title} description={d.matching.text} />
          <Reveal delay={0.1} className="rounded-3xl bg-mist p-6 shadow-xl shadow-ink/5">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={d.matching.search} className="focus-ring w-full rounded-full border border-mist-dark bg-white py-3.5 pl-12 pr-4 text-ink" aria-label={d.matching.search} />
            </label>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-soft">{employers.length} {d.matching.found}</p>
            <ul className="mt-3 max-h-80 divide-y divide-mist-dark overflow-y-auto rounded-2xl bg-white">
              {employers.map((e) => (
                <li key={e.name} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="font-heading text-lg font-bold uppercase text-ink">{e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer" className="hover:text-teal">{e.name}</a> : e.name}</span>
                  <span className="shrink-0 text-right text-xs text-ink-soft"><span className="rounded-full bg-teal px-2 py-0.5 font-bold text-white">{d.matching.ratio} {e.ratio}</span>{e.max && <span className="ml-2">{d.matching.max} {e.max}</span>}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-soft">{d.matching.none}</p>
          </Reveal>
        </div>
      </section>

      <section className={cn("bg-white pb-24", show("other"))}>
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

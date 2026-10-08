"use client";

import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import { sponsorTiers, stats, site, team, fundraisers, sports, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function OnePagerClient() {
  const { lang, dict: d } = useLang();
  const chair = team.find((t) => t.role === "Chairperson");
  return (
    <div className="bg-mist py-10 print:bg-white print:py-0">
      <div className="container-x mb-6 flex items-center justify-between print:hidden">
        <Link href="/sponsor" className="focus-ring inline-flex items-center gap-2 py-2 text-sm font-semibold text-ink-soft hover:text-teal"><ArrowLeft className="h-4 w-4" /> {d.nav.sponsor}</Link>
        <button type="button" onClick={() => window.print()} className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-deep"><Printer className="h-4 w-4" /> {d.common.print} / PDF</button>
      </div>
      <article className="mx-auto max-w-[8.5in] bg-white p-10 shadow-xl print:max-w-none print:p-0 print:shadow-none" style={{ minHeight: "11in" }}>
        <header className="flex items-start justify-between gap-6 border-b-4 border-teal pb-6">
          <Image src="/images/logo-horizontal.png" alt={site.name} width={1254} height={220} className="h-16 w-auto" />
          <div className="text-right text-xs text-ink-soft">
            <p>{site.address.line1}, {site.address.city}, {site.address.state} {site.address.zip}</p>
            <p>{site.email} · {site.phone}</p>
            <p>{site.url.replace("https://", "")}</p>
          </div>
        </header>
        <h1 className="mt-8 text-5xl font-extrabold uppercase leading-none text-ink">{d.donate.sponsorT}</h1>
        <p className="mt-3 text-ink-soft">{lang === "es" ? site.taglineEs : site.tagline} {d.support.text}</p>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-mist p-3 text-center print:border print:border-mist-dark">
              <p className="font-heading text-3xl font-extrabold text-teal">{s.value}{s.suffix}</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">{lang === "es" ? s.labelEs : s.label}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-8 text-2xl font-extrabold uppercase text-ink">{d.nav.sponsor}</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {sponsorTiers.map((t, i) => (
            <div key={t.name} className={`rounded-xl p-4 ${i === 2 ? "bg-ink text-white print:bg-ink" : "border border-mist-dark"}`}>
              <p className={`font-heading text-xs font-bold uppercase tracking-[0.2em] ${i === 2 ? "text-gold" : "text-red"}`}>{d.common.tiers[t.name]}</p>
              <p className="font-heading text-3xl font-extrabold">{t.amount}</p>
              <ul className={`mt-2 space-y-1 text-xs ${i === 2 ? "text-white/85" : "text-ink-soft"}`}>{(lang === "es" ? t.es.perks : t.perks).map((p) => <li key={p}>✓ {p}</li>)}</ul>
            </div>
          ))}
        </div>
        <h2 className="mt-8 text-2xl font-extrabold uppercase text-ink">{d.nav.fundraisers}</h2>
        <ul className="mt-2 grid grid-cols-3 gap-3 text-sm">
          {fundraisers.map((f) => <li key={f.slug} className="rounded-xl bg-mist p-3 print:border print:border-mist-dark"><p className="font-heading text-lg font-bold uppercase text-ink">{loc(lang, f, "name")}</p><p className="text-xs text-ink-soft">{loc(lang, f, "when")} · {loc(lang, f, "blurb")}</p></li>)}
        </ul>
        <h2 className="mt-8 text-2xl font-extrabold uppercase text-ink">{d.nav.sports}</h2>
        <p className="mt-1 text-sm text-ink-soft">{sports.map((s) => loc(lang, s, "name")).join(" · ")}</p>
        <footer className="mt-10 flex items-end justify-between border-t border-mist-dark pt-4 text-xs text-ink-soft">
          <p>{d.common.contactUs}: {chair?.name}, {lang === "es" ? chair?.roleEs : chair?.role} · {chair?.email}</p>
          <p>{d.footer.accredited} {site.parentOrg.name} · 501(c)(3){site.ein && ` · EIN ${site.ein}`}</p>
        </footer>
      </article>
    </div>
  );
}

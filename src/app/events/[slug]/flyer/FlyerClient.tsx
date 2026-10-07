"use client";

import Image from "next/image";
import Link from "next/link";
import { Printer, ArrowLeft, Clock, MapPin } from "lucide-react";
import { events, site, formatDate, loc, fundraisers } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function FlyerClient({ slug, qrSvg }: { slug: string; qrSvg: string }) {
  const { lang, dict: d } = useLang();
  const e = events.find((x) => x.slug === slug)!;
  const f = fundraisers.find((x) => x.eventSlug === e.slug);
  const image = f?.image ?? (e.type === "Competition" ? "/images/medals.jpg" : e.type === "Practice" ? "/images/basketball-action.jpg" : "/images/holiday-dance.jpg");
  return (
    <div className="bg-mist py-10 print:bg-white print:py-0">
      <div className="container-x mb-6 flex items-center justify-between print:hidden">
        <Link href={`/events#${e.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-teal"><ArrowLeft className="h-4 w-4" /> {d.flyer.back}</Link>
        <button type="button" onClick={() => window.print()} className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-deep"><Printer className="h-4 w-4" /> {d.flyer.print}</button>
      </div>
      <article className="relative mx-auto flex max-w-[8.5in] flex-col overflow-hidden bg-white shadow-xl print:max-w-none print:shadow-none" style={{ minHeight: "11in" }}>
        <div className="relative h-[4.2in] bg-ink">
          <Image src={image} alt="" fill sizes="8.5in" className="object-cover opacity-80" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute left-8 top-8 rounded-xl bg-white px-4 py-2"><Image src="/images/logo-horizontal.png" alt={site.name} width={1254} height={220} className="h-10 w-auto" /></div>
          <div className="absolute inset-x-8 bottom-8 text-white">
            <p className="font-heading text-lg font-bold uppercase tracking-[0.2em] text-gold">{d.common.types[e.type]}</p>
            <h1 className="text-balance text-6xl font-extrabold uppercase leading-[0.95]">{loc(lang, e, "title")}</h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-10">
          <p className="font-heading text-5xl font-extrabold uppercase text-teal">{formatDate(e.date, { weekday: "long", month: "long", day: "numeric" }, lang)}{e.endDate && ` – ${formatDate(e.endDate, { day: "numeric" }, lang)}`}</p>
          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-xl text-ink">
            <span className="inline-flex items-center gap-2"><Clock className="h-5 w-5 text-red" />{e.time}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-5 w-5 text-red" />{e.address ?? e.location}</span>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{loc(lang, e, "description")}</p>
          {e.type !== "Fundraiser" && <p className="mt-4 inline-block w-fit rounded-full bg-gold px-4 py-1.5 font-heading text-lg font-bold uppercase tracking-wide text-ink">{d.flyer.free}</p>}
          <div className="mt-auto flex items-end justify-between gap-6 border-t-4 border-teal pt-6">
            <div className="text-sm text-ink-soft">
              <p className="font-heading text-xl font-bold uppercase text-ink">{d.flyer.hosted} {site.name}</p>
              <p>{site.url.replace("https://", "")} · {site.email} · {site.phone}</p>
              <p className="mt-2 text-xs">{d.footer.accredited} {site.parentOrg.name}</p>
            </div>
            <div className="shrink-0 text-center">
              <div className="h-28 w-28 [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">{d.flyer.scan}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

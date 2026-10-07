"use client";

import Image from "next/image";
import { Heart, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { athleteSponsorships, site, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function SponsorAthlete() {
  const { lang, dict: d } = useLang();
  return (
    <section id="sponsor-an-athlete" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={d.sponsorAthlete.eyebrow} title={d.sponsorAthlete.title} description={d.sponsorAthlete.text} />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {athleteSponsorships.map((a, i) => (
            <Reveal as="li" key={a.name} delay={i * 0.07}>
              <article className={`flex h-full flex-col overflow-hidden rounded-3xl border ${a.funded ? "border-teal/40 bg-teal/5" : "border-mist-dark bg-mist"}`}>
                <div className="relative aspect-[4/3]">
                  <Image src={a.image} alt={a.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                  {a.funded && <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-teal px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white"><CheckCircle2 className="h-3 w-3" /> {d.sponsorAthlete.funded}</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-3xl font-extrabold uppercase text-ink">{a.name}</h3>
                  <p className="text-sm font-semibold text-teal">{a.sport}</p>
                  <p className="mt-3 flex-1 text-sm text-ink-soft"><span className="font-bold text-ink">{d.sponsorAthlete.needs}:</span> {loc(lang, a, "need")}</p>
                  {a.funded ? (
                    <p className="mt-4 text-sm font-semibold text-teal-dark">{d.sponsorAthlete.thanks}</p>
                  ) : (
                    <a href={site.donateUrl} target={site.donateUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="focus-ring mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-red px-4 py-2.5 font-heading text-base font-bold uppercase tracking-wide text-white hover:bg-red-dark">
                      <Heart className="h-4 w-4 fill-current" /> {d.sponsorAthlete.sponsorFor} ${a.amount}
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

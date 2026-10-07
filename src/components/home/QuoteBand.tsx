"use client";

import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { stories, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function QuoteBand() {
  const { lang, dict: d } = useLang();
  const s = stories[1] ?? stories[0];
  if (!s) return null;
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="duotone duotone-red absolute inset-0"><Image src={s.image} alt="" fill sizes="100vw" className="object-cover object-top opacity-35" /></div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
      <div className="container-x relative max-w-5xl">
        <Reveal>
          <Quote className="h-14 w-14 text-gold" aria-hidden />
          <blockquote className="mt-6 text-balance text-4xl font-extrabold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">“{loc(lang, s, "quote")}”</blockquote>
          <p className="mt-6 font-heading text-2xl font-bold uppercase text-gold">{s.name} <span className="text-white/60">· {loc(lang, s, "role")}</span></p>
          <Link href="/stories" className="focus-ring mt-8 inline-flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-white hover:text-gold">{d.nav.stories} <ArrowRight className="h-5 w-5" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

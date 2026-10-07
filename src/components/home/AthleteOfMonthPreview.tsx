"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { athleteOfMonth, formatDate, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function AthleteOfMonthPreview() {
  const { lang, dict: d } = useLang();
  const a = athleteOfMonth[0];
  if (!a) return null;
  return (
    <section className="bg-gold py-20 text-ink sm:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[18rem_1fr]">
        <Reveal className="relative mx-auto aspect-square w-64 overflow-hidden rounded-full border-8 border-white shadow-2xl lg:w-72">
          <Image src={a.image} alt={a.name} fill sizes="18rem" className="object-cover" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em]"><Star className="h-4 w-4 fill-current" /> {d.aom.eyebrow} · {formatDate(a.month + "-01", { month: "long", year: "numeric" }, lang)}</p>
          <h2 className="mt-2 text-5xl font-extrabold uppercase sm:text-6xl">{a.name}</h2>
          <p className="font-semibold">{a.sport}</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">{loc(lang, a, "story")}</p>
          <Link href="/athlete-of-the-month" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-deep">{d.aom.archive} <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

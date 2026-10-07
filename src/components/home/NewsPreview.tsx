"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { posts, formatDate, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function NewsPreview() {
  const { lang, dict: d } = useLang();
  const [featured, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={d.news.eyebrow} title={d.news.title} />
          <Link href="/news" className="focus-ring group inline-flex w-fit items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-teal">{d.common.allNews} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></Link>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Link href={`/news/${featured.slug}`} className="focus-ring group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                <Image src={featured.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                {featured.video && <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-red px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white"><Play className="h-3 w-3 fill-current" /> Video</span>}
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-red">{formatDate(featured.date, undefined, lang)}</p>
              <h3 className="mt-2 text-4xl font-extrabold uppercase text-ink group-hover:text-teal">{loc(lang, featured, "title")}</h3>
              <p className="mt-3 text-ink-soft">{loc(lang, featured, "excerpt")}</p>
            </Link>
          </Reveal>
          <div className="flex flex-col gap-6">
            {rest.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={0.1 + i * 0.1}>
                <Link href={`/news/${p.slug}`} className="focus-ring group grid gap-5 sm:grid-cols-[12rem_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={p.image} alt="" fill sizes="12rem" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-red">{formatDate(p.date, undefined, lang)}</p>
                    <h3 className="mt-1 text-2xl font-extrabold uppercase text-ink group-hover:text-teal">{loc(lang, p, "title")}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{loc(lang, p, "excerpt")}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

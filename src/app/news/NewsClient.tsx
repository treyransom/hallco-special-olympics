"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import { posts, formatDate, loc, site, isPlaceholderUrl } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function NewsClient() {
  const { lang, dict: d } = useLang();
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const fbReal = !isPlaceholderUrl(site.social.facebook);
  return (
    <>
      <PageHero curve="mist" eyebrow={d.news.eyebrow} title={d.news.title} image="/images/lunch-hospital.jpg" description={d.news.pageText} />
      <section className="bg-dots bg-mist py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div className="grid gap-8 md:grid-cols-2">
            {sorted.map((p, i) => (
              <Reveal as="article" key={p.slug} delay={i * 0.06}>
                <Link href={`/news/${p.slug}`} className="focus-ring group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    {p.video && <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-red px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white"><Play className="h-3 w-3 fill-current" /> Video</span>}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-red">{formatDate(p.date, undefined, lang)}</p>
                    <h2 className="mt-2 text-2xl font-extrabold uppercase text-ink group-hover:text-teal">{loc(lang, p, "title")}</h2>
                    <p className="mt-2 flex-1 text-sm text-ink-soft">{loc(lang, p, "excerpt")}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-heading font-bold uppercase tracking-wide text-teal">{d.common.readMore} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="h-fit overflow-hidden rounded-3xl bg-white shadow-sm lg:sticky lg:top-28">
            <div className="bg-[#1877f2] p-5 text-white">
              <p className="inline-flex items-center gap-2 font-heading text-xl font-bold uppercase"><FacebookIcon className="h-5 w-5" /> {d.news.follow}</p>
            </div>
            {fbReal ? (
              <iframe
                title="Facebook feed"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(site.social.facebook)}&tabs=timeline&width=340&height=700&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                width="340"
                height="700"
                loading="lazy"
                className="w-full border-0"
                allow="encrypted-media"
              />
            ) : (
              <div className="p-6">
                <p className="text-sm text-ink-soft">{d.news.followText}</p>
                <Button href={site.social.facebook} external variant="secondary" className="mt-4 w-full">{d.news.followBtn}</Button>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

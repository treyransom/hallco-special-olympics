"use client";

import Image from "@/components/ui/SmartImage";
import { useState } from "react";
import { Play, Quote, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import VideoModal from "@/components/ui/VideoModal";
import Stories from "@/components/home/Stories";
import AthleteOfMonthPreview from "@/components/home/AthleteOfMonthPreview";
import { stories, site, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function StoriesClient() {
  const { lang, dict: d } = useLang();
  const [video, setVideo] = useState<string | null>(null);
  return (
    <>
      <PageHero eyebrow={d.storiesPage.eyebrow} title={d.storiesPage.title} image="/images/unified-partner-award.jpg" description={d.storiesPage.text} />
      <Stories />
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={d.stories.tag} title={d.storiesPage.all} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 0.06} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={s.image} alt={s.name} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover" />
                  {s.video && (
                    <button type="button" onClick={() => setVideo(s.video!)} aria-label={d.stories.watch} className="focus-ring group absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-red shadow-xl transition group-hover:scale-110"><Play className="ml-1 h-7 w-7 fill-current" /></span>
                    </button>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Quote className="h-8 w-8 text-teal/30" aria-hidden />
                  <p className="mt-2 flex-1 text-lg font-medium leading-snug text-ink">“{loc(lang, s, "quote")}”</p>
                  <p className="mt-4 font-heading text-2xl font-extrabold uppercase text-ink">{s.name}</p>
                  <p className="text-sm text-teal">{loc(lang, s, "role")} · {s.sport}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-teal-deep p-8 text-white sm:flex-row">
            <p className="text-2xl font-extrabold uppercase">{d.storiesPage.share}</p>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent("My Hall County story")}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-ink hover:bg-gold"><Mail className="h-4 w-4" /> {site.email}</a>
          </Reveal>
        </div>
      </section>
      <AthleteOfMonthPreview />
      <VideoModal videoId={video} onClose={() => setVideo(null)} />
    </>
  );
}

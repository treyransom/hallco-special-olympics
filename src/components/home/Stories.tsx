"use client";

import Image from "@/components/ui/SmartImage";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Play } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoModal from "@/components/ui/VideoModal";
import { stories, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function Stories() {
  const { lang, dict: d } = useLang();
  const [i, setI] = useState(0);
  const [video, setVideo] = useState<string | null>(null);
  const s = stories[i];
  const go = (dir: number) => setI((i + dir + stories.length) % stories.length);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading align="center" eyebrow={d.stories.eyebrow} title={d.stories.title} description={d.stories.tag} />
        <div className="relative mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl shadow-ink/20">
            <AnimatePresence mode="wait">
              <motion.div key={s.image} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <Image src={s.image} alt={s.name} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            {s.video && (
              <button type="button" onClick={() => setVideo(s.video!)} aria-label={d.stories.watch} className="focus-ring group absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-red shadow-xl transition group-hover:scale-110"><Play className="ml-1 h-9 w-9 fill-current" /></span>
              </button>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 text-white">
              <p className="font-heading text-3xl font-extrabold uppercase">{s.name}</p>
              <p className="text-sm text-gold">{loc(lang, s, "role")} · {s.sport}</p>
            </div>
          </div>
          <div>
            <Quote className="h-12 w-12 text-teal/30" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.blockquote key={s.name + lang} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="mt-4 text-balance text-3xl font-semibold leading-snug text-ink sm:text-4xl">
                “{loc(lang, s, "quote")}”
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label={d.stories.prev} className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-ink transition hover:bg-ink hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => go(1)} aria-label={d.stories.next} className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-ink transition hover:bg-ink hover:text-white"><ChevronRight className="h-5 w-5" /></button>
              {s.video && (
                <button type="button" onClick={() => setVideo(s.video!)} className="focus-ring ml-1 inline-flex items-center gap-2 rounded-full bg-red px-4 py-2.5 font-heading text-base font-bold uppercase tracking-wide text-white hover:bg-red-dark">
                  <Play className="h-4 w-4 fill-current" /> {d.stories.watch}
                </button>
              )}
              <div className="ml-auto flex gap-1.5" role="tablist" aria-label="Stories">
                {stories.map((st, n) => (
                  <button key={st.name} role="tab" aria-selected={n === i} aria-label={st.name} onClick={() => setI(n)} className="focus-ring -m-1 rounded-full p-3"><span className={`block h-3 rounded-full transition-all ${n === i ? "w-9 bg-teal" : "w-3 bg-mist-dark hover:bg-teal/50"}`} /></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal videoId={video} onClose={() => setVideo(null)} title={s.name} />
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { stories } from "@/lib/data";

export default function Stories() {
  const [i, setI] = useState(0);
  const s = stories[i];
  const go = (d: number) => setI((i + d + stories.length) % stories.length);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="More than a game" title="Stories that move." description="#HallCountyStrong" />
        <div className="relative mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl shadow-ink/20">
            <AnimatePresence mode="wait">
              <motion.div key={s.image} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <Image src={s.image} alt={s.name} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 text-white">
              <p className="font-heading text-3xl font-extrabold uppercase">{s.name}</p>
              <p className="text-sm text-gold">{s.role} · {s.sport}</p>
            </div>
          </div>

          <div>
            <Quote className="h-12 w-12 text-teal/30" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.blockquote key={s.quote} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="mt-4 text-balance text-3xl font-semibold leading-snug text-ink sm:text-4xl">
                “{s.quote}”
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous story" className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-ink transition hover:bg-ink hover:text-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next story" className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-ink transition hover:bg-ink hover:text-white">
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="ml-2 flex gap-1.5" role="tablist" aria-label="Stories">
                {stories.map((st, n) => (
                  <button key={st.name} role="tab" aria-selected={n === i} aria-label={st.name} onClick={() => setI(n)} className={`h-2.5 rounded-full transition-all ${n === i ? "w-8 bg-teal" : "w-2.5 bg-mist-dark hover:bg-teal/50"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

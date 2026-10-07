"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useDict } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";

const tags = ["All", ...Array.from(new Set(gallery.map((g) => g.tag)))];

export default function GalleryClient() {
  const d = useDict();
  const [tag, setTag] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const items = gallery.filter((g) => tag === "All" || g.tag === tag);

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? null : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [idx, close, step]);

  return (
    <>
    <PageHero eyebrow={d.gallery.eyebrow} title={d.gallery.title} image="/images/medals.jpg" description={d.gallery.text} />
    <section className="bg-mist py-16 sm:py-24">
      <div className="container-x">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={d.gallery.filter}>
          {tags.map((t) => (
            <button key={t} role="tab" aria-selected={tag === t} onClick={() => { setTag(t); setIdx(null); }} className={cn("focus-ring rounded-full px-4 py-2 font-heading text-base font-bold uppercase tracking-wide transition", tag === t ? "bg-ink text-white" : "bg-white text-ink hover:bg-mist-dark")}>
              {t === "All" ? d.events.all : t}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
          <AnimatePresence>
            {items.map((g, i) => (
              <motion.li key={g.src} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="mb-4 break-inside-avoid">
                <button type="button" onClick={() => setIdx(i)} className="focus-ring group relative block w-full overflow-hidden rounded-2xl bg-white">
                  <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="h-auto w-full transition duration-500 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/80 to-transparent p-3 text-left text-xs font-semibold text-white transition group-hover:translate-y-0">{g.alt}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {idx !== null && items[idx] && (
          <motion.div role="dialog" aria-modal="true" aria-label={items[idx].alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4" onClick={close}>
            <button type="button" onClick={close} aria-label={d.common.close} className="focus-ring absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><X className="h-6 w-6" /></button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={d.common.previous} className="focus-ring absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><ChevronLeft className="h-6 w-6" /></button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={d.common.next} className="focus-ring absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><ChevronRight className="h-6 w-6" /></button>
            <motion.figure key={items[idx].src} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image src={items[idx].src} alt={items[idx].alt} width={items[idx].w} height={items[idx].h} sizes="90vw" className="max-h-[80vh] w-auto rounded-2xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-white/80">{items[idx].alt} · {idx + 1} / {items.length}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  );
}

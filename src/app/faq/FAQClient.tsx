"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { faqs, loc } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

export default function FAQClient() {
  const { lang, dict: d } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero eyebrow={d.faq.eyebrow} title={d.faq.title} image="/images/coaches.jpg" description={d.faq.text} />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="divide-y divide-mist-dark">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} className="focus-ring flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className="font-heading text-2xl font-bold uppercase text-ink sm:text-3xl">{loc(lang, f, "q")}</span>
                    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-ink transition", isOpen && "rotate-45 bg-ink text-white")}><Plus className="h-5 w-5" /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <p className="pb-6 pr-16 text-lg leading-relaxed text-ink-soft">{loc(lang, f, "a")}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <Reveal delay={0.1} className="h-fit rounded-3xl bg-teal-deep p-8 text-white lg:sticky lg:top-28">
            <h2 className="text-3xl font-extrabold uppercase">{d.faq.stillT}</h2>
            <p className="mt-2 text-white/80">{d.faq.stillX}</p>
            <Button href="/contact" variant="white" className="mt-6 w-full">{d.common.contactUs}</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

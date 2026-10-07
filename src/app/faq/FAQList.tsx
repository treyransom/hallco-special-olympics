"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function FAQList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-mist-dark">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              className="focus-ring flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-heading text-2xl font-bold uppercase text-ink sm:text-3xl">{f.q}</span>
              <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-ink transition", isOpen && "rotate-45 bg-ink text-white")}>
                <Plus className="h-5 w-5" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <p className="pb-6 pr-16 text-lg leading-relaxed text-ink-soft">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

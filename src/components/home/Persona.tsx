"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Users, Medal, HandHeart, Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useDict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const KEY = "sohc-persona";
const subscribe = () => () => {};
const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
};
const icons = { parent: Users, athlete: Medal, volunteer: HandHeart, sponsor: Building2 } as const;
const colors = { parent: "bg-teal", athlete: "bg-gold text-ink", volunteer: "bg-red", sponsor: "bg-ink" } as const;
const steps: Record<keyof typeof icons, { href: string; k: string }[]> = {
  parent: [{ href: "/register", k: "register" }, { href: "/schedule", k: "schedule" }, { href: "/competition-guide", k: "guide" }, { href: "/carpool", k: "carpool" }],
  athlete: [{ href: "/sports", k: "sports" }, { href: "/teams", k: "teams" }, { href: "/results", k: "results" }, { href: "/athlete-of-the-month", k: "aom" }],
  volunteer: [{ href: "/volunteer", k: "shifts" }, { href: "/get-involved#volunteer", k: "train" }, { href: "/volunteer/checklists", k: "checklists" }, { href: "/volunteer/hours", k: "hours" }],
  sponsor: [{ href: "/sponsor", k: "packages" }, { href: "/wishlist", k: "wishlist" }, { href: "/impact", k: "impact" }, { href: "/donate#matching", k: "matching" }],
};

export default function Persona() {
  const d = useDict();
  const stored = useSyncExternalStore(subscribe, read, () => "");
  const [override, setOverride] = useState<string | null>(null);
  const who = ((override ?? stored) || "parent") as keyof typeof icons;
  const pick = (k: string) => {
    setOverride(k);
    try {
      localStorage.setItem(KEY, k);
    } catch {}
  };
  const p = d.persona;
  return (
    <section className="bg-dots bg-white py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading align="center" eyebrow={p.eyebrow} title={p.title} />
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4" role="tablist" aria-label={p.title}>
          {(Object.keys(icons) as (keyof typeof icons)[]).map((k) => {
            const Icon = icons[k];
            const on = who === k;
            return (
              <button key={k} type="button" role="tab" aria-selected={on} onClick={() => pick(k)} className={cn("focus-ring flex flex-col items-center gap-2 rounded-3xl border-2 p-5 font-heading text-xl font-bold uppercase transition", on ? `border-transparent text-white shadow-xl ${colors[k]}` : "border-mist-dark bg-white text-ink hover:border-teal")}>
                <Icon className="h-7 w-7" /> {p.roles[k]}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.ol key={who} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
            {steps[who].map((s, i) => (
              <li key={s.href}>
                <Link href={s.href} className="focus-ring group flex items-center gap-4 rounded-2xl border border-mist-dark bg-mist p-4 transition hover:-translate-y-0.5 hover:border-teal hover:bg-white hover:shadow-lg">
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-lg font-extrabold text-white", colors[who])}>{i + 1}</span>
                  <span className="flex-1 font-heading text-xl font-bold uppercase text-ink">{(p.steps[who] as Record<string, string>)[s.k]}</span>
                  <ArrowRight className="h-5 w-5 text-ink-soft transition group-hover:translate-x-1 group-hover:text-teal" />
                </Link>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { useDict } from "@/lib/i18n";

export default function Ticker({ dark = false }: { dark?: boolean }) {
  const d = useDict();
  const words = [d.hero.l1, d.hero.l2, `${d.hero.l3} ${d.hero.l4}`, "Hall County", d.stories.tag];
  const row = [...words, ...words];
  return (
    <div className={`overflow-hidden border-y py-4 ${dark ? "border-white/10 bg-ink text-white" : "border-mist-dark bg-white text-ink"}`} aria-hidden>
      <div className="animate-ticker flex w-max items-center gap-8 whitespace-nowrap font-heading text-4xl font-extrabold uppercase sm:text-5xl">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className={i % 2 ? "text-outline" : ""}>{w}</span>
            <span className={`h-3 w-3 rounded-full ${i % 3 === 0 ? "bg-red" : i % 3 === 1 ? "bg-teal" : "bg-gold"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

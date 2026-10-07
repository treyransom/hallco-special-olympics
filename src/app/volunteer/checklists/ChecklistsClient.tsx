"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, RotateCcw, ClipboardCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { checklists } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const KEY = "sohc-checklists";
const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};
const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "{}";
  } catch {
    return "{}";
  }
};

export default function ChecklistsClient() {
  const { lang, dict: d } = useLang();
  const c = d.checklist;
  const stored = useSyncExternalStore(subscribe, read, () => "{}");
  const [override, setOverride] = useState<Record<string, number[]> | null>(null);
  const state: Record<string, number[]> = override ?? JSON.parse(stored);
  const [role, setRole] = useState(0);
  const list = checklists[role];
  const done = state[list.role] ?? [];
  function save(next: Record<string, number[]>) {
    setOverride(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }
  const toggle = (i: number) => save({ ...state, [list.role]: done.includes(i) ? done.filter((x) => x !== i) : [...done, i] });
  const pct = Math.round((done.length / list.items.length) * 100);
  return (
    <>
      <PageHero curve="mist" eyebrow={c.eyebrow} title={c.title} image="/images/lunch-delivery.jpg" description={c.text} />
      <section className="bg-dots bg-mist py-16 sm:py-24">
        <div className="container-x grid min-w-0 gap-8 lg:grid-cols-[18rem_1fr]">
          <div className="min-w-0">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{c.pickRole}</p>
            <ul className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col" role="tablist">
              {checklists.map((cl, i) => {
                const n = (state[cl.role] ?? []).length;
                return (
                  <li key={cl.role} className="shrink-0">
                    <button type="button" role="tab" aria-selected={i === role} onClick={() => setRole(i)} className={cn("focus-ring flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left font-heading text-lg font-bold uppercase transition", i === role ? "bg-ink text-white" : "bg-white text-ink hover:bg-mist-dark")}>
                      {lang === "es" ? cl.es : cl.role}
                      <span className={cn("rounded-full px-2 py-0.5 text-[11px]", n === cl.items.length ? "bg-teal text-white" : i === role ? "bg-white/15" : "bg-mist")}>{n}/{cl.items.length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="min-w-0 rounded-3xl bg-white p-5 shadow-xl shadow-ink/5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-3xl font-extrabold uppercase text-ink"><ClipboardCheck className="h-7 w-7 text-teal" /> {lang === "es" ? list.es : list.role}</h2>
              <button type="button" onClick={() => save({ ...state, [list.role]: [] })} className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-teal"><RotateCcw className="h-3.5 w-3.5" /> {c.reset}</button>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-mist"><div className={cn("h-full rounded-full transition-all", pct === 100 ? "bg-teal" : "bg-gold")} style={{ width: `${pct}%` }} /></div>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink-soft">{done.length}/{list.items.length} {c.done}</p>
            <ol className="mt-6 space-y-2">
              {list.items.map((it, i) => {
                const on = done.includes(i);
                return (
                  <li key={i}>
                    <button type="button" onClick={() => toggle(i)} aria-pressed={on} className={cn("focus-ring flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition", on ? "border-teal bg-teal/5" : "border-mist-dark hover:border-teal/50")}>
                      <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2", on ? "border-teal bg-teal text-white" : "border-mist-dark")}>{on && <Check className="h-4 w-4" />}</span>
                      <span className={cn("text-ink", on && "line-through opacity-60")}>{lang === "es" ? it.es : it.text}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

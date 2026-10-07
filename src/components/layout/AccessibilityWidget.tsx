"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Accessibility, X, Type, Contrast, PauseCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDict } from "@/lib/i18n";

type Prefs = { textSize: 0 | 1 | 2; contrast: boolean; reduceMotion: boolean };
const DEFAULT: Prefs = { textSize: 0, contrast: false, reduceMotion: false };
const KEY = "sohc-a11y";

function apply(p: Prefs) {
  const root = document.documentElement;
  root.style.fontSize = p.textSize === 0 ? "" : p.textSize === 1 ? "112.5%" : "125%";
  root.classList.toggle("a11y-contrast", p.contrast);
  root.classList.toggle("a11y-reduce-motion", p.reduceMotion);
}

const subscribe = () => () => {};
const readStored = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

function parse(raw: string | null): Prefs {
  if (!raw) return DEFAULT;
  try {
    return { ...DEFAULT, ...JSON.parse(raw) } as Prefs;
  } catch {
    return DEFAULT;
  }
}

export default function AccessibilityWidget() {
  const d = useDict();
  const [open, setOpen] = useState(false);
  const stored = useSyncExternalStore(subscribe, readStored, () => null);
  const [override, setOverride] = useState<Prefs | null>(null);
  const prefs = override ?? parse(stored);

  useEffect(() => {
    apply(prefs);
  }, [prefs]);

  function update(next: Partial<Prefs>) {
    const p = { ...prefs, ...next };
    setOverride(p);
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {}
  }

  const row = "flex items-center justify-between gap-4 py-3";
  const pill = (active: boolean) =>
    cn("focus-ring rounded-full px-3 py-1.5 font-heading text-sm font-bold uppercase tracking-wide transition", active ? "bg-teal text-white" : "bg-mist text-ink hover:bg-mist-dark");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={d.a11y.label}
        className="print:hidden focus-ring fixed bottom-24 left-6 xl:bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-lg shadow-ink/30 hover:bg-teal-deep"
      >
        <Accessibility className="h-6 w-6" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="a11y-panel"
            role="dialog"
            aria-label={d.a11y.label}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="fixed bottom-40 left-6 xl:bottom-20 z-40 w-[min(22rem,calc(100vw-3rem))] rounded-2xl border border-mist-dark bg-white p-5 shadow-2xl shadow-ink/20"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold uppercase text-ink">{d.a11y.title}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label={d.a11y.close} className="focus-ring rounded-full p-1.5 hover:bg-mist">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 divide-y divide-mist-dark">
              <div className={row}>
                <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Type className="h-4 w-4 text-teal" /> {d.a11y.text}</span>
                <div className="flex gap-1">
                  {(["A", "A+", "A++"] as const).map((l, i) => (
                    <button key={l} type="button" onClick={() => update({ textSize: i as 0 | 1 | 2 })} className={pill(prefs.textSize === i)} aria-pressed={prefs.textSize === i}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className={row}>
                <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Contrast className="h-4 w-4 text-teal" /> {d.a11y.contrast}</span>
                <button type="button" onClick={() => update({ contrast: !prefs.contrast })} className={pill(prefs.contrast)} aria-pressed={prefs.contrast}>
                  {prefs.contrast ? d.a11y.on : d.a11y.off}
                </button>
              </div>
              <div className={row}>
                <span className="flex items-center gap-2 text-sm font-semibold text-ink"><PauseCircle className="h-4 w-4 text-teal" /> {d.a11y.motion}</span>
                <button type="button" onClick={() => update({ reduceMotion: !prefs.reduceMotion })} className={pill(prefs.reduceMotion)} aria-pressed={prefs.reduceMotion}>
                  {prefs.reduceMotion ? d.a11y.on : d.a11y.off}
                </button>
              </div>
            </div>
            <button type="button" onClick={() => update(DEFAULT)} className="focus-ring mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-teal">
              <RotateCcw className="h-3.5 w-3.5" /> {d.a11y.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

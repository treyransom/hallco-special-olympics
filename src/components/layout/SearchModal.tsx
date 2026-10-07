"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { buildIndex, type IndexEntry } from "@/lib/search";
import { useFocusTrap } from "@/lib/useFocusTrap";

export default function SearchModal({ open, onClose, initialQuery = "" }: { open: boolean; onClose: () => void; initialQuery?: string }) {
  const { lang, dict: d } = useLang();
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open);
  const index = useMemo(() => buildIndex(lang, d), [lang, d]);
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) {
      setQ(initialQuery);
      setCursor(0);
    }
  }

  const results = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [] as IndexEntry[];
    return index
      .map((e) => {
        const hay = `${e.title} ${e.text}`.toLowerCase();
        const titleHay = e.title.toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (titleHay.includes(t)) score += 5;
          else if (hay.includes(t)) score += 1;
          else return null;
        }
        return { e, score };
      })
      .filter((x): x is { e: IndexEntry; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.e);
  }, [q, index]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(id);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      window.location.href = results[cursor].href;
    } else if (e.key === "Escape") onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-ink/70 p-4 pt-[10vh] backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label={d.nav.search}>
          <motion.div ref={panelRef} initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -12, scale: 0.98 }} className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-mist-dark px-5">
              <Search className="h-5 w-5 shrink-0 text-teal" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onKey}
                placeholder={d.search.placeholder}
                className="h-16 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-ink-soft/60"
                aria-label={d.nav.search}
              />
              <button type="button" onClick={onClose} aria-label={d.common.close} className="focus-ring rounded-full p-2 hover:bg-mist">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {q.trim() === "" && <p className="px-4 py-6 text-sm text-ink-soft">{d.search.hint}</p>}
              {q.trim() !== "" && results.length === 0 && (
                <p className="px-4 py-6 text-sm text-ink-soft">
                  {d.search.none} “{q}”.
                </p>
              )}
              {(["page", "sport", "event", "team", "faq", "post", "resource", "fundraiser"] as const).map((type) => {
                const group = results.filter((r) => r.type === type);
                if (!group.length) return null;
                return (
                  <div key={type}>
                    <p className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">{d.searchGroups[type]}</p>
                    <ul>
                      {group.map((r) => {
                        const i = results.indexOf(r);
                        return (
                          <li key={r.href + r.title}>
                            <Link href={r.href} onClick={onClose} onMouseEnter={() => setCursor(i)} className={`flex items-center gap-4 rounded-2xl px-4 py-2.5 transition ${i === cursor ? "bg-mist" : "hover:bg-mist"}`}>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-heading text-lg font-bold uppercase text-ink">{r.title}</span>
                                <span className="block truncate text-sm text-ink-soft">{r.text}</span>
                              </span>
                              <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="hidden items-center gap-3 border-t border-mist-dark px-5 py-2.5 text-[11px] text-ink-soft sm:flex">
              <kbd className="rounded border border-mist-dark bg-mist px-1.5 py-0.5 font-mono">↑↓</kbd>
              <kbd className="rounded border border-mist-dark bg-mist px-1.5 py-0.5 font-mono">↵</kbd>
              <kbd className="rounded border border-mist-dark bg-mist px-1.5 py-0.5 font-mono">esc</kbd>
              <span className="ml-auto">
                <kbd className="rounded border border-mist-dark bg-mist px-1.5 py-0.5 font-mono">⌘K</kbd> {d.search.kbd}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

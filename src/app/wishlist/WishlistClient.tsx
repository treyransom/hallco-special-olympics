"use client";

import { useState } from "react";
import { Gift, CheckCircle2, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { wishlist, team, site, type WishItem } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function WishlistClient() {
  const { lang, dict: d } = useLang();
  const w = d.wishlistPage;
  const treasurer = team.find((t) => t.role === "Treasurer");
  const [pick, setPick] = useState<WishItem | null>(null);
  const [sent, setSent] = useState(false);
  const money = (n: number) => n.toLocaleString(lang === "es" ? "es-US" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const remaining = wishlist.reduce((s, i) => s + (i.qty - i.claimed) * i.price, 0);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pick) return;
    const fd = new FormData(e.currentTarget);
    const qty = Number(fd.get("qty"));
    const body = [`Wish list claim`, ``, `Item: ${pick.item}`, `Quantity: ${qty} × ${money(pick.price)} = ${money(qty * pick.price)}`, `Name: ${fd.get("name")}`, `Email: ${fd.get("email")}`].join("\n");
    window.location.assign(`mailto:${treasurer?.email ?? site.email}?subject=${encodeURIComponent(`Wish list: ${pick.item}`)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  }
  return (
    <>
      <PageHero curve="mist" eyebrow={w.eyebrow} title={w.title} image="/images/team-bleachers.jpg" description={w.text}>
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-heading text-lg font-bold uppercase tracking-wide backdrop-blur"><Gift className="h-5 w-5 text-gold" /> {w.total}: {money(remaining)}</p>
      </PageHero>
      <section className="bg-dots bg-mist py-20 sm:py-28">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist.map((it, i) => {
            const left = it.qty - it.claimed;
            const pct = Math.round((it.claimed / it.qty) * 100);
            return (
              <Reveal as="article" key={it.item} delay={(i % 4) * 0.05} className={cn("flex flex-col rounded-3xl p-6 shadow-lg shadow-ink/5", left === 0 ? "bg-teal text-white" : "bg-white")}>
                <p className={cn("text-xs font-bold uppercase tracking-wider", left === 0 ? "text-white/80" : "text-red")}>{it.sport}</p>
                <h2 className="mt-1 text-2xl font-extrabold uppercase leading-tight">{lang === "es" ? it.es : it.item}</h2>
                <p className={cn("mt-2 font-heading text-4xl font-extrabold", left === 0 ? "" : "text-teal")}>{money(it.price)} <span className={cn("text-sm", left === 0 ? "text-white/70" : "text-ink-soft")}>{w.each}</span></p>
                <div className={cn("mt-4 h-2 overflow-hidden rounded-full", left === 0 ? "bg-white/20" : "bg-mist")}><div className={cn("h-full rounded-full", left === 0 ? "bg-white" : "bg-gold")} style={{ width: `${pct}%` }} /></div>
                <p className={cn("mt-1 flex-1 text-xs font-bold uppercase tracking-wider", left === 0 ? "text-white/80" : "text-ink-soft")}>{it.claimed}/{it.qty} {w.claimed} · {left} {w.remaining}</p>
                {left === 0 ? (
                  <p className="mt-4 inline-flex items-center gap-1.5 font-heading text-lg font-bold uppercase"><CheckCircle2 className="h-5 w-5" /> {w.fullyFunded}</p>
                ) : (
                  <button type="button" onClick={() => { setPick(it); setSent(false); }} className="focus-ring mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-red px-4 py-2.5 font-heading text-base font-bold uppercase tracking-wide text-white hover:bg-red-dark"><Gift className="h-4 w-4" /> {w.claim}</button>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
      <AnimatePresence>
        {pick && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 p-4 sm:items-center" onClick={() => setPick(null)} role="dialog" aria-modal="true" aria-label={w.claimForm}>
            <motion.form initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div><p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{w.claimForm}</p><h2 className="text-2xl font-extrabold uppercase text-ink">{lang === "es" ? pick.es : pick.item}</h2></div>
                <button type="button" onClick={() => setPick(null)} aria-label={d.common.close} className="focus-ring rounded-full p-2 hover:bg-mist"><X className="h-5 w-5" /></button>
              </div>
              {sent ? <p className="mt-6 flex items-center gap-2 font-semibold text-teal"><CheckCircle2 className="h-5 w-5" /> {w.sent}</p> : (
                <div className="mt-5 space-y-3 text-sm font-semibold text-ink">
                  <label className="block">{w.qtyLabel}<input name="qty" type="number" min={1} max={pick.qty - pick.claimed} defaultValue={1} className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
                  <label className="block">{d.common.name}<input name="name" required className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
                  <label className="block">{d.common.email}<input name="email" type="email" required className="focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3" /></label>
                  <button type="submit" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-dark"><Send className="h-4 w-4" /> {w.send}</button>
                </div>
              )}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

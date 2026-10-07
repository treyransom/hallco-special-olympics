"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { campaign, site, formatDate } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function Campaign({ dark = false }: { dark?: boolean }) {
  const { lang, dict: d } = useLang();
  if (!campaign.active) return null;
  const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
  const money = (n: number) => n.toLocaleString(lang === "es" ? "es-US" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <section className={dark ? "bg-ink py-16 text-white" : "bg-mist py-16"}>
      <div className="container-x">
        <Reveal className={`rounded-3xl p-8 sm:p-10 ${dark ? "bg-white/5" : "bg-white shadow-xl shadow-ink/5"}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{lang === "es" ? campaign.nameEs : campaign.name}</p>
              <p className={`mt-2 font-heading text-6xl font-extrabold leading-none sm:text-7xl ${dark ? "text-white" : "text-ink"}`}>
                {money(campaign.raised)} <span className={`text-2xl font-bold ${dark ? "text-white/60" : "text-ink-soft"}`}>{d.campaign.of} {money(campaign.goal)}</span>
              </p>
              <p className={`mt-2 ${dark ? "text-white/75" : "text-ink-soft"}`}>{lang === "es" ? campaign.blurbEs : campaign.blurb}</p>
            </div>
            <Button href={site.donateUrl} external={site.donateUrl.startsWith("http")}><Heart className="h-4 w-4 fill-current" /> {d.campaign.give}</Button>
          </div>
          <div className={`mt-8 h-5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-mist"}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={campaign.name}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-teal to-teal-light" />
          </div>
          <div className={`mt-2 flex justify-between text-xs font-semibold uppercase tracking-wider ${dark ? "text-white/60" : "text-ink-soft"}`}>
            <span>{pct}% {d.campaign.raised}</span>
            <span>{money(campaign.goal - campaign.raised)} {d.campaign.left} · {d.campaign.ends} {formatDate(campaign.deadline, { month: "short", day: "numeric", year: "numeric" }, lang)}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

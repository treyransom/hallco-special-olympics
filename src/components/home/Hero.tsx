"use client";

import Image from "@/components/ui/SmartImage";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Medal, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { site, stats } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { lang, dict: d } = useLang();
  const lines = [d.hero.l1, d.hero.l2, d.hero.l3];
  const athletes = stats[0];
  return (
    <section className="noise relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
      <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: "easeOut" }} className="absolute inset-0">
        <Image src="/images/flag-football.jpg" alt="" fill priority loading="eager" sizes="100vw" className="object-cover object-[center_35%]" />
        {site.heroVideo && (
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={`${site.basePath}/images/flag-football.jpg`} aria-hidden>
            <source src={site.heroVideo} type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      <div className="animate-blob absolute -left-40 top-20 -z-0 h-[32rem] w-[32rem] rounded-full bg-teal/30 blur-3xl" aria-hidden />
      <div className="animate-blob absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-red/25 blur-3xl [animation-delay:-7s]" aria-hidden />

      <p aria-hidden className="text-outline pointer-events-none absolute -right-6 top-28 select-none font-heading text-[9rem] font-extrabold uppercase leading-none text-white/10 sm:text-[13rem] lg:top-24 lg:text-[18rem]">
        Hall
        <br />
        County
      </p>

      <div className="container-x relative grid min-h-[100svh] items-end gap-8 pb-28 pt-36 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pb-40">
        <div>
          <motion.p initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-5 inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red" />
            {d.hero.badge}
          </motion.p>
          <h1 className="max-w-5xl text-balance text-6xl font-extrabold uppercase leading-[0.92] sm:text-7xl lg:text-[7rem]">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }} className={`block ${i === 2 ? "bg-gradient-to-r from-teal-light to-gold bg-clip-text text-transparent" : ""}`}>
                  {line}
                </motion.span>
              </span>
            ))}
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-2 block text-2xl font-semibold normal-case tracking-normal text-white/70 sm:text-3xl">
              {d.hero.l4}
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="mt-8 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {d.hero.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.05 }} className="mt-10 flex flex-wrap gap-4">
            <Button href="/register" size="lg">{d.hero.cta1} <ArrowRight className="h-5 w-5" /></Button>
            <Button href="/donate" size="lg" variant="ghost">{d.hero.cta2}</Button>
          </motion.div>
        </div>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 lg:hidden [scrollbar-width:none]" aria-hidden>
          {[["/images/medals.jpg", `${d.results.gold} ×2`], ["/images/powerlifting.jpg", `Willie · ${lang === "es" ? "Atleta del mes" : "Athlete of the Month"}`], ["/images/basketball-team.jpg", d.nav.teams]].map(([src, cap], i) => (
            <div key={src} className={`w-44 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
              <Image src={src} alt="" width={640} height={480} className="aspect-[4/3] object-cover" />
              <p className="truncate px-2 py-1.5 font-heading text-sm font-bold uppercase text-ink">{cap}</p>
            </div>
          ))}
          <div className="flex w-40 shrink-0 flex-col justify-center gap-2">
            <span className="flex items-center gap-2 rounded-full bg-gold px-3 py-2 text-ink"><Users className="h-5 w-5" /><span className="font-heading text-2xl font-extrabold leading-none">{athletes.value}{athletes.suffix}</span><span className="text-[10px] font-bold uppercase leading-tight">{lang === "es" ? athletes.labelEs : athletes.label}</span></span>
            <span className="flex items-center gap-2 rounded-full bg-red px-3 py-2 text-white"><Medal className="h-5 w-5" /><span className="font-heading text-2xl font-extrabold leading-none">$0</span><span className="text-[10px] font-bold uppercase leading-tight">{d.mission.zeroLabel}</span></span>
          </div>
        </div>
        <div className="relative hidden h-[30rem] lg:block" aria-hidden>
          <motion.div initial={{ opacity: 0, y: 40, rotate: -6 }} animate={{ opacity: 1, y: 0, rotate: -6 }} transition={{ duration: 0.9, delay: 0.6 }} className="animate-float absolute left-4 top-4 w-64 rotate-[-6deg] overflow-hidden rounded-2xl border-[6px] border-white bg-white shadow-2xl [--r:-6deg]">
            <Image src="/images/medals.jpg" alt="" width={640} height={428} className="aspect-[4/3] object-cover" />
            <p className="px-3 py-2 font-heading text-lg font-bold uppercase text-ink">{d.results.gold} ×2</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 5 }} transition={{ duration: 0.9, delay: 0.85 }} className="animate-float absolute right-0 top-32 w-72 rotate-[5deg] overflow-hidden rounded-2xl border-[6px] border-white bg-white shadow-2xl [--r:5deg] [animation-delay:-2s]">
            <Image src="/images/powerlifting.jpg" alt="" width={1500} height={1098} className="aspect-[4/3] object-cover" />
            <p className="px-3 py-2 font-heading text-lg font-bold uppercase text-ink">Willie · {lang === "es" ? "Atleta del mes" : "Athlete of the Month"}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1.2, type: "spring" }} className="absolute bottom-6 left-24 flex items-center gap-3 rounded-full bg-gold px-5 py-3 text-ink shadow-xl">
            <Users className="h-6 w-6" />
            <span className="font-heading text-3xl font-extrabold leading-none">{athletes.value}{athletes.suffix}</span>
            <span className="text-xs font-bold uppercase leading-tight tracking-wider">{lang === "es" ? athletes.labelEs : athletes.label}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1.35, type: "spring" }} className="absolute -bottom-2 right-16 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-red text-white shadow-xl">
            <Medal className="h-6 w-6" />
            <span className="font-heading text-2xl font-extrabold leading-none">$0</span>
          </motion.div>
        </div>
      </div>

      <motion.a href="#about" aria-label={d.hero.scroll} initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }} transition={{ opacity: { delay: 1.6 }, y: { repeat: Infinity, duration: 1.8 } }} className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 text-white/60 hover:text-white lg:block">
        <ChevronDown className="h-8 w-8" />
      </motion.a>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-mist to-transparent" aria-hidden />
    </section>
  );
}

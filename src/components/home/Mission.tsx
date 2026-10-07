"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Counter from "./Counter";
import { stats } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const colors = ["bg-teal text-white", "bg-gold text-ink", "bg-red text-white", "bg-ink text-white"];

export default function Mission() {
  const { lang, dict: d } = useLang();
  return (
    <section id="about" className="bg-dots relative overflow-hidden bg-white py-24 sm:py-32">
      <p aria-hidden className="text-outline pointer-events-none absolute -left-4 top-10 select-none font-heading text-[10rem] font-extrabold uppercase leading-none text-ink/5 lg:text-[16rem]">2026</p>
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={d.mission.eyebrow} title={d.mission.title} description={d.mission.text} />
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-4">
            <Button href="/about" variant="secondary">{d.mission.story} <ArrowRight className="h-4 w-4" /></Button>
            <Button href="/stories" variant="outline">{d.nav.stories}</Button>
          </Reveal>
          <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className={`rounded-3xl p-5 shadow-lg ${colors[i]}`}>
                <dd className="font-heading text-5xl font-extrabold leading-none"><Counter to={s.value} />{s.suffix}</dd>
                <dt className="mt-2 text-xs font-bold uppercase tracking-wider opacity-80">{lang === "es" ? s.labelEs : s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-teal/20 via-gold/10 to-red/20 blur-2xl" aria-hidden />
          <motion.div initial={{ opacity: 0, scale: 0.95, rotate: -2 }} whileInView={{ opacity: 1, scale: 1, rotate: -2 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-ink/20">
            <Image src="/images/medals.jpg" alt={d.mission.medalsAlt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30, rotate: 4 }} whileInView={{ opacity: 1, y: 0, rotate: 4 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="absolute -bottom-8 -left-6 hidden w-56 overflow-hidden rounded-2xl border-[6px] border-white shadow-xl sm:block lg:-left-12 lg:w-72">
            <Image src="/images/powerlifting.jpg" alt={d.mission.liftAlt} width={600} height={440} className="object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4, type: "spring" }} className="absolute -right-4 -top-6 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-red text-center text-white shadow-xl ring-8 ring-white lg:-right-8">
            <span className="font-heading text-4xl font-extrabold leading-none">{d.mission.zero}</span>
            <span className="px-3 text-[11px] font-semibold uppercase leading-tight tracking-wide">{d.mission.zeroLabel}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

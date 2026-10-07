"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SportIcon from "@/components/ui/SportIcon";
import { sports, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function SportsGrid() {
  const { lang, dict: d } = useLang();
  return (
    <section className="bg-mist py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={d.sports.eyebrow} title={d.sports.title} description={d.sports.text} />
          <Link href="/sports" className="focus-ring group inline-flex w-fit items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-teal">
            {d.sports.schedule} <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sports.map((s, i) => (
            <motion.li key={s.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.07 }} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
              <Link href={`/sports#${s.slug}`} className={`focus-ring group relative block h-full overflow-hidden rounded-3xl bg-ink text-white ${i === 0 ? "min-h-[26rem]" : "min-h-[15rem]"}`}>
                <Image src={s.image} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {d.common.seasons[s.season]}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal text-white"><SportIcon icon={s.icon} className="h-6 w-6" /></div>
                  <h3 className={`font-extrabold uppercase ${i === 0 ? "text-5xl" : "text-3xl"}`}>{loc(lang, s, "name")}</h3>
                  {i === 0 && <p className="mt-2 max-w-sm text-white/80">{loc(lang, s, "blurb")}</p>}
                  <p className="mt-2 text-sm font-semibold text-gold">{s.months}</p>
                </div>
              </Link>
            </motion.li>
          ))}
          <motion.li initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.5 }}>
            <Link href="/register" className="focus-ring group flex h-full min-h-[15rem] flex-col justify-between rounded-3xl bg-red p-6 text-white transition hover:bg-red-dark">
              <span className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/80">{d.sports.newAthletes}</span>
              <div>
                <h3 className="text-3xl font-extrabold uppercase leading-tight">{d.sports.ready}</h3>
                <span className="mt-3 inline-flex items-center gap-1 font-semibold">{d.sports.regInfo} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}

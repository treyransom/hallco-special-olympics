"use client";

import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SportIcon from "@/components/ui/SportIcon";
import { sports, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const seasonColor: Record<string, string> = { Winter: "bg-teal text-white", Spring: "bg-gold text-ink", Summer: "bg-red text-white", Fall: "bg-white text-ink" };

export default function SportsGrid() {
  const { lang, dict: d } = useLang();
  return (
    <section className="noise relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="bg-dots-light absolute inset-0" aria-hidden />
      <p aria-hidden className="text-outline pointer-events-none absolute -right-10 bottom-0 select-none font-heading text-[14rem] font-extrabold uppercase leading-none text-white/5">7</p>
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading light eyebrow={d.sports.eyebrow} title={d.sports.title} description={d.sports.text} />
          <Link href="/sports" className="focus-ring group inline-flex w-fit items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-gold">
            {d.sports.schedule} <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sports.map((s, i) => (
            <motion.li key={s.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.07 }} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
              <Link href={`/sports#${s.slug}`} className={`focus-ring group relative block h-full overflow-hidden rounded-3xl bg-teal-deep text-white ring-1 ring-white/10 transition hover:ring-gold ${i === 0 ? "min-h-[28rem]" : "min-h-[15rem]"}`}>
                <Image src={s.image} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${seasonColor[s.season]}`}>{d.common.seasons[s.season]}</div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink transition group-hover:bg-gold"><SportIcon icon={s.icon} className="h-6 w-6" /></div>
                  <h3 className={`font-extrabold uppercase ${i === 0 ? "text-5xl sm:text-6xl" : "text-3xl"}`}>{loc(lang, s, "name")}</h3>
                  {i === 0 && <p className="mt-2 max-w-sm text-white/80">{loc(lang, s, "blurb")}</p>}
                  <p className="mt-2 text-sm font-semibold text-gold">{s.months}</p>
                </div>
                <ArrowUpRight className="absolute right-4 top-4 h-6 w-6 text-white/60 opacity-0 transition group-hover:opacity-100" />
              </Link>
            </motion.li>
          ))}
          <motion.li initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.5 }}>
            <Link href="/register" className="focus-ring group flex h-full min-h-[15rem] flex-col justify-between rounded-3xl bg-gradient-to-br from-red to-red-dark p-6 text-white shadow-xl shadow-red/30 transition hover:-translate-y-1">
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

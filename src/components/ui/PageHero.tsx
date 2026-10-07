"use client";

import Image from "@/components/ui/SmartImage";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  className,
  children,
  watermark,
  curve = "white",
  crumbs = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  className?: string;
  children?: ReactNode;
  watermark?: string;
  curve?: "white" | "mist" | "ink" | "gold";
  crumbs?: boolean;
}) {
  const curveColor = { white: "text-white", mist: "text-mist", ink: "text-ink", gold: "text-gold" }[curve];
  const words = title.split(" ");
  const last = words.pop();
  const mark = (watermark ?? eyebrow).split(" ")[0];
  return (
    <section className={cn("noise relative isolate overflow-hidden bg-ink text-white", className)}>
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} className="duotone absolute inset-0">
        <Image src={image} alt="" fill priority loading="eager" className="object-cover opacity-60" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <div className="animate-blob absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-teal/30 blur-3xl" aria-hidden />
      <div className="animate-blob absolute -right-20 bottom-0 h-[22rem] w-[22rem] rounded-full bg-red/20 blur-3xl [animation-delay:-6s]" aria-hidden />
      <p aria-hidden className="text-outline pointer-events-none absolute -right-4 bottom-6 select-none font-heading text-[7rem] font-extrabold uppercase leading-none text-white/10 sm:text-[11rem] lg:text-[15rem]">{mark}</p>

      <div className="container-x relative py-24 sm:py-32 lg:py-36">
        {crumbs && <Breadcrumbs current={eyebrow} />}
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-5 inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-red" />
          {eyebrow}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-4xl text-balance text-4xl font-extrabold uppercase leading-[0.95] sm:text-6xl lg:text-8xl">
          {words.join(" ")} <span className="bg-gradient-to-r from-teal-light to-gold bg-clip-text text-transparent">{last}</span>
        </motion.h1>
        {description && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {description}
          </motion.p>
        )}
        {children && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8">{children}</motion.div>}
      </div>
      <svg className={cn("absolute inset-x-0 -bottom-px h-10 w-full sm:h-16", curveColor)} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path d="M0 80 C 360 0 1080 0 1440 80 Z" fill="currentColor" />
      </svg>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-teal-deep text-white", className)}>
      <Image src={image} alt="" fill priority loading="eager" className="object-cover opacity-40" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/80 to-teal-deep/30" />
      <div className="container-x relative py-24 sm:py-32 lg:py-40">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold"
        >
          <span className="h-0.5 w-8 bg-gold" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-balance text-5xl font-extrabold uppercase sm:text-6xl lg:text-8xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}

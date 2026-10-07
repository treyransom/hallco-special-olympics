"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-ink text-white">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image src="/images/flag-football.jpg" alt="" fill priority loading="eager" sizes="100vw" className="object-cover object-[center_35%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <div className="container-x relative flex min-h-[92svh] flex-col justify-end pb-20 pt-32 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold backdrop-blur"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-red" />
          Hall County, Georgia
        </motion.p>

        <h1 className="max-w-5xl text-balance text-6xl font-extrabold uppercase leading-[0.92] sm:text-7xl lg:text-[7.5rem]">
          {["Let me win.", "But if I cannot win,", "let me be brave"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${i === 2 ? "text-teal-light" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-2 block text-2xl font-semibold normal-case tracking-normal text-white/70 sm:text-3xl"
          >
            in the attempt.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
        >
          Year-round sports training and competition for children and adults with intellectual disabilities. Seven sports, one
          family, zero cost to our athletes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="/get-involved" size="lg">
            Get Involved <ArrowRight className="h-5 w-5" />
          </Button>
          <Button href="/donate" size="lg" variant="ghost">
            Support an Athlete
          </Button>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/60 hover:text-white sm:block"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.a>
    </section>
  );
}

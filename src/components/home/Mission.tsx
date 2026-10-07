"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Counter from "./Counter";
import { stats } from "@/lib/data";

export default function Mission() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="What we're about"
            title="Dedicated to changing perceptions."
            description="We strive to empower everyone we work with, but it is more than that. We want to change perceptions by showing that everyone can excel at something when we work together towards the same goals."
          />
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-4">
            <Button href="/about" variant="secondary">
              Our Story <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/sports" variant="outline">
              Explore Sports
            </Button>
          </Reveal>

          <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="border-l-4 border-teal pl-4">
                <dd className="font-heading text-5xl font-extrabold text-ink">
                  <Counter to={s.value} />
                  {s.suffix}
                </dd>
                <dt className="mt-1 text-sm font-medium uppercase tracking-wider text-ink-soft">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-ink/20"
          >
            <Image src="/images/medals.jpg" alt="Athlete celebrating with two gold medals" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute -bottom-8 -left-6 hidden w-56 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block lg:-left-12 lg:w-72"
          >
            <Image src="/images/powerlifting.jpg" alt="Athlete celebrating a lift" width={600} height={440} className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            className="absolute -right-4 -top-6 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-red text-center text-white shadow-xl lg:-right-8"
          >
            <span className="font-heading text-4xl font-extrabold leading-none">$0</span>
            <span className="px-3 text-[11px] font-semibold uppercase leading-tight tracking-wide">cost to athletes, ever</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

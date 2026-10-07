"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Medal, HandHeart, Users, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const cards = [
  {
    icon: Medal,
    title: "Become an athlete",
    text: "Anyone age 8 and up with an intellectual disability can compete. No experience needed, no cost ever.",
    href: "/get-involved#athletes",
    cta: "Register",
    color: "bg-teal",
  },
  {
    icon: HandHeart,
    title: "Volunteer or coach",
    text: "Keep score, run a water station, or lead a team for a season. We'll train you and you'll leave with a bigger family.",
    href: "/get-involved#volunteer",
    cta: "Sign up",
    color: "bg-ink",
  },
  {
    icon: Users,
    title: "Be a unified partner",
    text: "Play on the same team as our athletes in flag football, bowling, and more. Inclusion happens on the field.",
    href: "/get-involved#unified",
    cta: "Learn more",
    color: "bg-red",
  },
];

export default function GetInvolved() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="Get involved" title="There's a place for you here." description="Athletes, families, coaches, partners, and fans. It takes all of us." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={c.href} className="focus-ring group flex h-full flex-col rounded-3xl border border-mist-dark bg-mist p-8 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${c.color} text-white`}>
                  <c.icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="text-3xl font-extrabold uppercase text-ink">{c.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{c.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-teal">
                  {c.cta} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

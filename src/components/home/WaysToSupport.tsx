import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart, Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { fundraisers, site } from "@/lib/data";

export default function WaysToSupport() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Signature fundraisers" title="Show up, have fun, fund a season." description="We receive no state or national funding. Every uniform, every bus, and every entry fee comes from events like these." />
          <Link href="/donate#fundraisers" className="focus-ring group inline-flex w-fit items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-teal">
            All ways to give <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {fundraisers.map((f, i) => (
            <Reveal key={f.slug} delay={i * 0.08}>
              <Link href={f.href} className="focus-ring group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-ink text-white">
                <Image src={f.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover opacity-75 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{f.when}</p>
                  <h3 className="mt-1 text-3xl font-extrabold uppercase">{f.name}</h3>
                  <p className="mt-2 text-sm text-white/80">{f.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Heart, label: "Make a gift", desc: "One-time or monthly", href: "/donate", color: "bg-red" },
            { icon: Building2, label: "Sponsor the program", desc: "Packages from $500", href: "/donate#sponsor", color: "bg-teal" },
            { icon: ShoppingBag, label: site.shopUrl ? "Shop team gear" : "Team gear coming soon", desc: site.shopUrl ? "Every purchase supports an athlete" : "Merch store launching soon", href: site.shopUrl || "/contact", color: "bg-ink" },
          ].map((c, i) => (
            <Reveal key={c.label} delay={0.3 + i * 0.06}>
              <Link href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} className="focus-ring group flex items-center gap-4 rounded-2xl border border-mist-dark bg-mist p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${c.color}`}><c.icon className="h-6 w-6" /></span>
                <span>
                  <span className="block font-heading text-xl font-bold uppercase text-ink">{c.label}</span>
                  <span className="block text-sm text-ink-soft">{c.desc}</span>
                </span>
                <ArrowRight className="ml-auto h-5 w-5 text-ink-soft transition group-hover:translate-x-1 group-hover:text-teal" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

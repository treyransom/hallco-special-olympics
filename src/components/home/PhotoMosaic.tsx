"use client";

import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { gallery } from "@/lib/data";
import { useDict } from "@/lib/i18n";

const picks = ["/images/basketball-team.jpg", "/images/golf-group.jpg", "/images/holiday-dance.jpg", "/images/bus-trip.jpg", "/images/athletes-flags.jpg", "/images/unified-partner-award.jpg", "/images/team-polos.jpg"];
const rot = [-4, 3, -2, 5, -5, 2, -3];

export default function PhotoMosaic() {
  const d = useDict();
  const items = picks.map((src) => gallery.find((g) => g.src === src)!).filter(Boolean);
  return (
    <section className="bg-stripes relative overflow-hidden bg-mist py-16 sm:py-20">
      <div className="flex items-end justify-center gap-4 px-4 sm:gap-6">
        {items.map((g, i) => (
          <motion.div
            key={g.src}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rot[i] }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, type: "spring", bounce: 0.35 }}
            whileHover={{ rotate: 0, scale: 1.08, zIndex: 10 }}
            className={`shrink-0 overflow-hidden rounded-2xl border-[6px] border-white bg-white shadow-xl shadow-ink/15 ${i % 2 ? "w-40 sm:w-56" : "w-32 sm:w-48"} ${i > 4 ? "hidden md:block" : ""} ${i === 6 ? "hidden lg:block" : ""}`}
          >
            <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="14rem" className={`${i % 2 ? "aspect-[3/4]" : "aspect-square"} object-cover`} />
          </motion.div>
        ))}
      </div>
      <div className="container-x mt-10 text-center">
        <Link href="/gallery" className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-teal-deep">
          <Camera className="h-5 w-5 text-gold" /> {d.nav.gallery}
        </Link>
      </div>
    </section>
  );
}

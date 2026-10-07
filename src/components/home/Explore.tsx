"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useDict } from "@/lib/i18n";

export default function Explore() {
  const d = useDict();
  const n = d.nav;
  const tiles = [
    { href: "/schedule", label: n.schedule, desc: n.scheduleD, image: "/images/basketball-action.jpg", span: "sm:col-span-2 lg:col-span-2 lg:row-span-2", big: true },
    { href: "/stories", label: n.stories, desc: n.storiesD, image: "/images/unified-partner-award.jpg" },
    { href: "/teams", label: n.teams, desc: n.teamsD, image: "/images/coaches.jpg" },
    { href: "/results", label: n.results, desc: n.resultsD, image: "/images/medals.jpg" },
    { href: "/locations", label: n.locations, desc: n.locationsD, image: "/images/team-outside.jpg" },
    { href: "/athlete-of-the-month", label: n.aom, desc: n.aomD, image: "/images/powerlifting.jpg", span: "lg:col-span-2", wide: true },
    { href: "/volunteer", label: n.volunteerShifts, desc: n.volunteerShiftsD, image: "/images/lunch-delivery.jpg" },
    { href: "/season-fund", label: n.seasonFund, desc: n.seasonFundD, image: "/images/golf-group.jpg" },
    { href: "/sponsors", label: n.sponsors, desc: n.sponsorsD, image: "/images/golf-sponsors.jpg" },
    { href: "/news", label: n.news, desc: n.newsD, image: "/images/lunch-hospital.jpg" },
    { href: "/gallery", label: n.gallery, desc: n.galleryD, image: "/images/holiday-dance.jpg" },
    { href: "/newsletter", label: n.newsletter, desc: n.newsletterD, image: "/images/bus-trip.jpg" },
  ];
  return (
    <section className="bg-dots bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading align="center" eyebrow={d.explore.eyebrow} title={d.explore.title} description={d.explore.text} />
        <ul className="mt-14 grid auto-rows-[11rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal as="li" key={t.href} delay={(i % 4) * 0.06} className={t.span ?? ""}>
              <Link href={t.href} className="focus-ring group relative block h-full overflow-hidden rounded-3xl bg-ink text-white shadow-lg shadow-ink/10 transition hover:-translate-y-1 hover:shadow-2xl">
                <Image src={t.image} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <ArrowUpRight className="absolute right-4 top-4 h-6 w-6 text-white/70 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className={`font-extrabold uppercase leading-tight ${t.big ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{t.label}</h3>
                  <p className={`mt-1 text-white/75 ${t.big || t.wide ? "text-base" : "text-sm"}`}>{t.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

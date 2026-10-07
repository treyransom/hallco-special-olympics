"use client";

import PageHero from "@/components/ui/PageHero";
import Sponsors from "@/components/home/Sponsors";
import CTA from "@/components/home/CTA";
import { useDict } from "@/lib/i18n";

export default function SponsorsClient() {
  const d = useDict();
  return (
    <>
      <PageHero eyebrow={d.sponsorsWall.eyebrow} title={d.sponsorsWall.title} image="/images/golf-sponsors.jpg" description={d.sponsorsWall.text} />
      <Sponsors full />
      <CTA />
    </>
  );
}

"use client";

import PageHero from "@/components/ui/PageHero";
import Campaign from "@/components/home/Campaign";
import WaysToSupport from "@/components/home/WaysToSupport";
import SponsorAthlete from "@/components/home/SponsorAthlete";
import { campaign } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function SeasonFundClient() {
  const { lang, dict: d } = useLang();
  return (
    <>
      <PageHero curve="mist" eyebrow={d.nav.seasonFund} title={lang === "es" ? campaign.nameEs : campaign.name} image="/images/medals.jpg" description={lang === "es" ? campaign.blurbEs : campaign.blurb} />
      <Campaign />
      <SponsorAthlete />
      <WaysToSupport />
    </>
  );
}

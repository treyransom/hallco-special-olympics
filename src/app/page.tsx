import Hero from "@/components/home/Hero";
import Countdown from "@/components/home/Countdown";
import Mission from "@/components/home/Mission";
import ThisWeek from "@/components/home/ThisWeek";
import SportsGrid from "@/components/home/SportsGrid";
import GetInvolved from "@/components/home/GetInvolved";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Stories from "@/components/home/Stories";
import AthleteOfMonthPreview from "@/components/home/AthleteOfMonthPreview";
import ResultsPreview from "@/components/home/ResultsPreview";
import PracticeMap from "@/components/home/PracticeMap";
import Campaign from "@/components/home/Campaign";
import WaysToSupport from "@/components/home/WaysToSupport";
import NewsPreview from "@/components/home/NewsPreview";
import Gallery from "@/components/home/Gallery";
import Sponsors from "@/components/home/Sponsors";
import Newsletter from "@/components/home/Newsletter";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown />
      <Mission />
      <ThisWeek />
      <SportsGrid />
      <GetInvolved />
      <UpcomingEvents />
      <Stories />
      <AthleteOfMonthPreview />
      <ResultsPreview />
      <PracticeMap />
      <Campaign />
      <WaysToSupport />
      <NewsPreview />
      <Gallery />
      <Sponsors />
      <Newsletter />
      <CTA />
    </>
  );
}

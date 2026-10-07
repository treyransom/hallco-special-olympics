import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import SportsGrid from "@/components/home/SportsGrid";
import GetInvolved from "@/components/home/GetInvolved";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Stories from "@/components/home/Stories";
import PracticeMap from "@/components/home/PracticeMap";
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
      <Mission />
      <SportsGrid />
      <GetInvolved />
      <UpcomingEvents />
      <Stories />
      <PracticeMap />
      <WaysToSupport />
      <NewsPreview />
      <Gallery />
      <Sponsors />
      <Newsletter />
      <CTA />
    </>
  );
}

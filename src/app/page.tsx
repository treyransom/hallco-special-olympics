import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import SportsGrid from "@/components/home/SportsGrid";
import GetInvolved from "@/components/home/GetInvolved";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NewsPreview from "@/components/home/NewsPreview";
import Gallery from "@/components/home/Gallery";
import Sponsors from "@/components/home/Sponsors";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <SportsGrid />
      <GetInvolved />
      <UpcomingEvents />
      <NewsPreview />
      <Gallery />
      <Sponsors />
      <CTA />
    </>
  );
}

import Hero from "@/components/home/Hero";
import Countdown from "@/components/home/Countdown";
import Mission from "@/components/home/Mission";
import Ticker from "@/components/home/Ticker";
import SportsGrid from "@/components/home/SportsGrid";
import PhotoMosaic from "@/components/home/PhotoMosaic";
import GetInvolved from "@/components/home/GetInvolved";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import QuoteBand from "@/components/home/QuoteBand";
import Explore from "@/components/home/Explore";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown overlap />
      <Mission />
      <Ticker />
      <SportsGrid />
      <PhotoMosaic />
      <GetInvolved />
      <UpcomingEvents />
      <QuoteBand />
      <Explore />
      <CTA />
    </>
  );
}

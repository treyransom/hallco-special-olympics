import Hero from "@/components/home/Hero";
import Countdown from "@/components/home/Countdown";
import Deadlines from "@/components/home/Deadlines";
import Persona from "@/components/home/Persona";
import Mission from "@/components/home/Mission";
import Ticker from "@/components/home/Ticker";
import SportsGrid from "@/components/home/SportsGrid";
import PhotoMosaic from "@/components/home/PhotoMosaic";
import GetInvolved from "@/components/home/GetInvolved";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import QuoteBand from "@/components/home/QuoteBand";
import Explore from "@/components/home/Explore";
import CTA from "@/components/home/CTA";
import Curve from "@/components/ui/Curve";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown overlap />
      <Deadlines />
      <Curve from="mist" to="white" />
      <Persona />
      <Mission />
      <Ticker />
      <SportsGrid />
      <Curve from="ink" to="mist" />
      <PhotoMosaic />
      <GetInvolved />
      <Curve from="mist" to="teal" />
      <UpcomingEvents />
      <QuoteBand />
      <Curve from="ink" to="white" />
      <Explore />
      <CTA />
    </>
  );
}

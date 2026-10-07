import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Photos of Special Olympics Hall County athletes at practice, competition, and community events.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Our athletes in action." image="/images/medals.jpg" description="Game days, State Games trips, fundraisers, and the moments in between." />
      <GalleryClient />
    </>
  );
}

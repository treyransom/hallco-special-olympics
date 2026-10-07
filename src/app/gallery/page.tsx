import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = { title: "Photo Gallery", description: "Photos of Special Olympics Hall County athletes at practice, competition, and community events." };

export default function GalleryPage() {
  return <GalleryClient />;
}

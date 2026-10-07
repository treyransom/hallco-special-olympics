import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Special Olympics Hall County",
    short_name: "SO Hall County",
    description: "Practice schedules, events, and results for Special Olympics Hall County athletes and families.",
    start_url: "/schedule",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00958f",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

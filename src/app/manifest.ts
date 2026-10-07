import type { MetadataRoute } from "next";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Special Olympics Hall County",
    short_name: "SO Hall County",
    description: "Practice schedules, events, and results for Special Olympics Hall County athletes and families.",
    start_url: `${bp}/schedule`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00958f",
    icons: [
      { src: `${bp}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${bp}/icons/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${bp}/icons/icon-512-maskable.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

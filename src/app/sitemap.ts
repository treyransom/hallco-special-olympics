import type { MetadataRoute } from "next";
import { posts } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.specialolympicshallcounty.org";
  const pages = ["", "/about", "/sports", "/events", "/get-involved", "/news", "/donate", "/contact", "/faq", "/resources", "/gallery"];
  return [
    ...pages.map((p) => ({ url: base + p, lastModified: new Date(), changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...posts.map((p) => ({ url: `${base}/news/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}

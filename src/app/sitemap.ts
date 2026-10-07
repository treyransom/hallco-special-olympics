import type { MetadataRoute } from "next";
import { posts, sports, fundraisers, events, site } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/about", "/sports", "/events", "/get-involved", "/register", "/volunteer", "/news", "/donate", "/sponsor", "/contact", "/faq", "/resources", "/gallery", "/teams", "/results", "/athlete-of-the-month", "/competition-guide", "/schedule", "/locations", "/stories", "/newsletter", "/sponsors", "/season-fund", "/carpool", "/volunteer/hours", "/volunteer/checklists", "/coaches", "/wishlist", "/impact"];
  return [
    ...pages.map((p) => ({ url: base + p, lastModified: new Date(), changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...posts.map((p) => ({ url: `${base}/news/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
    ...sports.map((s) => ({ url: `${base}/teams/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 })),
    ...fundraisers.map((f) => ({ url: `${base}/fundraisers/${f.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}

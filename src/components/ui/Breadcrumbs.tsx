"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useDict } from "@/lib/i18n";

export default function Breadcrumbs({ current, light = true }: { current: string; light?: boolean }) {
  const d = useDict();
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const labels: Record<string, string> = {
    about: d.nav.about, sports: d.nav.sports, events: d.nav.events, "get-involved": d.nav.getInvolved, donate: d.nav.donate, contact: d.nav.contact, news: d.nav.news, teams: d.nav.teams, volunteer: d.nav.volunteerShifts, fundraisers: d.nav.fundraisers, sponsor: d.nav.sponsor, results: d.nav.results, gallery: d.nav.gallery, faq: d.nav.faq, resources: d.nav.resources, register: d.nav.register, schedule: d.nav.schedule, locations: d.nav.locations, stories: d.nav.stories, newsletter: d.nav.newsletter, sponsors: d.nav.sponsors, "season-fund": d.nav.seasonFund, carpool: d.nav.carpool, hours: d.nav.hours, checklists: d.nav.checklists, coaches: d.nav.coaches, wishlist: d.nav.wishlist, impact: d.nav.impact, "competition-guide": d.nav.guide, "athlete-of-the-month": d.nav.aom,
  };
  const crumbs = parts.slice(0, -1).map((p, i) => ({ href: "/" + parts.slice(0, i + 1).join("/"), label: labels[p] ?? p }));
  const tone = light ? "text-white/70 hover:text-white" : "text-ink-soft hover:text-teal";
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${light ? "text-white/60" : "text-ink-soft"}`}>
        <li><Link href="/" className={`focus-ring -m-2 inline-flex items-center gap-1 rounded p-2 ${tone}`}><Home className="h-4 w-4" /> <span className="sr-only">Home</span></Link></li>
        {crumbs.map((c) => (
          <li key={c.href} className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 opacity-60" /><Link href={c.href} className={`focus-ring -my-1 inline-block rounded py-1 ${tone}`}>{c.label}</Link></li>
        ))}
        <li className="flex items-center gap-1.5" aria-current="page"><ChevronRight className="h-3 w-3 opacity-60" /><span className={light ? "text-gold" : "text-teal"}>{current}</span></li>
      </ol>
    </nav>
  );
}

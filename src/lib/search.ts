import { events, faqs, fundraisers, loc, posts, resources, sports, type Lang } from "./data";
import type { Dict } from "./i18n";

export type IndexEntry = { type: "page" | "sport" | "event" | "faq" | "post" | "resource" | "team" | "fundraiser"; title: string; text: string; href: string };

export function buildIndex(lang: Lang, d: Dict): IndexEntry[] {
  const pages: IndexEntry[] = [
    { type: "page", title: d.nav.ourStory, text: d.about.text, href: "/about" },
    { type: "page", title: d.nav.leadership, text: d.about.teamX, href: "/about#team" },
    { type: "page", title: d.nav.sports, text: d.sports.pageText, href: "/sports" },
    { type: "page", title: d.nav.calendar, text: d.events.pageText, href: "/events" },
    { type: "page", title: d.nav.schedule, text: d.schedulePage.text, href: "/schedule" },
    { type: "page", title: d.nav.locations, text: d.locationsPage.text, href: "/locations" },
    { type: "page", title: d.nav.stories, text: d.storiesPage.text, href: "/stories" },
    { type: "page", title: d.nav.newsletter, text: d.newsletterPage.text, href: "/newsletter" },
    { type: "page", title: d.nav.sponsors, text: d.sponsorsWall.text, href: "/sponsors" },
    { type: "page", title: d.nav.seasonFund, text: d.campaign.give, href: "/season-fund" },
    { type: "page", title: d.nav.carpool, text: d.carpool.text, href: "/carpool" },
    { type: "page", title: d.nav.hours, text: d.hours.text, href: "/volunteer/hours" },
    { type: "page", title: d.nav.checklists, text: d.checklist.text, href: "/volunteer/checklists" },
    { type: "page", title: d.nav.coaches, text: d.coachesPage.text, href: "/coaches" },
    { type: "page", title: d.nav.wishlist, text: d.wishlistPage.text, href: "/wishlist" },
    { type: "page", title: d.nav.monthly, text: d.recurring.text, href: "/donate#monthly" },
    { type: "page", title: d.nav.matching, text: d.matching.text, href: "/donate#matching" },
    { type: "page", title: d.nav.impact, text: d.impact.text, href: "/impact" },
    { type: "page", title: d.nav.guide, text: d.guide.text, href: "/competition-guide" },
    { type: "page", title: d.nav.volunteerShifts, text: d.volunteerPage.text, href: "/volunteer" },
    { type: "page", title: d.nav.register, text: d.register.text, href: "/register" },
    { type: "page", title: d.nav.getInvolved, text: d.involved.pageText, href: "/get-involved" },
    { type: "page", title: d.nav.resources, text: d.resources.text, href: "/resources" },
    { type: "page", title: d.nav.donate, text: d.donate.text, href: "/donate" },
    { type: "page", title: d.nav.sponsor, text: d.donate.sponsorX, href: "/sponsor" },
    { type: "page", title: d.nav.sponsorAthlete, text: d.sponsorAthlete.text, href: "/donate#sponsor-an-athlete" },
    { type: "page", title: d.nav.results, text: d.results.pageText, href: "/results" },
    { type: "page", title: d.nav.aom, text: d.aom.pageText, href: "/athlete-of-the-month" },
    { type: "page", title: d.nav.gallery, text: d.gallery.text, href: "/gallery" },
    { type: "page", title: d.nav.contact, text: d.contact.text, href: "/contact" },
    { type: "page", title: d.nav.faq, text: d.faq.text, href: "/faq" },
    { type: "page", title: d.nav.teams, text: d.teams.pageText, href: "/teams" },
  ];
  return [
    ...pages,
    ...sports.map((s): IndexEntry => ({ type: "sport", title: loc(lang, s, "name"), text: `${d.common.seasons[s.season]} · ${loc(lang, s, "blurb")}`, href: `/sports#${s.slug}` })),
    ...sports.map((s): IndexEntry => ({ type: "team", title: `${loc(lang, s, "name")} — ${d.nav.teams}`, text: d.teams.pageText, href: `/teams/${s.slug}` })),
    ...events.map((e): IndexEntry => ({ type: "event", title: loc(lang, e, "title"), text: `${e.date} · ${e.location} · ${loc(lang, e, "description")}`, href: `/events#${e.slug}` })),
    ...faqs.map((f): IndexEntry => ({ type: "faq", title: loc(lang, f, "q"), text: loc(lang, f, "a"), href: "/faq" })),
    ...posts.map((p): IndexEntry => ({ type: "post", title: loc(lang, p, "title"), text: loc(lang, p, "excerpt"), href: `/news/${p.slug}` })),
    ...resources.map((r): IndexEntry => ({ type: "resource", title: loc(lang, r, "title"), text: loc(lang, r, "description"), href: r.href.startsWith("/") ? r.href : "/resources" })),
    ...fundraisers.map((f): IndexEntry => ({ type: "fundraiser", title: loc(lang, f, "name"), text: loc(lang, f, "blurb"), href: f.href })),
  ];
}

"use client";

import Link from "next/link";
import Image from "@/components/ui/SmartImage";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Heart, ChevronDown, Search, Globe, BookOpen, Quote, Users, Trophy, Star, Newspaper, Camera, HelpCircle, CalendarDays, Dumbbell, MapPin, Luggage, HandHeart, Ticket, UserPlus, Users2, Home, Car, Timer, ClipboardCheck, GraduationCap, FileText, HandCoins, Target, Building2, Award, Gift, Repeat, Percent, BarChart3, Mail, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import SearchModal from "./SearchModal";
import ThemeToggle from "./ThemeToggle";

type Item = { href: string; label: string; desc?: string; icon?: LucideIcon };
type Group = { label: string; href: string; items?: Item[]; featured?: { href: string; label: string; desc: string; image: string } };
const iconFor: Record<string, LucideIcon> = { "/about": BookOpen, "/stories": Quote, "/about#team": Users, "/teams": Trophy, "/athlete-of-the-month": Star, "/results": Award, "/news": Newspaper, "/gallery": Camera, "/faq": HelpCircle, "/events": CalendarDays, "/schedule": Dumbbell, "/locations": MapPin, "/competition-guide": Luggage, "/volunteer": HandHeart, "/donate#fundraisers": Ticket, "/register": UserPlus, "/get-involved#volunteer": HandHeart, "/get-involved#unified": Users2, "/get-involved#families": Home, "/carpool": Car, "/volunteer/hours": Timer, "/volunteer/checklists": ClipboardCheck, "/coaches": GraduationCap, "/resources": FileText, "/donate": HandCoins, "/season-fund": Target, "/sponsor": Building2, "/sponsors": Award, "/donate#sponsor-an-athlete": Star, "/donate#monthly": Repeat, "/wishlist": Gift, "/donate#matching": Percent, "/impact": BarChart3, "/newsletter": Mail };

export default function Navbar() {
  const { lang, setLang, dict: d } = useLang();
  const n = d.nav;

  const groups: Group[] = [
    {
      label: n.about,
      href: "/about",
      items: [
        { href: "/about", label: n.ourStory, desc: n.ourStoryD },
        { href: "/stories", label: n.stories, desc: n.storiesD },
        { href: "/about#team", label: n.leadership, desc: n.leadershipD },
        { href: "/teams", label: n.teams, desc: n.teamsD },
        { href: "/athlete-of-the-month", label: n.aom, desc: n.aomD },
        { href: "/results", label: n.results, desc: n.resultsD },
        { href: "/news", label: n.news, desc: n.newsD },
        { href: "/gallery", label: n.gallery, desc: n.galleryD },
        { href: "/faq", label: n.faq, desc: n.faqD },
      ],
      featured: { href: "/stories", label: n.stories, desc: n.storiesD, image: "/images/unified-partner-award.jpg" },
    },
    { label: n.sports, href: "/sports" },
    {
      label: n.events,
      href: "/events",
      items: [
        { href: "/events", label: n.calendar, desc: n.calendarD },
        { href: "/schedule", label: n.schedule, desc: n.scheduleD },
        { href: "/locations", label: n.locations, desc: n.locationsD },
        { href: "/competition-guide", label: n.guide, desc: n.guideD },
        { href: "/volunteer", label: n.volunteerShifts, desc: n.volunteerShiftsD },
        { href: "/donate#fundraisers", label: n.fundraiserEvents, desc: n.fundraiserEventsD },
      ],
      featured: { href: "/schedule", label: n.schedule, desc: n.scheduleD, image: "/images/basketball-action.jpg" },
    },
    {
      label: n.getInvolved,
      href: "/get-involved",
      items: [
        { href: "/register", label: n.register, desc: n.registerD },
        { href: "/get-involved#volunteer", label: n.volunteer, desc: n.volunteerD },
        { href: "/get-involved#unified", label: n.unified, desc: n.unifiedD },
        { href: "/get-involved#families", label: n.families, desc: n.familiesD },
        { href: "/carpool", label: n.carpool, desc: n.carpoolD },
        { href: "/volunteer/hours", label: n.hours, desc: n.hoursD },
        { href: "/volunteer/checklists", label: n.checklists, desc: n.checklistsD },
        { href: "/coaches", label: n.coaches, desc: n.coachesD },
        { href: "/resources", label: n.resources, desc: n.resourcesD },
      ],
      featured: { href: "/register", label: n.register, desc: n.registerD, image: "/images/basketball-team.jpg" },
    },
    {
      label: n.support,
      href: "/donate",
      items: [
        { href: "/donate", label: n.donate, desc: n.donateD },
        { href: "/season-fund", label: n.seasonFund, desc: n.seasonFundD },
        { href: "/sponsor", label: n.sponsor, desc: n.sponsorD },
        { href: "/sponsors", label: n.sponsors, desc: n.sponsorsD },
        { href: "/donate#sponsor-an-athlete", label: n.sponsorAthlete, desc: n.sponsorAthleteD },
        { href: "/donate#fundraisers", label: n.fundraisers, desc: n.fundraisersD },
        { href: "/donate#monthly", label: n.monthly, desc: n.monthlyD },
        { href: "/wishlist", label: n.wishlist, desc: n.wishlistD },
        { href: "/donate#matching", label: n.matching, desc: n.matchingD },
        { href: "/impact", label: n.impact, desc: n.impactD },
        { href: "/newsletter", label: n.newsletter, desc: n.newsletterD },
        ...(site.shopUrl ? [{ href: site.shopUrl, label: n.shop, desc: n.shopD }] : []),
      ],
    },
    { label: n.contact, href: "/contact" },
  ];

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<number | null>(null);
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setOpenGroup(null);
    setMobileGroup(null);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    const onSearch = (e: Event) => {
      setInitialQuery(String((e as CustomEvent).detail ?? ""));
      setSearchOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("sohc:search", onSearch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("sohc:search", onSearch);
    };
  }, []);

  const isActive = (g: Group) => {
    const paths = [g.href, ...(g.items?.map((i) => i.href.split("#")[0]) ?? [])];
    return paths.some((p) => p.startsWith("/") && (pathname === p || pathname.startsWith(p + "/")));
  };
  const show = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <header className={cn("sticky top-0 z-50 transition-all duration-300", scrolled ? "bg-white/95 shadow-md shadow-ink/5 backdrop-blur" : "bg-white")}>
      <div className="h-1.5 w-full bg-gradient-to-r from-teal via-teal to-red" />
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex shrink-0 items-center rounded" aria-label="Special Olympics Hall County">
          <Image src="/images/logo-horizontal.png" alt="Special Olympics Hall County" width={1254} height={220} priority className="h-10 w-auto sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {groups.map((g) => {
            const active = isActive(g);
            const isOpen = openGroup === g.label;
            return (
              <div key={g.label} className="relative" onMouseEnter={() => g.items && show(g.label)} onMouseLeave={() => g.items && hide()}>
                <Link
                  href={g.href}
                  aria-haspopup={g.items ? "menu" : undefined}
                  aria-expanded={g.items ? isOpen : undefined}
                  onFocus={() => g.items && show(g.label)}
                  className={cn("focus-ring relative inline-flex items-center gap-1 rounded-full px-3 py-2 font-heading text-lg font-semibold uppercase tracking-wide transition-colors", active ? "text-teal" : "text-ink hover:text-teal")}
                >
                  {g.label}
                  {g.items && <ChevronDown className={cn("h-4 w-4 transition", isOpen && "rotate-180")} aria-hidden />}
                  {active && <motion.span layoutId="nav-dot" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-red" />}
                </Link>
                <AnimatePresence>
                  {g.items && isOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
                      }}
                      className="absolute left-1/2 top-full z-50 mt-2 w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-3xl border border-mist-dark bg-white shadow-2xl shadow-ink/15"
                    >
                      <div className="grid sm:grid-cols-[1fr_15rem]">
                        <ul className="grid gap-0.5 p-3 sm:grid-cols-2">
                          {g.items.map((it) => {
                            const Icon = iconFor[it.href] ?? BookOpen;
                            return (
                              <li key={it.href}>
                                <Link
                                  href={it.href}
                                  role="menuitem"
                                  target={it.href.startsWith("http") ? "_blank" : undefined}
                                  rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  onClick={() => setOpenGroup(null)}
                                  className="focus-ring group/i flex items-start gap-3 rounded-2xl p-3 transition hover:bg-mist"
                                >
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-teal transition group-hover/i:bg-teal group-hover/i:text-white"><Icon className="h-4.5 w-4.5" /></span>
                                  <span className="min-w-0">
                                    <span className="block font-heading text-lg font-bold uppercase leading-tight text-ink">{it.label}</span>
                                    {it.desc && <span className="block text-xs text-ink-soft">{it.desc}</span>}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        {g.featured && (
                          <Link href={g.featured.href} onClick={() => setOpenGroup(null)} className="focus-ring group/f relative hidden min-h-[14rem] overflow-hidden bg-ink text-white sm:block">
                            <Image src={g.featured.image} alt="" fill sizes="15rem" className="object-cover opacity-60 transition duration-500 group-hover/f:scale-105" />
                            <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                            <span className="absolute inset-x-0 bottom-0 p-4">
                              <span className="block font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{d.explore.eyebrow}</span>
                              <span className="block text-2xl font-extrabold uppercase leading-tight">{g.featured.label}</span>
                              <span className="block text-xs text-white/75">{g.featured.desc}</span>
                            </span>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={n.search}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-mist"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            aria-label={n.langLabel}
            className="focus-ring inline-flex h-11 items-center gap-1.5 rounded-full px-3 font-heading text-base font-bold uppercase tracking-wide text-ink hover:bg-mist"
          >
            <Globe className="h-4 w-4 text-teal" aria-hidden />
            {lang === "en" ? "ES" : "EN"}
          </button>
          <Link
            href="/donate"
            className="focus-ring hidden items-center gap-2 rounded-full bg-red px-5 py-2.5 font-heading text-lg font-bold uppercase tracking-wide text-white shadow-lg shadow-red/25 transition hover:-translate-y-0.5 hover:bg-red-dark sm:inline-flex"
          >
            <Heart className="h-4 w-4 fill-current" aria-hidden />
            {n.donate}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-mist xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? n.closeMenu : n.openMenu}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto border-t border-mist-dark bg-white xl:hidden"
          >
            <ul className="container-x flex flex-col py-4">
              {groups.map((g, i) => (
                <motion.li key={g.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }} className="border-b border-mist">
                  {g.items ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileGroup((m) => (m === g.label ? null : g.label))}
                        aria-expanded={mobileGroup === g.label}
                        className="flex w-full items-center justify-between py-4 font-heading text-2xl font-bold uppercase text-ink"
                      >
                        {g.label}
                        <ChevronDown className={cn("h-5 w-5 transition", mobileGroup === g.label && "rotate-180")} />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileGroup === g.label && (
                          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-3">
                            {g.items.map((it) => (
                              <li key={it.href}>
                                <Link href={it.href} className="block py-2.5 pl-4 font-heading text-xl font-semibold uppercase text-ink-soft hover:text-teal">
                                  {it.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={g.href} className="block py-4 font-heading text-2xl font-bold uppercase text-ink hover:text-teal">
                      {g.label}
                    </Link>
                  )}
                </motion.li>
              ))}
              <li className="pt-4">
                <Link href="/donate" className="flex items-center justify-center gap-2 rounded-full bg-red px-5 py-4 font-heading text-xl font-bold uppercase text-white">
                  <Heart className="h-5 w-5 fill-current" aria-hidden /> {n.donate}
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => { setSearchOpen(false); setInitialQuery(""); }} initialQuery={initialQuery} />
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data";

type Item = { href: string; label: string; desc?: string };
type Group = { label: string; href: string; items?: Item[] };

const groups: Group[] = [
  {
    label: "About",
    href: "/about",
    items: [
      { href: "/about", label: "Our story", desc: "Mission, values, and the athlete oath" },
      { href: "/about#team", label: "Leadership", desc: "The volunteers who run the program" },
      { href: "/news", label: "News", desc: "Recaps and announcements" },
      { href: "/gallery", label: "Photo gallery", desc: "Our athletes in action" },
      { href: "/faq", label: "FAQ", desc: "Eligibility, cost, and how to join" },
    ],
  },
  { label: "Sports", href: "/sports" },
  { label: "Events", href: "/events" },
  {
    label: "Get Involved",
    href: "/get-involved",
    items: [
      { href: "/get-involved#athletes", label: "Become an athlete", desc: "Free for anyone 8+ with an intellectual disability" },
      { href: "/get-involved#volunteer", label: "Volunteer or coach", desc: "Day-of help or a full season" },
      { href: "/get-involved#unified", label: "Unified partners", desc: "Play on the same team" },
      { href: "/get-involved#families", label: "Families", desc: "What to expect as a parent or caregiver" },
      { href: "/resources", label: "Forms & resources", desc: "Registration, medical, and training links" },
    ],
  },
  {
    label: "Support",
    href: "/donate",
    items: [
      { href: "/donate", label: "Donate", desc: "Every dollar stays in Hall County" },
      { href: "/donate#sponsor", label: "Sponsor", desc: "Packages for local businesses" },
      { href: "/donate#fundraisers", label: "Fundraisers", desc: "Golf, Polar Plunge, and more" },
      ...(site.shopUrl ? [{ href: site.shopUrl, label: "Shop", desc: "Team gear and merch" }] : []),
    ],
  },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, g: Group) {
  const paths = [g.href, ...(g.items?.map((i) => i.href.split("#")[0]) ?? [])];
  return paths.some((p) => p.startsWith("/") && (pathname === p || pathname.startsWith(p + "/")));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const show = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 shadow-md shadow-ink/5 backdrop-blur" : "bg-white",
      )}
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-teal via-teal to-red" />
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" className="focus-ring flex shrink-0 items-center rounded" aria-label="Special Olympics Hall County home">
          <Image src="/images/logo.png" alt="Special Olympics Hall County" width={170} height={92} priority className="h-14 w-auto" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {groups.map((g) => {
            const active = isActive(pathname, g);
            const isOpen = openGroup === g.label;
            return (
              <div key={g.label} className="relative" onMouseEnter={() => g.items && show(g.label)} onMouseLeave={() => g.items && hide()}>
                <Link
                  href={g.href}
                  aria-haspopup={g.items ? "menu" : undefined}
                  aria-expanded={g.items ? isOpen : undefined}
                  onFocus={() => g.items && show(g.label)}
                  className={cn(
                    "focus-ring relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-heading text-lg font-semibold uppercase tracking-wide transition-colors",
                    active ? "text-teal" : "text-ink hover:text-teal",
                  )}
                >
                  {g.label}
                  {g.items && <ChevronDown className={cn("h-4 w-4 transition", isOpen && "rotate-180")} aria-hidden />}
                  {active && <motion.span layoutId="nav-dot" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-red" />}
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
                      className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-mist-dark bg-white p-2 shadow-2xl shadow-ink/15"
                    >
                      {g.items.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          role="menuitem"
                          target={it.href.startsWith("http") ? "_blank" : undefined}
                          rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={() => setOpenGroup(null)}
                          className="focus-ring block rounded-xl px-4 py-3 transition hover:bg-mist"
                        >
                          <span className="block font-heading text-lg font-bold uppercase text-ink">{it.label}</span>
                          {it.desc && <span className="block text-sm text-ink-soft">{it.desc}</span>}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="focus-ring hidden items-center gap-2 rounded-full bg-red px-5 py-2.5 font-heading text-lg font-bold uppercase tracking-wide text-white shadow-lg shadow-red/25 transition hover:-translate-y-0.5 hover:bg-red-dark sm:inline-flex"
          >
            <Heart className="h-4 w-4 fill-current" aria-hidden />
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
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
            className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto border-t border-mist-dark bg-white lg:hidden"
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
                  <Heart className="h-5 w-5 fill-current" aria-hidden /> Donate
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/sports", label: "Sports" },
  { href: "/events", label: "Events" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "focus-ring relative rounded-full px-4 py-2 font-heading text-lg font-semibold uppercase tracking-wide transition-colors",
                  active ? "text-teal" : "text-ink hover:text-teal",
                )}
              >
                {l.label}
                {active && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-red" />}
              </Link>
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
            className="overflow-hidden border-t border-mist-dark bg-white lg:hidden"
          >
            <ul className="container-x flex flex-col py-4">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link
                    href={l.href}
                    className="block border-b border-mist py-4 font-heading text-2xl font-bold uppercase text-ink hover:text-teal"
                  >
                    {l.label}
                  </Link>
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

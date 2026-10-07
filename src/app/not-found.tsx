"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useDict } from "@/lib/i18n";

export default function NotFound() {
  const d = useDict();
  const [q, setQ] = useState("");
  const popular = [
    { href: "/schedule", label: d.nav.schedule },
    { href: "/events", label: d.nav.calendar },
    { href: "/register", label: d.nav.register },
    { href: "/volunteer", label: d.nav.volunteerShifts },
    { href: "/donate", label: d.nav.donate },
    { href: "/contact", label: d.nav.contact },
  ];
  return (
    <section className="bg-dots container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-outline font-heading text-[8rem] font-extrabold leading-none text-ink/20">404</p>
      <h1 className="-mt-6 text-5xl font-extrabold uppercase text-ink sm:text-7xl">{d.notFound.title}</h1>
      <p className="mt-4 max-w-md text-ink-soft">{d.notFound.text}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("sohc:search", { detail: q }));
        }}
        className="relative mt-8 w-full max-w-md"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={d.search.placeholder} className="focus-ring w-full rounded-full border border-mist-dark bg-white py-3.5 pl-12 pr-4 text-ink" aria-label={d.nav.search} />
      </form>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {popular.map((p) => (
          <li key={p.href}><Link href={p.href} className="focus-ring inline-flex items-center gap-1 rounded-full bg-mist px-4 py-2 font-heading text-base font-bold uppercase text-ink hover:bg-teal hover:text-white">{p.label} <ArrowRight className="h-3.5 w-3.5" /></Link></li>
        ))}
      </ul>
      <Button href="/" variant="secondary" className="mt-8">{d.common.backHome}</Button>
    </section>
  );
}

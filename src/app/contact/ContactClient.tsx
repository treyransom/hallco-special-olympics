"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import ContactForm from "./ContactForm";
import { site, team } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function ContactClient() {
  const { lang, dict: d } = useLang();
  const c = d.contact;
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} image="/images/dance-partners.jpg" description={c.text} />
      <section className="bg-dots bg-white py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-10">
            <Reveal>
              <h2 className="text-4xl font-extrabold uppercase text-ink">{c.reach}</h2>
              <ul className="mt-6 space-y-4 text-ink-soft">
                <li className="flex gap-4"><Mail className="mt-1 h-5 w-5 shrink-0 text-teal" /><a href={`mailto:${site.email}`} className="hover:text-teal">{site.email}</a></li>
                <li className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-teal" /><a href={`tel:${site.phone.replace(/\D/g, "")}`} className="hover:text-teal">{site.phone}</a></li>
                <li className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-teal" /><span>{site.address.line1}<br />{site.address.city}, {site.address.state} {site.address.zip}</span></li>
                <li className="flex gap-4"><FacebookIcon className="mt-1 h-5 w-5 shrink-0 text-teal" /><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-teal">{c.onFb}</a></li>
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl font-extrabold uppercase text-ink">{c.who}</h2>
              <ul className="mt-6 divide-y divide-mist-dark">
                {team.map((m) => (
                  <li key={m.name} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div>
                      <p className="font-heading text-xl font-bold uppercase text-ink">{m.name}</p>
                      <p className="text-sm text-teal">{lang === "es" && m.roleEs ? m.roleEs : m.role}</p>
                    </div>
                    {m.email && <a href={`mailto:${m.email}`} className="text-sm text-ink-soft hover:text-teal">{m.email}</a>}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}

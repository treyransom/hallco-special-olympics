import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { site, sports } from "@/lib/data";
import Newsletter from "@/components/home/Newsletter";

const quick = [
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Event Calendar" },
  { href: "/get-involved#athletes", label: "Become an Athlete" },
  { href: "/get-involved#volunteer", label: "Volunteer" },
  { href: "/resources", label: "Forms & Resources" },
  { href: "/faq", label: "FAQ" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/news", label: "News & Updates" },
  { href: "/donate", label: "Donate" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="h-1.5 w-full bg-gradient-to-r from-red via-teal to-teal" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Image src="/images/logo-horizontal.png" alt="Special Olympics Hall County" width={1254} height={220} className="h-14 w-auto rounded-xl bg-white px-4 py-3" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
          <div className="mt-5 flex gap-3">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="focus-ring rounded-full bg-white/10 p-2.5 transition hover:bg-teal">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="focus-ring rounded-full bg-white/10 p-2.5 transition hover:bg-teal">
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-gold">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quick.map((q) => (
              <li key={q.href}>
                <Link href={q.href} className="text-white/75 transition hover:text-white">{q.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-gold">Our Sports</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sports.map((s) => (
              <li key={s.slug}>
                <Link href={`/sports#${s.slug}`} className="text-white/75 transition hover:text-white">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-gold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-light" /><span>{site.address.line1}<br />{site.address.city}, {site.address.state} {site.address.zip}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-light" /><a href={`tel:${site.phone.replace(/\D/g, "")}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-light" /><a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a></li>
          </ul>
          <p className="mt-6 text-xs text-white/50">
            An accredited local program of{" "}
            <a href={site.parentOrg.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{site.parentOrg.name}</a>.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-heading text-xl font-bold uppercase tracking-wide text-gold">Newsletter</p>
            <p className="text-sm text-white/70">Season updates, once or twice a month.</p>
          </div>
          <Newsletter compact />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Created by the Joseph P. Kennedy Jr. Foundation for the benefit of persons with intellectual disabilities.</p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Bus, Shirt, Medal, ClipboardList, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { givingLevels, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Donate",
  description: "Every donation to Special Olympics Hall County goes to athlete transportation, uniforms, housing, equipment, and registration fees.",
};

const uses = [
  { icon: Bus, label: "Transportation & lodging" },
  { icon: Shirt, label: "Uniforms" },
  { icon: Medal, label: "Equipment" },
  { icon: ClipboardList, label: "Registration fees" },
];

const tiers = [
  { name: "Bronze", amount: "$500", perks: ["Logo on event banner", "Social media thank-you"] },
  { name: "Silver", amount: "$1,000", perks: ["Everything in Bronze", "Logo on team shirts", "Website listing"] },
  { name: "Gold", amount: "$2,500", perks: ["Everything in Silver", "Golf tournament foursome", "Named sponsor of a season"] },
];

export default function DonatePage() {
  return (
    <>
      <PageHero eyebrow="Donate" title="Fuel an athlete's season." image="/images/powerlifting.jpg" description="Every donation we receive goes directly to helping our athletes with transportation, uniforms, housing, equipment, and registration fees for all our events." />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading eyebrow="Give once or monthly" title="Pick an amount." description="Athletes never pay to participate. Your gift is what makes that possible." />
            <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2">
              {givingLevels.map((g) => (
                <a
                  key={g.amount}
                  href={site.donateUrl}
                  className="focus-ring group rounded-3xl border-2 border-mist-dark p-6 transition hover:-translate-y-1 hover:border-teal hover:shadow-xl hover:shadow-teal/10"
                >
                  <p className="font-heading text-5xl font-extrabold text-teal">${g.amount}</p>
                  <p className="mt-2 text-sm text-ink-soft">{g.label}</p>
                </a>
              ))}
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={site.donateUrl} size="lg">
                <Heart className="h-5 w-5 fill-current" /> Donate any amount
              </Button>
              <p className="text-sm text-ink-soft">Secure online giving. Tax-deductible to the extent allowed by law.</p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/images/bus-trip.jpg" alt="Athletes on the bus to State Games" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover object-top" />
            </div>
            <div className="rounded-3xl bg-mist p-7">
              <h3 className="text-2xl font-extrabold uppercase text-ink">Where your money goes</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {uses.map((u) => (
                  <li key={u.label} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-semibold text-ink">
                    <u.icon className="h-5 w-5 shrink-0 text-teal" /> {u.label}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-soft">100% of your gift stays in Hall County. Our leadership team is entirely volunteer.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="sponsor" className="scroll-mt-20 bg-mist py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Businesses" title="Sponsor a season." description="Put your name in front of hundreds of Hall County families while funding something that matters. Custom packages available." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className={`rounded-3xl p-8 ${i === 2 ? "bg-ink text-white" : "bg-white text-ink"}`}>
                <p className={`font-heading text-sm font-bold uppercase tracking-[0.2em] ${i === 2 ? "text-gold" : "text-red"}`}>{t.name}</p>
                <p className="mt-2 font-heading text-5xl font-extrabold">{t.amount}</p>
                <ul className={`mt-6 space-y-2 text-sm ${i === 2 ? "text-white/80" : "text-ink-soft"}`}>
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-2"><span className="text-teal-light">✓</span>{p}</li>
                  ))}
                </ul>
                <Button href="/contact" variant={i === 2 ? "white" : "secondary"} className="mt-8 w-full">Become a {t.name} sponsor</Button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-mist-dark p-8">
            <h3 className="text-2xl font-extrabold uppercase text-ink">Give in honor or memory</h3>
            <p className="mt-3 text-ink-soft">
              Giving in someone's honor? Add their name on the second line of your billing address at checkout, or email us the details and we'll send an acknowledgment.
            </p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-flex items-center gap-2 font-semibold text-teal hover:underline">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-mist-dark p-8">
            <h3 className="text-2xl font-extrabold uppercase text-ink">Mail a check</h3>
            <p className="mt-3 text-ink-soft">Make checks payable to <strong>Special Olympics Hall County</strong> and mail to:</p>
            <address className="mt-3 not-italic text-ink">
              {site.address.line1}<br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>
          </Reveal>
        </div>
      </section>
    </>
  );
}

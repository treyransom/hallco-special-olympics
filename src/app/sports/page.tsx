import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import SportIcon from "@/components/ui/SportIcon";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { sports } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sports",
  description: "Basketball, bowling, athletics, swimming, bocce, flag football, and softball. See the season schedule for Special Olympics Hall County.",
};

const seasons = ["Winter", "Spring", "Summer", "Fall"] as const;

export default function SportsPage() {
  return (
    <>
      <PageHero eyebrow="Our sports" title="Seven sports. Four seasons. One team." image="/images/basketball-action.jpg" description="Practices are run by trained volunteer coaches and lead up to area and state competitions with Special Olympics Georgia." />

      <section className="bg-white py-16">
        <div className="container-x">
          <Reveal className="grid gap-3 sm:grid-cols-4">
            {seasons.map((s) => (
              <div key={s} className="rounded-2xl border border-mist-dark bg-mist p-5">
                <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{s}</p>
                <ul className="mt-2 space-y-1">
                  {sports.filter((x) => x.season === s).map((x) => (
                    <li key={x.slug}>
                      <a href={`#${x.slug}`} className="font-heading text-2xl font-bold uppercase text-ink hover:text-teal">{x.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-24 sm:py-32">
        <div className="container-x space-y-20">
          {sports.map((s, i) => (
            <article key={s.slug} id={s.slug} className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2">
              <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-ink/10 ${i % 2 ? "lg:order-2" : ""}`}>
                <Image src={s.image} alt={s.name} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                <div className="absolute left-5 top-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white shadow-lg">
                  <SportIcon icon={s.icon} className="h-7 w-7" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">
                  <span className="h-0.5 w-8 bg-red" /> {s.season} season
                </p>
                <h2 className="mt-3 text-5xl font-extrabold uppercase text-ink sm:text-6xl">{s.name}</h2>
                <p className="mt-4 text-lg text-ink-soft">{s.blurb}</p>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft"><CalendarDays className="h-4 w-4 text-teal" /> Practice window</dt>
                    <dd className="mt-1 font-heading text-2xl font-bold text-ink">{s.months}</dd>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-soft">Practice location</dt>
                    <dd className="mt-1 font-heading text-2xl font-bold text-ink">TBA</dd>
                  </div>
                </dl>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/get-involved#athletes" variant="secondary">Join this sport</Button>
                  <Button href="/get-involved#volunteer" variant="outline">Coach this sport</Button>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Don't see your sport?" title="Tell us what you'd like to play." description="We add sports when there are enough interested athletes and a coach willing to lead. Let us know." />
          <Reveal className="mt-8 text-center">
            <Button href="/contact">Contact us</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

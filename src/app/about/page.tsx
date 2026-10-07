import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CTA from "@/components/home/CTA";
import { team, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Special Olympics Hall County, our mission, our history, and the volunteer leadership team behind the program.",
};

const values = [
  { title: "Every athlete, every ability", text: "Divisioning means athletes compete against others of similar ability. Everyone gets a real shot at the podium." },
  { title: "Free. Always.", text: "Athletes never pay for training, uniforms, registration, or travel. Our community covers it." },
  { title: "More than sports", text: "Confidence, friendships, health, and joy. The medal is just the start." },
  { title: "Unified", text: "Athletes with and without intellectual disabilities train and compete on the same teams." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Changing perceptions, one game at a time." image="/images/team-polos.jpg" description="Special Olympics Hall County is a volunteer-led local program of Special Olympics Georgia serving athletes across Hall County." />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Our mission"
            title="Year-round sports training and competition."
            description="We provide year-round sports training and athletic competition in a variety of Olympic-type sports for children and adults with intellectual disabilities. This gives them continuing opportunities to develop physical fitness, demonstrate courage, experience joy, and share gifts, skills, and friendship with their families, other Special Olympics athletes, and the community."
          />
          <Reveal delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-ink/15">
            <Image src="/images/athletes-flags.jpg" alt="Athletes posing in front of Special Olympics flags" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="What we believe" title="The values behind the program." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="rounded-3xl border-t-4 border-teal bg-white p-7 shadow-sm">
                <h3 className="text-2xl font-extrabold uppercase text-ink">{v.title}</h3>
                <p className="mt-3 text-ink-soft">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-x text-center">
          <Reveal>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">The athlete oath</p>
            <blockquote className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-extrabold uppercase sm:text-6xl lg:text-7xl">
              “Let me win. But if I cannot win, <span className="text-teal-light">let me be brave</span> in the attempt.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section id="team" className="bg-white py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Leadership" title="The volunteers who run it." description="Every person on this list is an unpaid volunteer. Reach out to any of us with questions." />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 0.06} className="flex items-center gap-5 rounded-2xl border border-mist-dark bg-mist p-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal font-heading text-2xl font-bold text-white">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-extrabold uppercase text-ink">{m.name}</h3>
                  <p className="text-sm font-semibold text-teal">{m.role}</p>
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="mt-1 inline-flex items-center gap-1.5 truncate text-sm text-ink-soft hover:text-teal">
                      <Mail className="h-3.5 w-3.5 shrink-0" /> {m.email}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12 rounded-3xl bg-teal-deep p-8 text-white sm:flex sm:items-center sm:justify-between sm:p-10">
            <div>
              <h3 className="text-3xl font-extrabold uppercase">Part of something bigger</h3>
              <p className="mt-2 max-w-xl text-white/80">We are an accredited local program of {site.parentOrg.name}, which serves more than 26,000 athletes across the state.</p>
            </div>
            <Button href={site.parentOrg.url} external variant="white" className="mt-6 sm:mt-0">Visit Special Olympics Georgia</Button>
          </Reveal>
        </div>
      </section>
      <CTA />
    </>
  );
}

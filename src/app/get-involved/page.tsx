import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Become an athlete, volunteer, coach, or unified partner with Special Olympics Hall County.",
};

const coord = (role: string) => team.find((t) => t.role.includes(role));

const roles = [
  {
    id: "athletes",
    eyebrow: "Athletes",
    title: "Join as an athlete",
    image: "/images/basketball-team.jpg",
    text: "Anyone age 8 or older with an intellectual disability is eligible. There is no cost, no experience required, and no tryouts to make the team.",
    steps: [
      "Complete the Special Olympics Georgia athlete registration form (medical form included).",
      "Have a physician sign the medical section. We can help you find a free screening.",
      "Email the completed form to our Local Coordinator and we'll match you to a sport.",
    ],
    contact: coord("Local Coordinator"),
    cta: { label: "Download registration form", href: "https://www.specialolympicsga.org/", external: true },
  },
  {
    id: "volunteer",
    eyebrow: "Volunteers & coaches",
    title: "Volunteer or coach",
    image: "/images/coaches.jpg",
    text: "Day-of-event volunteers help with scoring, awards, water, and cheering. Coaches commit to one season and get free Special Olympics certification.",
    steps: [
      "Fill out the Class A volunteer form and complete a quick background check (required for coaches).",
      "Finish the free online Protective Behaviors and Concussion courses.",
      "Pick a sport or an event and show up. We'll take it from there.",
    ],
    contact: coord("Volunteer Coordinator"),
    cta: { label: "Volunteer application", href: "https://www.specialolympicsga.org/", external: true },
  },
  {
    id: "unified",
    eyebrow: "Unified partners",
    title: "Become a unified partner",
    image: "/images/unified-partner-award.jpg",
    text: "Unified Sports puts athletes with and without intellectual disabilities on the same team. Partners of similar age and ability train and compete together.",
    steps: [
      "Register as a volunteer (same form as above).",
      "Join a unified team in flag football, bowling, bocce, or softball.",
      "Compete at area and state games alongside your teammates.",
    ],
    contact: coord("Coach Coordinator"),
    cta: { label: "Ask about unified teams", href: "/contact" },
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero eyebrow="Get involved" title="There's a spot for you on this team." image="/images/team-outside.jpg" description="Whether you want to compete, coach, cheer, or give, here's how to start." />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-x space-y-28">
          {roles.map((r, i) => (
            <article key={r.id} id={r.id} className="scroll-mt-28 grid items-center gap-12 lg:grid-cols-2">
              <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-ink/15 ${i % 2 ? "lg:order-2" : ""}`}>
                <Image src={r.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </Reveal>
              <div>
                <SectionHeading eyebrow={r.eyebrow} title={r.title} description={r.text} />
                <Reveal delay={0.1}>
                  <ol className="mt-8 space-y-4">
                    {r.steps.map((s, n) => (
                      <li key={s} className="flex gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal font-heading text-lg font-bold text-white">{n + 1}</span>
                        <p className="pt-1.5 text-ink-soft">{s}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button href={r.cta.href} external={r.cta.external} variant="secondary">{r.cta.label}</Button>
                    {r.contact?.email && (
                      <a href={`mailto:${r.contact.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-teal">
                        <Mail className="h-4 w-4" /> {r.contact.name}, {r.contact.role}
                      </a>
                    )}
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-teal-deep py-24 text-white sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading light eyebrow="Families" title="Parents and caregivers, we've got you." description="You know your athlete best. We'll keep you in the loop on practices, travel, and what to pack, and we'll never ask you to pay a dime." />
          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {[
                "Practice and competition schedules sent by email and Facebook",
                "Chaperoned travel and lodging for State Games",
                "Family representative on the leadership team",
                "Social events like the holiday dance and end-of-season banquet",
              ].map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-white/10 p-4">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-gold" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

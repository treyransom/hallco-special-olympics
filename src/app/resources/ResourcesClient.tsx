"use client";

import { FileText, ExternalLink, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { resources, site, team, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const groupsOrder = ["Athletes", "Volunteers & Coaches", "Families", "Policies"] as const;
const groupColor: Record<string, string> = { Athletes: "bg-teal text-white", "Volunteers & Coaches": "bg-gold text-ink", Families: "bg-red text-white", Policies: "bg-ink text-white" };

export default function ResourcesClient() {
  const { lang, dict: d } = useLang();
  const coordinator = team.find((t) => t.role === "Local Coordinator");
  return (
    <>
      <PageHero eyebrow={d.resources.eyebrow} title={d.resources.title} image="/images/team-bleachers.jpg" description={d.resources.text} />
      <section className="bg-dots bg-white py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mb-14 flex flex-col gap-4 rounded-3xl bg-mist p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">{d.resources.where}</p>
              <p className="mt-1 text-lg text-ink">{d.resources.emailTo} <strong>{coordinator?.name}</strong>, {d.resources.coordinator}.</p>
            </div>
            <Button href={`mailto:${coordinator?.email ?? site.email}`} variant="secondary">{coordinator?.email ?? site.email}</Button>
          </Reveal>
          <div className="space-y-16">
            {groupsOrder.map((g) => (
              <div key={g}>
                <SectionHeading title={d.resources.groups[g]} className="max-w-none" />
                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                  {resources.filter((r) => r.group === g).map((r, i) => {
                    const external = r.href.startsWith("http");
                    return (
                      <Reveal as="li" key={r.title} delay={i * 0.05}>
                        <a href={r.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="focus-ring group flex h-full gap-4 rounded-2xl border border-mist-dark bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal hover:shadow-xl hover:shadow-teal/10">
                          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow ${groupColor[g]}`}><FileText className="h-6 w-6" /></span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2 font-heading text-xl font-bold uppercase text-ink group-hover:text-teal">{loc(lang, r, "title")}{external ? <ExternalLink className="h-4 w-4 shrink-0 text-ink-soft" /> : <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft" />}</span>
                            <span className="block text-sm text-ink-soft">{loc(lang, r, "description")}</span>
                          </span>
                        </a>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

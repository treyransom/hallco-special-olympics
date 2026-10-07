import type { Metadata } from "next";
import { FileText, ExternalLink, Download } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { resources, site, team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Forms & Resources",
  description: "Athlete registration, medical forms, volunteer applications, coach training, and family resources for Special Olympics Hall County.",
};

const groupsOrder = ["Athletes", "Volunteers & Coaches", "Families", "Policies"] as const;

export default function ResourcesPage() {
  const coordinator = team.find((t) => t.role === "Local Coordinator");
  return (
    <>
      <PageHero eyebrow="Forms & resources" title="Everything you need to get started." image="/images/team-bleachers.jpg" description="Registration forms, training links, and checklists in one place. Completed forms go to our Local Coordinator." />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mb-14 flex flex-col gap-4 rounded-3xl bg-mist p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">Where to send forms</p>
              <p className="mt-1 text-lg text-ink">
                Email completed forms to <strong>{coordinator?.name}</strong>, Local Coordinator.
              </p>
            </div>
            <Button href={`mailto:${coordinator?.email ?? site.email}`} variant="secondary">{coordinator?.email ?? site.email}</Button>
          </Reveal>

          <div className="space-y-16">
            {groupsOrder.map((g) => (
              <div key={g}>
                <SectionHeading title={g} className="max-w-none" />
                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                  {resources.filter((r) => r.group === g).map((r, i) => {
                    const external = r.href.startsWith("http");
                    return (
                      <Reveal as="li" key={r.title} delay={i * 0.05}>
                        <a
                          href={r.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="focus-ring group flex h-full gap-4 rounded-2xl border border-mist-dark p-5 transition hover:-translate-y-0.5 hover:border-teal hover:shadow-lg hover:shadow-teal/10"
                        >
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal text-white"><FileText className="h-6 w-6" /></span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2 font-heading text-xl font-bold uppercase text-ink group-hover:text-teal">
                              {r.title}
                              {external ? <ExternalLink className="h-4 w-4 shrink-0 text-ink-soft" /> : <Download className="h-4 w-4 shrink-0 text-ink-soft" />}
                            </span>
                            <span className="block text-sm text-ink-soft">{r.description}</span>
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

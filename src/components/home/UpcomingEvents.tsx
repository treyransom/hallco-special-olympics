import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { events, formatDate } from "@/lib/data";

const typeColor: Record<string, string> = {
  Competition: "bg-teal text-white",
  Practice: "bg-gold text-ink",
  Fundraiser: "bg-red text-white",
  Community: "bg-ink text-white",
};

export default function UpcomingEvents() {
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  return (
    <section className="relative bg-teal-deep py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading light eyebrow="Mark your calendar" title="Upcoming events." />
          <Button href="/events" variant="white">
            Full calendar <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {upcoming.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={i * 0.06}>
              <Link href={`/events#${e.slug}`} className="focus-ring group grid gap-4 py-6 transition hover:bg-white/5 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:px-4">
                <div className="flex items-baseline gap-2 sm:flex-col sm:gap-0">
                  <span className="font-heading text-5xl font-extrabold leading-none text-gold">{formatDate(e.date, { day: "numeric" })}</span>
                  <span className="font-heading text-xl font-bold uppercase tracking-wide">{formatDate(e.date, { month: "short" })}</span>
                </div>
                <div>
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${typeColor[e.type]}`}>{e.type}</span>
                  <h3 className="mt-2 text-3xl font-extrabold uppercase group-hover:text-gold">{e.title}</h3>
                  <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/70">
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{e.time}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{e.location}</span>
                  </p>
                </div>
                <ArrowRight className="hidden h-6 w-6 text-white/40 transition group-hover:translate-x-1 group-hover:text-gold sm:block" />
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { locations, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function PracticeMap() {
  const [active, setActive] = useState(0);
  const loc = locations[active];
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&z=13&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.mapQuery)}`;

  return (
    <section id="locations" className="bg-mist py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Where we practice" title="Around Hall County." description={`Practices happen at gyms, pools, fields, and lanes across ${site.address.city} and Hall County. Pick a venue to see it on the map.`} />
        <div className="mt-12 grid gap-6 lg:grid-cols-[22rem_1fr]">
          <Reveal>
            <ul className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Practice locations">
              {locations.map((l, i) => (
                <li key={l.name} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={cn(
                      "focus-ring w-64 rounded-2xl border p-4 text-left transition lg:w-full",
                      i === active ? "border-teal bg-white shadow-lg shadow-teal/10" : "border-transparent bg-white/60 hover:bg-white",
                    )}
                  >
                    <span className="flex items-start gap-3">
                      <MapPin className={cn("mt-0.5 h-5 w-5 shrink-0", i === active ? "text-red" : "text-teal")} />
                      <span>
                        <span className="block font-heading text-xl font-bold uppercase leading-tight text-ink">{l.name}</span>
                        <span className="block text-xs text-ink-soft">{l.address}</span>
                        <span className="mt-1.5 flex flex-wrap gap-1">
                          {l.sports.map((s) => (
                            <span key={s} className="rounded-full bg-mist px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-teal-dark">{s}</span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-ink/10">
            <iframe
              key={embed}
              title={`Map of ${loc.name}`}
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full border-0 lg:aspect-auto lg:h-full lg:min-h-[28rem]"
            />
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-teal-deep"
            >
              <Navigation className="h-4 w-4" /> Directions
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

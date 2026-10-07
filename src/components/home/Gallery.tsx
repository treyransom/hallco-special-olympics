import Image from "next/image";
import { gallery } from "@/lib/data";

export default function Gallery() {
  const items = [...gallery, ...gallery];
  return (
    <section className="overflow-hidden bg-mist py-16" aria-label="Photo gallery">
      <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
        {items.map((g, i) => (
          <div key={i} className="relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl sm:h-72 sm:w-[26rem]">
            <Image src={g.src} alt={i < gallery.length ? g.alt : ""} fill sizes="26rem" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

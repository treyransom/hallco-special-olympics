import Image from "next/image";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 text-white sm:py-36">
      <Image src="/images/bus-trip.jpg" alt="" fill sizes="100vw" className="object-cover object-top opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-deep/90 via-ink/80 to-red/40" />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">Every dollar stays local</p>
          <h2 className="mx-auto max-w-4xl text-balance text-5xl font-extrabold uppercase sm:text-6xl lg:text-7xl">
            Your gift pays for uniforms, travel, and the chance to compete.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Our athletes never pay to participate. That is only possible because of neighbors like you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/donate" size="lg">
              <Heart className="h-5 w-5 fill-current" /> Donate today
            </Button>
            <Button href="/donate#sponsor" size="lg" variant="ghost">
              Sponsor an event
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

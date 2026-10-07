import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { sponsors } from "@/lib/data";

export default function Sponsors() {
  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-ink-soft">Thank you to our community partners</p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sponsors.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 0.05} className="flex h-20 items-center justify-center rounded-2xl border border-mist-dark bg-mist px-4 text-center font-heading text-lg font-bold uppercase leading-tight text-ink-soft">
              {s}
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-8 text-center text-sm text-ink-soft">
          Want your business here?{" "}
          <Link href="/donate#sponsor" className="font-semibold text-teal underline-offset-4 hover:underline">Become a sponsor</Link>
        </Reveal>
      </div>
    </section>
  );
}

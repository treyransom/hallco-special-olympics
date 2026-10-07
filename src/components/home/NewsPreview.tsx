import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { posts, formatDate } from "@/lib/data";

export default function NewsPreview() {
  const [featured, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="News & updates" title="From the sidelines." />
          <Link href="/news" className="focus-ring group inline-flex w-fit items-center gap-2 font-heading text-lg font-bold uppercase tracking-wide text-teal">
            All news <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Link href={`/news/${featured.slug}`} className="focus-ring group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                <Image src={featured.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-red">{formatDate(featured.date)}</p>
              <h3 className="mt-2 text-4xl font-extrabold uppercase text-ink group-hover:text-teal">{featured.title}</h3>
              <p className="mt-3 text-ink-soft">{featured.excerpt}</p>
            </Link>
          </Reveal>
          <div className="flex flex-col gap-6">
            {rest.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={0.1 + i * 0.1}>
                <Link href={`/news/${p.slug}`} className="focus-ring group grid gap-5 sm:grid-cols-[12rem_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={p.image} alt="" fill sizes="12rem" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-red">{formatDate(p.date)}</p>
                    <h3 className="mt-1 text-2xl font-extrabold uppercase text-ink group-hover:text-teal">{p.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

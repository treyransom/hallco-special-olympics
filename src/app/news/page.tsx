import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { posts, formatDate } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "News, recaps, and updates from Special Olympics Hall County.",
};

export default function NewsPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero eyebrow="News & updates" title="From the sidelines." image="/images/lunch-hospital.jpg" description="Recaps, announcements, and stories from our athletes and volunteers." />
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p, i) => (
            <Reveal as="article" key={p.slug} delay={i * 0.06}>
              <Link href={`/news/${p.slug}`} className="focus-ring group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-red">{formatDate(p.date)}</p>
                  <h2 className="mt-2 text-2xl font-extrabold uppercase text-ink group-hover:text-teal">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-heading font-bold uppercase tracking-wide text-teal">
                    Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

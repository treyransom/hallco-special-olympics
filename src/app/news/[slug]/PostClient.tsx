"use client";

import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { posts, formatDate, loc } from "@/lib/data";
import Button from "@/components/ui/Button";
import { useLang } from "@/lib/i18n";
import ShareBar from "@/components/ui/ShareBar";

export default function PostClient({ slug }: { slug: string }) {
  const { lang, dict: d } = useLang();
  const post = posts.find((p) => p.slug === slug)!;
  return (
    <article>
      <div className="relative isolate h-[50vh] min-h-[22rem] bg-ink">
        <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-x absolute inset-x-0 bottom-0 pb-12 text-white">
          <Link href="/news" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"><ArrowLeft className="h-4 w-4" /> {d.common.allNews}</Link>
          <p className="text-sm font-bold uppercase tracking-wider text-gold">{formatDate(post.date, { month: "long", day: "numeric", year: "numeric" }, lang)}</p>
          <h1 className="mt-2 max-w-4xl text-balance text-4xl font-extrabold uppercase sm:text-6xl">{loc(lang, post, "title")}</h1>
        </div>
      </div>
      <div className="container-x py-16 sm:py-24">
        {post.video && (
          <div className="mx-auto mb-12 aspect-video max-w-3xl overflow-hidden rounded-3xl bg-black shadow-xl">
            <iframe src={`https://www.youtube-nocookie.com/embed/${post.video}?rel=0`} title={post.title} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full border-0" loading="lazy" />
          </div>
        )}
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-ink-soft">
          {loc(lang, post, "body").map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="mx-auto mt-10 max-w-3xl"><ShareBar path={`/news/${post.slug}`} title={loc(lang, post, "title")} /></div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-3 border-t border-mist-dark pt-10">
          <Button href="/get-involved" variant="secondary">{d.common.getInvolved}</Button>
          <Button href="/donate">{d.common.supportAthletes}</Button>
        </div>
      </div>
    </article>
  );
}

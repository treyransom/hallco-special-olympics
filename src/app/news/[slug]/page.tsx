import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts, formatDate } from "@/lib/data";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.excerpt, openGraph: { images: [post.image] } } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <div className="relative isolate h-[50vh] min-h-[22rem] bg-ink">
        <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-x absolute inset-x-0 bottom-0 pb-12 text-white">
          <Link href="/news" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All news
          </Link>
          <p className="text-sm font-bold uppercase tracking-wider text-gold">{formatDate(post.date, { month: "long", day: "numeric", year: "numeric" })}</p>
          <h1 className="mt-2 max-w-4xl text-balance text-4xl font-extrabold uppercase sm:text-6xl">{post.title}</h1>
        </div>
      </div>
      <div className="container-x py-16 sm:py-24">
        <div className="prose-lg mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-ink-soft">
          {post.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap gap-3 border-t border-mist-dark pt-10">
          <Button href="/get-involved" variant="secondary">Get involved</Button>
          <Button href="/donate">Support our athletes</Button>
        </div>
      </div>
    </article>
  );
}

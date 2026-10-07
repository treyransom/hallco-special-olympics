import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fundraisers } from "@/lib/data";
import FundraiserClient from "./FundraiserClient";

export function generateStaticParams() {
  return fundraisers.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = fundraisers.find((x) => x.slug === slug);
  return f ? { title: f.name, description: f.blurb, openGraph: { images: [f.image] } } : {};
}

export default async function FundraiserPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!fundraisers.find((x) => x.slug === slug)) notFound();
  return <FundraiserClient slug={slug} />;
}

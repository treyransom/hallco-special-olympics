import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sports } from "@/lib/data";
import TeamClient from "./TeamClient";

export function generateStaticParams() {
  return sports.map((s) => ({ sport: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sport: string }> }): Promise<Metadata> {
  const { sport } = await params;
  const s = sports.find((x) => x.slug === sport);
  return s ? { title: `${s.name} Team`, description: `Coaches, roster, and practice schedule for Special Olympics Hall County ${s.name}.` } : {};
}

export default async function TeamPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport } = await params;
  if (!sports.find((x) => x.slug === sport)) notFound();
  return <TeamClient slug={sport} />;
}

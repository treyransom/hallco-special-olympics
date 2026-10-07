import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events } from "@/lib/data";
import EventClient from "./EventClient";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  return e ? { title: e.title, description: `${e.date} · ${e.location} · ${e.description}` } : {};
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!events.find((x) => x.slug === slug)) notFound();
  return <EventClient slug={slug} />;
}

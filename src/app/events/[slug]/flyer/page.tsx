import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { events, site } from "@/lib/data";
import FlyerClient from "./FlyerClient";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  return e ? { title: `${e.title} flyer`, robots: { index: false } } : {};
}

export default async function FlyerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();
  const qr = await QRCode.toString(`${site.url}/events#${e.slug}`, { type: "svg", margin: 1, color: { dark: "#0d1f1e", light: "#ffffff" } });
  return <FlyerClient slug={slug} qrSvg={qr} />;
}

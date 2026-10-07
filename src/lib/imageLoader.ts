"use client";

import type { ImageLoaderProps } from "next/image";
import manifest from "./blur.json";

type Entry = { w: number; h: number; widths: number[]; blur: string };
const map = manifest as Record<string, Entry>;
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Static-export image loader: picks the smallest pre-generated size that covers the requested width. */
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const entry = map[src];
  if (!entry) return src.startsWith("/") ? bp + src : src;
  const target = entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1];
  if (target === entry.w) return bp + src;
  return bp + src.replace(/\.jpg$/, `-${target}.jpg`);
}

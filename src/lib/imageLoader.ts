"use client";

import type { ImageLoaderProps } from "next/image";
import manifest from "./blur.json";

type Entry = { w: number; h: number; widths: number[]; blur: string };
const map = manifest as Record<string, Entry>;

/** Static-export image loader: picks the smallest pre-generated size that covers the requested width. */
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const entry = map[src];
  if (!entry) return src;
  const target = entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1];
  if (target === entry.w) return src;
  return src.replace(/\.jpg$/, `-${target}.jpg`);
}

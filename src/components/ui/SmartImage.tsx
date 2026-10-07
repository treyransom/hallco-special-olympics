import NextImage, { type ImageProps } from "next/image";
import manifest from "@/lib/blur.json";

type Entry = { w: number; h: number; widths: number[]; blur: string };
const map = manifest as Record<string, Entry>;

/** next/image with automatic blur-up placeholders for photos in public/images. */
export default function SmartImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const entry = map[src];
  if (entry && !props.placeholder) {
    return <NextImage placeholder="blur" blurDataURL={entry.blur} {...props} />;
  }
  return <NextImage {...props} />;
}

import type { SVGProps } from "react";
import type { Sport } from "@/lib/data";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* Hand-drawn two-tone sport marks. `currentColor` is the line color; accents use the gold token. */
const icons: Record<Sport["icon"], (p: P) => React.JSX.Element> = {
  Dribbble: (p) => (
    <svg {...base} {...p}><circle cx="24" cy="24" r="17" /><path d="M9.5 15c8 6 16 9 29.5 8.5M7.5 28.5c10-3 20.5-1 29 6.5" /><path d="M18 9c6 10 9 20 8 30" /><circle cx="24" cy="24" r="17" fill="var(--color-gold)" fillOpacity="0.25" stroke="none" /></svg>
  ),
  Pins: (p) => (
    <svg {...base} {...p}><path d="M19 6c-2.2 0-3.6 1.6-3.6 3.8 0 2.4 1.6 3.4 1.6 6-.1 3.2-6 5.4-6 12.2 0 5 2 14 8 14s8-9 8-14c0-6.8-5.9-9-6-12.2 0-2.6 1.6-3.6 1.6-6C22.6 7.6 21.2 6 19 6Z" fill="var(--color-white)" /><path d="M30 10c-1.8 0-3 1.3-3 3.2 0 2 1.3 2.8 1.3 5-.1 2.6-5 4.5-5 10 0 3 .9 7.5 2.6 10.3 1.5-2.5 2.3-6.6 2.3-9.3 0-5-2.6-7.4-3-10.2 0-.6 0-1.2.2-1.8M30 10c1.8 0 3 1.3 3 3.2 0 2-1.3 2.8-1.3 5 .1 2.6 5 4.5 5 10 0 4.2-1.7 11.7-6.7 11.7" /><circle cx="19" cy="15" r="1.4" fill="var(--color-red)" stroke="none" /><circle cx="30" cy="18" r="1.1" fill="var(--color-red)" stroke="none" /></svg>
  ),
  Timer: (p) => (
    <svg {...base} {...p}><path d="M8 40h32" /><path d="M10 40c1-6 3-10 6-12s5-1 8-4 4-7 8-9c2-1 4-1 6 1" /><circle cx="36" cy="12" r="3.5" fill="var(--color-gold)" /><path d="M14 40v-5l6-5M26 40l-4-8 5-5" /><path d="M8 44h32" strokeOpacity="0.4" /></svg>
  ),
  Waves: (p) => (
    <svg {...base} {...p}><path d="M5 34c4-3 8-3 12 0s8 3 12 0 8-3 12 0M5 41c4-3 8-3 12 0s8 3 12 0 8-3 12 0" /><circle cx="31" cy="15" r="3.5" fill="var(--color-gold)" /><path d="M9 27l9-8 8 3 6-6" /><path d="M18 19l-2 8" /></svg>
  ),
  Target: (p) => (
    <svg {...base} {...p}><circle cx="17" cy="29" r="9" fill="var(--color-gold)" fillOpacity="0.3" /><circle cx="34" cy="31" r="7" /><circle cx="30" cy="14" r="4" fill="var(--color-red)" fillOpacity="0.5" /><path d="M5 42h38" /><path d="M13 25c2-1 5-1 8 1M30 28c2-1 4-1 6 1" strokeOpacity="0.6" /></svg>
  ),
  Flag: (p) => (
    <svg {...base} {...p}><path d="M14 30c-6-6-6-16 0-20 7 4 13 4 20 0 6 4 6 14 0 20-7-4-13-4-20 0Z" /><path d="M20 10l8 20M28 10l-8 20" strokeOpacity="0.6" /><path d="M8 44V22" /><path d="M8 22h12l-3 4 3 4H8" fill="var(--color-gold)" /></svg>
  ),
  CircleDot: (p) => (
    <svg {...base} {...p}><circle cx="30" cy="30" r="10" fill="var(--color-white)" /><path d="M24 23c2 2 2 5 0 7M36 23c-2 2-2 5 0 7" stroke="var(--color-red)" /><path d="M8 40L26 10" strokeWidth="4" /><path d="M26 10l4 3" strokeWidth="4" /></svg>
  ),
};

export default function SportIcon({ icon, className }: { icon: Sport["icon"]; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden />;
}

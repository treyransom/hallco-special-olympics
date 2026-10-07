import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; variant?: "primary" | "secondary" | "outline" | "white" | "ghost"; size?: "md" | "lg"; className?: string; external?: boolean };

const variants = {
  primary: "bg-red text-white hover:bg-red-dark shadow-lg shadow-red/25",
  secondary: "bg-teal text-white hover:bg-teal-dark shadow-lg shadow-teal/25",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  white: "bg-white text-ink hover:bg-gold shadow-lg shadow-ink/10",
  ghost: "border-2 border-white/70 text-white hover:bg-white hover:text-ink",
};

export default function Button({ href, children, variant = "primary", size = "md", className, external }: Props) {
  const cls = cn("focus-ring inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0", size === "md" ? "px-6 py-3 text-base" : "px-8 py-4 text-lg", variants[variant], className);
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  return <Link href={href} className={cls}>{children}</Link>;
}

import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "left", light = false, className, accent = true }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; light?: boolean; className?: string; accent?: boolean }) {
  const words = title.split(" ");
  const last = accent && words.length > 1 ? words.pop() : null;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em]", light ? "text-gold" : "text-red")}>
          <span className={cn("h-0.5 w-8", light ? "bg-gold" : "bg-red")} />
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-balance text-4xl font-extrabold uppercase sm:text-5xl lg:text-6xl", light ? "text-white" : "text-ink")}>
        {words.join(" ")}{last && <> <span className={light ? "text-gold" : "text-teal"}>{last}</span></>}
      </h2>
      {description && <p className={cn("mt-5 text-lg leading-relaxed", light ? "text-white/80" : "text-ink-soft")}>{description}</p>}
    </Reveal>
  );
}

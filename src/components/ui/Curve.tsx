/** Curved divider between sections. `from` is the color of the section above, `to` the one below. */
const colors: Record<string, string> = { white: "text-white", mist: "text-mist", ink: "text-ink", teal: "text-teal-deep", gold: "text-gold" };

export default function Curve({ from, to, flip = false }: { from: keyof typeof colors; to: keyof typeof colors; flip?: boolean }) {
  return (
    <div className={`relative -mb-px h-12 w-full overflow-hidden sm:h-16 ${colors[flip ? from : to].replace("text-", "bg-")}`} aria-hidden>
      <svg className={`absolute inset-0 h-full w-full ${colors[flip ? to : from]}`} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d={flip ? "M0 0 C 360 80 1080 80 1440 0 L1440 80 L0 80 Z" : "M0 0 L1440 0 L1440 10 C 1080 80 360 80 0 10 Z"} fill="currentColor" />
      </svg>
    </div>
  );
}

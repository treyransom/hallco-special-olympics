import { Waves, Flag, CircleDot, Timer, Target, type LucideProps } from "lucide-react";
import type { Sport } from "@/lib/data";

function Pins(props: LucideProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 2c-1.1 0-2 .9-2 2 0 1.4.7 2 .7 3.5C7.7 9 5 10.5 5 14c0 3 1.5 8 4 8s4-5 4-8c0-3.5-2.7-5-2.7-6.5C10.3 6 11 5.4 11 4c0-1.1-.9-2-2-2Z" />
      <path d="M15 2c-.4 0-.8.1-1.1.3.1.5.1 1.1.1 1.7 0 1.4-.7 2-.7 3.5 0 1.6 2.7 3 2.7 6.5 0 1.8-.6 4.4-1.6 6.2.5.5 1 .8 1.6.8 2.5 0 4-5 4-8 0-3.5-2.7-5-2.7-6.5C17.3 6 18 5.4 18 4c0-1.1-.9-2-2-2h-1Z" />
    </svg>
  );
}

function Dribbble(props: LucideProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M4.9 5.4C8.5 9 13.5 11 20.8 10.5" />
      <path d="M3.2 14.2c5.2-1.3 10.6-.2 14.7 3.6" />
      <path d="M9.3 2.4c3.6 5.5 5.2 11 4.9 19.2" />
    </svg>
  );
}

const icons = { Waves, Flag, CircleDot, Dribbble, Pins, Timer, Target };

export default function SportIcon({ icon, className }: { icon: Sport["icon"]; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden />;
}

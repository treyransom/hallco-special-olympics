"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Dumbbell, Heart, UserPlus, Home } from "lucide-react";
import { useDict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function MobileBar() {
  const d = useDict();
  const pathname = usePathname();
  const items = [
    { href: "/", label: d.mobileBar.home, icon: Home },
    { href: "/schedule", label: d.mobileBar.schedule, icon: Dumbbell },
    { href: "/events", label: d.mobileBar.events, icon: CalendarDays },
    { href: "/register", label: d.mobileBar.register, icon: UserPlus },
    { href: "/donate", label: d.mobileBar.donate, icon: Heart, accent: true },
  ];
  return (
    <nav aria-label="Quick" className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-dark bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur xl:hidden print:hidden">
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const active = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link href={it.href} className={cn("focus-ring flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold uppercase tracking-wider", it.accent ? "text-red" : active ? "text-teal" : "text-ink-soft")} aria-current={active ? "page" : undefined}>
                <it.icon className={cn("h-5 w-5", it.accent && "fill-current")} />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

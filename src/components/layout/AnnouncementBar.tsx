"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight, Megaphone, X } from "lucide-react";
import { announcement } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const KEY = "sohc-announcement-" + announcement.text.slice(0, 24);
const subscribe = () => () => {};
const readStored = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

export default function AnnouncementBar() {
  const { lang, dict: d } = useLang();
  const [dismissed, setDismissed] = useState(false);
  const stored = useSyncExternalStore(subscribe, readStored, () => true);
  if (!announcement.active || stored || dismissed) return null;

  return (
    <div className="relative z-[60] bg-ink text-white">
      <div className="container-x flex items-center justify-center gap-3 py-2.5 pr-12 text-sm sm:text-base">
        <Megaphone className="hidden h-4 w-4 shrink-0 text-gold sm:block" aria-hidden />
        <p className="font-medium">{lang === "es" ? announcement.textEs : announcement.text}</p>
        <Link href={announcement.cta.href} className="focus-ring inline-flex shrink-0 items-center gap-1 rounded-full bg-gold px-3 py-1 font-heading text-sm font-bold uppercase tracking-wide text-ink hover:bg-white">
          {lang === "es" ? announcement.cta.labelEs : announcement.cta.label} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <button
        type="button"
        aria-label={d.announcement.dismiss}
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
        }}
        className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

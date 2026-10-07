"use client";

import { useState, useSyncExternalStore } from "react";
import { CloudLightning, Info, XCircle, X } from "lucide-react";
import { alert, sportName, formatDate } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const KEY = "sohc-alert-" + alert.updated + alert.text.slice(0, 16);
const subscribe = () => () => {};
const readStored = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
const styles = { info: "bg-teal text-white", warning: "bg-gold text-ink", cancel: "bg-red text-white" };
const icons = { info: Info, warning: CloudLightning, cancel: XCircle };

export default function AlertBanner({ inline = false, sport }: { inline?: boolean; sport?: string }) {
  const { lang, dict: d } = useLang();
  const [dismissed, setDismissed] = useState(false);
  const stored = useSyncExternalStore(subscribe, readStored, () => true);
  if (!alert.active) return null;
  if (sport && alert.sports.length && !alert.sports.includes(sport)) return null;
  if (!inline && (stored || dismissed)) return null;
  const Icon = icons[alert.level];
  return (
    <div className={`relative z-[61] ${styles[alert.level]} ${inline ? "rounded-2xl" : ""}`} role="status">
      <div className={`${inline ? "px-5" : "container-x pr-12"} flex items-start gap-3 py-3 text-sm sm:items-center sm:text-base`}>
        <Icon className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0" aria-hidden />
        <p>
          <span className="font-heading text-base font-bold uppercase tracking-wide">{d.alert[alert.level]}:</span> {lang === "es" ? alert.textEs : alert.text}
          {alert.sports.length > 0 && <span className="opacity-80"> · {d.alert.affects} {alert.sports.map((s) => sportName(s, lang)).join(", ")}</span>}
          <span className="opacity-70"> · {d.alert.updated} {formatDate(alert.updated, { month: "short", day: "numeric" }, lang)}</span>
        </p>
      </div>
      {!inline && (
        <button
          type="button"
          aria-label={d.alert.dismiss}
          onClick={() => {
            setDismissed(true);
            try {
              sessionStorage.setItem(KEY, "1");
            } catch {}
          }}
          className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-70 hover:bg-black/10 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

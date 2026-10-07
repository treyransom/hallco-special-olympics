"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useDict } from "@/lib/i18n";

const KEY = "sohc-theme";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  window.addEventListener("storage", cb);
  return () => {
    mq.removeEventListener("change", cb);
    window.removeEventListener("storage", cb);
  };
};
const read = (): "light" | "dark" => {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "dark" || v === "light") return v;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export default function ThemeToggle() {
  const d = useDict();
  const system = useSyncExternalStore(subscribe, read, () => "light" as const);
  const [override, setOverride] = useState<"light" | "dark" | null>(null);
  const theme = override ?? system;
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <button
      type="button"
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        setOverride(next);
        try {
          localStorage.setItem(KEY, next);
        } catch {}
      }}
      aria-label={d.theme.toggle}
      aria-pressed={theme === "dark"}
      className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-mist"
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-gold" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

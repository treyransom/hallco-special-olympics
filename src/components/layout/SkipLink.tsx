"use client";

import { useDict } from "@/lib/i18n";

export default function SkipLink() {
  const d = useDict();
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-white">
      {d.nav.skip}
    </a>
  );
}

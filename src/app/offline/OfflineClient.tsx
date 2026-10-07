"use client";

import { WifiOff } from "lucide-react";
import Button from "@/components/ui/Button";
import { useDict } from "@/lib/i18n";

export default function OfflineClient() {
  const d = useDict();
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <WifiOff className="h-14 w-14 text-teal" />
      <h1 className="mt-4 text-5xl font-extrabold uppercase text-ink">{d.offline.title}</h1>
      <p className="mt-3 max-w-md text-ink-soft">{d.offline.text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/schedule" variant="secondary">{d.offline.schedule}</Button>
        <Button href="/competition-guide" variant="outline">{d.offline.guide}</Button>
      </div>
    </section>
  );
}

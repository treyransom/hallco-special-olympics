"use client";

import { useState } from "react";
import { Camera, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/data";
import { useDict } from "@/lib/i18n";

export default function PhotoSubmit() {
  const d = useDict();
  const p = d.photos;
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = [`Photo submission`, ``, `From: ${fd.get("name")}`, `Event: ${fd.get("event")}`, `Consent: yes`, ``, `(Photos attached)`].join("\n");
    window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(`Photos: ${fd.get("event")}`)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  }
  const field = "focus-ring mt-1.5 w-full rounded-2xl border border-mist-dark bg-white px-4 py-3 text-ink";
  return (
    <section className="bg-dots bg-white py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} description={p.text} />
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="rounded-3xl bg-mist p-6 shadow-xl shadow-ink/5 sm:p-8">
            {sent ? (
              <p className="flex items-center gap-2 font-semibold text-teal"><CheckCircle2 className="h-5 w-5" /> {p.sent}</p>
            ) : (
              <div className="space-y-4 text-sm font-semibold text-ink">
                <label className="block">{p.name}<input name="name" required className={field} /></label>
                <label className="block">{p.eventLabel}<input name="event" required className={field} /></label>
                <label className="flex items-start gap-3 font-normal text-ink-soft"><input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-teal" /> {p.consent}</label>
                <button type="submit" className="focus-ring inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-dark"><Camera className="h-4 w-4" /> {p.send} <Send className="h-4 w-4" /></button>
                <p className="text-xs font-normal text-ink-soft">{p.hint}</p>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

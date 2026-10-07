"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/data";
import { useDict } from "@/lib/i18n";

export default function Newsletter({ compact = false }: { compact?: boolean }) {
  const d = useDict();
  const [done, setDone] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (site.newsletterUrl) return;
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent(`Please add ${email} to the newsletter list.`)}`;
    setDone(true);
  }
  const form = (
    <form action={site.newsletterUrl || undefined} method={site.newsletterUrl ? "post" : undefined} onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor={compact ? "nl-email-c" : "nl-email"}>{d.common.email}</label>
      <input id={compact ? "nl-email-c" : "nl-email"} name="email" type="email" required placeholder={d.newsletter.placeholder} className="focus-ring flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder:text-white/50 focus:bg-white/15" />
      <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-heading text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-white"><Mail className="h-4 w-4" /> {d.newsletter.subscribe}</button>
    </form>
  );
  if (compact) return <div>{done ? <p className="flex items-center gap-2 text-sm text-gold"><CheckCircle2 className="h-4 w-4" /> {d.newsletter.thanks}</p> : form}</div>;
  return (
    <section className="bg-teal py-20 text-white">
      <div className="container-x grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">{d.newsletter.eyebrow}</p>
          <h2 className="mt-2 text-4xl font-extrabold uppercase sm:text-5xl">{d.newsletter.title}</h2>
          <p className="mt-3 max-w-md text-white/85">{d.newsletter.text}</p>
        </div>
        <div className="lg:justify-self-end">{done ? <p className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-5 w-5 text-gold" /> {d.newsletter.thanks}</p> : form}</div>
      </div>
    </section>
  );
}

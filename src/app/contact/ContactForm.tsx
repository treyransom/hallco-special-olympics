"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/data";
import { useDict } from "@/lib/i18n";

export default function ContactForm() {
  const d = useDict();
  const c = d.contact;
  const [sent, setSent] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`[Website] ${fd.get("topic")} — ${fd.get("name")}`);
    const body = encodeURIComponent(`${fd.get("message")}\n\nFrom: ${fd.get("name")} <${fd.get("email")}>`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }
  const field = "focus-ring w-full rounded-2xl border border-mist-dark bg-mist px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-teal focus:bg-white";
  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-mist p-8 sm:p-10">
      <h2 className="text-4xl font-extrabold uppercase text-ink">{c.formT}</h2>
      <p className="mt-2 text-sm text-ink-soft">{c.formX}</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">{c.name}<input name="name" required className={`${field} mt-1.5`} placeholder={c.namePh} /></label>
        <label className="block text-sm font-semibold text-ink">{c.email}<input name="email" type="email" required className={`${field} mt-1.5`} placeholder="you@example.com" /></label>
        <label className="block text-sm font-semibold text-ink sm:col-span-2">{c.topic}<select name="topic" className={`${field} mt-1.5`}>{c.topics.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="block text-sm font-semibold text-ink sm:col-span-2">{c.message}<textarea name="message" required rows={5} className={`${field} mt-1.5`} placeholder={c.messagePh} /></label>
      </div>
      <button type="submit" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 font-heading text-lg font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-teal-dark"><Send className="h-4 w-4" /> {c.send}</button>
      {sent && <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-teal"><CheckCircle2 className="h-4 w-4" /> {c.sent}</p>}
    </form>
  );
}

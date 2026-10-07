"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/data";

const topics = ["Athlete registration", "Volunteering / coaching", "Sponsorship", "Donations", "Something else"];

export default function ContactForm() {
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
      <h2 className="text-4xl font-extrabold uppercase text-ink">Send a message</h2>
      <p className="mt-2 text-sm text-ink-soft">This opens your email app with everything filled in. We usually reply within a couple of days.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">
          Name
          <input name="name" required className={`${field} mt-1.5`} placeholder="Your name" />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Email
          <input name="email" type="email" required className={`${field} mt-1.5`} placeholder="you@example.com" />
        </label>
        <label className="block text-sm font-semibold text-ink sm:col-span-2">
          I'm asking about
          <select name="topic" className={`${field} mt-1.5`}>
            {topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-ink sm:col-span-2">
          Message
          <textarea name="message" required rows={5} className={`${field} mt-1.5`} placeholder="How can we help?" />
        </label>
      </div>
      <button type="submit" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 font-heading text-lg font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-teal-dark">
        <Send className="h-4 w-4" /> Send message
      </button>
      {sent && (
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-teal">
          <CheckCircle2 className="h-4 w-4" /> Your email app should be open. Thanks for reaching out!
        </p>
      )}
    </form>
  );
}

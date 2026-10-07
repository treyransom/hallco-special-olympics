"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/data";

export default function Newsletter({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (site.newsletterUrl) return; // real provider handles it
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent(`Please add ${email} to the newsletter list.`)}`;
    setDone(true);
  }

  const form = (
    <form action={site.newsletterUrl || undefined} method={site.newsletterUrl ? "post" : undefined} onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        className="focus-ring h-13 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder:text-white/50 focus:bg-white/15"
      />
      <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-heading text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-white">
        <Mail className="h-4 w-4" /> Subscribe
      </button>
    </form>
  );

  if (compact) {
    return (
      <div>
        {done ? <p className="flex items-center gap-2 text-sm text-gold"><CheckCircle2 className="h-4 w-4" /> Thanks! Check your email app.</p> : form}
      </div>
    );
  }

  return (
    <section className="bg-teal py-20 text-white">
      <div className="container-x grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-gold">Stay in the loop</p>
          <h2 className="mt-2 text-4xl font-extrabold uppercase sm:text-5xl">Season updates, straight to your inbox.</h2>
          <p className="mt-3 max-w-md text-white/85">Registration windows, practice changes, competition results, and volunteer needs. One or two emails a month, never more.</p>
        </div>
        <div className="lg:justify-self-end">
          {done ? (
            <p className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-5 w-5 text-gold" /> Thanks! Your email app should be open.</p>
          ) : (
            form
          )}
        </div>
      </div>
    </section>
  );
}

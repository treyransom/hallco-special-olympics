"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
import { FacebookIcon } from "./BrandIcons";
import { site } from "@/lib/data";
import { useDict } from "@/lib/i18n";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}><path d="M18.2 2h3.3l-7.2 8.3L22.8 22h-6.6l-5.2-6.8L5.1 22H1.8l7.7-8.8L1.4 2h6.8l4.7 6.2L18.2 2Zm-1.2 18h1.8L7 3.9H5.1L17 20Z" /></svg>;
}

export default function ShareBar({ path, title, className = "" }: { path: string; title: string; className?: string }) {
  const d = useDict();
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${path}`;
  const enc = encodeURIComponent;
  const btn = "focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-mist-dark bg-white text-ink transition hover:border-teal hover:text-teal";
  async function native() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }
    copy();
  }
  function copy() {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label={d.share.label}>
      <span className="mr-1 text-xs font-bold uppercase tracking-wider text-ink-soft">{d.share.label}</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={btn}><FacebookIcon className="h-4 w-4" /></a>
      <a href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer" aria-label="X" className={btn}><XIcon className="h-4 w-4" /></a>
      <button type="button" onClick={copy} aria-label={d.share.copy} className={btn}>{copied ? <Check className="h-4 w-4 text-teal" /> : <Link2 className="h-4 w-4" />}</button>
      <button type="button" onClick={native} aria-label={d.share.more} className={`${btn} sm:hidden`}><Share2 className="h-4 w-4" /></button>
      <span role="status" aria-live="polite" className="sr-only">{copied ? d.share.copied : ""}</span>
    </div>
  );
}

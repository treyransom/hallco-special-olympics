"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
      const href = a.getAttribute("href") ?? "";
      if (!href.startsWith("/") || href.split("#")[0] === pathname) return;
      setActive(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setActive(false), 400);
    return () => clearTimeout(id);
    // pathname change means navigation finished
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1">
      <div className={`h-full origin-left bg-gradient-to-r from-teal via-gold to-red transition-opacity ${active ? "opacity-100 [animation:progress_1.2s_ease-out_forwards]" : "opacity-0"}`} />
    </div>
  );
}

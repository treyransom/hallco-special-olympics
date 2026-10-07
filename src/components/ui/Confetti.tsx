"use client";

import { useState } from "react";

type Piece = { id: number; x: number; y: number; color: string; rot: number; dx: number; dy: number; size: number };
const COLORS = ["#00958f", "#f50e30", "#f2b134", "#19b3ab", "#ffffff"];

export function useConfetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const fire = (x: number, y: number) => {
    const batch: Piece[] = Array.from({ length: 40 }, (_, i) => ({ id: Date.now() + i, x, y, color: COLORS[i % COLORS.length], rot: Math.random() * 360, dx: (Math.random() - 0.5) * 420, dy: -Math.random() * 380 - 80, size: 6 + Math.random() * 8 }));
    setPieces((p) => [...p, ...batch]);
    setTimeout(() => setPieces((p) => p.filter((q) => !batch.includes(q))), 1500);
  };
  return { pieces, fire };
}

export default function Confetti({ pieces }: { pieces: Piece[] }) {
  if (pieces.length === 0) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute block rounded-sm"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size * 0.6, background: p.color, transform: `rotate(${p.rot}deg)`, animation: "confetti-fall 1.4s cubic-bezier(.2,.7,.3,1) forwards", ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px` }}
        />
      ))}
      <style>{`@keyframes confetti-fall { 0% { transform: translate(0,0) rotate(0deg); opacity: 1 } 60% { opacity: 1 } 100% { transform: translate(var(--dx), calc(var(--dy) + 420px)) rotate(720deg); opacity: 0 } }`}</style>
    </div>
  );
}

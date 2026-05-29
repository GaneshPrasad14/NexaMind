import { useEffect, useState } from "react";

export function Preloader() {
  const [gone, setGone] = useState(false);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1600);
    const t2 = setTimeout(() => setGone(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-700 ${fade ? "opacity-0" : "opacity-100"}`}
      style={{ background: "var(--ink-deep)" }}>
      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 800 600" preserveAspectRatio="none">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600"
            stroke="oklch(0.66 0.27 22 / 0.35)" strokeWidth="0.5"
            strokeDasharray="600" strokeDashoffset="600"
            style={{ animation: `grid-draw 1.4s ${i * 0.04}s ease-out forwards` }} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50}
            stroke="oklch(0.66 0.27 22 / 0.35)" strokeWidth="0.5"
            strokeDasharray="800" strokeDashoffset="800"
            style={{ animation: `grid-draw 1.4s ${i * 0.05}s ease-out forwards` }} />
        ))}
      </svg>
      <div className="relative font-display text-2xl tracking-[0.4em] text-[color:var(--sand)]">
        NEXAMIND
        <div className="mt-3 h-px overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left" style={{
            background: "linear-gradient(90deg, transparent, var(--neon), transparent)",
            animation: "shimmer 1.6s linear infinite",
            backgroundSize: "200% 100%",
          }} />
        </div>
      </div>
    </div>
  );
}

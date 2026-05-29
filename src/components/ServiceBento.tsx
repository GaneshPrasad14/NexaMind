import { useEffect, useRef, useState } from "react";

function GlassBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={handle}
      className={`relative overflow-hidden rounded-3xl glass-panel transition-all duration-500 hover:bg-white/80 ${className}`}
      style={{
        backgroundImage: "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--neon) 22%, transparent), transparent 60%)",
      }}>
      {children}
    </div>
  );
}

function WebDevBlock() {
  const [hover, setHover] = useState(false);
  const lines = [
    { c: "import", v: " { NexamindCore } from '@nexa/neural'" },
    { c: "const", v: " sync = await NexamindCore.init({ mode: 'cyber' })" },
    { c: "render", v: "(<NexamindCore /> → ✓ compiled" },
  ];
  return (
    <GlassBlock className="order-1 md:order-none md:col-span-2 row-span-1 p-6 min-h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-display tracking-widest text-[color:var(--cherry)]">01 / WEB DEVELOPMENT</span>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--neon)" }} />
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-4">Production-grade web systems.</h3>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="rounded-xl p-4 font-mono text-[12px] leading-relaxed glass-dark text-[color:var(--sand)] min-h-[110px]">
        <div className="flex gap-2 mb-2 text-white/40 text-[10px]">▸ nexa@core ~ /build</div>
        {lines.map((l, i) => (
          <div key={i} className={`overflow-hidden transition-all duration-700 ${hover ? "max-w-full opacity-100" : "max-w-0 opacity-0"}`}
            style={{ transitionDelay: `${i * 250}ms`, whiteSpace: "nowrap" }}>
            <span style={{ color: "var(--neon)" }}>{l.c}</span>
            <span className="text-white/80">{l.v}</span>
          </div>
        ))}
        {hover && <span className="inline-block w-2 h-3 align-middle ml-1 animate-pulse" style={{ background: "var(--neon)" }} />}
      </div>
    </GlassBlock>
  );
}

function AppDevBlock() {
  const [dark, setDark] = useState(true);
  return (
    <GlassBlock className="order-2 md:order-none p-6 min-h-[280px]">
      <span className="text-xs font-display tracking-widest text-[color:var(--cherry)]">02 / APP</span>
      <h3 className="text-2xl font-bold mt-2 mb-3">Native interfaces.</h3>
      <div className="mx-auto mt-2 w-[140px] rounded-[28px] p-2 transition-colors duration-500"
        style={{ background: dark ? "var(--ink-deep)" : "var(--sand-deep)", boxShadow: "0 20px 50px -20px rgba(0,0,0,.4)" }}>
        <div className="rounded-[22px] p-3 transition-colors duration-500"
          style={{ background: dark ? "#1c1416" : "#fff" }}>
          <div className="flex justify-between items-center mb-3">
            <div className="h-1 w-6 rounded-full" style={{ background: dark ? "#fff3" : "#0002" }} />
            <div className="h-2 w-2 rounded-full" style={{ background: "var(--neon)" }} />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded" style={{ background: dark ? "#fff2" : "#0001", width: "70%" }} />
            <div className="h-2 rounded" style={{ background: dark ? "#fff1" : "#0001", width: "90%" }} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {[0,1,2,3].map(i => (
              <div key={i} className="aspect-square rounded-md"
                style={{ background: i === 0 ? "var(--cherry)" : dark ? "#fff1" : "#0001" }} />
            ))}
          </div>
          <button onClick={(e) => { e.stopPropagation(); setDark(!dark); }}
            className="mt-3 w-full rounded-md py-1 text-[9px] font-display tracking-widest text-[color:var(--sand)]"
            style={{ background: "var(--cherry)" }}>
            TOGGLE MODE
          </button>
        </div>
      </div>
    </GlassBlock>
  );
}

function LogoBlock() {
  const [hover, setHover] = useState(false);
  return (
    <GlassBlock className="order-3 md:order-none p-6 min-h-[280px]">
      <span className="text-xs font-display tracking-widest text-[color:var(--cherry)]">03 / LOGO</span>
      <h3 className="text-2xl font-bold mt-2 mb-3">Marks with geometry.</h3>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="mx-auto mt-2 grid place-items-center w-[160px] h-[160px] rounded-xl"
        style={{ background: "color-mix(in oklab, var(--ink) 4%, transparent)" }}>
        <svg viewBox="0 0 200 200" className="w-full h-full p-3">
          <g fill="none" strokeLinecap="round">
            <circle cx="100" cy="100" r="70" stroke="var(--cherry)" strokeWidth="0.5"
              strokeDasharray="440" strokeDashoffset={hover ? 0 : 440} style={{ transition: "1s" }} opacity="0.6" />
            <circle cx="100" cy="100" r="45" stroke="var(--cherry)" strokeWidth="0.5"
              strokeDasharray="283" strokeDashoffset={hover ? 0 : 283} style={{ transition: "1s .2s" }} opacity="0.6" />
            <line x1="30" y1="100" x2="170" y2="100" stroke="var(--cherry)" strokeWidth="0.5" opacity="0.4"
              strokeDasharray="140" strokeDashoffset={hover ? 0 : 140} style={{ transition: ".8s .4s" }} />
            <line x1="100" y1="30" x2="100" y2="170" stroke="var(--cherry)" strokeWidth="0.5" opacity="0.4"
              strokeDasharray="140" strokeDashoffset={hover ? 0 : 140} style={{ transition: ".8s .5s" }} />
            <path d="M 65 130 L 100 60 L 135 130 Z" stroke="var(--ink)" strokeWidth="2.5"
              strokeDasharray="240" strokeDashoffset={hover ? 0 : 240} style={{ transition: "1.2s .6s" }} />
            <circle cx="100" cy="100" r="3" fill="var(--neon)"
              style={{ opacity: hover ? 1 : 0, transition: "1s 1.4s", filter: "drop-shadow(0 0 6px var(--neon))" }} />
          </g>
          <text x="100" y="190" textAnchor="middle" fontSize="6" fill="var(--ink)" opacity="0.4" fontFamily="monospace">R=70 · 60°</text>
        </svg>
      </div>
    </GlassBlock>
  );
}

function PosterBlock() {
  const [hover, setHover] = useState(false);
  return (
    <GlassBlock className="order-4 md:order-none md:col-span-2 p-6 min-h-[280px]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-display tracking-widest text-[color:var(--cherry)]">04 / POSTER</span>
        <span className="text-xs text-muted-foreground font-mono">EDITION 03 / 04</span>
      </div>
      <h3 className="text-2xl font-bold mb-4">Cybernetic art frames.</h3>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="relative h-[160px] overflow-hidden rounded-xl grid-bg"
        style={{ background: "var(--ink-deep)", filter: hover ? "url(#liquidDisp)" : "none", transition: ".4s" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
          <defs>
            <filter id="liquidDisp">
              <feTurbulence baseFrequency="0.02" numOctaves="2" seed="3">
                <animate attributeName="baseFrequency" values="0.02;0.06;0.02" dur="3s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="14" />
            </filter>
            <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--cherry)" />
              <stop offset="100%" stopColor="var(--neon)" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="60" fill="url(#pg)" opacity="0.85" />
          <rect x="160" y="20" width="120" height="120" fill="none" stroke="var(--neon)" strokeWidth="1" />
          <text x="200" y="90" fontFamily="serif" fontStyle="italic" fontSize="42" fill="var(--sand)">flux</text>
          <text x="300" y="30" fontSize="8" fill="var(--neon)" fontFamily="monospace" letterSpacing="2">NEXA / 24</text>
          <line x1="0" y1="140" x2="400" y2="140" stroke="var(--neon)" strokeWidth="0.5" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={320 + (i % 4) * 16} cy={60 + Math.floor(i / 4) * 16} r="3" fill="var(--neon)" opacity="0.6" />
          ))}
        </svg>
      </div>
    </GlassBlock>
  );
}

function SEOBlock() {
  const [hover, setHover] = useState(false);
  const baseLine = "M 10 80 Q 40 70 70 65 T 130 50 T 190 45";
  const spikeLine = "M 10 90 Q 40 85 70 70 T 130 30 T 190 12";
  return (
    <GlassBlock className="order-5 md:order-none row-span-2 p-6 min-h-[280px] flex flex-col">
      <span className="text-xs font-display tracking-widest text-[color:var(--cherry)]">05 / SEO + BRAND</span>
      <h3 className="text-2xl font-bold mt-2 mb-3">Growth, measured.</h3>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="mt-auto rounded-xl p-4 glass-dark flex-1 flex flex-col">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[10px] tracking-widest text-white/50 font-mono">RANK · ORGANIC</span>
          <span className="text-3xl font-display font-bold transition-all"
            style={{ color: hover ? "var(--neon)" : "var(--sand)" }}>
            {hover ? "99%" : "76%"}
          </span>
        </div>
        <svg viewBox="0 0 200 100" className="flex-1 w-full">
          <path d={hover ? spikeLine : baseLine} fill="none" stroke="var(--neon)" strokeWidth="2"
            style={{ transition: "d 0.9s, filter .3s", filter: hover ? "drop-shadow(0 0 6px var(--neon))" : "none" }} />
          {[10, 70, 130, 190].map((x, i) => (
            <circle key={i} cx={x} cy={hover ? [90, 70, 30, 12][i] : [80, 65, 50, 45][i]} r="3" fill="var(--neon)"
              style={{ transition: "0.9s", filter: hover ? "drop-shadow(0 0 6px var(--neon))" : "none" }} />
          ))}
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-3 text-[10px] font-mono text-white/60">
          <div>CTR<div className="text-white text-sm">{hover ? "12.4" : "4.1"}%</div></div>
          <div>DA<div className="text-white text-sm">{hover ? "78" : "42"}</div></div>
          <div>KW<div className="text-white text-sm">{hover ? "1.2k" : "320"}</div></div>
        </div>
      </div>
    </GlassBlock>
  );
}

export function ServiceBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
      <WebDevBlock />
      <SEOBlock />
      <AppDevBlock />
      <LogoBlock />
      <PosterBlock />
    </div>
  );
}

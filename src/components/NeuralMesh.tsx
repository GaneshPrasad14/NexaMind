import { useEffect, useRef, useState } from "react";

interface Node { x: number; y: number; r: number; }

export function NeuralMesh() {
  const wrap = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [size, setSize] = useState({ w: 520, h: 560 });

  useEffect(() => {
    const onResize = () => {
      if (wrap.current) {
        const r = wrap.current.getBoundingClientRect();
        setSize({ w: r.width, h: r.height });
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const nodes: Node[] = useRefNodes(size.w, size.h);
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 160) edges.push([i, j]);
    }
  }

  return (
    <div ref={wrap} className="relative h-[520px] w-full"
      onMouseMove={(e) => {
        const r = wrap.current!.getBoundingClientRect();
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setMouse({ x: -999, y: -999 })}>
      <div className="absolute inset-0 rounded-3xl glass-dark overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${size.w} ${size.h}`}>
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="oklch(0.66 0.27 22)" stopOpacity="1" />
              <stop offset="100%" stopColor="oklch(0.66 0.27 22)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {edges.map(([a, b], i) => {
            const na = nodes[a], nb = nodes[b];
            const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2;
            const dist = Math.hypot(mouse.x - mx, mouse.y - my);
            const active = dist < 140;
            return (
              <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={active ? "oklch(0.66 0.27 22)" : "oklch(1 0 0 / 0.12)"}
                strokeWidth={active ? 1.2 : 0.5}
                style={{ filter: active ? "drop-shadow(0 0 4px var(--neon))" : "none", transition: "all .25s" }} />
            );
          })}
          {nodes.map((n, i) => {
            const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);
            const active = dist < 120;
            const r = active ? n.r + 3 : n.r;
            return (
              <g key={i}>
                {active && <circle cx={n.x} cy={n.y} r={18} fill="url(#nodeGlow)" />}
                <circle cx={n.x} cy={n.y} r={r}
                  fill={active ? "oklch(0.66 0.27 22)" : "oklch(0.85 0.02 70 / 0.7)"}
                  style={{ transition: "all .2s", filter: active ? "drop-shadow(0 0 8px var(--neon))" : "none" }} />
              </g>
            );
          })}
        </svg>

        {/* Floating badge */}
        <div className="absolute right-5 top-5 animate-float">
          <div className="glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.25em] font-display font-bold"
            style={{ color: "var(--sand)", background: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full mr-2 align-middle animate-pulse-glow"
              style={{ background: "var(--neon)" }} />
            NEXAMIND // NEURAL AGENCY v1.0
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[10px] tracking-[0.2em] text-white/40 font-mono">
          <span>SYNAPSE.MAP / 0x4A2F</span>
          <span>LAT 8ms · 247 NODES</span>
        </div>
      </div>
    </div>
  );
}

function useRefNodes(w: number, h: number): Node[] {
  const ref = useRef<Node[] | null>(null);
  const key = `${Math.round(w)}-${Math.round(h)}`;
  const prev = useRef(key);
  if (!ref.current || prev.current !== key) {
    prev.current = key;
    const seed = (n: number) => () => { n = (n * 9301 + 49297) % 233280; return n / 233280; };
    const rand = seed(42);
    ref.current = Array.from({ length: 36 }, () => ({
      x: 40 + rand() * (w - 80),
      y: 40 + rand() * (h - 80),
      r: 2 + rand() * 2,
    }));
  }
  return ref.current;
}

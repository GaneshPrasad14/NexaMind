import { useRef, useState, type ReactNode } from "react";

export function MagneticButton({ children, onClick, variant = "primary" }: {
  children: ReactNode; onClick?: () => void; variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const handle = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
    setT({ x, y });
  };
  const reset = () => setT({ x: 0, y: 0 });

  if (variant === "ghost") {
    return (
      <button ref={ref} onMouseMove={handle} onMouseLeave={reset} onClick={onClick}
        className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-display tracking-widest uppercase"
        style={{ transform: `translate(${t.x}px, ${t.y}px)`, transition: "transform .25s" }}>
        {children}
        <span className="relative h-px w-8 overflow-hidden bg-current/40">
          <span className="absolute inset-0 bg-current translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        </span>
        <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
      </button>
    );
  }

  return (
    <button ref={ref} onMouseMove={handle} onMouseLeave={reset} onClick={onClick}
      className="relative inline-flex items-center gap-3 rounded-full px-9 py-5 text-base font-display font-bold tracking-wider uppercase text-[color:var(--sand)] neon-glow"
      style={{
        background: "linear-gradient(135deg, var(--ink-deep), var(--ink) 50%, var(--cherry))",
        transform: `translate(${t.x}px, ${t.y}px)`, transition: "transform .25s",
      }}>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: "var(--neon)", boxShadow: "0 0 16px var(--neon)" }}>→</span>
    </button>
  );
}

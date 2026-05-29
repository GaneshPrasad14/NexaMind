import { useEffect, useRef, useState } from "react";

const items = [
  { label: "Matrix", href: "#services" },
  { label: "Sync", href: "#planner" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setTilt({ x: (e.clientX - cx) / 80, y: (e.clientY - cy) / 80 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2" style={{ perspective: 800 }}>
      <nav ref={ref}
        className="glass-panel flex items-center gap-1 rounded-full px-2 py-2 transition-transform duration-200"
        style={{ transform: `rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)` }}>
        <a href="#hero" className="px-3 py-1.5 text-sm font-display font-bold tracking-widest flex items-center">
          NEXAMIND
        </a>
        <div className="mx-1 h-5 w-px bg-black/10" />
        {items.map(i => (
          <a key={i.label} href={i.href}
            className="rounded-full px-4 py-1.5 text-sm transition-colors hover:bg-black/5">
            {i.label}
          </a>
        ))}
        <a href="#planner" className="ml-1 rounded-full px-4 py-1.5 text-sm text-[color:var(--sand)] transition-transform hover:scale-[1.03]"
          style={{ background: "linear-gradient(135deg, var(--cherry), var(--neon))", boxShadow: "0 6px 24px -8px var(--cherry)" }}>
          Initiate
        </a>
      </nav>
    </div>
  );
}

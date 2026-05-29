import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  { label: "Matrix", href: "#services" },
  { label: "Sync", href: "#planner" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current || isMenuOpen) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setTilt({ x: (e.clientX - cx) / 80, y: (e.clientY - cy) / 80 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2" style={{ perspective: 800 }}>
        <nav ref={ref}
          className="glass-panel flex items-center gap-1 rounded-full px-2 py-2 transition-transform duration-200"
          style={{ transform: isMenuOpen ? "none" : `rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)` }}>
          <a href="#hero" className="px-3 py-1.5 text-sm font-display font-bold tracking-widest flex items-center shrink-0">
            NEXAMIND
          </a>
          <div className="mx-1 h-5 w-px bg-black/10 shrink-0 hidden sm:block" />
          
          {items.map(i => (
            <a key={i.label} href={i.href}
              className="rounded-full px-4 py-1.5 text-sm transition-colors hover:bg-black/5 shrink-0 hidden sm:block">
              {i.label}
            </a>
          ))}
          
          <a href="#planner" className="ml-1 rounded-full px-4 py-1.5 text-sm text-[color:var(--sand)] transition-transform hover:scale-[1.03] shrink-0"
            style={{ background: "linear-gradient(135deg, var(--cherry), var(--neon))", boxShadow: "0 6px 24px -8px var(--cherry)" }}>
            Initiate
          </a>

          <button 
            className="ml-2 p-1.5 rounded-full sm:hidden hover:bg-black/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/80 backdrop-blur-md sm:hidden pt-28 px-6 flex flex-col gap-4 text-center">
          {items.map(i => (
            <a key={i.label} href={i.href} onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-display font-bold tracking-widest text-[color:var(--ink-deep)] py-4 border-b border-black/10">
              {i.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

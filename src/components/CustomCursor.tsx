import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest("a,button,[data-cursor='hover'],input,textarea,select");
      setHover(interactive);
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    const raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full"
        style={{ background: "var(--neon)", boxShadow: "0 0 12px var(--neon)" }} />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 rounded-full border transition-[width,height,background,border-color] duration-200"
        style={{
          borderColor: hover ? "transparent" : "color-mix(in oklab, var(--cherry) 50%, transparent)",
          background: hover ? "var(--cherry)" : "transparent",
          boxShadow: hover ? "0 0 24px var(--cherry)" : "none",
          width: hover ? 14 : 36, height: hover ? 14 : 36,
          marginLeft: hover ? 11 : 0, marginTop: hover ? 11 : 0,
        }} />
    </>
  );
}

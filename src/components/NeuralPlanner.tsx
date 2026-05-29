import { useMemo, useState } from "react";

const SERVICES = ["Web", "App", "Logo", "Poster", "SEO"];

export function NeuralPlanner() {
  const [services, setServices] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [syncing, setSyncing] = useState<"idle" | "loading" | "done">("idle");

  const progress = useMemo(() => {
    let p = 0;
    if (services.length) p += 33;
    if (name.trim()) p += 33;
    if (details.trim().length > 10) p += 34;
    return p;
  }, [services, name, details]);

  const toggle = (s: string) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const sync = () => {
    if (progress < 100 || syncing !== "idle") return;
    setSyncing("loading");
    setTimeout(() => setSyncing("done"), 1800);
    setTimeout(() => setSyncing("idle"), 4500);
  };

  return (
    <div className="glass-panel rounded-3xl p-8 md:p-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-display tracking-[0.3em] text-[color:var(--cherry)] mb-2">// THE NEURAL INTERFACE</div>
          <h3 className="text-4xl md:text-5xl font-bold max-w-xl">Configure your project. <span className="font-serif-italic font-normal">Live.</span></h3>
        </div>
        <div className="text-xs font-mono text-muted-foreground">SESSION ID · NX-{Math.floor(Math.random() * 9999).toString().padStart(4, "0")}</div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-[10px] font-mono mb-2">
          <span className="tracking-widest text-muted-foreground">SYNC INTEGRITY</span>
          <span className="font-bold" style={{ color: progress === 100 ? "var(--neon)" : "var(--ink)" }}>{progress}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "color-mix(in oklab, var(--ink) 8%, transparent)" }}>
          <div className="h-full rounded-full transition-all duration-700 relative overflow-hidden"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--cherry), var(--neon))",
                     boxShadow: "0 0 12px var(--neon)" }}>
            <div className="absolute inset-0" style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent)",
              backgroundSize: "200% 100%", animation: "shimmer 2s linear infinite",
            }} />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-8">
        <Label num="01">Select services</Label>
        <div className="flex flex-wrap gap-2 mt-3">
          {SERVICES.map(s => {
            const active = services.includes(s);
            return (
              <button key={s} onClick={() => toggle(s)}
                className={`rounded-full px-5 py-2.5 text-sm font-display tracking-wider transition-all ${active ? "text-[color:var(--sand)]" : "text-[color:var(--ink)]"}`}
                style={{
                  background: active ? "linear-gradient(135deg, var(--cherry), var(--neon))" : "color-mix(in oklab, var(--ink) 5%, transparent)",
                  boxShadow: active ? "0 0 18px color-mix(in oklab, var(--neon) 50%, transparent)" : "none",
                }}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <Label num="02">Your name</Label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Ada Lovelace"
          className="mt-3 w-full bg-transparent border-b border-black/15 py-2 text-lg focus:border-[color:var(--cherry)] focus:outline-none transition-colors" />
      </div>

      <div className="mb-8">
        <Label num="03">Project details</Label>
        <textarea value={details} onChange={e => setDetails(e.target.value)} rows={3}
          placeholder="Tell us what you're dreaming up…"
          className="mt-3 w-full bg-transparent border-b border-black/15 py-2 focus:border-[color:var(--cherry)] focus:outline-none transition-colors resize-none" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <EmailPanel />
        <button onClick={sync} disabled={progress < 100 || syncing !== "idle"}
          className="relative overflow-hidden rounded-full px-8 py-4 text-[color:var(--sand)] font-display font-bold tracking-widest text-sm transition-all disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg, var(--ink-deep), var(--cherry))",
            boxShadow: progress === 100 ? "0 0 30px color-mix(in oklab, var(--neon) 50%, transparent)" : "none",
          }}>
          {syncing === "idle" && "SYNC WITH NEXAMIND"}
          {syncing === "loading" && (
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full animate-pulse-glow" style={{ background: "var(--neon)" }} />
              ESTABLISHING LINK…
            </span>
          )}
          {syncing === "done" && (
            <span className="inline-flex items-center gap-2">✓ SYNC COMPLETE</span>
          )}
          {syncing === "loading" && (
            <span className="absolute inset-0" style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent)",
              backgroundSize: "200% 100%", animation: "shimmer 1.2s linear infinite",
            }} />
          )}
        </button>
      </div>
    </div>
  );
}

function Label({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-[10px] font-mono tracking-widest text-[color:var(--cherry)]">{num}</span>
      <span className="text-sm font-display tracking-wider uppercase">{children}</span>
    </div>
  );
}

function EmailPanel() {
  const [copied, setCopied] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; tx: number; ty: number }[]>([]);
  const copy = () => {
    navigator.clipboard.writeText("nexa2mind@gmail.com").catch(() => {});
    setCopied(true);
    const arr = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      tx: (Math.random() - 0.5) * 120,
      ty: (Math.random() - 0.5) * 120,
    }));
    setSparks(arr);
    setTimeout(() => setCopied(false), 1800);
    setTimeout(() => setSparks([]), 800);
  };
  return (
    <div className="relative glass-dark rounded-2xl px-5 py-3 flex items-center gap-4 text-[color:var(--sand)]">
      <div>
        <div className="text-[10px] font-mono tracking-widest text-white/40">DIRECT LINE</div>
        <div className="font-mono text-sm md:text-base">nexa2mind@gmail.com</div>
      </div>
      <button onClick={copy} className="relative rounded-full px-3 py-1.5 text-[10px] font-display tracking-widest"
        style={{ background: "var(--neon)", color: "var(--ink-deep)" }}>
        {copied ? "COPIED ✓" : "COPY"}
      </button>
      {sparks.map(s => (
        <span key={s.id} className="pointer-events-none absolute right-8 top-1/2 h-1 w-1 rounded-full"
          style={{
            background: "var(--neon)", boxShadow: "0 0 6px var(--neon)",
            animation: "spark 0.7s ease-out forwards",
            ["--tx" as never]: `${s.tx}px`,
            ["--ty" as never]: `${s.ty}px`,
          } as React.CSSProperties} />
      ))}
      {copied && (
        <div className="absolute -top-9 right-2 rounded-full px-3 py-1 text-[10px] font-display tracking-widest text-[color:var(--ink-deep)]"
          style={{ background: "var(--neon)", boxShadow: "0 0 16px var(--neon)" }}>
          Copied to clipboard
        </div>
      )}
    </div>
  );
}

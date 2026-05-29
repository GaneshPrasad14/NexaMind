import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { NeuralMesh } from "@/components/NeuralMesh";
import { MagneticButton } from "@/components/MagneticButton";
import { ServiceBento } from "@/components/ServiceBento";
import { NeuralPlanner } from "@/components/NeuralPlanner";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden noise">
      <Preloader />
      <CustomCursor />
      <Navbar />

      {/* HERO */}
      <section id="hero" className="relative pt-36 pb-24 px-6 md:px-12">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <img src="/logo.png" alt="Nexamind Logo" className="h-20 md:h-28 w-auto mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
            <h1 className="font-display font-bold leading-[0.92] tracking-tight text-[clamp(2.8rem,7vw,6.5rem)]">
              Where Creative<br />
              <span className="font-serif-italic font-normal italic">Minds</span> Meet<br />
              <span className="text-cherry-gradient">Cybernetic Code.</span>
            </h1>
            <p className="mt-8 max-w-md text-muted-foreground text-lg">
              Nexamind is a neural agency — engineering web, product, brand and growth systems for the post-digital decade.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}>
                Initiate Sync
              </MagneticButton>
              <MagneticButton variant="ghost" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Browse Services
              </MagneticButton>
            </div>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 max-w-md gap-6 text-sm">
              {[
                { k: "120+", v: "Synapses shipped" },
                { k: "8ms", v: "Avg. response" },
                { k: "99.99", v: "Brand integrity" },
              ].map(s => (
                <div key={s.v}>
                  <div className="text-2xl font-display font-bold">{s.k}</div>
                  <div className="text-xs text-muted-foreground tracking-wider">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <NeuralMesh />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative px-6 md:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-display tracking-[0.3em] text-[color:var(--cherry)] mb-3">// 02 · THE MATRIX</div>
              <h2 className="text-5xl md:text-7xl font-bold max-w-2xl leading-[0.95]">
                Five disciplines. <span className="font-serif-italic font-normal">One</span> nervous system.
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Each capability is a node. Together they form a circuit that ships product, story and revenue in the same breath.
            </p>
          </div>
          <ServiceBento />
        </div>
      </section>

      {/* PLANNER */}
      <section id="planner" className="relative px-6 md:px-12 py-24">
        <div className="mx-auto max-w-5xl">
          <NeuralPlanner />
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="relative px-6 md:px-12 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="glass-dark rounded-3xl p-10 md:p-16 text-[color:var(--sand)] relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative grid md:grid-cols-2 gap-10 items-end">
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.95]">
                Ready to <span className="font-serif-italic font-normal">interface</span>?
              </h2>
              <div>
                <p className="text-white/60 mb-6 max-w-md">
                  Send a signal. We reply within one orbit (≈24 hours).
                </p>
                <a href="mailto:nexa2mind@gmail.com"
                  className="inline-flex items-center gap-2 md:gap-3 text-lg md:text-2xl font-display font-bold border-b border-white/20 pb-2 hover:border-[color:var(--neon)] transition-colors max-w-full">
                  <span className="truncate">nexa2mind@gmail.com</span>
                  <span>→</span>
                </a>
              </div>
            </div>
            <div className="relative mt-16 pt-10 border-t border-white/10 flex flex-col items-center md:flex-row md:justify-between gap-8">
              <img src="/logo.png" alt="Nexamind Logo" className="h-24 md:h-32 w-auto" />
              <div className="text-xs font-mono text-white/40 tracking-widest text-center md:text-right">
                © 2026 NEXAMIND // NEURAL AGENCY
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

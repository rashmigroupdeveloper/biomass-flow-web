import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GsapMagnetic from './GsapMagnetic';

interface LayeredHeroProps {
  layers?: string[]; // Optional custom image URLs for the 6 layers
  title?: string;
  subtitle?: string;
}

export default function LayeredHero({
  layers = [],
  title = "Decarbonizing Industry",
  subtitle = "Building a clean industrial future through advanced biomass systems"
}: LayeredHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset element styles before animation
    gsap.set(layersRef.current, { opacity: 0, scale: 0.85, y: 100, rotateX: 20 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Staggered reveal sequence
    tl.to(layersRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      duration: 1.4,
      stagger: 0.18,
      delay: 0.3,
    });

    // Parallax mousemove movement on the layers
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPercent = (clientY / innerHeight - 0.5) * 2; // -1 to 1

      layersRef.current.forEach((layer, i) => {
        if (!layer) return;
        // Different depth coefficients for different layers
        const depth = (i + 1) * 12; 
        gsap.to(layer, {
          x: xPercent * depth,
          y: yPercent * depth,
          rotateY: xPercent * 5,
          rotateX: -yPercent * 5,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      tl.kill();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Standard layer elements representing the 6 layers
  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#071309] text-white flex flex-col justify-center items-center px-6 py-24 md:py-32"
      style={{ minHeight: '85dvh', perspective: 1200 }}
    >
      {/* Layer 1: Radial Atmosphere & Ambient light (Deep Background) */}
      <div
        ref={(el) => (layersRef.current[0] = el)}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle 800px at 50% 50%, rgba(46, 125, 50, 0.25) 0%, rgba(7, 19, 9, 0) 80%)',
        }}
      />

      {/* Layer 2: Grid and Lines Overlay (Mid Background) */}
      <div
        ref={(el) => (layersRef.current[1] = el)}
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center',
        }}
      />

      {/* Layer 3: Main Central Branding Typography Layer */}
      <div
        ref={(el) => (layersRef.current[2] = el)}
        className="relative z-10 text-center max-w-4xl mt-12 mb-16 selection:bg-primary-700 pointer-events-none"
      >
        <h1
          className="font-serif font-bold tracking-tight text-white mb-6 uppercase"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6rem)', lineHeight: 0.95 }}
        >
          {title}
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Layer 4: Floating Graphic / Product Center Visual */}
      <div
        ref={(el) => (layersRef.current[3] = el)}
        className="relative z-20 flex justify-center w-full max-w-md pointer-events-none select-none my-8"
      >
        {layers[3] ? (
          <img
            src={layers[3]}
            alt="Core Visual"
            className="w-80 h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] border border-white/10 rounded-3xl"
          />
        ) : (
          <div className="w-80 h-56 rounded-3xl border border-white/10 bg-gradient-to-tr from-[#143219] to-[#2d6e38] flex flex-col items-center justify-center p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-white/30 uppercase tracking-widest">
              Core Tech
            </div>
            <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/20">
              🌱
            </span>
            <div className="text-sm font-semibold text-white uppercase tracking-wider">
              Renewable Matrix
            </div>
            <div className="text-xs text-white/60 mt-1">Rashmi 6 Paradigm Carbon System</div>
          </div>
        )}
      </div>

      {/* Layer 5: Left Glassmorphic Info Card */}
      <div
        ref={(el) => (layersRef.current[4] = el)}
        className="absolute left-6 md:left-[10%] bottom-[12%] z-30 max-w-[240px] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl hidden sm:block pointer-events-auto"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-primary-400 mb-1.5 block font-bold">
          Biochar Sourcing
        </span>
        <h3 className="text-sm font-semibold text-white mb-1">Negative Emission</h3>
        <p className="text-xs text-white/50 leading-relaxed font-light">
          Sequestering carbon back into soils to reverse industrial impact.
        </p>
      </div>

      {/* Layer 6: Right Glassmorphic Info Card */}
      <div
        ref={(el) => (layersRef.current[5] = el)}
        className="absolute right-6 md:right-[10%] top-[20%] z-30 max-w-[240px] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl hidden sm:block pointer-events-auto"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-primary-400 mb-1.5 block font-bold">
          Global Logistics
        </span>
        <h3 className="text-sm font-semibold text-white mb-1">Stable Chain</h3>
        <p className="text-xs text-white/50 leading-relaxed font-light">
          Reliable supply corridors from Eastern India to international hubs.
        </p>
      </div>
    </div>
  );
}

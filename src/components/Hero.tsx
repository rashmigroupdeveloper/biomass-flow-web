import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ParticleCanvas from './ParticleCanvas';
import MarqueeTicker from './MarqueeTicker';

gsap.registerPlugin(ScrollTrigger);

const TICKER_ITEMS = [
  { text: 'Bio Pellets', accent: true },
  { text: 'Activated Carbon', accent: false },
  { text: 'Charcoal Briquettes', accent: true },
  { text: 'ISO 9001:2015 Certified', accent: false },
  { text: 'ENplus A1 Standard', accent: true },
  { text: 'FSC Chain of Custody', accent: false },
  { text: '20,000 MT Annual Capacity', accent: true },
  { text: 'Eastern India Origin', accent: false },
  { text: 'Zero Field Burning', accent: true },
  { text: 'Rashmi 6 Paradigm Ltd', accent: false },
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const particleOptions = useMemo(() => ({
    particleCount: 180,
    particleMinSize: 1,
    particleMaxSize: 3.5,
    baseHue: 130,
    backgroundColor: 'rgba(0,0,0,0)',
    flowIntensity: 1.2,
    flowDirection: 'upward' as const,
    speedFactor: 0.4,
    connectionRadius: 160,
    connectionOpacity: 0.18,
    mouseInteraction: true,
    responsive: true,
    densityFactor: 0.00009,
    trailEffect: true,
    trailLength: 0.9,
    particleGlow: true,
    elongateParticles: true,
    waveMotion: true,
  }), []);

  // GSAP scroll-driven fade + scale on content
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Character split animation on heading
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const chars = el.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { y: '115%', rotateX: 45, opacity: 0 },
      {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.018,
        delay: 0.5,
        ease: 'power3.out',
      }
    );
  }, []);

  const words = ['Turning', 'Waste', 'Into', 'Energy'];

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col overflow-hidden bg-[#0a1a0c]"
      style={{ minHeight: '100dvh' }}
    >
      {/* Radial atmosphere */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(46,125,50,0.28) 0%, rgba(10,26,12,0) 70%)',
        }}
      />

      {/* Animated scan lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(76,175,80,0.013) 0px, rgba(76,175,80,0.013) 1px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 3px',
        }}
        animate={{ backgroundPositionY: ['0px', '3px'] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Particles */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas id="heroCanvas" options={particleOptions} />
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center flex-1 container mx-auto px-6 md:px-12 pt-28 pb-8 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/12 bg-white/[0.04] text-white/60 text-[10px] font-semibold uppercase tracking-[0.3em] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            Rashmi 6 Paradigm Limited
          </span>
        </motion.div>

        {/* Main heading — character split */}
        <div className="mb-7 overflow-hidden perspective-1000">
          <h1
            ref={headingRef}
            className="font-serif font-bold text-white leading-[0.93] tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', perspective: 800 }}
          >
            {words.map((word, wi) => (
              <React.Fragment key={wi}>
                <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.18em' }}>
                  {word.split('').map((char, ci) => (
                    <span
                      key={ci}
                      className="char"
                      style={{
                        display: 'inline-block',
                        transformOrigin: 'bottom center',
                        opacity: 0,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wi === 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
        </div>

        {/* Subhead */}
        <motion.p
          className="text-base md:text-lg text-white/50 leading-relaxed font-light max-w-md mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
        >
          Premium Bio Pellets, Activated Carbon &amp; Charcoal Briquettes — sustainable biomass solutions from Eastern India for a cleaner tomorrow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/products/bio-pellets"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-900/40"
          >
            Explore Products
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/18 hover:border-white/35 text-white/75 hover:text-white font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm hover:bg-white/[0.05]"
          >
            Our Mission
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-lg w-full pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.4 }}
        >
          {[
            { value: '20K+', label: 'Tons / Year' },
            { value: '38M', label: 'CO₂ Tons Saved' },
            { value: '5+', label: 'Years of Innovation' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">{s.value}</div>
              <div className="text-[10px] text-white/35 mt-1 uppercase tracking-widest font-mono">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-px bg-white/20"
          style={{ height: 44 }}
          animate={{ scaleY: [0, 1, 0], transformOrigin: 'top' }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        />
        <span className="text-white/20 text-[9px] font-mono uppercase tracking-[0.35em]">Scroll</span>
      </motion.div>

      {/* Marquee ticker at the bottom of the hero */}
      <motion.div
        className="relative z-10 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)', paddingBlock: '12px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <MarqueeTicker items={TICKER_ITEMS} speed={36} />
      </motion.div>
    </div>
  );
};

export default Hero;

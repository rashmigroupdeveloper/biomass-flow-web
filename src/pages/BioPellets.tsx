import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import SplitReveal from '@/components/SplitReveal';
import ScrollRevealLine from '@/components/ScrollRevealLine';
import MarqueeTicker from '@/components/MarqueeTicker';

gsap.registerPlugin(ScrollTrigger);

// ── SVG visual ──────────────────────────────────────────────────────
const PelletArt = () => {
  const pellets = Array.from({ length: 24 }, (_, i) => ({
    x: 60 + (i % 6) * 72,
    y: 80 + Math.floor(i / 6) * 60,
    delay: i * 0.03,
  }));
  return (
    <svg viewBox="0 0 520 380" className="w-full h-full">
      <defs>
        <radialGradient id="pg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(46,125,50,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="520" height="380" fill="url(#pg)" />
      {pellets.map((p, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: p.delay, duration: 0.5, ease: 'backOut' }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        >
          <ellipse cx={p.x} cy={p.y} rx={22} ry={10}
            fill="rgba(46,125,50,0.18)" stroke="rgba(76,175,80,0.75)" strokeWidth="1.2" />
          <line x1={p.x - 22} y1={p.y} x2={p.x + 22} y2={p.y}
            stroke="rgba(76,175,80,0.25)" strokeWidth="0.8" />
        </motion.g>
      ))}
    </svg>
  );
};

const specs = [
  { label: 'Calorific Value', value: '4,200 – 4,800 kcal/kg' },
  { label: 'Moisture Content', value: '< 10%' },
  { label: 'Ash Content', value: '< 3%' },
  { label: 'Bulk Density', value: '650 – 700 kg/m³' },
  { label: 'Pellet Diameter', value: '6 mm / 8 mm' },
  { label: 'Pellet Length', value: '10 – 30 mm' },
  { label: 'Sulfur Content', value: '< 0.05%' },
  { label: 'Packaging', value: '25 kg bags / bulk' },
];

const benefits = [
  { id: '01', title: 'Carbon Neutral', body: 'CO₂ released during combustion equals what plants absorbed during growth — a closed carbon cycle that coal cannot offer.' },
  { id: '02', title: 'High Energy Density', body: 'Uniform compression produces consistent calorific output, reducing fuel volume needed per unit of heat generated.' },
  { id: '03', title: 'Low Emissions', body: 'Significantly lower SO₂, NOₓ, and particulate matter vs. coal. Enables industrial operators to meet tightening emission regulations.' },
  { id: '04', title: 'Agricultural Waste Recovery', body: 'Produced from agro-waste that would otherwise be burned in fields — creating rural income while eliminating field burning.' },
  { id: '05', title: 'Drop-in Co-firing Fuel', body: 'Compatible with existing coal-fired boilers at 5–20% co-firing ratios with zero capital expenditure on equipment modification.' },
  { id: '06', title: 'Stable Pricing', body: 'Insulated from oil and gas market volatility. Long-term supply contracts available for industrial partners with predictable energy costs.' },
];

const SPEC_TICKER = [
  { text: '4,800 kcal/kg', accent: true },
  { text: 'Moisture < 10%', accent: false },
  { text: 'Ash < 3%', accent: true },
  { text: '6mm / 8mm diameter', accent: false },
  { text: 'ENplus A1 Standard', accent: true },
  { text: 'ISO 9001:2015', accent: false },
  { text: '25kg bags / Bulk', accent: true },
  { text: 'FSC Chain of Custody', accent: false },
];

// ── Horizontal pinned benefits scroll ──────────────────────────────
function HorizontalBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const totalWidth = track.scrollWidth - container.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ background: '#071a09' }}>
      {/* Fixed header overlay */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ padding: '3.5rem 3rem 2rem', background: 'linear-gradient(to bottom, rgba(7,26,9,1) 0%, transparent 100%)' }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-5 mb-3">
            <span className="text-white/20 text-[10px] font-mono uppercase tracking-[0.35em]">Why Bio Pellets</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
          <SplitReveal
            as="h2"
            className="font-serif font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.1 }}
            mode="words"
          >
            Six reasons industrial operators choose biomass.
          </SplitReveal>
        </div>
      </div>

      {/* Horizontal card track */}
      <div
        ref={trackRef}
        className="flex"
        style={{ paddingTop: '14rem', paddingBottom: '5rem', paddingLeft: '5%' }}
      >
        {benefits.map((b, i) => (
          <motion.div
            key={b.id}
            className="flex-shrink-0"
            style={{
              width: 'min(380px, 80vw)',
              marginRight: '2rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              padding: '2.5rem',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <span
              className="text-[10px] font-mono uppercase tracking-widest block mb-6"
              style={{ color: 'rgba(76,175,80,0.45)' }}
            >
              {b.id}
            </span>
            <div
              className="w-8 h-px mb-6"
              style={{ background: 'rgba(76,175,80,0.35)' }}
            />
            <h3 className="font-serif font-bold text-white text-xl mb-4 leading-tight">{b.title}</h3>
            <p className="text-white/40 text-sm leading-[1.85]">{b.body}</p>
          </motion.div>
        ))}
        {/* Extra padding card */}
        <div style={{ width: '5%', flexShrink: 0 }} />
      </div>
    </div>
  );
}

const BioPellets = () => {
  const [specsRef, specsInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <>
      <Helmet>
        <title>Bio Pellets | Rashmi 6 Paradigm</title>
        <meta name="description" content="Premium bio pellets from agricultural waste. High-energy biomass fuel for industrial thermal applications with low moisture and ash." />
        <link rel="canonical" href="https://rashmi6paradigm.com/products/bio-pellets" />
      </Helmet>

      <div className="relative" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section
          className="relative min-h-screen flex items-end pb-16 md:pb-24 pt-28"
          style={{ background: '#0a1a0c' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 60% at 70% 50%, rgba(46,125,50,0.14) 0%, transparent 65%)' }}
          />

          {/* Animated grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(76,175,80,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(76,175,80,0.02) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-primary-400/60 text-[10px] font-mono uppercase tracking-[0.4em]">
                    Products — 01
                  </span>
                  <ScrollRevealLine color="rgba(76,175,80,0.1)" />
                </div>

                <SplitReveal
                  as="h1"
                  className="font-serif font-bold text-white leading-[0.92] tracking-tight mb-7"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
                  mode="chars"
                  delay={0.15}
                >
                  Bio Pellets
                </SplitReveal>

                <motion.p
                  className="text-white/45 text-base leading-[1.85] font-light max-w-md mb-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Compressed agricultural biomass fuel for industrial co-firing and thermal energy generation. ISO-compliant, ENplus-standard pellets produced from locally sourced agro-waste.
                </motion.p>

                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'rgba(76,175,80,0.9)', border: '1px solid rgba(76,175,80,0.3)' }}
                  >
                    Request Samples
                  </Link>
                  <a
                    href="#specifications"
                    className="text-white/38 text-sm hover:text-white/70 transition-colors"
                  >
                    View Specs ↓
                  </a>
                </motion.div>
              </div>

              {/* SVG art */}
              <div className="h-64 md:h-80 lg:h-[420px] opacity-80">
                <PelletArt />
              </div>
            </div>
          </div>
        </section>

        {/* Spec ticker */}
        <div
          className="py-3 border-y"
          style={{ background: '#071a09', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <MarqueeTicker items={SPEC_TICKER} speed={24} />
        </div>

        {/* ── Specifications ── */}
        <section id="specifications" ref={specsRef} className="relative bg-white py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">

            <div className="flex items-center gap-6 pb-12">
              <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
                Technical Specifications
              </span>
              <ScrollRevealLine color="rgba(0,0,0,0.08)" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">

              <div className="lg:col-span-4">
                <SplitReveal
                  as="h2"
                  className="font-serif font-bold text-gray-900 leading-tight tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
                  mode="words"
                >
                  Industrial-grade biomass fuel.
                </SplitReveal>
                <motion.p
                  className="text-gray-500 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={specsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Every batch tested to ENplus A1/A2 standards. Full certificates of analysis available on request.
                </motion.p>

                <motion.div
                  className="mt-8 p-5 rounded-2xl"
                  style={{ background: '#f0fdf1', border: '1px solid #d1fae5' }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={specsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.35 }}
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary-600/70 mb-2">
                    ISO Certification
                  </div>
                  <div className="text-sm font-semibold text-primary-800">ISO 9001:2015</div>
                  <div className="text-xs text-gray-500 mt-0.5">Quality Management System</div>
                </motion.div>
              </div>

              <div className="lg:col-span-8">
                <table className="w-full">
                  <tbody>
                    {specs.map((s, i) => (
                      <motion.tr
                        key={s.label}
                        className="border-b border-gray-100 last:border-0"
                        initial={{ opacity: 0, x: 16 }}
                        animate={specsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                      >
                        <td className="py-4 pr-8 w-1/2">
                          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">{s.label}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-[15px] font-semibold text-gray-800 tabular-nums">{s.value}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Horizontal pinned benefits ── */}
        <HorizontalBenefits />

        {/* ── Applications ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em]">Applications</span>
                </div>
                <SplitReveal
                  as="h2"
                  className="font-serif font-bold text-gray-900 leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
                  mode="words"
                >
                  Where bio pellets deliver value.
                </SplitReveal>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { sector: 'Power Generation', desc: 'Co-firing at 5–20% with coal in utility-scale power plants. Immediate emission reduction with zero boiler modification.' },
                  { sector: 'Industrial Heat', desc: 'Cement kilns, brick factories, paper mills, and textile dyeing plants replacing coal or furnace oil for process heat.' },
                  { sector: 'District Heating', desc: 'Dedicated biomass boilers for residential and commercial district heating networks across Tier I and II cities.' },
                  { sector: 'Agricultural Dryers', desc: 'Grain and crop dryers across rice mills, dal mills, and food processing units in rural Eastern India.' },
                ].map((app, i) => (
                  <motion.div
                    key={app.sector}
                    className="p-6 rounded-2xl border border-gray-100 hover:border-primary-200 transition-colors group"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-primary-700 transition-colors">{app.sector}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{app.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="font-serif font-bold text-gray-900 text-xl">Ready to switch to biomass co-firing?</p>
                <p className="text-gray-500 text-sm mt-1">Get samples, datasheets and pricing in one inquiry.</p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ background: '#2e7d32' }}
              >
                Contact Our Team →
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BioPellets;
